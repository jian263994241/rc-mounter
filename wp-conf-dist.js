const path = require('path');

module.exports = {
  entry:  './src/index.js',
  output:{
    path: path.resolve(__dirname, 'dist'),
    filename: 'rc-mounter.js',
    libraryExport: "default" ,
    libraryTarget: "amd"
  },
  module: {
    rules: [
      webpack.preset.babelRule()
    ]
  },
  externals: ['react', 'react-dom', 'prop-types'],
  plugins: [
    new webpack.CleanWebpackPlugin(['dist'])
  ]
}
