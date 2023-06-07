const path = require('path');

module.exports = {
  mode: 'production',
  entry: './scraping.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'scraping.browser.js',
    library: 'Scraping',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
};
