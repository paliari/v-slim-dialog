module.exports = {
  entry: {
    'v-slim-dialog': './src/index.js'
  },
  cleanOutDir: true,
  format: 'cjs',
  moduleName: 'vSlimDialog',
  output: {
    filename: '[name].js',
    path: __dirname + '/dist'
  }
}
