module.exports = {
    devServer:{
        proxy:{
            '/api':{
                target: 'http://192.168.50.155:5500/api/',
                ws: true,
                pathRewrite:{
                    '^/api':''
                },
                changeOrigin: true
            }
        }
    }
}