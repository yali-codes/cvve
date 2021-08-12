/*
 * @Author: devie.huang
 * @Date: 2021-08-12 13:23:59
 * @LastEditTime: 2021-08-12 18:01:54
 * @LastEditors: Please set LastEditors
 * @Description: 创建工程项目
 * @FilePath: \cvve\lib\create.js
 */
const fs = require('fs-extra')
const path = require('path')
const inquirer = require('inquirer')
const chalk = require('chalk')
const validateProjectName = require('validate-npm-package-name')
const download = require('download-git-repo')
const { exec } = require('child_process')

module.exports = async function create(projectName) {
  const cwd = process.cwd()
  const name = projectName === '.' ? path.relative('../', cwd) : projectName
  const targetDir = path.resolve(cwd, name)

  const result = validateProjectName(name)
  if (!result.validForNewPackages) {
    console.error(chalk.red(`Invalid project name: "${name}"`))

    // 错误处理
    result.errors?.forEach(err => {
      console.error(chalk.red.dim('Error: ' + err))
    })

    // 告警处理
    result.warnings?.forEach(warn => {
      console.error(chalk.red.dim('Warning: ' + warn))
    })

    process.exit(1) // 这里会终止程序执行，类似 return 的作用
  }

  if (!fs.existsSync(targetDir)) {
    const { ok } = await inquirer.prompt([
      {
        name: 'ok',
        type: 'confirm',
        message: `Generate project in current directory?`,
      },
    ])

    if (!ok) return
  } else {
    const { action } = await inquirer.prompt([
      {
        name: 'action',
        type: 'list',
        message: `Target directory ${chalk.red(targetDir)} already exists. Pick an action:`,
        choices: [
          { name: 'Overwrite', value: 'overwrite' },
          { name: 'Merge', value: 'merge' },
          { name: 'Cancel', value: false },
        ],
      },
    ])

    if (!action) return
    if (action === 'overwrite') {
      console.log(`\nRemoving ${chalk.red(targetDir)} ...`)
      await fs.remove(targetDir)
    }
  }

  download('direct:https://github.com/devie2020/vite-electron-vue3.git', targetDir, { clone: true }, err => {
    console.log(err ? err : 'Success')
    if (err) {
      return console.log(err)
    }
    exec(`cd ${targetDir}`)
  })
}
