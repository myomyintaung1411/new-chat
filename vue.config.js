// module.exports = {
//     lintOnSave: false,
//     publicPath: "./",
//     productionSourceMap: false,
// }

'use strict'
const UglifyPlugin = require('uglifyjs-webpack-plugin')
module.exports = {

    publicPath: './',
    outputDir: 'dist',
    assetsDir: 'static',
    lintOnSave: process.env.NODE_ENV === 'development',
    productionSourceMap: false,
    configureWebpack: config => {
        if (process.env.NODE_ENV == 'production') {
            // 为生产环境修改配置
            config.mode = 'production'
            // 将每个依赖包打包成单独的js文件
            let optimization = {
                minimizer: [new UglifyPlugin({
                    uglifyOptions: {
                        warnings: false,
                        compress: {
                            drop_console: true,
                            drop_debugger: false,
                            pure_funcs: ['console.log']
                        }
                    }
                })]
            }
            Object.assign(config, {
                optimization
            })
        } else {
            // 为开发环境修改配置
            config.mode = 'development'
        }
    },
    // devServer: {
    //     proxy: {
    //         '/ceshi:': {
    //             target: 'https://tysq666.cn/conn1',
    //             changeOrigin: true,
    //             pathRewrite: {
    //                 '^/ceshi': ''
    //             }
    //         }
    //     }
    // }
    devServer: {
        open: true,
        https: false,
        hot:true,
        proxy: {
          '/www': {
            //target: 'https://asdqwe.co/conn1/',
            target: 'http://134.122.133.18:9998/',
            ws: true,
            changOrigin: true,
            pathRewrite: {
              '^/www': ''
            }
          }
        },
      }
}