var webpack = require('webpack');
var path = require('path');
var ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

// variables
var isProduction = process.argv.indexOf('-p') >= 0;
var sourcePath = path.join(__dirname, './src');
var outPath = path.join(__dirname, './dist');

// plugins
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var WebpackCleanupPlugin = require('webpack-cleanup-plugin');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');

var postcssLoader = {
  loader: 'postcss-loader',
  options: {
    ident: 'postcss',
    plugins: [
      require('postcss-import')({ addDependencyTo: webpack, path: ['src'] }),
      require('postcss-url')(),
      require('postcss-extend')(),
      require('postcss-preset-env')({
        stage: 2,
        features: {
          'nesting-rules': true
        },
        browsers: 'last 2 versions',
      }),
      require('postcss-reporter')(),
      require('postcss-browser-reporter')({
        disabled: isProduction
      }),
    ],
  },
};

var plugins = [
  new WebpackCleanupPlugin(),
  new ExtractTextPlugin({
    filename: 'styles.css',
    disable: !isProduction,
  }),
  new HtmlWebpackPlugin({
    template: 'assets/index.html',
  })
];

if (!isProduction) {
  plugins.push(new ForkTsCheckerWebpackPlugin({
    tsconfig: '../tsconfig.json',
    tslint: '../tslint.json',
    reportFiles: ['src/**/*.{ts,tsx}', 'types/*.ts'],
  }));
}

var config = {
  mode: isProduction ? 'production': 'development',
  context: sourcePath,
  entry: {
    main: ['./main.tsx', './main.css'],
  },
  output: {
    path: outPath,
    filename: 'bundle.js',
    chunkFilename: '[chunkhash].js',
    publicPath: '/',
  },
  target: 'web',
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    // Fix webpack's default behavior to not load packages with jsnext:main module
    // (jsnext:main directs not usually distributable es6 format, but es6 sources)
    mainFields: ['module', 'browser', 'main'],
    alias: {
      'app': path.resolve(__dirname, 'src/app/'),
    },
  },
  module: {
    rules: [
      // .ts, .tsx
      {
        test: /\.tsx?$/,
        use: isProduction ? 'ts-loader' : [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              babelrc: false,
              presets: [
                [
                  '@babel/preset-env',
                  { useBuiltIns: 'usage', targets: { browsers: 'last 2 versions' } },
                ],
                '@babel/preset-typescript',
                '@babel/preset-react',
              ],
              plugins: [
                ['@babel/plugin-proposal-decorators', { legacy: true }],
                ['@babel/plugin-proposal-class-properties', { loose: true }],
                'react-hot-loader/babel',
              ],
            },
          },
        ],
      },
      // scss/css
      {
        test: /\.(scss|css)$/,
        oneOf: [
          {
            include: [/src/],
            exclude: [/node_modules/],
            use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: [
                {
                  loader: 'css-loader',
                  query: {
                    modules: true,
                    sourceMap: !isProduction,
                    importLoaders: 1,
                    localIdentName: '[local]__[hash:base64:5]'
                  },
                },
                postcssLoader,
              ],
            }),
          },
        ],
      },
      // static assets
      { test: /\.html$/, use: 'html-loader' },
      { test: /\.png$/, use: 'url-loader?limit=10000' },
      { test: /\.jpg$/, use: 'file-loader' },
    ]
  },
  optimization: {
    splitChunks: {
      name: true,
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2,
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          priority: -10,
        },
      },
    },
    runtimeChunk: true,
    minimizer: [
      new UglifyJSPlugin({
        uglifyOptions: {
          compress: false,
          mangle: true
        },
      }),
    ],
  },
  plugins: plugins,
  devServer: {
    contentBase: sourcePath,
    hot: !isProduction,
    inline: true,
    historyApiFallback: {
      disableDotRule: true,
    },
    stats: 'minimal',
  },
  performance: { hints: false },
  devtool: isProduction ? false : 'cheap-module-eval-source-map',
  node: {
    // workaround for webpack-dev-server issue
    // https://github.com/webpack/webpack-dev-server/issues/60#issuecomment-103411179
    fs: 'empty',
    net: 'empty'
  }
};

module.exports = config;
