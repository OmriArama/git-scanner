import trending from "trending-github"
import { program } from "commander";
import { exec } from "child_process"
import util from "util"
import { repoDownloader } from "../utils.js"
import fs from "fs"
import {config} from "../config.js"

export const getTrendingScore = ({number,filter})=>{
    try{
        console.log("loading...")
        fs.rmSync(`/${config.baseFolderPath}`,{recursive:true,force:true})
        trending(filter,config.projectsFilterType).then(async (repos)=>{
            fs.mkdirSync(`/${config.baseFolderPath}`)                        
            const reposSecurityCheckPromises = repos.slice(0,number || repos.length).map(async (currRepo)=>{
                    await repoDownloader(currRepo.author,currRepo.name)
                    const promiseExec = util.promisify(exec)
                    const nestedDirName = fs.readdirSync(`/${config.baseFolderPath}/${currRepo.name}`)[0]
                    console.log(nestedDirName)
                    await promiseExec(`dependency-check /${config.baseFolderPath}/${currRepo.name}/${nestedDirName}/package.json --unused --verbose`).then((stdout,stderr)=>{
                        console.log({...currRepo,saftyCheck:stdout})
                    }).catch(err=>{
                        console.log({...currRepo,saftyCheck:err.stderr})
                    })            
            })
            await Promise.allSettled(reposSecurityCheckPromises)
            fs.rmSync(`/${config.baseFolderPath}`,{recursive:true,force:true})
        })

    }
    catch(err){
        console.log(error)
    }
}