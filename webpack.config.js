var Webpack = require("webpack");
var ExtractTextPlugin = require('extract-text-webpack-plugin'); 

var extractPlugin = new ExtractTextPlugin({
   filename: '/css/bundle.css' 
});

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
	extractPlugin
  ],
  module: {
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
		}
    ]
  }
};