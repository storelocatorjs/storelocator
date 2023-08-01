import '../../dist/storelocator.css'
import '../../dist/providers/mapbox.css'
import Storelocator from '../../dist/storelocator.js'
import Mapbox from '../../dist/providers/mapbox.js'
import credentials from '../credentials.json'

Storelocator.registerProvider('mapbox', Mapbox, {
	token: credentials.MAPBOX_TOKEN
})

/* eslint-disable no-unused-vars */
const myStorelocator = new Storelocator({
	target: document.querySelector('#app'),
	mapBoxToken: credentials.MAPBOX_TOKEN,
	options: {
		webServiceUrl: 'https://storelocatorjs-functions.vercel.app',
		debug: true
	},
	provider: 'mapbox',
	onReady: (map) => {
		console.log('onReady', map)
	}
})
