import { extend } from 'shared/utils/utils'
import TemplateResult from './templates/result'
import TemplateInfoWindow from './templates/info-window'
import validateTarget from 'validate-target'
import mapBoxGeocode from './geocoding/mapbox'
import googleMapsGeocode from './geocoding/google-maps'
import openStreetMapGeocode from './geocoding/open-street-map'

export default class Map {
	constructor({ Storelocatorjs }) {
		this.Storelocatorjs = Storelocatorjs
		this.options = this.Storelocatorjs.options

		this.autocompleteSelection = this.autocompleteSelection.bind(this)
		this.onClickOnMarker = this.onClickOnMarker.bind(this)
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
		this.autocomplete = this.sidebar.querySelector('.storelocator-autocomplete')

		this.buildLoader()

		// this.initGeolocation()
		this.initMap()
		this.inputSearch.focus()

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
		this.inputSearch.addEventListener('keyup', (e) => {
			e.preventDefault()
			this.onFormSearchSubmit()
		})

		this.formSearch.addEventListener('submit', (e) => {
			e.preventDefault()
		})

		this.geolocButton.addEventListener('click', this.onClickGeolocationButton.bind(this))

		this.autocomplete.addEventListener('click', (e) => {
			const target = e.target
			const item = validateTarget({
				target,
				selectorString: '.autocomplete-item',
				nodeName: 'li'
			})

			if (item) {
				this.autocompleteRequest({
					lat: parseFloat(target.getAttribute('data-lat')),
					lng: parseFloat(target.getAttribute('data-lng'))
				})
			}
		})
	}

	onFormSearchSubmit() {
		console.log('onFormSearchSubmit')

		mapBoxGeocode({
			value: this.inputSearch.value,
			token: this.Storelocatorjs.mapBoxToken
		}).then((results) => {
			this.renderAutocomplete({
				results
			})
		})

		// googleMapsGeocode({ value: this.inputSearch.value }).then((results) => {
		// 	this.renderAutocomplete({
		// 		results
		// 	})
		// })

		// openStreetMapGeocode({
		// 	value: this.inputSearch.value
		// }).then((results) => {
		// 	this.renderAutocomplete({
		// 		results
		// 	})
		// })
	}

	renderAutocomplete({ results }) {
		const html = results
			.map(({ text, lat, lng }) => {
				return `<li class="autocomplete-item" data-lat="${lat}" data-lng="${lng}">${text}</li>`
			})
			.join('')
		this.sidebar.querySelector('.storelocator-autocomplete').innerHTML = html
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
		this.markers = []
		this.currentInfoWindow = null
		this.infoWindowOpened = false
		this.boundsChangeTimer = null

		this.boundsGlobal = this.latLngBounds()
		this.currentRadius = this.options.requests.searchRadius

		if (this.options.markersUpdate.status) {
			this.boundsWithLimit = this.latLngBounds()
		}

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
			// this.instance.addListener('bounds_changed', () => {
			// 	// Prevent multiple event triggered when loading
			// 	if (!this.isLoading) {
			// 		this.boundsChanged()
			// 	}
			// })
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
			this.resize()
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
			this.resize()
		}
	}

	/**
	 * Check user position with Google Maps geolocation API
	 * Get the user current position if available
	 */
	checkUserPosition() {
		navigator.geolocation.getCurrentPosition(
			({ coords: { latitude: lat, longitude: lng } }) => {
				const position = this.latLng({
					lat,
					lng
				})
				const marker = this.createMarker({
					feature: {
						position
					},
					type: 'geolocation'
				})
				this.markers.push(marker)

				// Store geolocation data
				this.geolocationData.userPositionChecked = true
				this.geolocationData.position = position
				this.geolocationData.marker = marker

				if (this.inputSearch.value !== '') {
					this.inputSearch.value = ''
				}

				// this.triggerRequest({
				// 	lat,
				// 	lng
				// })
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

	autocompleteSelection({ lat, lng }) {
		this.loading(true)

		this.autocompleteRequest({
			lat,
			lng
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
		this.searchData.position = this.latLng({ lat, lng })

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

		// Re-declare bounds on new research, it's important else zoom bug after one request
		this.boundsGlobal = this.latLngBounds()

		if (this.options.markersUpdate.status) {
			this.boundsWithLimit = this.latLngBounds()
		}

		// If geolocation enabled, add geolocation marker to the list and extend the bounds global
		if (this.geolocationData.userPositionChecked) {
			this.markers.push(this.geolocationData.marker)
			this.latLngBoundsExtend({
				latLngBounds: this.boundsGlobal,
				latLng: this.geolocationData.position
			})
		}

		if (features.length) {
			let html = '<ul class="storelocator-sidebarResultsList">'
			features.forEach((feature, index) => {
				feature.index = index
				feature.position = this.latLng({
					lat: feature.geometry.coordinates[1],
					lng: feature.geometry.coordinates[0]
				})
				this.latLngBoundsExtend({
					latLngBounds: this.boundsGlobal,
					latLng: feature.position
				})

				const marker = this.createMarker({ feature, type: 'search' })
				this.markers.push(marker)

				html += TemplateResult({ feature })
			})
			html += '</ul>'

			this.sidebarResults.innerHTML = html

			// Add all maskers to cluster if option is enabled
			if (typeof MarkerClusterer !== 'undefined') {
				if (this.options.cluster.status) {
					// this.markerCluster.addMarkers(this.markers)
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
				fitBounds && this.fitBounds({ latLngBounds: this.boundsGlobal })
			}
		} else {
			this.sidebarResults.innerHTML =
				'<p class="storelocator-sidebarNoResults">No results for your request.<br />Please try a new search with differents choices.</p>'

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
			this.latLngBoundsExtend({
				latLngBounds: this.boundsWithLimit,
				latLng: this.geolocationData.position
			})
		}

		for (let i = 0; i < maxLoop; i++) {
			this.latLngBoundsExtend({
				latLngBounds: this.boundsWithLimit,
				latLng: features[i].position
			})
		}

		fitBounds && this.fitBounds({ latLngBounds: this.boundsWithLimit })

		if (this.options.debug) {
			this.createOverlay({
				boundsGlobal: this.boundsGlobal,
				boundsWithLimit: this.boundsWithLimit
			})
		}
	}

	/**
	 * Open the Google Maps native InfoWindow
	 * @param {Object} currentMarker Marker data display inside the infoWindow
	 */
	openInfoWindow(marker) {
		this.openPopup({
			template: TemplateInfoWindow({
				store: marker.store,
				origin: this.searchData.position
			}),
			marker
		})
	}

	/**
	 * Destroy all created Google Map markers
	 */
	destroyMarkers() {
		// Destroy all maskers references in cluster is enabled
		if (typeof MarkerClusterer !== 'undefined') {
			if (this.options.cluster.status) {
				// this.markerCluster.clearMarkers()
			}
		}

		// Loop backwards on markers and remove them
		for (let i = this.markers.length - 1; i >= 0; i--) {
			this.removeMarker(this.markers[i])
		}

		this.markers = []
	}

	onClickOnMarker() {
		this.infoWindowOpened = true
		this.openInfoWindow(marker)
	}
}
