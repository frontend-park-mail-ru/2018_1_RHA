/* eslint-disable no-undef */
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlagin = require('copy-webpack-plugin');
module.exports = {
	// devtool: 'source-map',
	entry: './src/index.js',
	output: {
		// path: __dirname + '/public/',
		path: path.join(__dirname, '/public/dist'),
		filename: 'bundle.js',
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
		}),
		new CopyWebpackPlagin([{
			from: path.join(__dirname, 'public', 'sw.js'),
			to: path.join(__dirname, 'public/dist', 'sw.js')
		}])
	]
};