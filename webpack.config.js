var Webpack = require("webpack");

module.exports = {
  entry: [__dirname+'/src/script/main.js'],
  output: {
    path: __dirname +'/dist',
    filename: 'bundle.js'
  },
  plugins: [
    new Webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        'root.jQuery': 'jquery'
    }),
  ]
};