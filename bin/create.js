const validateNpmPackageName = require('validate-npm-package-name')
const path = require('path')
const execa = require('execa')
const fs = require('fs-extra')
const chalk = require('chalk')
const { log } = console

const logInfos = (infos, dim) => {
    if (!infos) return

    infos.forEach((msg) => {
        const str = dim ? chalk.cyan.dim(dim, msg) : chalk.cyan(msg)
        console.log(str)
    })
}

const installDependencies = (targetDir) => {
    const command = 'npm'
    const args = ['install', '--loglevel', 'error']

    return new Promise((resolve, reject) => {
        const child = execa(command, args, {
            cwd: targetDir,
            stdio: ['inherit', 'inherit', 'inherit'],
        })

        child.on('close', (code) => {
            const msg = `${command} ${args.join(' ')}`
            if (code !== 0) reject(new Error(`Command failed: ${msg}`))
            resolve(`Command success: ${msg}`)
        })
    })
}

const emojis = {
    error: '❌',
    recycle: '♻️ ',
    finger: '👉',
    star: '✨',
    warn: '⚠️',
}

const createTemplate = async (sourceDir, targetDir) => {
    fs.copySync(sourceDir, targetDir)
}


const create = async (projectName, options) => {
    const cwd = options.cwd || process.cwd()
    const targetDir = path.resolve(cwd, projectName)
    const sourceDir = path.resolve('./template')
    const result = validateNpmPackageName(projectName)
    
    // 检查包名是否符合命名规范
    if (!result.validForNewPackages) {
        log(chalk.yellow('name is unable'))
        return false
    }
    logInfos([`Creating project: ${projectName} in ${targetDir}`], `\n${emojis.star}`)
    // 创建模板
    await createTemplate(sourceDir, targetDir)
    // 安装依赖
    await installDependencies()
}

module.exports = {
    create
}
