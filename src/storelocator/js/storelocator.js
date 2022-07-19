/**
 * @name Storelocatorjs
 * @version 2.1.0
 * @license GPLv3 for Open Source use or Storelocatorjs Commercial License for commercial use
 * @author: Joris DANIEL aka Yoriiis
 * @description: Storelocatorjs is a fast and lightweight Javascript library for build your own customizable store locator with a minimalist theme. The cloud function is included to handle store filter requests.
 * {@link https://yoriiis.github.io/storelocatorjs}
 * @copyright 2019 Joris DANIEL aka Yoriiis <https://yoriiis.github.io/storelocatorjs>
 */

import Leaflet from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-geosearch/dist/geosearch.css'
import templateSidebarItemResult from './templates/sidebar-item-result'
import templateInfoWindow from './templates/info-window'
import markerSvg from '../svg/marker.svg'
import defaultOptions from './default-options'
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch'
import markerClusterGroup from 'leaflet.markercluster'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'

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
	constructor({ options, onReady }) {
		this.options = this.extend(true, defaultOptions, options)
		this.onReady = onReady
		this.isLoading = false
		this.mapHasRequest = false

		if (this.options.webServiceUrl === '') {
			// throw new Error('storelocatorjs :: webServiceUrl is empty')
		}

		this.onClickSidebarResultItem = this.onClickSidebarResultItem.bind(this)
		this.onChangeSearchFormFilter = this.onChangeSearchFormFilter.bind(this)
		this.onClickGeolocationButton = this.onClickGeolocationButton.bind(this)
		this.onClickSidebarNav = this.onClickSidebarNav.bind(this)
		this.onShowLocation = this.onShowLocation.bind(this)
		this.onLocationFound = this.onLocationFound.bind(this)

		this.cacheSelectors()
		this.buildLoader()
		this.markerStyles = this.getMarkerStylesByCategory()

		this.initMap()

		// 	this.initAutocomplete()

		this.addEvents()
	}

	/**
	 * Cache DOM selectors
	 */
	cacheSelectors() {
		this.containerStorelocator = document.querySelector(this.options.selectors.container)
		this.formSearch = this.containerStorelocator.querySelector(
			this.options.selectors.formSearch
		)
		this.inputSearch = this.containerStorelocator.querySelector(
			this.options.selectors.inputSearch
		)
		this.searchFilters = [
			...this.containerStorelocator.querySelectorAll(this.options.selectors.searchFilters)
		]
		this.nav = this.containerStorelocator.querySelector(this.options.selectors.nav)
		this.sidebar = this.containerStorelocator.querySelector(this.options.selectors.sidebar)
		this.sidebarResults = this.containerStorelocator.querySelector(
			this.options.selectors.sidebarResults
		)
		this.geolocButton = this.containerStorelocator.querySelector(
			this.options.selectors.geolocButton
		)
	}

	/**
	 * Build the loader
	 */
	buildLoader() {
		this.loader = this.containerStorelocator.querySelector(this.options.selectors.loader)
		this.loader.innerHTML = `
			<div class="storelocator-loaderBar"></div>
			<div class="storelocator-loaderBar"></div>
			<div class="storelocator-loaderBar"></div>`
	}

	/**
	 * Create event listeners
	 */
	addEvents() {
		// Event listener on sidebar result items
		this.sidebarResults.addEventListener('click', this.onClickSidebarResultItem)

		// Event listeners on sidebar navigation items
		let buttons = [...this.nav.querySelectorAll('[data-switch-view]')]
		buttons.forEach((button) => {
			button.addEventListener('click', this.onClickSidebarNav)
		})

		// Event listener on search form
		// Prevent native form submit, managed by autocomplete
		this.formSearch.addEventListener('submit', (e) => {
			e.preventDefault()
		})

		// Event listener on search form filters
		this.searchFilters.forEach((filter) => {
			filter.addEventListener('change', this.onChangeSearchFormFilter)
		})

		this.geolocButton.addEventListener('click', this.onClickGeolocationButton)
	}

	onLocationFound(e) {
		Leaflet.marker(e.latlng, {
			icon: Leaflet.divIcon({
				html: markerSvg,
				className: '',
				iconSize: [24, 40],
				iconAnchor: [12, 40]
			})
		}).addTo(this.map)
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
	 * Initialize the Google Maps
	 */
	initMap() {
		// Create global variables for Google Maps
		this.overlayGlobal = null
		this.overlayLimit = null
		this.markers = []
		this.boundsChangeTimer = null

		// this.serviceDistanceMatrix = new window.google.maps.DistanceMatrixService()
		this.boundsGlobal = null
		this.currentRadius = this.options.requests.searchRadius

		if (this.options.markersUpdate.status) {
			// this.boundsWithLimit = new window.google.maps.LatLngBounds()
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

		this.map = Leaflet.map('storelocator-googleMapsCanvas', {
			center: this.options.map.options.center,
			zoomControl: false,
			zoom: this.options.map.options.zoom
		})
		this.map.whenReady(() => {
			this.map.on('locationfound', this.onLocationFound)
			this.map.on('geosearch/showlocation', this.onShowLocation)

			if (this.options.geolocation.status) {
				this.initGeolocation()
			}
			this.map.addControl(
				new GeoSearchControl({
					provider: new OpenStreetMapProvider(),
					style: 'bar',
					updateMap: false,
					showMarker: false,
					marker: {
						icon: Leaflet.divIcon({
							html: markerSvg,
							className: '',
							iconSize: [24, 40],
							iconAnchor: [12, 40]
						}),
						draggable: false
					}
				})
			)
			Leaflet.control
				.zoom({
					position: 'bottomright'
				})
				.addTo(this.map)
		})

		Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 19,
			attribution: '© OpenStreetMap'
		}).addTo(this.map)

		if (typeof window.MarkerClusterer !== 'undefined') {
			if (this.options.cluster.status) {
				// Clone object before to prevent reference
				let cloneClusterOptions = this.extend(true, this.options.cluster.options)
				// this.markerCluster = new window.MarkerClusterer(
				// 	this.map,
				// 	this.markers,
				// 	cloneClusterOptions
				// )
			}
		}

		// Detect zoom changed and bounds changed to refresh marker on the map
		if (this.options.markersUpdate.status) {
			// this.map.addListener('bounds_changed', () => {
			// 	// Prevent multiple event triggered when loading and infoWindow opened
			// 	if (!this.isLoading && !this.infoWindowOpened) {
			// 		this.boundsChanged()
			// 	}
			// })
		}

		// Called the user callback if available
		if (typeof this.onReady === 'function') {
			this.onReady(this.map)
		}
	}

	/**
	 * Initialize the user geolocation
	 */
	initGeolocation() {
		// Check the browser support
		if (navigator.geolocation) {
			// Start geolocation on page load
			if (this.options.geolocation.startOnLoad) {
				if (window.location.protocol === 'https:') {
					this.checkUserPosition()
				}
			}
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
			this.checkUserPosition()
		}
	}

	/**
	 * Click on sidebar navigation item
	 * @param {Object} e Event listener datas
	 */
	onClickSidebarNav(e) {
		let mapView = this.containerStorelocator.querySelector('.storelocator-googleMaps')

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
		if (e.target && e.target.parentNode.classList.contains('store-center-marker-js')) {
			e.preventDefault()

			let currentLink = e.target.parentNode
			let markerIndex = currentLink.getAttribute('data-marker-index')
			let currentMarker = this.markers[markerIndex]

			const { lat, lng } = currentMarker.getLatLng()
			this.map.setView([lat, lng])
			this.map.setZoom(12)
			currentMarker.openPopup()
			this.containerStorelocator
				.querySelector('[data-switch-view][data-target="map"]')
				.click()
			// window.google.maps.event.trigger(this.map, 'resize')
		}
	}

	/**
	 * Check user position with Google Maps geolocation API
	 * Get the user current position if available
	 */
	checkUserPosition() {
		this.map.locate({ setView: true, maxZoom: 6, enableHighAccuracy: true })
		// navigator.geolocation.getCurrentPosition(
		// 	(position) => {
		// 		let lat = position.coords.latitude
		// 		let lng = position.coords.longitude
		// 		let markerGeoloc = null
		// 		let positionGeoloc = new window.google.maps.LatLng(lat, lng)

		// 		let options = {
		// 			position: positionGeoloc,
		// 			map: this.map
		// 		}

		// 		// Disable SVG for IE, they don't works
		// 		if (!this.isBrowserIE()) {
		// 			options.icon = this.options.map.markers.styles.length
		// 				? this.getIconMarkerByCategory('userPosition').url
		// 				: ''
		// 		}

		// 		markerGeoloc = new window.google.maps.Marker(options)

		// 		// Store geolocation data
		// 		this.geolocationData.userPositionChecked = true
		// 		this.geolocationData.position = positionGeoloc
		// 		this.geolocationData.marker = markerGeoloc

		// 		if (this.inputSearch.value !== '') {
		// 			this.inputSearch.value = ''
		// 		}

		// 		this.triggerRequest({
		// 			lat,
		// 			lng
		// 		})
		// 	},
		// 	(response) => {
		// 		this.loading(false)
		// 	}
		// )
	}

	/**
	 * Function called on user map moved event
	 */
	boundsChanged() {
		if (this.markers.length) {
			clearTimeout(this.boundsChangeTimer)
			this.boundsChangeTimer = setTimeout(() => {
				let listMarkerIndexInViewport = []

				this.markers.forEach((marker, index) => {
					if (
						marker.getVisible() &&
						this.map.getBounds().contains(marker.getPosition())
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
			lat = this.map.getCenter().lat()
			lng = this.map.getCenter().lng()
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
		this.inputSearch.focus()
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

		let requestDatas = this.serializeForm({
			lat,
			lng
		})

		// Update search data stored
		this.searchData.lat = lat
		this.searchData.lng = lng
		// this.searchData.position = new window.google.maps.LatLng(lat, lng)

		// Fecth configuration
		let fetchConf = {
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
			.then((jsonResponse) => {
				let data = jsonResponse

				if (data !== null) {
					this.parseStores({
						stores: data,
						fitBounds: fitBounds
					})
				}
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
	 * @return {Object} formData Datas required for the request (lat, lng, storesLimit, input, categories, radius)
	 */
	serializeForm({ lat = false, lng = false }) {
		let formDatas = {}
		let categories = []

		// Get all selected categories
		this.searchFilters.forEach((filter, index) => {
			if (filter.checked) {
				categories.push(filter.value)
			}
		})
		formDatas.categories = categories

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
	parseStores(options) {
		let noResult = true
		let { stores } = options
		let { fitBounds } = options
		let hmlListResult = `
			<p class="storelocator-sidebarIntro">
				${stores.length} results sorted by distance correspond to your research
			</p>
			<ul class="storelocator-sidebarResultsList">`

		// Destroy old markers before parse new stores
		this.destroyMarkers()

		// Re-declare bounds on new research, it's important else zoom bug after one request
		// this.boundsGlobal = new window.google.maps.LatLngBounds()

		if (this.options.markersUpdate.status) {
			// this.boundsWithLimit = new window.google.maps.LatLngBounds()
		}

		// If geolocation enabled, add geolocation marker to the list and extend the bounds global
		if (this.geolocationData.userPositionChecked) {
			this.markers.push(this.geolocationData.marker)
			// this.boundsGlobal.extend(this.geolocationData.position)
		}

		// Get lat/lng from searchData
		let origin = this.searchData.position
		this.markersGroup = Leaflet.markerClusterGroup({
			showCoverageOnHover: false,
			removeOutsideVisibleBounds: true,
			spiderfyOnMaxZoom: true,
			zoomToBoundsOnClick: true
		})

		// Loop on all stores by category
		stores.forEach((store, index) => {
			noResult = false
			store.index = index
			// store.position = new window.google.maps.LatLng(store.lat, store.lng)

			// this.boundsGlobal.extend(store.position)
			this.createMarkers(store)

			hmlListResult += templateSidebarItemResult.call(this, {
				store,
				origin
			})
		})

		this.map.addLayer(this.markersGroup)
		this.map.fitBounds(new Leaflet.featureGroup(this.markers).getBounds())

		hmlListResult += `</ul>`

		// If no result, show error message and center map on current country
		if (noResult) {
			this.sidebarResults.innerHTML = `
				<p class="storelocator-sidebarNoResults">
					No results for your request.<br />
					Please try a new search with differents choices.
				</p>`
			if (this.overlayLimit !== null) {
				// this.overlayLimit.setMap(null)
			}
			if (this.overlayGlobal !== null) {
				// this.overlayGlobal.setMap(null)
			}
		} else {
			this.sidebarResults.innerHTML = hmlListResult

			// Add all maskers to cluster if option is enabled
			if (typeof MarkerClusterer !== 'undefined') {
				if (this.options.cluster.status) {
					// this.markerCluster.addMarkers(this.markers)
				}
			}

			// Create custom bounds with limit viewport, no fitBounds the boundsGlobal
			if (this.options.markersUpdate.status) {
				// this.createViewportWithLimitMarker({
				// 	stores: stores,
				// 	fitBounds: fitBounds
				// })
			} else {
				// Else, and if requested, fitbounds the boundsGlobal
				// if (fitBounds) {
				// 	this.map.fitBounds(this.boundsGlobal)
				// }
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
		let { stores } = options
		let maxMarkersInViewport = this.options.markersUpdate.limitInViewport
		let maxLoop = stores.length < maxMarkersInViewport ? stores.length : maxMarkersInViewport

		// If geolocation enabled, add geolocation marker to the list and extend the bounds limit
		if (this.geolocationData.userPositionChecked) {
			this.boundsWithLimit.extend(this.geolocationData.position)
		}

		for (let i = 0; i < maxLoop; i++) {
			this.boundsWithLimit.extend(stores[i].position)
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
	 * Destroy all created Google Map markers
	 */
	destroyMarkers() {
		// Loop backwards on markers and remove them
		for (let i = this.markers.length - 1; i >= 0; i--) {
			let currentMarker = this.markers[i]

			if (this.options.cluster.status) {
				this.markersGroup.removeLayer(currentMarker)
			}

			// Remove listener from marker instance
			// window.google.maps.event.clearInstanceListeners(currentMarker)

			// Remove the marker
			currentMarker.remove()
		}

		this.markers = []
	}

	/**
	 * Create a Google Maps markers
	 * @param {Object} data Marker datas
	 */
	createMarkers(data) {
		let markerStyle = this.markerStyles[data.category]
		let options = {
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
		// options.icon = this.options.map.markers.styles.length
		// ? this.getIconMarkerByCategory(data.category)
		// : ''

		let colorBackground = this.markerStyles[data.category]
			? this.markerStyles[data.category].colorBackground
			: '#e5454c'

		const markerIcon = `<div class="markerIcon">${markerSvg}<span class="markerIcon-index">${
			data.index + 1
		}</span></span>`
		let marker = Leaflet.marker([data.lat, data.lng], {
			icon: Leaflet.divIcon({
				html: markerIcon,
				className: '',
				iconSize: [24, 40],
				iconAnchor: [12, 40]
			})
		}).addTo(this.map)
		this.markersGroup.addLayer(marker)

		// Push marker data in marker
		marker.store = data

		const htmlPopup = templateInfoWindow({
			store: data,
			origin
		})
		marker.bindPopup(htmlPopup, {
			offset: Leaflet.point(0, -35)
		})

		this.markers.push(marker)

		// Click on marker to show infoWindow
		// window.google.maps.event.addListener(marker, 'click', () => {
		// 	this.infoWindowOpened = true
		// 	this.openInfoWindow(marker)
		// })
	}

	/**
	 * Get marker styles by category, from options
	 * @return {Object} Formatted object with category name into key and marker styles datas
	 */
	getMarkerStylesByCategory() {
		let styles = {}
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
		let offsetXLabel = this.options.map.markers.width / 2 - 0.9
		let offsetYLabel = this.options.map.markers.height / 2 - 3
		let colorBackground = this.markerStyles[category]
			? this.markerStyles[category].colorBackground
			: '#e5454c'

		return {
			url: this.generateMarkerSVG({
				colorBackground: colorBackground,
				width: this.options.map.markers.width,
				height: this.options.map.markers.height
			})
			// labelOrigin: new window.google.maps.Point(offsetXLabel, offsetYLabel)
		}
	}

	/**
	 * Extends multiple object into one
	 * @param {Boolean} deep Enable extend for deep object properties
	 * @param {Array} objects List of objects to merged
	 * @return {Object} Objects merged into one
	 */
	extend(deep = false, ...objects) {
		let extended = {}

		// Merge the object into the extended object
		let merge = (obj) => {
			for (let prop in obj) {
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
	}
}
