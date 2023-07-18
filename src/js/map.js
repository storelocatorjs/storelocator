import { extend } from './utils'
import markerSvg from '../svg/marker.svg'
import TemplateResult from './templates/result'
import TemplateInfoWindow from './templates/info-window'

export default class Map {
	constructor({ Storelocatorjs }) {
		this.Storelocatorjs = Storelocatorjs
		this.options = this.Storelocatorjs.options
	}

	/**
	 * Build the player
	 */
	build() {
		this.init()
	}

	/**
	 * init
	 * Extends by the provider
	 */
	init() {
		throw new Error('You have to implement the function "init".')
	}

	/**
	 * waitUntilVideoIsReady
	 * Extends by the provider
	 */
	waitUntilVideoIsReady() {
		throw new Error('You have to implement the function "waitUntilVideoIsReady".')
	}

	/**
	 * getInstance
	 * Extends by the provider
	 */
	getInstance() {
		throw new Error('You have to implement the function "getInstance".')
	}

	methodPlay() {
		throw new Error('You have to implement the function "methodPlay".')
	}

	/**
	 * methodPause
	 * Extends by the provider
	 */
	methodPause() {
		throw new Error('You have to implement the function "methodPause".')
	}

	/**
	 * On the player is ready
	 */
	onReady() {
		console.log('onReady')

		this.container = document.querySelector('.storelocator')
		this.formSearch = this.container.querySelector('.storelocator-formSearch')
		this.inputSearch = this.container.querySelector('.storelocator-inputSearch')
		this.nav = this.container.querySelector('.storelocator-nav')
		this.sidebar = this.container.querySelector('.storelocator-sidebar')
		this.sidebarResults = this.container.querySelector('.storelocator-sidebarResults')
		this.geolocButton = this.container.querySelector('.storelocator-geolocButton')

		this.buildLoader()

		this.initGeolocation()
		this.initMap()
		// 	this.addGoogleMapsEvents()
		this.initAutocomplete()

		this.addEvents()

		// this.Storelocatorjs.onReady instanceof Function &&
		// this.Storelocatorjs.onReady.call(this, this)
	}

	/**
	 * Build the loader
	 */
	buildLoader() {
		this.loader = this.container.querySelector('.storelocator-loader')
		this.loader.innerHTML = `
			<div class="storelocator-loaderBar"></div>
			<div class="storelocator-loaderBar"></div>
			<div class="storelocator-loaderBar"></div>`
	}

	addEvents() {
		// Event listener on sidebar result items
		this.sidebarResults.addEventListener('click', this.onClickSidebarResultItem.bind(this))

		// Event listeners on sidebar navigation items
		const buttons = [...this.nav.querySelectorAll('[data-switch-view]')]
		buttons.forEach((button) => {
			button.addEventListener('click', this.onClickSidebarNav.bind(this))
		})

		// Event listener on search form
		// Prevent native form submit, managed by autocomplete
		this.formSearch.addEventListener('submit', (e) => {
			e.preventDefault()
		})

		this.geolocButton.addEventListener('click', this.onClickGeolocationButton.bind(this))
	}

	/**
	 * Create Google Maps event listeners
	 */
	addGoogleMapsEvents() {
		// Event listener on search form input
		this.inputSearch.addEventListener('keydown', (e) => {
			if (e.keyCode === 13) {
				e.preventDefault()
			}
		})
	}

	/**
	 * Update the loader status
	 * @param {Boolean} state Status of the loader
	 */
	loading(state) {
		if (state) {
			this.loader.classList.add('active')
			this.isLoading = true
		} else {
			// Wait a moment to show the loader
			setTimeout(() => {
				this.loader.classList.remove('active')
				this.isLoading = false
			}, 1050)
		}
	}

	/**
	 * Initialize the Google Maps
	 */
	initMap() {
		// Create global variables for Google Maps
		this.overlayGlobal = null
		this.overlayLimit = null
		this.markers = []
		this.currentInfoWindow = null
		this.infoWindowOpened = false
		this.boundsChangeTimer = null

		this.serviceDistanceMatrix = new window.google.maps.DistanceMatrixService()
		this.boundsGlobal = new window.google.maps.LatLngBounds()
		this.currentRadius = this.options.requests.searchRadius

		if (this.options.markersUpdate.status) {
			this.boundsWithLimit = new window.google.maps.LatLngBounds()
		}

		this.infoWindow = new window.google.maps.InfoWindow()
		this.geocoder = new window.google.maps.Geocoder()
		this.searchData = {
			position: null
		}

		// Set default geolocation datas
		this.geolocationData = {
			userPositionChecked: false,
			marker: null,
			position: null
		}

		if (typeof window.MarkerClusterer !== 'undefined') {
			if (this.options.cluster.status) {
				// Clone object before to prevent reference
				const cloneClusterOptions = extend(true, this.options.cluster.options)
				this.markerCluster = new window.MarkerClusterer(
					this.instance,
					this.markers,
					cloneClusterOptions
				)
			}
		}

		// Detect zoom changed and bounds changed to refresh marker on the map
		if (this.options.markersUpdate.status) {
			this.instance.addListener('bounds_changed', () => {
				// Prevent multiple event triggered when loading and infoWindow opened
				if (!this.isLoading && !this.infoWindowOpened) {
					this.boundsChanged()
				}
			})
		}

		// Called the user callback if available
		if (typeof this.onReady === 'function') {
			// this.onReady(this.instance)
		}
	}

	/**
	 * Initialize the user geolocation
	 */
	initGeolocation() {
		// Check the browser support
		if (navigator.geolocation) {
			// Start geolocation on page load
			// if (this.options.geolocation.startOnLoad) {
			if (window.location.protocol === 'https:') {
				this.checkUserPosition()
			}
			// }
		}
	}

	/**
	 * On click on geolocation button
	 * @param {Object} e Event listener datas
	 */
	onClickGeolocationButton(e) {
		e.preventDefault()
		if (navigator.geolocation) {
			this.loading(true)
			this.checkUserPosition()
		}
	}

	/**
	 * Click on sidebar navigation item
	 * @param {Object} e Event listener datas
	 */
	onClickSidebarNav(e) {
		const mapView = this.container.querySelector('.storelocator-googleMaps')

		e.preventDefault()

		this.nav.querySelector('.active').classList.remove('active')
		e.target.parentNode.classList.add('active')

		if (e.target.getAttribute('data-target') === 'map') {
			mapView.classList.add('active')
			this.sidebar.classList.remove('active')
			window.google.maps.event.trigger(this.instance, 'resize')
		} else {
			this.sidebar.classList.add('active')
			mapView.classList.remove('active')
		}
	}

	/**
	 * On click on sidebar result item
	 * @param {Object} e Event listener datas
	 */
	onClickSidebarResultItem(e) {
		if (e.target && e.target.parentNode.classList.contains('store-center-marker-js')) {
			e.preventDefault()

			const currentLink = e.target.parentNode
			const markerIndex = currentLink.getAttribute('data-marker-index')
			const currentMarker = this.markers[markerIndex]

			this.instance.panTo(currentMarker.getPosition())
			this.instance.setZoom(16)
			this.openInfoWindow(currentMarker)
			this.container.querySelector('[data-switch-view][data-target="map"]').click()
			window.google.maps.event.trigger(this.instance, 'resize')
		}
	}

	/**
	 * Check user position with Google Maps geolocation API
	 * Get the user current position if available
	 */
	checkUserPosition() {
		navigator.geolocation.getCurrentPosition(
			({ coords: { latitude: lat, longitude: lng } }) => {
				const position = this.methodGetPosition({
					lat,
					lng
				})
				const marker = this.methodCreateMarker({
					feature: {
						position
					}
				})

				// Store geolocation data
				this.geolocationData.userPositionChecked = true
				this.geolocationData.position = position
				this.geolocationData.marker = marker

				if (this.inputSearch.value !== '') {
					this.inputSearch.value = ''
				}

				this.triggerRequest({
					lat,
					lng
				})
			},
			() => {
				this.loading(false)
			}
		)
	}

	/**
	 * Function called on user map moved event
	 */
	boundsChanged() {
		if (this.markers.length) {
			clearTimeout(this.boundsChangeTimer)
			this.boundsChangeTimer = setTimeout(() => {
				const listMarkerIndexInViewport = []

				this.markers.forEach((marker, index) => {
					if (
						marker.getVisible() &&
						this.instance.getBounds().contains(marker.getPosition())
					) {
						listMarkerIndexInViewport.push(index)
					}
				})

				// If map has no markers visible, change map position
				if (listMarkerIndexInViewport.length === 0) {
					this.refreshMapOnBoundsChanged({
						updatePosition: true
					})
				} else if (listMarkerIndexInViewport.length === this.markers.length) {
					// If user see already all markers, zoom is too small, increase it until maxRadius
					if (this.currentRadius < this.options.markersUpdate.maxRadius) {
						this.refreshMapOnBoundsChanged({
							increaseRadius: true
						})
					}
				}
			}, 600)
		}
	}

	/**
	 * Refresh the map on user map moved
	 * Trigger a request with the new map position
	 * @param {Object} options Options to refresh the map
	 */
	refreshMapOnBoundsChanged({ updatePosition, increaseRadius }) {
		let lat = 0
		let lng = 0

		// If user move on the map and discover area without stores, update markers, with map center position
		if (updatePosition) {
			lat = this.instance.getCenter().lat()
			lng = this.instance.getCenter().lng()
		} else if (increaseRadius) {
			// Get lat/lng from searchData
			;({ lat, lng } = this.searchData)

			// Increase currentRadius
			this.currentRadius = this.currentRadius + this.options.markersUpdate.stepRadius
		}

		this.triggerRequest({
			lat,
			lng,
			fitBounds: false // Prevent fitBounds when bounds changed (move or zoom)
		})
	}

	/**
	 * Initialize Google Maps Autocomplete
	 * @documentation https://developers.google.com/maps/documentation/javascript/places-autocomplete
	 */
	initAutocomplete() {
		const autocomplete = new window.google.maps.places.Autocomplete(this.inputSearch, {})

		this.inputSearch.focus()
		autocomplete.bindTo('bounds', this.instance)

		autocomplete.addListener('place_changed', () => {
			this.loading(true)
			const place = autocomplete.getPlace()

			if (place.geometry) {
				this.autocompleteRequest({
					lat: place.geometry.location.lat(),
					lng: place.geometry.location.lng()
				})
			} else {
				this.geocoder.geocode(
					{
						address: place.name
					},
					(results, status) => {
						if (status === window.google.maps.GeocoderStatus.OK) {
							this.autocompleteRequest({
								lat: results[0].geometry.location.lat(),
								lng: results[0].geometry.location.lng()
							})
						}
					}
				)
			}
		})
	}

	/**
	 * Function called on autocomplete changes
	 * Trigger a request with the new user research
	 * @param {String} lat Latitude of the research
	 * @param {String} lng Longitude of the research
	 */
	autocompleteRequest({ lat, lng }) {
		this.userPositionChecked = false

		// Reset currentRadius on new search
		this.currentRadius = this.options.requests.searchRadius

		this.triggerRequest({
			lat,
			lng
		})
	}

	/**
	 * Trigger a request to the web service to get all store results
	 * according to the position (lat, lng)
	 * @param {String} lat Latitude of the research
	 * @param {String} lng Longitude of the research
	 * @param {Boolean} fitBounds Fit bounds on the map
	 */
	triggerRequest({ lat, lng, fitBounds = true }) {
		this.mapHasRequest = true
		this.loading(true)

		const requestDatas = this.serializeForm({
			lat,
			lng
		})

		// Update search data stored
		this.searchData.lat = lat
		this.searchData.lng = lng
		this.searchData.position = new window.google.maps.LatLng(lat, lng)

		// Fecth configuration
		const fetchConf = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(requestDatas)
		}

		// Fecth store datas from the web service
		fetch(this.options.webServiceUrl, fetchConf)
			.then((response) => {
				if (!response.ok) {
					throw new Error(response)
				}
				return response
			})
			.then((res) => res.json())
			.then((features) => {
				features !== null &&
					this.parseStores({
						features,
						fitBounds
					})
			})
		// .catch((error) => {
		// 	this.loading(false)
		// 	throw new Error(error)
		// })
	}

	/**
	 * Serialize form datas
	 * @param {String} lat Latitude
	 * @param {String} lng Longitude
	 * @return {Object} formData Datas required for the request (lat, lng, storesLimit, input, radius)
	 */
	serializeForm({ lat = false, lng = false }) {
		const formDatas = {}

		if (lat && lng) {
			formDatas.lat = lat
			formDatas.lng = lng
		}

		formDatas.radius = this.currentRadius
		formDatas.limit = this.options.requests.storesLimit

		return formDatas
	}

	/**
	 * Parse store datas from the web service
	 * Create all markers
	 * Create all store results
	 * @param {Object} options Store datas from the web service
	 */
	parseStores({ features, fitBounds }) {
		// Destroy old markers before parse new stores
		this.destroyMarkers()

		// Reset infoWindow status
		this.infoWindowOpened = false

		// Re-declare bounds on new research, it's important else zoom bug after one request
		this.boundsGlobal = new window.google.maps.LatLngBounds()

		if (this.options.markersUpdate.status) {
			this.boundsWithLimit = new window.google.maps.LatLngBounds()
		}

		// If geolocation enabled, add geolocation marker to the list and extend the bounds global
		if (this.geolocationData.userPositionChecked) {
			this.markers.push(this.geolocationData.marker)
			this.boundsGlobal.extend(this.geolocationData.position)
		}

		if (features.length) {
			this.sidebarResults.replaceChildren(
				<ul class="storelocator-sidebarResultsList">
					{features.map((feature, index) => {
						feature.index = index
						feature.position = this.methodGetPosition({
							lat: feature.geometry.coordinates[1],
							lng: feature.geometry.coordinates[0]
						})
						this.boundsGlobal.extend(feature.position)
						this.createMarker(feature)

						return <TemplateResult feature={feature} />
					})}
				</ul>
			)

			// Add all maskers to cluster if option is enabled
			if (typeof MarkerClusterer !== 'undefined') {
				if (this.options.cluster.status) {
					this.markerCluster.addMarkers(this.markers)
				}
			}

			// Create custom bounds with limit viewport, no fitBounds the boundsGlobal
			if (this.options.markersUpdate.status) {
				this.createViewportWithLimitMarker({
					features,
					fitBounds
				})
			} else {
				// Else, and if requested, fitbounds the boundsGlobal
				fitBounds && this.instance.fitBounds(this.boundsGlobal)
			}
		} else {
			this.sidebarResults.replaceChildren(
				<p class="storelocator-sidebarNoResults">
					No results for your request.
					<br />
					Please try a new search with differents choices.
				</p>
			)

			if (this.overlayLimit !== null) {
				// this.overlayLimit.setMap(null)
			}
			if (this.overlayGlobal !== null) {
				// this.overlayGlobal.setMap(null)
			}
		}

		this.loading(false)
	}

	/**
	 * Create a custom viewport (boundsWithLimit)
	 * Display a minimal list of markers according to the limitInViewport option
	 * @param {Object} options Datas to create the custom viewport
	 */
	createViewportWithLimitMarker({ features, fitBounds }) {
		const maxMarkersInViewport = this.options.markersUpdate.limitInViewport
		const maxLoop =
			features.length < maxMarkersInViewport ? features.length : maxMarkersInViewport

		// If geolocation enabled, add geolocation marker to the list and extend the bounds limit
		if (this.geolocationData.userPositionChecked) {
			this.boundsWithLimit.extend(this.geolocationData.position)
		}

		for (let i = 0; i < maxLoop; i++) {
			this.boundsWithLimit.extend(features[i].position)
		}

		if (fitBounds) {
			this.instance.fitBounds(this.boundsWithLimit)
		}

		if (this.options.debug) {
			this.createOverlays()
		}
	}

	/**
	 * Create custom overlay on the map for the debug mode
	 * overlayGlobal: list of all stores according to maxRadius option
	 * overlayLimit: list of all stores according to the limitInViewport option
	 */
	createOverlays() {
		if (this.overlayGlobal !== null) {
			this.overlayGlobal.setMap(null)
		}
		this.overlayGlobal = new window.google.maps.Rectangle({
			bounds: this.boundsGlobal,
			strokeColor: null,
			strokeOpacity: 0,
			fillColor: '#ff0000',
			fillOpacity: 0.35,
			map: this.instance
		})

		if (this.overlayLimit !== null) {
			this.overlayLimit.setMap(null)
		}
		this.overlayLimit = new window.google.maps.Rectangle({
			bounds: this.boundsWithLimit,
			strokeColor: null,
			strokeOpacity: 0,
			fillColor: '#54ff00',
			fillOpacity: 0.35,
			map: this.instance
		})
	}

	/**
	 * Open the Google Maps native InfoWindow
	 * @param {Object} currentMarker Marker data display inside the infoWindow
	 */
	openInfoWindow(currentMarker) {
		// Get lat/lng from searchData
		const origin = this.searchData.position

		const hmlinfoWindow = TemplateInfoWindow({
			store: currentMarker.store,
			origin
		})

		this.infoWindow.setContent(hmlinfoWindow)

		// Change infoWindow status
		window.google.maps.event.addListener(this.infoWindow, 'closeclick', () => {
			this.infoWindowOpened = false
		})

		// Close previous infoWindow open
		if (this.currentInfoWindow !== null) {
			this.currentInfoWindow.close()
		}

		// Store marker info for next infoWindow
		this.currentInfoWindow = this.infoWindow

		// Open infoWindow
		this.infoWindow.open(this.instance, currentMarker)
	}

	/**
	 * Destroy all created Google Map markers
	 */
	destroyMarkers() {
		// Destroy all maskers references in cluster is enabled
		if (typeof MarkerClusterer !== 'undefined') {
			if (this.options.cluster.status) {
				this.markerCluster.clearMarkers()
			}
		}

		// Loop backwards on markers and remove them
		for (let i = this.markers.length - 1; i >= 0; i--) {
			const currentMarker = this.markers[i]

			// Remove listener from marker instance
			window.google.maps.event.clearInstanceListeners(currentMarker)

			// Remove the marker
			currentMarker.setMap(null)
		}

		this.markers = []
	}

	/**
	 * Create a Google Maps markers
	 */
	createMarker(feature) {
		const marker = this.methodCreateMarker({ feature })
		this.markers.push(marker)
		window.google.maps.event.addListener(marker, 'click', () => {
			this.infoWindowOpened = true
			this.openInfoWindow(marker)
		})
	}
}
