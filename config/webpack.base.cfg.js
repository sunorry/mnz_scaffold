const fs = require('fs')
const path = require('path')

const projectCfgPath = path.resolve(process.cwd(), 'config.js')
let projectCfg = {}

if(fs.existsSync(projectCfgPath)) {
    projectCfg = require(projectCfgPath)
}
console.log(projectCfg)

module.exports = {

}