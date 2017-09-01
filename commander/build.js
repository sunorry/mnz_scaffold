const webpack = require('webpack')

function run() {
    const compiler = webpack(require('../config/webpack.build.cfg'))
    compiler.run((err, stats) => {
        if(err) {
            console.log(err)
            return            
        }

        console.log(stats.toString({
            chunks: false,
            colors: true
        }))
    })
}

module.exports = {
    run: run
}