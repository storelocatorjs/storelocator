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

				mapOptions.center = new window.google.maps.LatLng(
					mapOptions.center[0],
					mapOptions.center[1]
				)

				const googleMapsCanvas = document.querySelector('#storelocator-googleMapsCanvas')
				this.instance = new window.google.maps.Map(googleMapsCanvas, mapOptions)

				resolve()
			})
		}

		getInstance() {
			return this.instance
		}

		methodGetPosition({ lat, lng }) {
			return new window.google.maps.LatLng(lat, lng)
		}

		/**
		 * Play method of the player
		 */
		methodCreateMarker({ feature }) {
			return new window.google.maps.Marker({
				position: feature.position,
				map: this.instance,
				icon: {
					url: 'data:image/svg+xml;base64,' + btoa(markerSvg),
					scaledSize: new google.maps.Size(30, 40)
				},
				properties: feature.properties
			})
		}

		/**
		 * Pause method of the player
		 */
		methodPause() {}

		/**
		 * Remove the Youtube player (instance, timer)
		 */
		destroy() {}
	}
}
