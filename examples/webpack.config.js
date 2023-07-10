const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath)

module.exports = (env, argv) => {
	const isProduction = argv.mode === 'production'

	const config = {
		context: appDirectory,
		entry: {
			home: resolveApp('examples/home/config.js'),
			'usage-basic': resolveApp('examples/usage-basic/config.js'),
			'usage-with-callback': resolveApp('examples/usage-with-callback/config.js'),
			'usage-with-categories': resolveApp('examples/usage-with-categories/config.js'),
			'usage-with-clusters': resolveApp('examples/usage-with-clusters/config.js'),
			'usage-with-map-styles': resolveApp('examples/usage-with-map-styles/config.js')
		},
		watchOptions: {
			ignored: /node_modules/
		},
		devtool: isProduction ? false : 'source-map',
		output: {
			path: resolveApp('examples/dist'),
			filename: 'scripts/[name].js'
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					include: [resolveApp('examples'), resolveApp('dist')],
					use: [
						{
							loader: 'babel-loader',
							options: {
								configFile: resolveApp('config/babel.config.js')
							}
						}
					]
				},
				{
					test: /\.css$/,
					include: [resolveApp('examples'), resolveApp('dist')],
					use: [
						MiniCssExtractPlugin.loader,
						{
							loader: 'css-loader'
						},
						{
							loader: 'postcss-loader',
							options: {
								postcssOptions: {
									config: resolveApp('config/postcss.config.js')
								}
							}
						}
					]
				},
				{
					test: /\.svg$/,
					loader: 'svg-inline-loader'
				}
			]
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: 'styles/[name].css',
				chunkFilename: 'styles/[name].css'
			}),
			new webpack.optimize.ModuleConcatenationPlugin(),
			new HtmlWebpackPlugin({
				filename: 'index.html',
				template: resolveApp('examples/home/index.html'),
				chunks: ['home']
			}),
			new HtmlWebpackPlugin({
				filename: 'usage-basic/index.html',
				template: resolveApp('examples/usage-basic/index.html'),
				chunks: ['usage-basic'],
				publicPath: '../'
			}),
			new HtmlWebpackPlugin({
				filename: 'usage-with-callback/index.html',
				template: resolveApp('examples/usage-with-callback/index.html'),
				chunks: ['usage-with-callback'],
				publicPath: '../'
			}),
			new HtmlWebpackPlugin({
				filename: 'usage-with-categories/index.html',
				template: resolveApp('examples/usage-with-categories/index.html'),
				chunks: ['usage-with-categories'],
				publicPath: '../'
			}),
			new HtmlWebpackPlugin({
				filename: 'usage-with-clusters/index.html',
				template: resolveApp('examples/usage-with-clusters/index.html'),
				chunks: ['usage-with-clusters'],
				publicPath: '../'
			}),
			new HtmlWebpackPlugin({
				filename: 'usage-with-map-styles/index.html',
				template: resolveApp('examples/usage-with-map-styles/index.html'),
				chunks: ['usage-with-map-styles'],
				publicPath: '../'
			})
		],
		stats: {
			assets: true,
			colors: true,
			hash: false,
			timings: true,
			chunks: false,
			chunkModules: false,
			modules: false,
			children: false,
			entrypoints: false,
			excludeAssets: /.map$/,
			assetsSort: '!size'
		},
		optimization: {
			minimizer: [
				new TerserPlugin({
					extractComments: false,
					parallel: true,
					terserOptions: {
						compress: {
							// Drop console.log|console.info|console.debug
							// Keep console.warn|console.error
							pure_funcs: ['console.log', 'console.info', 'console.debug']
						}
					}
				}),
				new CssMinimizerPlugin()
			],
			chunkIds: 'deterministic', // or 'named'
			removeAvailableModules: true,
			removeEmptyChunks: true,
			mergeDuplicateChunks: true,
			providedExports: false,
			splitChunks: false
		}
	}

	if (!isProduction) {
		config.plugins.push(new webpack.ProgressPlugin())
		config.devServer = {
			static: {
				directory: resolveApp('examples')
			},
			historyApiFallback: true,
			port: 3000,
			compress: true,
			hot: true
		}
	}

	return config
}
