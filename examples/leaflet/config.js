import '../../src/js/providers/leaflet/leaflet.css'
import '../../dist/storelocator.css'
import Storelocator from '../../dist/storelocator.js'
import Leaflet from '../../src/js/providers/leaflet/leaflet'
import credentials from '../credentials.json'

Storelocator.registerProvider('leaflet', Leaflet, {})

/* eslint-disable no-unused-vars */
const myStorelocator = new Storelocator({
	options: {
		webServiceUrl: 'https://storelocatorjs-functions.vercel.app',
		debug: true
	},
	provider: 'leaflet',
	onReady: (map) => {
		console.log('onReady', map)
	}
})
