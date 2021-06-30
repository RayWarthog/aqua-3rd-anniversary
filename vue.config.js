module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
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
    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'Thank you Coco 会長'
        args[0].description = 'A farewell gift dedicated to Kiryu Coco, our beloved dragon of Hololive'
        args[0].image = 'https://nextme.me/cover.jpg'
        return args
      })
  }
}
