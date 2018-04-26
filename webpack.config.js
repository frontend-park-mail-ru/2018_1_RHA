/* eslint-disable no-undef */
const path = require('path');
require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
	devtool: 'source-map',
	entry: './src/index.js',
	output: {
		// path: path.join(__dirname, 'build'),
		path: __dirname + '/public',
		filename: './public/bundle.js',
		// publicPath: '/build/'
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
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader'
				]
			},
			{
				test: /\.pug$/,
				loader: 'pug-loader'
			},
			{
				test: /\.(eot|jpg|png|svg|ttf|woff|woff2)(\?\S*)?$/,
				loader: 'file-loader'
			},
		]
	},
	resolve: {
		extensions: ['.js', '.css', '.pug'],
	},
	plugins: [
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// both options are optional
			filename: '[name].css',
			chunkFilename: '[id].css'
		})
	]
};