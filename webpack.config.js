// original source code from: https://github.com/preboot/angular2-webpack/blob/master/webpack.config.js
// Helper: root() is defined at the bottom
var path = require('path');
var webpack = require('webpack');

// Webpack Plugins
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
var ENV = process.env.npm_lifecycle_event;
var isTestWatch = ENV === 'test-watch';
var isTest = true;
var isProd = false;

module.exports = function makeWebpackConfig() {
  /**
   * Config
   * Reference: http://webpack.github.io/docs/configuration.html
   * This is the object where all configuration gets set
   */
  var config = {};

  /**
   * Devtool
   * Reference: http://webpack.github.io/docs/configuration.html#devtool
   * Type of sourcemap to use per build type
   */
  if (isProd) {
    config.devtool = 'source-map';
  }
  else if (isTest) {
    config.devtool = 'inline-source-map';
  }
  else {
    config.devtool = 'eval-source-map';
  }

  config.entry = {
    'test': './karma-test-shim.js' // our angular app
  };

  /**
   * Output
   * Reference: http://webpack.github.io/docs/configuration.html#output
   */
  config.output = {};

  /**
   * Resolve
   * Reference: http://webpack.github.io/docs/configuration.html#resolve
   */
  config.resolve = {
    // only discover files that have those extensions
    extensions: ['.ts', '.js', '.json', '.css', '.scss', '.html'],
  };

  var atlOptions = '';
  if (isTest && !isTestWatch) {
    // awesome-typescript-loader needs to output inlineSourceMap for code coverage to work with source maps.
    atlOptions = 'inlineSourceMap=true&sourceMap=false';
  }

  /**
   * Loaders
   * Reference: http://webpack.github.io/docs/configuration.html#module-loaders
   * List: http://webpack.github.io/docs/list-of-loaders.html
   * This handles most of the magic responsible for converting modules
   */
  config.module = {
    rules: [
      // Support for .ts files.
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader?' + atlOptions, 'angular2-template-loader'],
        exclude: [isTest ? /\.(e2e)\.ts$/ : /\.(spec|e2e)\.ts$/, /node_modules\/(?!(ng2-.+))/]
      },

      // copy those assets to output
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=fonts/[name].[hash].[ext]?'
      },

      // Support for *.json files.
      {test: /\.json$/, loader: 'json-loader'},

      // Support for CSS as raw text
      // use 'null' loader in test mode (https://github.com/webpack/null-loader)
      // all css in src/style will be bundled in an external css file
      {
        test: /\.css$/,
        exclude: root('src', 'app'),
        loader: isTest ? 'null-loader' : ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader', 'postcss-loader']})
      },
      // all css required in src/app files will be merged in js files
      {test: /\.css$/, include: root('src', 'app'), loader: 'raw-loader!postcss-loader'},

      // support for .scss files
      // use 'null' loader in test mode (https://github.com/webpack/null-loader)
      // all css in src/style will be bundled in an external css file
      {
        test: /\.(scss|sass)$/,
        exclude: root('src', 'app'),
        loader: isTest ? 'null-loader' : ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader', 'postcss-loader', 'sass-loader']})
      },
      // all css required in src/app files will be merged in js files
      {test: /\.(scss|sass)$/, exclude: root('src', 'style'), loader: 'raw-loader!postcss-loader!sass-loader'},

      // support for .html as raw text
      // todo: change the loader to something that adds a hash to images
      {test: /\.html$/, loader: 'raw-loader',  exclude: root('src', 'public')}
    ]
  };

  /**
   * Plugins
   * Reference: http://webpack.github.io/docs/configuration.html#plugins
   * List: http://webpack.github.io/docs/list-of-plugins.html
   */
  config.plugins = [
    // Define env variables to help with builds
    // Reference: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
    new webpack.DefinePlugin({
      // Environment helpers
      'process.env': {
        ENV: JSON.stringify(ENV)
      }
    }),

    // Workaround needed for angular 2 angular/angular#11580
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      root('./src') // location of your src
    )
  ];

  /**
   * Dev server configuration
   * Reference: http://webpack.github.io/docs/configuration.html#devserver
   * Reference: http://webpack.github.io/docs/webpack-dev-server.html
   */
  config.devServer = {
    contentBase: './src/public',
    historyApiFallback: true,
    quiet: true,
    stats: 'minimal' // none (or false), errors-only, minimal, normal (or true) and verbose
  };

  return config;
}();

// Helper functions
function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}