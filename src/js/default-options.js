/**
 * storelocatorjs default options
 * @module storelocatorjs/defaultOptions
 */
export default {
	apiKey: '',
	webServiceUrl: '',
	cluster: {
		status: false
	},
	debug: false,
	geolocation: {
		startOnLoad: false,
		status: true
	},
	map: {
		options: {
			center: [46.227638, 2.213749],
			zoom: 6
		}
	},
	requests: {
		searchRadius: 50,
		storesLimit: 20
	},
	markersUpdate: {
		limitInViewport: 30,
		maxRadius: 150,
		status: true,
		stepRadius: 50
	}
}
