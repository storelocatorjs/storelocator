import '../../dist/storelocator.css'
import '../../dist/map/maplibre.css'
import Storelocatorjs from '../../dist/storelocator.js'
import MapLibre from '../../dist/map/maplibre.js'
import credentials from '../credentials.json'

/* eslint-disable no-unused-vars */
const storelocator = new Storelocatorjs({
	target: document.querySelector('#app'),
	api: {
		url: 'https://storelocatorjs-functions.vercel.app'
	},
	map: {
		provider: MapLibre,
		options: {
			style: `https://api.jawg.io/styles/jawg-sunny.json?access-token=${credentials.JAWG_TOKEN}`
		}
	},
	geocoder: {
		provider: 'mapbox',
		token: credentials.MAPBOX_TOKEN
	},
	onReady: (map) => {
		console.log('onReady', map)
	}
})
