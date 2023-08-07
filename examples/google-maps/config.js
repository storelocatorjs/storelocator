import '../../dist/storelocator.css'
import Storelocator from '../../dist/storelocator.js'
import GoogleMaps from '../../dist/map/google-maps.js'
import credentials from '../credentials.json'

/* eslint-disable no-unused-vars */
const myStorelocator = new Storelocator({
	target: document.querySelector('#app'),
	api: {
		url: 'https://storelocatorjs-functions.vercel.app'
	},
	map: {
		provider: GoogleMaps,
		token: credentials.GOOGLEMAPS_TOKEN
	},
	geocoder: {
		provider: 'googlemaps',
		token: credentials.GOOGLEMAPS_TOKEN
	},
	onReady: (map) => {
		console.log('onReady', map)
	}
})
