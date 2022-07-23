/**
 * @name Storelocatorjs
 * @version 2.1.0
 * @license GPLv3 for Open Source use or Storelocatorjs Commercial License for commercial use
 * @author: Joris DANIEL aka Yoriiis
 * @description: Storelocatorjs is a fast and lightweight Javascript library for build your own customizable store locator with a minimalist theme. The cloud function is included to handle store filter requests.
 * {@link https://yoriiis.github.io/storelocatorjs}
 * @copyright 2019 Joris DANIEL aka Yoriiis <https://yoriiis.github.io/storelocatorjs>
 */

import { extend } from './utils'
import Leaflet from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-geosearch/dist/geosearch.css'
import TemplateSidebarItemResult from './templates/sidebar-item-result'
import templateInfoWindow from './templates/info-window'
import markerSvg from '../svg/marker.svg'
import defaultOptions from './default-options'
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch'
import markerClusterGroup from 'leaflet.markercluster'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
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
	constructor({ options, onReady }) {
		this.options = extend(true, defaultOptions, options)
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
		this.loader.appendChild(
			<>
				<div class="storelocator-loaderBar"></div>
				<div class="storelocator-loaderBar"></div>
				<div class="storelocator-loaderBar"></div>
			</>
		)
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

		this.geolocButton.addEventListener('click', this.onClickGeolocationButton)
	}

	onLocationFound({ longitude, latitude, latlng }) {
		this.addMarkertoMap({
			markers: {
				type: 'Feature',
				geometry: {
					type: 'Point',
					coordinates: [longitude, latitude]
				}
			},
			className: 'userLocation',
			displayIndex: false
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

		this.map = Leaflet.map('storelocator-googleMapsCanvas', {
			center: this.options.map.options.center,
			zoomControl: false,
			zoom: this.options.map.options.zoom
		})
		this.map.whenReady(() => {
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
		})

		Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 19,
			attribution: '© OpenStreetMap'
		}).addTo(this.map)

		if (typeof window.MarkerClusterer !== 'undefined') {
			if (this.options.cluster.status) {
				// Clone object before to prevent reference
				let cloneClusterOptions = extend(true, this.options.cluster.options)
				// this.markerCluster = new window.MarkerClusterer(
				// 	this.map,
				// 	this.markers,
				// 	cloneClusterOptions
				// )
			}
		}

		// Called the user callback if available
		if (typeof this.onReady === 'function') {
			this.onReady(this.map)
		}
	}

	addMarkertoMap({ markers, className, displayIndex = true }) {
		let counterMarker = 0
		this.geoJSONLayer = Leaflet.geoJSON(markers, {
			pointToLayer: (feature, latlng) => {
				counterMarker++
				const counterHtml = displayIndex
					? `<span class="markerIcon-index">${counterMarker}`
					: ''
				const html = `<div class="markerIcon">${markerSvg}${counterHtml}`
				const icon = Leaflet.divIcon({
					html,
					className,
					iconSize: [24, 40],
					iconAnchor: [12, 40]
				})
				return Leaflet.marker(latlng, {
					icon
				})
			},
			onEachFeature: (feature, layer) => {
				feature.properties &&
					layer.bindPopup(
						templateInfoWindow({
							store: feature
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
		if (
			navigator.geolocation &&
			this.options.geolocation.startOnLoad &&
			window.location.protocol === 'https:'
		) {
			this.loading(true)
			this.map.locate({ setView: true, maxZoom: 6, enableHighAccuracy: true })
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
		const target = e.target
		const currentLink = target.parentNode

		if (target && currentLink.classList.contains('store-center-marker-js')) {
			e.preventDefault()

			const markerId = parseInt(currentLink.getAttribute('data-marker-id'))

			this.geoJSONLayer.eachLayer((layer) => {
				if (layer.feature.properties.id === markerId) {
					layer.openPopup()
					this.containerStorelocator
						.querySelector('[data-switch-view][data-target="map"]')
						.click()
				}
			})
		}
	}

	/**
	 * Function called on user map moved event
	 */
	onMoveEnd() {
		if (this.markers.length) {
			clearTimeout(this.boundsChangeTimer)
			this.boundsChangeTimer = setTimeout(() => {
				let listMarkerIndexInViewport = []

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

			this.currentRadius += this.options.markersUpdate.stepRadius
		}

		this.triggerRequest({
			lat,
			lng,
			fitBounds: false // Prevent fitBounds when bounds changed (move or zoom)
		})
	}

	/**
	 * Initialize Map Autocomplete
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
			.then((stores) => {
				stores &&
					this.parseStores({
						stores,
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
		let formDatas = {}

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
	parseStores({ stores, fitBounds }) {
		this.sidebarResults.replaceChildren()
		this.boundsGlobal = Leaflet.latLngBounds()

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
		let origin = this.searchData.position
		this.markersGroup = Leaflet.markerClusterGroup({
			showCoverageOnHover: false,
			removeOutsideVisibleBounds: true,
			spiderfyOnMaxZoom: true,
			zoomToBoundsOnClick: true
		})

		this.addMarkertoMap({ markers: stores })

		// this.map.addLayer(this.markersGroup)
		// this.map.fitBounds(new Leaflet.featureGroup(this.markers).getBounds())

		if (stores.length) {
			this.sidebarResults.appendChild(
				<>
					<p class="storelocator-sidebarIntro">
						{stores.length} results sorted by distance correspond to your research
					</p>
					<ul class="storelocator-sidebarResultsList">
						{stores.map((store, index) => {
							const [longitude, latitude] = store.geometry.coordinates
							store.properties.position = Leaflet.latLng(longitude, latitude)
							store.properties.index = index + 1
							this.boundsGlobal.extend(store.position)

							return <TemplateSidebarItemResult store={store} origin={origin} />
						})}
					</ul>
				</>
			)

			// Add all maskers to cluster if option is enabled
			if (typeof MarkerClusterer !== 'undefined') {
				if (this.options.cluster.status) {
					// this.markerCluster.addMarkers(this.markers)
				}
			}

			// Create custom bounds with limit viewport, no fitBounds the boundsGlobal
			if (this.options.markersUpdate.status) {
				// this.createViewportWithLimitMarker({
				// 	stores,
				// 	fitBounds
				// })
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
		Leaflet.rectangle(this.boundsGlobal, { color: '#ff0000', weight: 1 }).addTo(this.map)
		Leaflet.rectangle(this.boundsWithLimit, { color: '#54ff00', weight: 1 }).addTo(this.map)
	}
}
