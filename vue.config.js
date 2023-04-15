module.exports = {

    outputDir: "docs",
    devServer: {
        proxy: {
            ['/rest']: {
                target: 'https://d.pcs.baidu.com', //接口域名
                changeOrigin: true,             //是否跨域
                ws: true,                       //是否代理 websockets
                secure: true,                   //是否https接口
                logLevel: 'debug',
                //

            }
        }
    },
    publicPath: './'
};