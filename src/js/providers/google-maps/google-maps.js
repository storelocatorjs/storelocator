import { extend } from '../../utils'
import markerSvg from '../../../svg/marker.svg'

export default function GoogleMapsProvider(Map, options) {
	const providerObjectName = 'google'
	window.StorelocatorjsGoogleMapsQueue = window.StorelocatorjsGoogleMapsQueue || []

	// Load the player API if it is not available
	if (typeof window[providerObjectName] === 'undefined') {
		const script = document.createElement('script')
		script.async = true
		script.type = 'text/javascript'
		script.src = `https://maps.googleapis.com/maps/api/js?key=${options.apiKey}&callback=window.googleMapLoaded`

		if (options.libraries) {
			script.src += `&libraries=${options.libraries.join(',')}`
		}

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

			this.currentInfoWindow = null
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

				const googleMapsCanvas = document.querySelector('#storelocator-googleMapsCanvas')
				this.instance = new window.google.maps.Map(googleMapsCanvas, mapOptions)

				resolve()
			})
		}

		initAutocomplete() {
			const autocomplete = new window.google.maps.places.Autocomplete(this.inputSearch, {})
			autocomplete.bindTo('bounds', this.instance)
			autocomplete.addListener('place_changed', () => {
				const { geometry, name } = autocomplete.getPlace()

				if (geometry) {
					this.autocompleteSelection({
						lat: geometry.location.lat(),
						lng: geometry.location.lng()
					})
				} else {
					new window.google.maps.Geocoder().geocode(
						{
							address: name
						},
						(results, status) => {
							if (status === window.google.maps.GeocoderStatus.OK) {
								const {
									geometry: { location }
								} = results[0]
								this.autocompleteRequest({
									lat: location.lat(),
									lng: location.lng()
								})
							}
						}
					)
				}
			})
		}

		getInstance() {
			return this.instance
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

		createMarker({ feature }) {
			const marker = new window.google.maps.Marker({
				position: feature.position,
				map: this.instance,
				icon: {
					url: 'data:image/svg+xml;base64,' + btoa(markerSvg),
					scaledSize: new window.google.maps.Size(30, 40)
				},
				properties: feature?.properties
			})

			window.google.maps.event.addListener(marker, 'click', this.onClickOnMarker)

			return marker
		}

		removeMarker(marker) {
			window.google.maps.event.clearInstanceListeners(marker)
			marker.setMap(null)
		}

		openPopup({ template, marker }) {
			const infoWindow = new window.google.maps.InfoWindow()
			infoWindow.setContent(template)

			if (this.currentInfoWindow !== null) {
				this.currentInfoWindow.close()
			}

			this.currentInfoWindow = infoWindow

			infoWindow.open(this.instance, marker)
		}

		createOverlay({ boundsGlobal, boundsWithLimit }) {
			// if (this.overlayGlobal !== null) {
			// 	this.overlayGlobal.setMap(null)
			// }
			const overlayGlobal = new window.google.maps.Rectangle({
				bounds: boundsGlobal,
				strokeColor: null,
				strokeOpacity: 0,
				fillColor: '#ff0000',
				fillOpacity: 0.35,
				map: this.instance
			})

			// if (this.overlayLimit !== null) {
			// 	this.overlayLimit.setMap(null)
			// }
			const overlayWithLimit = new window.google.maps.Rectangle({
				bounds: boundsWithLimit,
				strokeColor: null,
				strokeOpacity: 0,
				fillColor: '#54ff00',
				fillOpacity: 0.35,
				map: this.instance
			})
		}

		resize() {
			window.google.maps.event.trigger(this.instance, 'resize')
		}

		destroy() {}
	}
}
