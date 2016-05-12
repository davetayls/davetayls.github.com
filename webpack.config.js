var autoprefixer = require('autoprefixer');
var postcssImport = require('postcss-import');
var postcssBEM = require('postcss-bem');
var postcssVars = require('postcss-simple-vars');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src',
  output: {
    path: './bundle',
    filename: 'index.js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
      }
    ]
  },
  postcss: function(webpack) {
    return [
      postcssImport({ addDependencyTo: webpack }),
      postcssBEM(),
      postcssVars(),
      require('postcss-custom-properties')(),
      require('postcss-custom-media')(),
      autoprefixer
    ];
  },
  plugins: [
    new ExtractTextPlugin('./index.css')
  ]
};
