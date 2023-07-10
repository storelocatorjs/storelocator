module.exports = function (api) {
	const presets = [
		'@babel/preset-env',
		[
			'@babel/preset-react',
			{
				runtime: 'automatic',
				importSource: 'jsx-dom-cjs'
			}
		]
	]

	api.cache(true)

	const plugins = ['@babel/plugin-proposal-class-properties']

	return {
		presets,
		plugins
	}
}
