const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = (req, res) => {
  let target = ''

  // 代理目标地址
  // 这里使用 backend 主要用于区分 vercel serverless 的 api 路径
  if (req.url.startsWith('/api')) {
    target = 'https://linkshareserverpro.vercel.app'
  }

  // if (req.url.startsWith('/')) {
  //   target = 'https://linkshareserverpro.vercel.app'
  // }

  // 创建代理对象并转发请求
  createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: {
      '^/api/': '/'
    }
  })(req, res)
}