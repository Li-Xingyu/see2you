const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,//关闭语法检查
  devServer: {
    proxy: {
        '/socket.io': {
            target: 'http://127.0.0.1:3002', //API服务器的地址
            ws: true, //代理websockets
            changeOrigin: true, // 虚拟的站点需要更管origin
            pathRewrite: { //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
                '^/': ''
            }
            
        },
        '/cats': {
          target: 'http://127.0.0.1:3000', //API服务器的地址
          ws: true, //代理websockets
          changeOrigin: true, // 虚拟的站点需要更管origin
          pathRewrite: { //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
              '^/': ''
          }
          
      },
    },
}
})
