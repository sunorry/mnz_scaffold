const webpack = require('webpack')

function run() {
    const compiler = webpack(require('../config/webpack.build.cfg'))
    compiler.run((err, stats) => {
        if(err) {
            console.log(err)
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
}

module.exports = {
    run: run
}