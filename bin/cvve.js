#!/usr/bin/env node
const { program } = require('commander')
const { cleanArgs } = require('../utils')

program
  .version(`@electron/cli ${require('../package').version}`, '-v, --version')
  .usage('<command> [options]')

// 遍历本地命令配置文件，创建执行命令
program
  .command('create <project-name>')
  .description('create a new project powered by electron-cli')
  .action(name => require('../lib/create')(name))

program.parse(process.argv)
