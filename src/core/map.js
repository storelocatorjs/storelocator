import 'components/loader/loader.css'
import 'components/popup/popup.css'
import 'components/sidebar-result/sidebar-result.css'

import TemplateSidebarResult from 'components/sidebar-result/templates/sidebar-result'
import TemplateLoader from 'components/loader/templates/loader'

import validateTarget from 'validate-target'
import geocoderMapBox from '../geocoder/mapbox'
import geocoderGoogleMaps from '../geocoder/google-maps'
import geocoderJawg from '../geocoder/jawg'

export default class _Map {
	constructor({ api, map, geocoder, markers, onReady }) {
		this.api = api
		this.map = map
		this.geocoder = geocoder
		this.onReady = onReady

		this.geocoderFunctions = {
			mapbox: geocoderMapBox,
			googlemaps: geocoderGoogleMaps,
			jawg: geocoderJawg
		}

		this.timerAutocomplete = null
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

	/**
	 * On the player is ready
	 */
	onReady() {
		this.container = document.querySelector('.storelocator')
		this.formSearch = this.container.querySelector('.formSearch')
		this.inputSearch = this.container.querySelector('.formSearch-input')
		this.nav = this.container.querySelector('.nav')
		this.sidebar = this.container.querySelector('.sidebar')
		this.sidebarResults = this.container.querySelector('.sidebar-results')
		this.geolocButton = this.container.querySelector('.storelocator-geolocButton')
		this.autocomplete = this.sidebar.querySelector('.autocomplete')
		this.searchAreaButton = this.container.querySelector('.storelocator-searchArea')

		this.buildLoader()
		this.initMap()
		this.inputSearch.focus()
		this.addEvents()
		this.onReady instanceof Function && this.onReady(this.instance)
	}

	/**
	 * Build the loader
	 */
	buildLoader() {
		this.container.insertAdjacentHTML('afterbegin', TemplateLoader())
		this.loader = this.container.querySelector('.loader')
	}

	addEvents() {
		// Event listener on sidebar result items
		this.sidebarResults.addEventListener('click', this.onClickSidebarResultItem.bind(this))

		// Event listeners on sidebar navigation items
		const buttons = [...this.nav.querySelectorAll('[data-switch-view]')]
		buttons.forEach((button) => {
			button.addEventListener('click', this.onClickSidebarNav.bind(this))
		})

		this.inputSearch.addEventListener('keyup', (e) => {
			e.preventDefault()

			if (e.target.value !== '') {
				window.clearTimeout(this.timerAutocomplete)
				this.timerAutocomplete = window.setTimeout(() => {
					this.onFormSearchSubmit()
				}, 200)
			}
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
				nodeName: 'div'
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
		if (
			typeof this.geocoder.provider === 'string' &&
			this.geocoderFunctions[this.geocoder.provider]
		) {
			this.geocoderFunctions[this.geocoder.provider]({
				value: this.inputSearch.value,
				token: this.geocoder?.token,
				countries: this.geocoder.countries?.join(',') || 'fr'
			}).then((results) => {
				this.renderAutocomplete({
					results
				})
			})
		} else if (this.geocoder.provider instanceof Function) {
			this.geocoderFunctions[this.geocoder.provider]().then((results) => {
				this.renderAutocomplete({
					results
				})
			})
		}
	}

	renderAutocomplete({ results }) {
		const html = results
			.map(({ text, lat, lng }) => {
				return `<div class="autocomplete-item" data-lat="${lat}" data-lng="${lng}">${text}</div>`
			})
			.join('')
		this.autocomplete.innerHTML = html
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
			// setTimeout(() => {
			this.loader.classList.remove('active')
			this.isLoading = false
			// }, 1050)
		}
	}

	/**
	 * Initialize the Google Maps
	 */
	initMap() {
		this.markers = []
		this.boundsChangeTimer = null
		this.currentRadius = this.api.radius
		this.searchData = {
			position: null
		}
		this.geolocationData = {
			userPositionChecked: false,
			marker: null,
			position: null
		}
		this.boundsGlobal = this.latLngBounds()
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
		const target = e.target
		const isSidebarResult = validateTarget({
			target,
			selectorString: '.sidebarResult',
			nodeName: 'div'
		})

		if (isSidebarResult) {
			e.preventDefault()

			const markerIndex = target.getAttribute('data-marker-index')
			const marker = this.markers[markerIndex]

			this.panTo(this.getMarkerLatLng(marker))
			this.openPopup(marker)
			// this.container.querySelector('[data-switch-view][data-target="map"]').click()
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
				this.loading(false)
			},
			() => {
				this.loading(false)
			}
		)
	}

	/**
	 * Function called on autocomplete changes
	 * Trigger a request with the new user research
	 * @param {String} lat Latitude of the research
	 * @param {String} lng Longitude of the research
	 */
	autocompleteRequest({ lat, lng }) {
		this.userPositionChecked = false
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
	triggerRequest({ lat, lng }) {
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
		fetch(this.api.url, fetchConf)
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
						features
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
		formDatas.limit = this.api.limit

		return formDatas
	}

	/**
	 * Parse store datas from the web service
	 * Create all markers
	 * Create all store results
	 * @param {Object} options Store datas from the web service
	 */
	parseStores({ features }) {
		this.destroyMarkers()
		this.boundsGlobal = this.latLngBounds()

		// If geolocation enabled, add geolocation marker to the list and extend the bounds global
		if (this.geolocationData.userPositionChecked) {
			this.markers.push(this.geolocationData.marker)
		}

		if (features.length) {
			let html = '<ul class="sidebar-resultsList">'
			features.forEach((feature, index) => {
				const latLng = this.latLng({
					lat: feature.geometry.coordinates[1],
					lng: feature.geometry.coordinates[0]
				})

				feature.index = index
				feature.latLng = latLng

				const marker = this.createMarker({ feature, type: 'search' })

				this.latLngBoundsExtend({
					latLngBounds: this.boundsGlobal,
					latLng
				})
				this.markers.push(marker)

				html += TemplateSidebarResult({ feature })
			})
			html += '</ul>'

			this.sidebarResults.innerHTML = html

			this.fitBounds({ latLngBounds: this.boundsGlobal })
		} else {
			this.sidebarResults.innerHTML =
				'<p class="sidebar-noResults">No results for your request.<br />Please try a new search with differents choices.</p>'

			this.removeOverlay()
		}

		this.loading(false)
	}

	/**
	 * Destroy all created Google Map markers
	 */
	destroyMarkers() {
		for (let i = this.markers.length - 1; i >= 0; i--) {
			this.removeMarker(this.markers[i])
		}
		this.markers = []
	}
}
