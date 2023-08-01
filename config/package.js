import { license, name, version, author } from '../package.json'

export const banner =
	'/*!\n' +
	` * @license ${license}\n` +
	` * @name ${name}\n` +
	` * @version ${version}\n` +
	` * @copyright ${new Date().getUTCFullYear()} ${author}\n` +
	' */'

export const providers = ['google-maps', 'leaflet', 'mapbox']
