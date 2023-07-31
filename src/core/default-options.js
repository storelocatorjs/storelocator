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
		},
		markers: {
			search: {
				path: 'M168.3 499.2C116.1 435 0 279.4 0 192 0 85.96 85.96 0 192 0c106 0 192 85.96 192 192 0 87.4-117 243-168.3 307.2-12.3 15.3-35.1 15.3-47.4 0zM192 256c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64z',
				fillColor: '#000',
				width: 20,
				height: 10
			},
			geolocation: {
				path: 'M168.3 499.2C116.1 435 0 279.4 0 192 0 85.96 85.96 0 192 0c106 0 192 85.96 192 192 0 87.4-117 243-168.3 307.2-12.3 15.3-35.1 15.3-47.4 0zM192 256c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64z',
				fillColor: '#33ccff',
				width: 20,
				height: 10
			}
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
