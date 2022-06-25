#!/usr/bin/env node
import {initNew, InitNewModel} from "../lib/new-init.js";
import yargs, {Arguments} from "yargs";
import {hideBin} from "yargs/helpers";

// TODO: add passing of list of npm packages to install (plus @types if tsc set to true)
yargs(hideBin(process.argv))
    .scriptName('init')
    .command<InitNewModel>(
        'new <root>',
        'initialize a new nodejs project in the root folder',
        (yargs) => {
            yargs
                .positional('root', {describe: 'root folder of the project', type: 'string'})
                .check(({ root }) => {
                    if (root && root.trim()) {
                        return true;
                    } else {
                        throw new Error('Please Provide a valid name for the project');
                    }
                })
                .option('n', {alias: 'npm', describe: 'Initializes NPM configuration', type: 'boolean', default: false})
                .option('g', {alias: 'git', describe: 'Initializes empty git repository', type: 'boolean', default: false})
                .option('t', {alias: 'tsc', describe: 'Initializes typescript configuration', type: 'boolean', default: false})
                .option('j', {alias: 'jest', describe: 'Adds jest for testing', type: 'boolean', default: false})
        },
        (options: Arguments<InitNewModel>) => {
            initNew({ ...options, root: options.root.trim() })
        })
    .demandCommand(1, 1)
    .argv;
