/*
 * @Author: devie.huang
 * @Date: 2021-08-12 13:27:41
 * @LastEditTime: 2021-08-12 14:48:52
 * @LastEditors: Please set LastEditors
 * @Description: 工具方法
 * @FilePath: \cvve\utils\index.js
 */

function cleanArgs(cmd) {
  const args = {}
  cmd.options?.forEach(o => {
    const key = camelize(o.long.replace(/^--/, ''))
    // if an option is not present and Command has a method with the same name
    // it should not be copied
    if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
      args[key] = cmd[key]
    }
  })
  return args
}

module.exports = {
  cleanArgs,
}
