import '../../dist/storelocator.css'
import Storelocator from '../../dist/storelocator.js'
import GoogleMaps from '../../src/js/providers/google-maps/google-maps'
import credentials from '../credentials.json'

Storelocator.registerProvider('google-maps', GoogleMaps, {
	apiKey: credentials.GOOGLE_MAPS_API_KEY,
	libraries: ['places']
})

/* eslint-disable no-unused-vars */
const myStorelocator = new Storelocator({
	options: {
		webServiceUrl: 'https://storelocatorjs-functions.vercel.app',
		debug: true
	},
	provider: 'google-maps',
	onReady: (map) => {
		console.log('onReady', map)
	}
})
