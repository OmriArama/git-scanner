#! /usr/bin/env node

import { program } from "commander";
import {getTrendingScore} from "./commands/trendingActions.js";

program
    .command('check-github')
    .description('check github trending javascript projects')
    .option("-n, --number <number>","set the limit of the top n trending projects")
    .option("-f, --filter <filter>","github by daily | weekly | monthly","monthly")
    .action(getTrendingScore)



program.parse()

