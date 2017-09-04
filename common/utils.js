const path = require('path')

function resolve(_path) {
    return path.resolve(process.cwd(), _path)
}

module.exports = {
    resolve: resolve
}