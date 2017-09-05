const program = require('commander')
const http = require('http')
const https = require('https')
const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const express = require('express')
const chalk = require('chalk')
const CFG = require('../common/resolveCfg')

const app = express()

app.use(CFG['staticPath'], express.static(path.resolve(process.cwd(), 'dist')))

app.use((req, res, next) => {
    const url = path.join(process.cwd(), '../', req.url)
    if(fs.existsSync(url)) {
        res.redirect('http://localhost' + req.url)
    }
    next()
})

function run(isHttps) {
    const server = http.createServer(app).listen(80, function() {
        console.log()
        console.log(chalk.yellow(CFG.openUrl))
        console.log()
    })

    server.on('error', e => {
        if (e.code === 'EADDRINUSE') {
            console.log(chalk.red('[ERROR]: 端口 80 已经被占用, 请关闭占用该端口的程序或者使用其它端口.'));
        }
        if (e.code === 'EACCES') {
            console.log(chalk.red('[ERROR]: 权限不足, 请使用sudo执行.'));
        }
        process.exit(1);
    })

    /*
     * For https server
     */

    // https.createServer(httpsOptions, app).listen(443, function() {
    //     console.log(CFG.openUrl)
    // })
    // app.listen(80, () => {
    //     console.log(CFG.openUrl)
    // })
}

process.nextTick(() => {
    const compiler = webpack(require('../config/webpack.server.cfg.js'))
    compiler.watch({},(err, stats) => {
        if (err) {
            console.error(err.stack || err);
            if (err.details) {
              console.error(err.details);
            }
            return
        }
        console.log(stats.toString({
            chunks: false, // Makes the build much quieter
            colors: true, // Shows colors in the console
            children: false,
            modules: false,
            depth: false
        }))
    })
})

module.exports = {
    run: run
}