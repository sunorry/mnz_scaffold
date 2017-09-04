const fs = require('fs')
const utils = require('./utils')
const path = require('path')
const url = require('url')

const projectPathArr = process.cwd().split('/')
const projectName = projectPathArr[projectPathArr.length - 1]

const projectCfg = (function getProjectCfg() {
    const projectCfgPath = utils.resolve('config.js')
    return fs.existsSync(projectCfgPath) ? require(projectCfgPath) : {}
})()

const alias = (function getAlias() {
    const cfg = projectCfg['alias']
    if(!cfg) return {}
    const alias = {}
    Object.keys(cfg).forEach(el => {
        alias[el] =  utils.resolve(cfg[el])
    })
    return alias
})()

const publicPath =(function getAlias() {
    const pPath = url.resolve(projectCfg['sourcePath'], `${projectName}/dist`)
    return {
        server: pPath,
        build: pPath
    }
})()

const staticPath = path.join('/', projectName, 'dist') // projectname/dist
const openUrl = `http://localhost/${projectName}/dist`

module.exports = {
    projectCfg,
    alias,
    publicPath,
    staticPath,
    openUrl
}