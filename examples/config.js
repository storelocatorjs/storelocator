import '../dist/storelocator.css'
import Storelocator from '../dist/storelocator.js'

/* eslint-disable no-unused-vars */
const myStorelocator = new Storelocator({
	options: {
		webServiceUrl: 'http://localhost:3001',
		geolocation: {
			startOnLoad: false,
			status: true
		},
		cluster: {
			status: true
		},
		debug: true
	},
	target: document.querySelector('body')
	// onReady: (map) => {
	// 	console.log(map)
	// }
	// templateResult: ({ feature }) => {
	// 	return <div>{feature.properties.title}</div>
	// },
	// templatePopup: ({ feature }) => {
	// 	return <div>{feature.properties.title}</div>
	// }
})
