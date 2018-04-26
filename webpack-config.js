/* eslint-disable no-undef */
const path = require('path');
require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: './public/index.js',
	output: {
		path: path.join(__dirname, 'build'),
		filename: 'bundle.js',
		publicPath: '/build/'
	},
	module: {
		rules: [
			{
				test: /\.js/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['env']
						}
					}
				]
			},
			{
				test: /\.css$/,
				// use: ExtractTextPlugin.extract(
				// 	{
				// 		fallback: 'style-loader',
				// 		use: ['css-loader']
				// 	}
				// )
				loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
			},
			{
				test: /\.pug$/,
				use: 'pug-loader'
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
				use: 'file-loader'
			},
		]
	},
	resolve: {
		extensions: ['.js', '.css', '.pug'],
	},
	plugins: [
		new ExtractTextPlugin('bundle.css')
	]
};