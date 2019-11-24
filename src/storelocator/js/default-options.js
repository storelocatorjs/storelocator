export default {
	apiKey: '', // {String} mandatory parameter
	urlWebservice: '', // {String}
	debug: false, // {Bool}
	breakpointMobile: '767px', // {String}

	cluster: {
		status: true, // {Bool}
		options: {
			gridSize: 50, // {Int}
			maxZoom: 13, // {Int}
			imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
			zoomOnClick: true, // {Bool}
			averageCenter: true, // {Bool}
			minimumClusterSize: 2, // {Int}
			styles: [] // {Array}
		}
	},

	geolocation: {
		status: true, // {Bool}
		startOnLoad: false // {Bool}
	},

	updateMarkerOnBoundsChanged: {
		status: true, // {Bool}
		maxMarkersInViewportLimit: 30, // {Int}
		stepRadius: 50, // {Int} in kilometers
		maxRadius: 150 // {Int} in kilometers
	},

	requests: {
		searchRadius: 50, // {Int} in kilometers
		storeLimit: 20 // {Int}
	},

	map: {
		options: {
			center: [46.227638, 2.213749], // {Array} latitude and longitude
			mapTypeId: 'roadmap', // {String}
			zoom: 6, // {Int}
			scrollwheel: true, // {Bool}
			disableDefaultUI: false, // {Bool}
			mapTypeControl: false, // {Bool}
			streetViewControl: false, // {Bool}
			scaleControl: false, // {Bool}
			fullscreenControl: true, // {Bool}
			styles: [] // {Array}
		},
		markers: {
			width: 30, // {Int} in pixel
			height: 40, // {Int} in pixel
			styles: [{
				category: 'userPosition', // {String}
				colorBackground: '#4285f4', // {String}
				colorBorder: '#4285f4' // {String}
			}]
		}
	},

	selectors: {
		container: '.storelocator', // {String}
		loader: '.storelocator-loader', // {String}
		mapGeoloc: '.storelocator-geolocButton', // {String}
		mapAside: '.storelocator-sidebar', // {String}
		formSearch: '.storelocator-formSearch', // {String}
		inputSearch: '.storelocator-inputSearch', // {String}
		filtersSearch: '.filter-map-js', // {String}
		asideResults: '.storelocator-sidebarResults' // {String}
	}
}
