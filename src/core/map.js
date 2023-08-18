import validateTarget from 'validate-target'
import { extend } from 'shared/utils/utils'
import markerSvg from 'shared/assets/svgs/marker.svg'
import Autocomplete from 'components/autocomplete/autocomplete'
import TemplateSidebarResult from 'components/sidebar-result/templates/sidebar-result'
import TemplatePopup from 'components/popup/templates/popup.js'

export default class Map {
	constructor({ api, map, geocoder, templates, onReady }) {
		this.api = api
		this.map = map
		this.geocoder = geocoder
		this.templates = templates
		this.callback = onReady

		this.elements = {
			container: null,
			autocomplete: null,
			map: null,
			formSearch: null,
			inputSearch: null,
			nav: null,
			sidebar: null,
			sidebarResults: null,
			geolocButton: null
		}

		this.autocomplete = new Autocomplete({
			map: this
		})

		this.onClickSidebarResult = this.onClickSidebarResult.bind(this)
		this.onClickOnNav = this.onClickOnNav.bind(this)
		this.onClickGeolocationButton = this.onClickGeolocationButton.bind(this)
	}

	build() {
		const container = document.querySelector('.storelocator')
		this.elements.container = container
		this.elements.map = container.querySelector('.sl-map')
		this.elements.formSearch = container.querySelector('.sl-formSearch')
		this.elements.inputSearch = container.querySelector('.sl-formSearch-input')
		this.elements.nav = container.querySelector('.sl-nav')
		this.elements.sidebar = container.querySelector('.sl-sidebar')
		this.elements.sidebarResults = container.querySelector('.sl-sidebar-results')
		this.elements.geolocButton = container.querySelector('.sl-geolocButton')

		this.init()
		this.autocomplete.init()
	}

	/**
	 * init
	 * Extends by the provider
	 */
	init() {
		throw new Error('You have to implement the function "init".')
	}

	waitUntilApiIsReady() {
		throw new Error('You have to implement the function "waitUntilApiIsReady".')
	}

	getInstance() {
		throw new Error('You have to implement the function "getInstance".')
	}

	getMarkerLatLng() {
		throw new Error('You have to implement the function "getMarkerLatLng".')
	}

	panTo() {
		throw new Error('You have to implement the function "panTo".')
	}

	setZoom() {
		throw new Error('You have to implement the function "setZoom".')
	}

	latLngBounds() {
		throw new Error('You have to implement the function "latLngBounds".')
	}

	latLngBoundsExtend() {
		throw new Error('You have to implement the function "latLngBoundsExtend".')
	}

	fitBounds() {
		throw new Error('You have to implement the function "fitBounds".')
	}

	latLng() {
		throw new Error('You have to implement the function "latLng".')
	}

	createMarker() {
		throw new Error('You have to implement the function "createMarker".')
	}

	openPopup() {
		throw new Error('You have to implement the function "openPopup".')
	}

	removeMarker() {
		throw new Error('You have to implement the function "removeMarker".')
	}

	resize() {
		throw new Error('You have to implement the function "resize".')
	}

	destroy() {
		throw new Error('You have to implement the function "destroy".')
	}

	onReady() {
		this.markers = []
		this.markerWithColors = this.getMarkerWithColors()
		this.addEvents()
		this.elements.inputSearch.focus()
		this.callback instanceof Function && this.callback(this)
	}

	getMarkerWithColors() {
		const styles = getComputedStyle(this.elements.container)
		const searchColor = styles.getPropertyValue('--sl-markerSearchColor')
		const geolocationColor = styles.getPropertyValue('--sl-markerGeolocationColor')

		return {
			search: markerSvg.replace('{{markerColor}}', searchColor),
			geolocation: markerSvg.replace('{{markerColor}}', geolocationColor)
		}
	}

	addEvents() {
		this.elements.sidebarResults.addEventListener('click', this.onClickSidebarResult)
		this.elements.nav.addEventListener('click', this.onClickOnNav)
		this.elements.geolocButton.addEventListener('click', this.onClickGeolocationButton)
	}

	/**
	 * On click on sidebar result item
	 * @param {Object} e Event listener datas
	 */
	onClickSidebarResult(e) {
		const target = e.target
		const isSidebarResultItem = validateTarget({
			target,
			selectorString: '.sl-sidebarResult',
			nodeName: 'div'
		})

		if (isSidebarResultItem) {
			this.onClickSidebarResultItem(e)
		}
	}

	onClickSidebarResultItem(e) {
		e.preventDefault()

		const target = e.target
		const markerIndex = target.getAttribute('data-marker-index')
		const marker = this.markers[markerIndex]

		this.panTo(this.getMarkerLatLng(marker))
		this.openPopup(marker)
		this.elements.nav
			.querySelector('.sl-nav-button[data-target="map"]')
			.dispatchEvent(new window.Event('click', { bubbles: true }))
		this.resize()
	}

	onClickOnNav(e) {
		const target = e.target
		const isNavButton = validateTarget({
			target,
			selectorString: '.sl-nav-button',
			nodeName: 'button'
		})

		if (isNavButton) {
			this.onClickOnNavButton(e)
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
		} else {
			this.elements.geolocButton.classList.add('sl-error')
		}
	}

	onClickOnNavButton(e) {
		e.preventDefault()

		this.elements.nav.querySelector('.sl-active').classList.remove('sl-active')
		e.target.parentNode.classList.add('sl-active')

		if (e.target.getAttribute('data-target') === 'map') {
			this.elements.map.classList.add('sl-active')
			this.elements.sidebar.classList.remove('sl-active')
			this.resize()
		} else {
			this.elements.sidebar.classList.add('sl-active')
			this.elements.map.classList.remove('sl-active')
		}
	}

	/**
	 * Check user position with Google Maps geolocation API
	 * Get the user current position if available
	 */
	checkUserPosition() {
		navigator.geolocation.getCurrentPosition(
			({ coords: { latitude: lat, longitude: lng } }) => {
				this.createMarker({
					feature: {
						latLng: this.latLng({
							lat,
							lng
						})
					},
					type: 'geolocation'
				})

				if (this.elements.inputSearch.value !== '') {
					this.elements.inputSearch.value = ''
				}

				this.requestStores({
					lat,
					lng
				}).then(() => {
					this.elements.geolocButton.classList.add('sl-active')
				})
			},
			(error) => {
				console.warn('Storelocator::checkUserPosition', error)
				this.elements.geolocButton.classList.add('sl-error')
				this.loading(false)
			}
		)
	}

	/**
	 * Trigger a request to the web service to get all store results
	 * according to the position (lat, lng)
	 * @param {String} lat Latitude of the research
	 * @param {String} lng Longitude of the research
	 * @param {Boolean} fitBounds Fit bounds on the map
	 */
	requestStores({ lat, lng }) {
		this.loading(true)

		return new window.Promise((resolve) => {
			try {
				fetch(this.api.url, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						lat,
						lng,
						radius: this.api.radius,
						limit: this.api.limit
					})
				})
					.then((response) => {
						console.log(response)
						if (response.ok) {
							return response.json()
						}

						console.warn('Storelocatorjs::requestStores', response)
						this.loading(false)
					})
					.then((features) => {
						features &&
							this.parseStores({
								features
							})
						this.loading(false)
						resolve()
					})
			} catch (error) {
				console.warn('Storelocatorjs::requestStores', error)
				this.loading(false)
			}
		})
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

		if (features.length) {
			let html = '<ul class="sl-sidebar-resultsList">'
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

				html += `<li class="sl-sidebar-resultsListItem">${this.getSidebarResultTemplate()({
					feature
				})}</li>`
			})
			html += '</ul>'

			this.elements.sidebarResults.innerHTML = html

			this.fitBounds({ latLngBounds: this.boundsGlobal })
		} else {
			this.elements.sidebarResults.innerHTML =
				'<p class="sl-sidebar-noResults">No results for your request.<br />Please try a new search with differents choices.</p>'
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

	loading(state) {
		this.isLoading = state
		this.elements.loader.classList[state ? 'add' : 'remove']('sl-active')
	}

	getPopupTemplate() {
		if (this.templates?.popup instanceof Function) {
			return this.templates.popup
		}

		return TemplatePopup
	}

	getSidebarResultTemplate() {
		if (this.templates?.sidebarResult instanceof Function) {
			return this.templates.sidebarResult
		}

		return TemplateSidebarResult
	}

	utils() {
		return {
			extend
		}
	}
}
