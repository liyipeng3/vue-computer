module.exports = {
    publicPath: './',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        /*proxy: {
            '/api':{
                target:'http://wi.lyp123.com/',
                changeOrigin:true,
                pathRewrite:{
                    '/api':''
                }
            }
        }*/
    }
};