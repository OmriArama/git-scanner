import axios from "axios"
import fs from "fs"
import extract from "extract-zip"
import {config} from "./config.js"

export const repoDownloader = async (author,repoName)=>{
    const res = await axios.get(`${config.githubApiBaseUrl}/${author}/${repoName}/${config.githubApiFileDownloadType}/`,{headers:{authorization:`Bearer ${config.githubAuthorizationKey}`},responseType:config.gitHubResponseType})
    fs.writeFileSync(`/${config.baseFolderPath}/${repoName}.${config.downloadedFileType}`,res.data)
    await extract(`/${config.baseFolderPath}/${repoName}.${config.downloadedFileType}/`,{dir:`/${config.baseFolderPath}/${repoName}`})
}