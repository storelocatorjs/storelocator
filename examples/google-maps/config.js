import '../../dist/storelocator.css'
import Storelocatorjs from '../../dist/storelocator.js'
import GoogleMaps from '../../dist/map/google-maps.js'
import credentials from '../credentials.json'
import mapStyles from './styles.json'

/* eslint-disable no-unused-vars */
const storelocator = new Storelocatorjs({
	target: document.querySelector('#app'),
	licenseKey: credentials.LEMON_SQUEEZY_LICENSE_KEY,
	api: {
		url: 'https://storelocatorjs-functions.vercel.app'
	},
	map: {
		provider: GoogleMaps,
		token: credentials.GOOGLEMAPS_TOKEN,
		options: {
			styles: mapStyles.styles
		}
	},
	geocoder: {
		provider: 'mapbox',
		token: credentials.MAPBOX_TOKEN
	},
	// templates: {
	// 	popup: ({ feature }) => {
	// 		return `${feature.properties.title}`
	// 	},
	// 	result: ({ feature }) => {
	// 		return `${feature.properties.title}`
	// 	}
	// },
	onReady: (map) => {
		console.log('onReady', map)

		map.on('progress', () => {
			console.log('progress')
		})
		map.on('userPosition', (data) => {
			console.log('userPosition', data)
		})
		map.on('storeFound', () => {
			console.log('storeFound')
		})
		map.on('storeNotFound', () => {
			console.log('storeNotFound')
		})
		map.on('zoomIn', () => {
			console.log('zoomIn')
		})
		map.on('zoomOut', () => {
			console.log('zoomOut')
		})
	}
})
