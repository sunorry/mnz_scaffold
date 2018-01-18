const download = require('download-git-repo')
const ora = require('ora')
const chalk = require('chalk')
const inquirer = require('inquirer')
const path = require('path')

const repos = {
  vue: 'sunorry/vue-tpl',
  react: 'sunorry/react-tpl'
}

function run (framework, rawName) {
  const repoName = repos[framework]
  if (!repoName) {
    console.log(chalk.yellow(`just support framework vue & react`))
    return
  }
  downloadAndGenerate(repoName, rawName)
}

function downloadAndGenerate (repoName, rawName) {
  const spinner = ora('downloading template')
  spinner.start()
  download(repoName, path.resolve(process.cwd(), rawName), {
    clone: false
  }, function (err) {
    spinner.stop()
    if (err) {
      console.log(`Failed to download repo ${repoName} ${err.message.trim()}`)
      return
    }
    console.log()
    console.log(`   mnz · Generated "${rawName}".`)
    console.log()
    console.log('   To get started:')
    console.log()
    console.log(chalk.magenta(`     cd ${rawName}`))
    console.log(chalk.magenta('     npm install'))
    console.log(chalk.magenta('     sudo mnz server'))
    console.log()
  })
}

module.exports = {
  run: run
}
