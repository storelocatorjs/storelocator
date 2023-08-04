import { extend } from 'shared/utils/utils'
import TemplatePopup from 'components/popup/templates/popup.js'
import { MarkerClusterer } from '@googlemaps/markerclusterer'

export default function GoogleMapsProvider(Map, options) {
	const providerObjectName = 'google'
	window.StorelocatorjsGoogleMapsQueue = window.StorelocatorjsGoogleMapsQueue || []

	// Load the player API if it is not available
	if (typeof window[providerObjectName] === 'undefined') {
		const script = document.createElement('script')
		script.async = true
		script.type = 'text/javascript'
		script.src = `https://maps.googleapis.com/maps/api/js?key=${options.apiKey}&callback=window.googleMapLoaded`

		// Run the queue when the provider API is ready
		window.googleMapLoaded = () => {
			window.StorelocatorjsGoogleMapsQueue.forEach((itemClass) => {
				itemClass.initGoogleMaps().then(() => {
					itemClass.onReady()
				})
			})
			window.StorelocatorjsGoogleMapsQueue = []
		}
		document.getElementsByTagName('body')[0].appendChild(script)
	}

	return class MapGoogle extends Map {
		constructor(props) {
			super(props)

			this.currentPopup = null
		}

		init() {
			this.waitUntilApiIsReady().then(() => {
				super.onReady()
			})
		}

		/**
		 * Wait until the API is ready
		 * @returns The player is ready
		 */
		waitUntilApiIsReady() {
			return new window.Promise((resolve) => {
				// Initialize the player if the API is already available
				if (typeof window[providerObjectName] !== 'undefined') {
					this.initGoogleMaps().then(resolve)
				} else {
					window.StorelocatorjsGoogleMapsQueue.push(this)
				}
			})
		}

		/**
		 * Initialize the player
		 */
		initGoogleMaps() {
			return new window.Promise((resolve) => {
				const mapOptions = extend(
					true,
					{
						disableDefaultUI: false,
						fullscreenControl: false,
						mapTypeControl: false,
						mapTypeId: 'roadmap',
						scaleControl: false,
						scrollwheel: true,
						streetViewControl: false,
						styles: [],
						zoom: 6,
						zoomControl: false
					},
					this.Storelocatorjs.options.map.options
				)

				mapOptions.center = this.latLng({
					lat: mapOptions.center[0],
					lng: mapOptions.center[1]
				})

				const googleMapsCanvas = document.querySelector('#storelocator-mapCanvas')
				this.instance = new window.google.maps.Map(googleMapsCanvas, mapOptions)

				resolve()
			})
		}

		createCluster() {
			this.cluster = new MarkerClusterer({ map: this.instance })
			// this.Storelocatorjs.options.cluster.options
		}

		updateCluster() {
			this.cluster?.addMarkers(this.markers)
		}

		clearCluster() {
			this.cluster?.removeMarkers(this.markers)
		}

		getInstance() {
			return this.instance
		}

		getMarkerLatLng(marker) {
			return marker.getPosition()
		}

		panTo(latLng) {
			this.instance.panTo(latLng)
		}

		setZoom(value) {
			this.instance.setZoom(value)
		}

		latLngBounds() {
			return new window.google.maps.LatLngBounds()
		}

		latLngBoundsExtend({ latLngBounds, latLng }) {
			latLngBounds.extend(latLng)
		}

		fitBounds({ latLngBounds }) {
			this.instance.fitBounds(latLngBounds)
		}

		latLng({ lat, lng }) {
			return new window.google.maps.LatLng(lat, lng)
		}

		createMarker({ feature, type }) {
			const svgData = this.options.map.markers[type]
			const marker = new window.google.maps.Marker({
				position: feature.position,
				map: this.instance,
				icon: {
					url: `${'data:image/svg+xml;charset=utf-8,'}${encodeURIComponent(svgData.svg)}`
				}
			})

			marker.feature = feature

			if (type !== 'geolocation') {
				marker.addListener('click', () => {
					this.openPopup(marker)
				})
			}

			return marker
		}

		removeMarker(marker) {
			window.google.maps.event.clearInstanceListeners(marker)
			marker.setMap(null)
		}

		openPopup(marker) {
			const infoWindow = new window.google.maps.InfoWindow()
			infoWindow.setContent(
				TemplatePopup({
					feature: marker.feature
				})
			)

			this.currentPopup && this.currentPopup.close()
			this.currentPopup = infoWindow

			infoWindow.open(this.instance, marker)
		}

		createOverlay({ boundsGlobal }) {
			this.overlayGlobal = new window.google.maps.Rectangle({
				bounds: boundsGlobal,
				strokeColor: null,
				strokeOpacity: 0,
				fillColor: '#54ff00',
				fillOpacity: 0.35,
				map: this.instance
			})
		}

		removeOverlay() {
			this.overlayGlobal && this.overlayGlobal.setMap(null)
		}

		resize() {
			window.google.maps.event.trigger(this.instance, 'resize')
		}

		destroy() {}
	}
}
