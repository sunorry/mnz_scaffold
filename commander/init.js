const download = require('download-git-repo')
const ora = require('ora')
const chalk = require('chalk')
const inquirer = require('inquirer')
const path = require('path')

const repo = 'sunorry/vue-tpl'

function run(rawName) {
    downloadAndGenerate(rawName)
}

function downloadAndGenerate(rawName) {
    const spinner = ora('downloading template')
    spinner.start()
    download(repo, path.resolve(process.cwd(), rawName), { clone: false }, function(err) {
        spinner.stop()
        if(err) {
            console.log(`Failed to download repo ${repo} ${err.message.trim()}`)
        }
    })
}

module.exports = {
    run: run
}