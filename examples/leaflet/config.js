import '../../dist/storelocator.css'
import '../../dist/map/leaflet.css'
import Storelocatorjs from '../../dist/storelocator.js'
import Leaflet from '../../dist/map/leaflet.js'
import credentials from '../credentials.json'

/* eslint-disable no-unused-vars */
const storelocator = new Storelocatorjs({
	target: document.querySelector('#app'),
	api: {
		url: 'https://storelocatorjs-functions.vercel.app'
	},
	map: {
		provider: Leaflet
	},
	geocoder: {
		provider: 'mapbox',
		token: credentials.MAPBOX_TOKEN
	},
	onReady: (map) => {
		console.log('onReady', map)
	}
})
