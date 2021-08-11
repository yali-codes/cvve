#!/usr/bin/env node
const commander = require('commander')

process.env.NODE_PATH = __dirname + '/../node_modules/'

const { program } = commander

program.version(require('../package').version, '-v, --version')
program.usage('<command>')

commander.option('-n, --name[val]', '打印名称', function (val) {
  console.log(val, '000000')
  return val
})

program
  .command('add')
  .description('Add a new template')
  .alias('a')
  .action(() => {
    require('../command/add')()
  })

program
  .command('list')
  .description('List all the templates')
  .alias('l')
  .action(() => {
    require('../command/list')()
  })

program
  .command('init')
  .description('Generate a new project')
  .alias('i')
  .action(() => {
    require('../command/init')()
  })

program
  .command('delete')
  .description('Delete a template')
  .alias('d')
  .action(() => {
    require('../command/delete')()
  })

program.parse(process.argv)

if (!program.args.length) {
  program.help()
}
