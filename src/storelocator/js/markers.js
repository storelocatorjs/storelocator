export default class Markers {
	constructor () {
		this.markers = []
	}

	destroyMarkers () {
		// Destroy all maskers references in cluster is enabled
		if (typeof MarkerClusterer !== 'undefined') {
			if (this.options.cluster.status) {
				this.markerCluster.clearMarkers()
			}
		}

		// Loop backwards on markers and remove them
		for (let i = this.markers.length - 1; i >= 0; i--) {
			let currentMarker = this.markers[i]

			// Remove listener from marker instance
			window.google.maps.event.clearInstanceListeners(currentMarker)

			// Remove the marker
			currentMarker.setMap(null)
		}

		this.markers = []
	}

	createMarkers (data) {
		// Build marker
		let options = {
			position: data.position,
			map: this.map,
			optimized: true,
			label: {
				text: (data.index + 1).toString(),
				fontFamily: 'Roboto, Arial, sans-serif',
				fontSize: '13px',
				fontWeight: '500',
				color: '#fff'
			}
		}

		// Disable SVG for IE, they don't works
		if (!this.isBrowserIE) {
			options.icon = this.options.map.markers.styles.length ? this.getIconMarkerByCategory(data.category) : ''
		}

		let marker = new window.google.maps.Marker(options)

		// Push marker data in marker
		marker.store = data

		this.markers.push(marker)

		// Click on marker to show infoWindow
		window.google.maps.event.addListener(marker, 'click', () => {
			this.infoWindowOpened = true
			this.openInfoWindow(marker)
		})
	}
}
