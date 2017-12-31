var Webpack = require("webpack");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var extractPlugin = new ExtractTextPlugin({
   filename: 'bundle.css'
});

module.exports = {
  entry: [__dirname+'/src/script/main.js'],
  output: {
    path: __dirname +'/docs',
    filename: 'bundle.js'
  },
  plugins: [
    new Webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        'root.jQuery': 'jquery'
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    extractPlugin,
    new CleanWebpackPlugin(['dist'])
  ],
  module: {
    loaders: [
        {
            test: require.resolve('sweetalert2'),
            loader: 'imports?window=>{}!exports?window.swal'
        }
    ],
    rules: [
        {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        },
        {
      			test: /\.scss$/,
      			use: extractPlugin.extract({
      			    use: [
      			        'css-loader',
      			        'sass-loader'
      			    ]
      			})
      	},
        {test: /\.png$/, use: 'url-loader?mimetype=image/png'},
    ]
  }
};
