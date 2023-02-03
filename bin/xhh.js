#!/usr/bin/env node
const { Command } = require('commander')

const package = require('../package.json')

// 获取package.version
const { version } = package
const program = new Command()

// 定义当前版本
program.version(`xhh: ${version}`,'-v, --version', 'output the current xhh version')

// 解析运行参数(必须且要放在最后一行)
program.parse(process.argv)
