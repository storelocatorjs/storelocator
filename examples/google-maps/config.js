import '../../dist/storelocator.css'
import Storelocator from '../../dist/storelocator.js'
import GoogleMaps from '../../dist/providers/google-maps.js'
import credentials from '../credentials.json'

Storelocator.registerProvider('google-maps', GoogleMaps, {
	apiKey: credentials.GOOGLE_MAPS_API_KEY
})

/* eslint-disable no-unused-vars */
const myStorelocator = new Storelocator({
	target: document.querySelector('#app'),
	mapBoxToken: credentials.MAPBOX_TOKEN,
	options: {
		webServiceUrl: 'https://storelocatorjs-functions.vercel.app',
		debug: true
	},
	provider: 'google-maps',
	onReady: (map) => {
		console.log('onReady', map)
	}
})
