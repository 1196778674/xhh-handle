#!/usr/bin/env node
const { Command } = require('commander')
const minimist = require('minimist')
const chalk = require('chalk')
const package = require('../package.json')
const { create } = require('./create')

// 获取package.version
const { version } = package
const { log } = console
const program = new Command()

// 定义当前版本
program.version(`xhh: ${version}`, '-v, --version', 'output the current xhh version')

// 定义创建项目的create命令
program
    .command('create <app-name>')
    .alias('c')
    .description('Create a new xhh project.')
    .option('-f, --force', 'Overwrite target directory if it exists')
    .action((name, options) => {
        if (minimist(process.argv.slice(3))._.length > 1) {
            const info = `Info: You provided more than one argument. The first one will be used as the app's name, the rest are ignored. `;
            log(chalk.yellow(info));
        }

        create(name, options);
    });

// 解析运行参数(必须且要放在最后一行)
program.parse(process.argv)
