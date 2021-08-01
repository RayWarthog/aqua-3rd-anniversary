module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/aqua-3rd-anniversary/' : '/',
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
        args[0].title = '湊あくあ 3周年記念プロジェクト Minato Aqua 3rd anniversary project'
        args[0].description = 'Aqua congrats on your 3st ah we mean 3rd anniversary!!'
        args[0].image = 'https://raywarthog.github.io/aqua-3rd-anniversary/cover.jpg'
        return args
      })
  }
}
