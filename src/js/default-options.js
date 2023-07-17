/**
 * storelocatorjs default options
 * @module storelocatorjs/defaultOptions
 */
export default {
	apiKey: '',
	webServiceUrl: '',
	cluster: {
		options: {
			averageCenter: true,
			gridSize: 50,
			imagePath:
				'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
			maxZoom: 13,
			minimumClusterSize: 2,
			styles: [],
			zoomOnClick: true
		},
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
			disableDefaultUI: false,
			fullscreenControl: true,
			mapTypeControl: false,
			mapTypeId: 'roadmap',
			scaleControl: false,
			scrollwheel: true,
			streetViewControl: false,
			styles: [],
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
