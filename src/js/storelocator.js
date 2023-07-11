import { extend } from './utils'
import Leaflet from 'leaflet'
import TemplateMap from './templates/map'
import TemplateResult from './templates/result'
import TemplatePopup from './templates/popup'
import markerSvg from '../svg/marker.svg'
import defaultOptions from './default-options'
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch'
// import markerClusterGroup from 'leaflet.markercluster'
import { createElement, Fragment } from 'jsx-dom'

/**
 * storelocatorjs
 * @module storelocatorjs
 */
export default class Storelocator {
	/**
	 * Instanciate the constructor
	 * @constructor
	 * @param {Object} options Storelocatorjs options
	 * @param {Function} onReady Callback function executed when the store locator is ready
	 */
	constructor({ target, options, onReady = () => {}, templateResult, templatePopup }) {
		this.options = extend(true, defaultOptions, options)
		this.onReady = onReady
		this.target = target
		this.isLoading = false
		this.mapHasRequest = false

		this.templateResult = templateResult || TemplateResult
		this.templatePopup = templatePopup || TemplatePopup

		if (this.options.webServiceUrl === '') {
			// throw new Error('storelocatorjs :: webServiceUrl is empty')
		}

		this.onClickSidebarResultItem = this.onClickSidebarResultItem.bind(this)
		this.onChangeSearchFormFilter = this.onChangeSearchFormFilter.bind(this)
		this.onClickGeolocationButton = this.onClickGeolocationButton.bind(this)
		this.onClickSidebarNav = this.onClickSidebarNav.bind(this)
		this.onShowLocation = this.onShowLocation.bind(this)
		this.onLocationFound = this.onLocationFound.bind(this)
		this.onMapReady = this.onMapReady.bind(this)

		this.init()
	}

	init() {
		this.render()

		this.containerStorelocator = this.target.querySelector('.storelocator')
		this.formSearch = this.containerStorelocator.querySelector('.storelocator-formSearch')
		this.inputSearch = this.containerStorelocator.querySelector('.storelocator-inputSearch')
		this.nav = this.containerStorelocator.querySelector('.storelocator-nav')
		this.sidebar = this.containerStorelocator.querySelector('.storelocator-sidebar')
		this.sidebarResults = this.containerStorelocator.querySelector('.storelocator-sidebarResults')
		this.geolocButton = this.containerStorelocator.querySelector('.storelocator-geolocButton')
		this.loader = this.containerStorelocator.querySelector('.storelocator-loader')

		this.initMap()
		this.addEvents()
	}

	render() {
		this.target.append(<TemplateMap />)
	}

	/**
	 * Create event listeners
	 */
	addEvents() {
		this.geolocButton.addEventListener('click', this.onClickGeolocationButton)
		this.sidebarResults.addEventListener('click', this.onClickSidebarResultItem)

		const buttons = [...this.nav.querySelectorAll('[data-switch-view]')]
		buttons.forEach((button) => {
			button.addEventListener('click', this.onClickSidebarNav)
		})
	}

	onLocationFound({ longitude, latitude, latlng }) {
		this.addMarkertoMap({
			features: [
				{
					type: 'Feature',
					geometry: {
						type: 'Point',
						coordinates: [longitude, latitude]
					}
				}
			],
			className: 'userLocation'
		})

		this.geolocationData.userPositionChecked = true
		this.geolocationData.position = latlng
		this.geolocButton.classList.add('active')
		this.loading(false)
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
	 * Initialize the Map
	 */
	initMap() {
		// Create global variables for Map
		this.overlayGlobal = null
		this.overlayLimit = null
		this.markers = []
		this.boundsChangeTimer = null

		// this.serviceDistanceMatrix = new window.google.maps.DistanceMatrixService()
		this.boundsGlobal = Leaflet.latLngBounds()
		this.currentRadius = this.options.requests.searchRadius

		if (this.options.markersUpdate.status) {
			this.boundsWithLimit = Leaflet.latLngBounds()
		}

		// this.infoWindow = new window.google.maps.InfoWindow()
		// this.geocoder = new window.google.maps.Geocoder()
		this.searchData = {
			position: null
		}

		// Set default geolocation datas
		this.geolocationData = {
			userPositionChecked: false,
			marker: null,
			position: null
		}

		this.map = Leaflet.map('storelocator-mapCanvas', {
			center: this.options.map.options.center,
			zoomControl: false,
			zoom: this.options.map.options.zoom
		})
		this.map.whenReady(this.onMapReady)

		Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 19,
			attribution: '© OpenStreetMap'
		}).addTo(this.map)

		if (typeof window.MarkerClusterer !== 'undefined') {
			if (this.options.cluster.status) {
				// Clone object before to prevent reference
<<<<<<< HEAD:src/storelocator/js/storelocator.js
				const cloneClusterOptions = extend(true, this.options.cluster.options)
				// this.markerCluster = new window.MarkerClusterer(
				// 	this.map,
				// 	this.markers,
				// 	cloneClusterOptions
				// )
=======
				const cloneClusterOptions = this.extend(true, this.options.cluster.options)
				this.markerCluster = new window.MarkerClusterer(
					this.map,
					this.markers,
					cloneClusterOptions
				)
>>>>>>> origin/main:src/js/storelocator.js
			}
		}
	}

	onMapReady() {
		this.map.on('locationfound', this.onLocationFound)
		this.map.on('geosearch/showlocation', this.onShowLocation)

		if (this.options.markersUpdate.status) {
			this.map.on('moveend', () => {
				// Prevent multiple event triggered when loading and infoWindow opened
				if (!this.isLoading && !this.infoWindowOpened) {
					this.onMoveEnd()
				}
			})
		}

		if (this.options.geolocation.status) {
			this.initGeolocation()
		}
		this.map.addControl(
			new GeoSearchControl({
				provider: new OpenStreetMapProvider(),
				style: 'bar',
				updateMap: false,
				showMarker: false
			})
		)
		Leaflet.control
			.zoom({
				position: 'bottomright'
			})
			.addTo(this.map)

		this.onReady(this.map)
	}

	addMarkertoMap({ features, className }) {
		this.geoJSONLayer = Leaflet.geoJSON(features, {
			pointToLayer: (feature, latlng) => {
				return Leaflet.marker(latlng, {
					icon: Leaflet.divIcon({
						html: `<div class="markerIcon">${markerSvg}</div>`,
						className,
						iconSize: [24, 40],
						iconAnchor: [12, 40]
					})
				})
			},
			onEachFeature: (feature, layer) => {
				feature.properties &&
					layer.bindPopup(
						this.templatePopup({
							feature
						}),
						{
							offset: Leaflet.point(0, -35)
						}
					)
			}
		}).addTo(this.map)
	}

	/**
	 * Initialize the user geolocation
	 */
	initGeolocation() {
<<<<<<< HEAD:src/storelocator/js/storelocator.js
		if (
			navigator.geolocation &&
			this.options.geolocation.startOnLoad &&
			window.location.protocol === 'https:'
		) {
			this.loading(true)
			this.map.locate({ setView: true, maxZoom: 6, enableHighAccuracy: true })
=======
		// Check the browser support
		if (navigator.geolocation) {
			// Start geolocation on page load
			if (this.options.geolocation.startOnLoad) {
				if (window.location.protocol === 'https:') {
					this.checkUserPosition()
				}
			}
>>>>>>> origin/main:src/js/storelocator.js
		}
	}

	onShowLocation({ location }) {
		this.loading(true)
		this.autocompleteRequest({
			lat: location.y,
			lng: location.x
		})
	}

	/**
	 * On click on geolocation button
	 * @param {Object} e Event listener datas
	 */
	onClickGeolocationButton(e) {
		e.preventDefault()
		if (navigator.geolocation) {
			this.loading(true)
			this.map.locate({ setView: true, maxZoom: 6, enableHighAccuracy: true })
		}
	}

	/**
	 * Click on sidebar navigation item
	 * @param {Object} e Event listener datas
	 */
	onClickSidebarNav(e) {
<<<<<<< HEAD:src/storelocator/js/storelocator.js
		const mapView = this.containerStorelocator.querySelector('.storelocator-map')
=======
		const mapView = this.containerStorelocator.querySelector('.storelocator-googleMaps')
>>>>>>> origin/main:src/js/storelocator.js

		e.preventDefault()

		this.nav.querySelector('.active').classList.remove('active')
		e.target.parentNode.classList.add('active')

		if (e.target.getAttribute('data-target') === 'map') {
			mapView.classList.add('active')
			this.sidebar.classList.remove('active')
			// window.google.maps.event.trigger(this.map, 'resize')
		} else {
			this.sidebar.classList.add('active')
			mapView.classList.remove('active')
		}
	}

	/**
	 * On change on search form filters
	 * @param {Object} e Event listener datas
	 */
	onChangeSearchFormFilter(e) {
		// Not filters if there is not search value
		if (!this.mapHasRequest) return false

		this.triggerRequest({
			lat: this.searchData.lat,
			lng: this.searchData.lng,
			fitBounds: true
		})
	}

	/**
	 * On click on sidebar result item
	 * @param {Object} e Event listener datas
	 */
	onClickSidebarResultItem(e) {
<<<<<<< HEAD:src/storelocator/js/storelocator.js
		const target = e.target
		const markerId = target.getAttribute('data-marker-id')
=======
		if (e.target && e.target.parentNode.classList.contains('store-center-marker-js')) {
			e.preventDefault()

			const currentLink = e.target.parentNode
			const markerIndex = currentLink.getAttribute('data-marker-index')
			const currentMarker = this.markers[markerIndex]

			this.map.panTo(currentMarker.getPosition())
			this.map.setZoom(16)
			this.openInfoWindow(currentMarker)
			this.containerStorelocator
				.querySelector('[data-switch-view][data-target="map"]')
				.click()
			window.google.maps.event.trigger(this.map, 'resize')
		}
	}

	/**
	 * Check user position with Google Maps geolocation API
	 * Get the user current position if available
	 */
	checkUserPosition() {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				const lat = position.coords.latitude
				const lng = position.coords.longitude
				let markerGeoloc = null
				const positionGeoloc = new window.google.maps.LatLng(lat, lng)

				const options = {
					position: positionGeoloc,
					map: this.map
				}

				// Disable SVG for IE, they don't works
				if (!this.isBrowserIE()) {
					options.icon = this.options.map.markers.styles.length
						? this.getIconMarkerByCategory('userPosition').url
						: ''
				}

				markerGeoloc = new window.google.maps.Marker(options)
>>>>>>> origin/main:src/js/storelocator.js

		if (target && markerId) {
			e.preventDefault()

			this.geoJSONLayer.eachLayer((layer) => {
				if (layer.feature.properties.id === parseInt(markerId)) {
					layer.openPopup()
					// this.containerStorelocator
					// 	.querySelector('[data-switch-view][data-target="map"]')
					// 	.click()
				}
<<<<<<< HEAD:src/storelocator/js/storelocator.js
			})
		}
=======

				this.triggerRequest({
					lat,
					lng
				})
			},
			(response) => {
				this.loading(false)
			}
		)
>>>>>>> origin/main:src/js/storelocator.js
	}

	/**
	 * Function called on user map moved event
	 */
<<<<<<< HEAD:src/storelocator/js/storelocator.js
	onMoveEnd() {
=======
	boundsChanged() {
>>>>>>> origin/main:src/js/storelocator.js
		if (this.markers.length) {
			clearTimeout(this.boundsChangeTimer)
			this.boundsChangeTimer = setTimeout(() => {
				const listMarkerIndexInViewport = []

				this.markers.forEach((marker, index) => {
					if (this.map.getBounds().contains(marker.getLatLng())) {
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
			lat = this.map.getCenter().lat()
			lng = this.map.getCenter().lng()
		} else if (increaseRadius) {
			;({ lat, lng } = this.searchData)

<<<<<<< HEAD:src/storelocator/js/storelocator.js
			this.currentRadius += this.options.markersUpdate.stepRadius
=======
			// Increase currentRadius
			this.currentRadius = this.currentRadius + this.options.markersUpdate.stepRadius
>>>>>>> origin/main:src/js/storelocator.js
		}

		this.triggerRequest({
			lat,
			lng,
			fitBounds: false // Prevent fitBounds when bounds changed (move or zoom)
		})
	}

	/**
<<<<<<< HEAD:src/storelocator/js/storelocator.js
=======
	 * Initialize Google Maps Autocomplete
	 * @documentation https://developers.google.com/maps/documentation/javascript/places-autocomplete
	 */
	initAutocomplete() {
		const autocomplete = new window.google.maps.places.Autocomplete(this.inputSearch, {})

		this.inputSearch.focus()
		autocomplete.bindTo('bounds', this.map)

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
>>>>>>> origin/main:src/js/storelocator.js
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
		// this.searchData.position = new window.google.maps.LatLng(lat, lng)

		// Fecth configuration
		const fetchConf = {
<<<<<<< HEAD:src/storelocator/js/storelocator.js
			method: 'GET',
=======
			method: 'POST',
>>>>>>> origin/main:src/js/storelocator.js
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
<<<<<<< HEAD:src/storelocator/js/storelocator.js
			.then((features) => {
				features &&
					this.parseStores({
						features,
						fitBounds
					})
=======
			.then((jsonResponse) => {
				const data = jsonResponse

				if (data !== null) {
					this.parseStores({
						stores: data,
						fitBounds
					})
				}
			})
			.catch((error) => {
				this.loading(false)
				throw new Error(error)
>>>>>>> origin/main:src/js/storelocator.js
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
<<<<<<< HEAD:src/storelocator/js/storelocator.js
=======
		const categories = []

		// Get all selected categories
		this.searchFilters.forEach((filter, index) => {
			if (filter.checked) {
				categories.push(filter.value)
			}
		})
		formDatas.categories = categories
>>>>>>> origin/main:src/js/storelocator.js

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
<<<<<<< HEAD:src/storelocator/js/storelocator.js
	parseStores({ features, fitBounds }) {
		this.sidebar.classList.add('active')
		this.sidebarResults.replaceChildren()
		this.boundsGlobal = Leaflet.latLngBounds()
=======
	parseStores(options) {
		let noResult = true
		const { stores } = options
		const { fitBounds } = options
		let hmlListResult = `
			<p class="storelocator-sidebarIntro">
				${stores.length} results sorted by distance correspond to your research
			</p>
			<ul class="storelocator-sidebarResultsList">`

		// Destroy old markers before parse new stores
		this.destroyMarkers()

		// Reset infoWindow status
		this.infoWindowOpened = false

		// Re-declare bounds on new research, it's important else zoom bug after one request
		this.boundsGlobal = new window.google.maps.LatLngBounds()
>>>>>>> origin/main:src/js/storelocator.js

		if (this.options.markersUpdate.status) {
			this.boundsWithLimit = Leaflet.latLngBounds()
		}

		// If geolocation enabled, add geolocation marker to the list and extend the bounds global
		if (this.geolocationData.userPositionChecked) {
			this.boundsGlobal.extend(this.geolocationData.position)
		} else {
			this.geoJSONLayer && this.geoJSONLayer.clearLayers()
		}

		// Get lat/lng from searchData
		const origin = this.searchData.position
<<<<<<< HEAD:src/storelocator/js/storelocator.js
		this.markersGroup = Leaflet.markerClusterGroup({
			showCoverageOnHover: false,
			removeOutsideVisibleBounds: true,
			spiderfyOnMaxZoom: true,
			zoomToBoundsOnClick: true
		})
=======

		// Loop on all stores by category
		stores.forEach((store, index) => {
			noResult = false
			store.index = index
			store.position = new window.google.maps.LatLng(store.lat, store.lng)
>>>>>>> origin/main:src/js/storelocator.js

		this.addMarkertoMap({ features })

<<<<<<< HEAD:src/storelocator/js/storelocator.js
		// this.map.addLayer(this.markersGroup)
		// this.map.fitBounds(new Leaflet.featureGroup(this.markers).getBounds())
=======
			hmlListResult += templateSidebarItemResult.call(this, {
				store,
				origin
			})
		})
>>>>>>> origin/main:src/js/storelocator.js

		if (features.length) {
			this.sidebarResults.appendChild(
				<ul class="storelocator-sidebarResultsList">
					{features.map((feature) => {
						const [longitude, latitude] = feature.geometry.coordinates
						feature.properties.position = Leaflet.latLng(longitude, latitude)
						this.boundsGlobal.extend(feature.position)

						return this.templateResult({ feature })
					})}
				</ul>
			)

			// Add all maskers to cluster if option is enabled
			if (typeof MarkerClusterer !== 'undefined') {
				if (this.options.cluster.status) {
					// this.markerCluster.addMarkers(this.markers)
				}
			}

			// Create custom bounds with limit viewport, no fitBounds the boundsGlobal
			if (this.options.markersUpdate.status) {
<<<<<<< HEAD:src/storelocator/js/storelocator.js
				// this.createViewportWithLimitMarker({
				// 	features,
				// 	fitBounds
				// })
=======
				this.createViewportWithLimitMarker({
					stores,
					fitBounds
				})
>>>>>>> origin/main:src/js/storelocator.js
			} else {
				// Else, and if requested, fitbounds the boundsGlobal
				// if (fitBounds) {
				// 	this.map.fitBounds(this.boundsGlobal)
				// }
			}
		} else {
			this.sidebarResults.appendChild(
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
	createViewportWithLimitMarker(options) {
<<<<<<< HEAD:src/storelocator/js/storelocator.js
		const { features } = options
		const maxMarkersInViewport = this.options.markersUpdate.limitInViewport
		const maxLoop = features.length < maxMarkersInViewport ? features.length : maxMarkersInViewport
=======
		const { stores } = options
		const maxMarkersInViewport = this.options.markersUpdate.limitInViewport
		const maxLoop = stores.length < maxMarkersInViewport ? stores.length : maxMarkersInViewport
>>>>>>> origin/main:src/js/storelocator.js

		// If geolocation enabled, add geolocation marker to the list and extend the bounds limit
		if (this.geolocationData.userPositionChecked) {
			this.boundsWithLimit.extend(this.geolocationData.position)
		}

		for (let i = 0; i < maxLoop; i++) {
			this.boundsWithLimit.extend(features[i].position)
		}

		if (options.fitBounds) {
			this.map.fitBounds(this.boundsWithLimit)
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
<<<<<<< HEAD:src/storelocator/js/storelocator.js
		Leaflet.rectangle(this.boundsGlobal, { color: '#ff0000', weight: 1 }).addTo(this.map)
		Leaflet.rectangle(this.boundsWithLimit, { color: '#54ff00', weight: 1 }).addTo(this.map)
=======
		if (this.overlayGlobal !== null) {
			this.overlayGlobal.setMap(null)
		}
		this.overlayGlobal = new window.google.maps.Rectangle({
			bounds: this.boundsGlobal,
			strokeColor: null,
			strokeOpacity: 0,
			fillColor: '#ff0000',
			fillOpacity: 0.35,
			map: this.map
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
			map: this.map
		})
	}

	/**
	 * Open the Google Maps native InfoWindow
	 * @param {Object} currentMarker Marker data display inside the infoWindow
	 */
	openInfoWindow(currentMarker) {
		// Get lat/lng from searchData
		const origin = this.searchData.position

		const hmlinfoWindow = templateInfoWindow({
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
		this.infoWindow.open(this.map, currentMarker)
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
	 * @param {Object} data Marker datas
	 */
	createMarkers(data) {
		const markerStyle = this.markerStyles[data.category]
		const options = {
			position: data.position,
			map: this.map,
			optimized: true,
			label: {
				text: (data.index + 1).toString(),
				fontFamily: 'inherit',
				fontSize: '13px',
				fontWeight: '500',
				color: markerStyle ? markerStyle.colorText : '#000'
			}
		}

		// Disable SVG for IE, they don't works
		if (!this.isBrowserIE()) {
			options.icon = this.options.map.markers.styles.length
				? this.getIconMarkerByCategory(data.category)
				: ''
		}

		const marker = new window.google.maps.Marker(options)

		// Push marker data in marker
		marker.store = data

		this.markers.push(marker)

		// Click on marker to show infoWindow
		window.google.maps.event.addListener(marker, 'click', () => {
			this.infoWindowOpened = true
			this.openInfoWindow(marker)
		})
	}

	/**
	 * Get marker styles by category, from options
	 * @return {Object} Formatted object with category name into key and marker styles datas
	 */
	getMarkerStylesByCategory() {
		const styles = {}
		this.options.map.markers.styles.forEach((marker) => {
			styles[marker.category] = {
				colorBackground: marker.colorBackground,
				colorText: marker.colorText
			}
		})
		return styles
	}

	/**
	 * Get SVG icon by category styles
	 * @param {String} category Marker category
	 * @return {Object} Icon datas to generate a Google Maps markers
	 */
	getIconMarkerByCategory(category) {
		const offsetXLabel = this.options.map.markers.width / 2 - 0.9
		const offsetYLabel = this.options.map.markers.height / 2 - 3
		const colorBackground = this.markerStyles[category]
			? this.markerStyles[category].colorBackground
			: '#e5454c'

		return {
			url: this.generateMarkerSVG({
				colorBackground,
				width: this.options.map.markers.width,
				height: this.options.map.markers.height
			}),
			labelOrigin: new window.google.maps.Point(offsetXLabel, offsetYLabel)
		}
	}

	/**
	 * Generate SVG from the associated SVG file
	 * @param {Object} Style datas to customize the SVG
	 * @return {Object} Custom SVG to generate a Google Maps marker icons
	 */
	generateMarkerSVG(options) {
		// Create DOMParser from SVG string
		const parser = new DOMParser()
		const parserSvg = parser.parseFromString(markerSvg, 'text/html')
		const elementMarkerSvg = parserSvg.querySelector('svg')

		// Change SVG attributes
		elementMarkerSvg.setAttribute('width', `${options.width}px`)
		elementMarkerSvg.setAttribute('height', `${options.height}px`)
		elementMarkerSvg.querySelectorAll('path').forEach((path) => {
			path.setAttribute('fill', options.colorBackground)
		})

		// Create Serializer from element
		const serializer = new XMLSerializer()
		const stringMarkerSvg = serializer.serializeToString(elementMarkerSvg)

		// Format SVG to generate an icon on the map
		const customSVG = {
			mimetype: 'data:image/svg+xml;base64,',
			scaledSize: new window.google.maps.Size(options.width, options.height)
		}
		return customSVG.mimetype + btoa(stringMarkerSvg)
	}

	/**
	 * Check if browser is an old Internet Explorer
	 */
	isBrowserIE() {
		return !!(document.documentMode && document.documentMode >= 9)
	}

	/**
	 * Extends multiple object into one
	 * @param {Boolean} deep Enable extend for deep object properties
	 * @param {Array} objects List of objects to merged
	 * @return {Object} Objects merged into one
	 */
	extend(deep = false, ...objects) {
		const extended = {}

		// Merge the object into the extended object
		const merge = (obj) => {
			for (const prop in obj) {
				if (Object.prototype.hasOwnProperty.call(obj, prop)) {
					// If deep merge and property is an object, merge properties
					if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
						extended[prop] = this.extend(true, extended[prop], obj[prop])
					} else {
						extended[prop] = obj[prop]
					}
				}
			}
		}

		// Loop through each object and conduct a merge
		objects.forEach((object) => {
			merge(object)
		})

		return extended
>>>>>>> origin/main:src/js/storelocator.js
	}
}
