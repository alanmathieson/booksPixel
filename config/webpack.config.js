var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	entry: {
		desktopBundle: './src/desktopEntry.js'
	},
	output: {
		path: __dirname + '/../src/',
		publicPath:'/src/',
		filename: '[Name].js'
	},
	devtool: "cheap-module-eval-source-map",
	devServer: {
        inline: true
    },
	//devtool: "inline-source-map",
	module: {
		rules: [
			{
				test: /\.js?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ["@babel/preset-env", "@babel/preset-react"],
					plugins: [
						'babel-plugin-transform-class-properties',
						["@babel/plugin-transform-runtime",
						{
							"regenerator": true
						}]
					]
				}
			},
			{
		        test: /\.css/,
		        loader: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{loader: 'css-loader', options: { importLoaders: 1 } },
						{loader: 'postcss-loader'}
					]
				})
		    }
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify("production"),
			},
		}),
		new ExtractTextPlugin("../css/[name].css")
	],
	stats: {
		colors: true,
		hash: true,
		version: true,
		timings: true,
		assets: true,
		chunks: true,
		modules: true,
		reasons: false,
		children: false,
		source: false,
		errors: true,
		errorDetails: false,
		warnings: true,
		publicPath: false
	},
	mode: 'development'
	// externals: {
    //     '@google-cloud/storage': 'commonjs @google-cloud/storage'
    // }
}
