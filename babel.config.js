module.exports = function (api) {
	const presets = [
		[
			'@babel/preset-env',
			{
				targets: {
					node: '8.13.0'
				}
			}
		]
	]

	api.cache(true)

	const plugins = [
		'@babel/plugin-transform-modules-commonjs'
	]

	return {
		presets,
		plugins
	}
}
