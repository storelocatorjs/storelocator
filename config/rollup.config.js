import { resolve } from 'path'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import svg from 'rollup-plugin-svg'
import postcss from 'rollup-plugin-postcss'
import alias from '@rollup/plugin-alias'
import { terser } from 'rollup-plugin-terser'
import commonjs from '@rollup/plugin-commonjs'
import { banner, mapProviders } from './package'

const isProduction = process.env.ENV === 'production'
const outputDirectory = resolve(__dirname, '../dist')

const createConfig = ({ input, outputFile }) => {
	return {
		input,
		output: [
			{
				banner,
				file: `${outputDirectory}/${outputFile}`,
				format: 'es'
			}
		],
		plugins: [
			commonjs(),
			nodeResolve({ browser: true }),
			svg(),
			postcss({
				config: {
					path: resolve(__dirname, 'postcss.config.js')
				},
				extract: true,
				minimize: isProduction
			}),
			alias({
				entries: [
					{ find: 'core', replacement: resolve('src/core') },
					{ find: 'shared', replacement: resolve('src/shared') },
					{ find: 'components', replacement: resolve('src/components') },
					{ find: 'map', replacement: resolve('src/map') },
					{ find: 'geocoder', replacement: resolve('src/geocoder') }
				]
			}),
			...(isProduction ? [terser()] : [])
		]
	}
}

export default [
	...mapProviders.map((name) =>
		createConfig({
			input: `./src/map/${name}/${name}.js`,
			outputFile: `map/${name}.js`
		})
	),
	createConfig({
		input: `./src/core/storelocator.js`,
		outputFile: `storelocator.js`
	})
]
