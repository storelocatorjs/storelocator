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
		status: true
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
				svg: '<svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="0 0 384 512"><path d="M168.3 499.2C116.1 435 0 279.4 0 192 0 85.96 85.96 0 192 0c106 0 192 85.96 192 192 0 87.4-117 243-168.3 307.2-12.3 15.3-35.1 15.3-47.4 0zM192 256c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64z" fill="#000"/></svg>'
			},
			geolocation: {
				svg: '<svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="0 0 384 512"><path d="M168.3 499.2C116.1 435 0 279.4 0 192 0 85.96 85.96 0 192 0c106 0 192 85.96 192 192 0 87.4-117 243-168.3 307.2-12.3 15.3-35.1 15.3-47.4 0zM192 256c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64z" fill="#33ccff"/></svg>'
			}
		}
	},
	requests: {
		searchRadius: 50,
		storesLimit: 0
	},
	markersUpdate: {
		limitInViewport: 30,
		maxRadius: 150,
		status: true,
		stepRadius: 50
	}
}
