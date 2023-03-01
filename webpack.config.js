// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');

const isProduction = process.env.NODE_ENV == 'production';

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: 'babel-loader'
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset'
      }

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ]
  },
  resolve: {
    fallback: {
      "path": false,
      "stream": false,
      "util": false,
      "zlib": false,
      "os": false,
      "vm": false,
      "assert": false,
      "crypto": false,
      "constants": false,
      "querystring": false,
      "url": false,
      "https": false,
      "http": false,
      "tty": false,
      "async_hooks": false,
      "coffee-script": false,
      "child_process": false,
      "worker_threads": false,
      "fs": false,
      "module": false,
      "dns": false,
      "tls": false,
      "net": false,
      "readline": false
    }
  }
};

module.exports = () => {
  if (isProduction) {
    config.mode = 'production';
  } else {
    config.mode = 'development';
  }
  return config;
};
