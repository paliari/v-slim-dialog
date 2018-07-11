module.exports = {
  entry: {
    'v-dialog': './src/index.js'
  },
  cleanOutDir: true,
  format: 'cjs',
  moduleName: 'iPetUtils',
  output: {
    filename: '[name].js',
    path: __dirname + '/dist'
  }
}
