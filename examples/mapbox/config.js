import '../../dist/storelocator.css'
import '../../dist/map/mapbox.css'
import Storelocator from '../../dist/storelocator.js'
import Mapbox from '../../dist/map/mapbox.js'
import credentials from '../credentials.json'

/* eslint-disable no-unused-vars */
const myStorelocator = new Storelocator({
	target: document.querySelector('#app'),
	api: {
		url: 'https://storelocatorjs-functions.vercel.app'
	},
	map: {
		provider: Mapbox,
		token: credentials.MAPBOX_TOKEN
	},
	geocoder: {
		provider: 'mapbox',
		token: credentials.MAPBOX_TOKEN
	},
	onReady: (map) => {
		console.log('onReady', map)
	}
})
