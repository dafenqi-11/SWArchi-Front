module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://39.101.184.149:8088',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
};