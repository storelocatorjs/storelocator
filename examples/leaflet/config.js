import '../../dist/storelocator.css'
import '../../dist/providers/leaflet.css'
import Storelocator from '../../dist/storelocator.js'
import Leaflet from '../../dist/providers/leaflet.js'
import credentials from '../credentials.json'

Storelocator.registerProvider('leaflet', Leaflet, {})

/* eslint-disable no-unused-vars */
const myStorelocator = new Storelocator({
	target: document.querySelector('#app'),
	mapBoxToken: credentials.MAPBOX_TOKEN,
	options: {
		webServiceUrl: 'https://storelocatorjs-functions.vercel.app',
		debug: true
	},
	provider: 'leaflet',

	onReady: (map) => {
		console.log('onReady', map)
	}
})
