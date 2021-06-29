module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/coco-graduation/' : '/',
  chainWebpack: config => {
    config.module
      .rule('csv')
      .test(/\.csv$/)
      .use('csv-loader')
      .loader('csv-loader')
      .options({
        dynamicTyping: true,
        header: true,
        skipEmptyLines: true
      })
      .end()
  }
}
