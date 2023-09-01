import fs from 'fs'
import path from 'path'
import webpack from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath)

export default function webpackConfig(env, argv) {
	const isProduction = argv.mode === 'production'

	const config = {
		context: appDirectory,
		entry: {
			home: resolveApp('examples/home/config.js'),
			'google-maps': resolveApp('examples/google-maps/config.js'),
			leaflet: resolveApp('examples/leaflet/config.js'),
			mapbox: resolveApp('examples/mapbox/config.js'),
			maplibre: resolveApp('examples/maplibre/config.js')
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
					include: [resolveApp('examples'), resolveApp('dist')]
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
									config: resolveApp('config/postcss.config.cjs')
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
				filename: 'google-maps/index.html',
				template: resolveApp('examples/google-maps/index.html'),
				chunks: ['google-maps'],
				publicPath: '../'
			}),
			new HtmlWebpackPlugin({
				filename: 'leaflet/index.html',
				template: resolveApp('examples/leaflet/index.html'),
				chunks: ['leaflet'],
				publicPath: '../'
			}),
			new HtmlWebpackPlugin({
				filename: 'mapbox/index.html',
				template: resolveApp('examples/mapbox/index.html'),
				chunks: ['mapbox'],
				publicPath: '../'
			}),
			new HtmlWebpackPlugin({
				filename: 'maplibre/index.html',
				template: resolveApp('examples/maplibre/index.html'),
				chunks: ['maplibre'],
				publicPath: '../'
			})
		],
		resolve: {
			alias: {
				'images/layers.png$': resolveApp('node_modules/leaflet/dist/images/layers.png'),
				'images/layers-2x.png$': resolveApp(
					'node_modules/leaflet/dist/images/layers-2x.png'
				),
				'images/marker-icon.png$': resolveApp(
					'node_modules/leaflet/dist/images/marker-icon.png'
				),
				'images/marker-icon-2x.png$': resolveApp(
					'node_modules/leaflet/dist/images/marker-icon-2x.png'
				),
				'images/marker-shadow.png$': resolveApp(
					'node_modules/leaflet/dist/images/marker-shadow.png'
				)
			}
		},
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
			hot: true,
			https: true
		}
	}

	return config
}
