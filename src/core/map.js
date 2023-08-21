import validateTarget from 'validate-target'
import { extend } from 'shared/utils/utils'
import markerSvg from 'shared/assets/svgs/marker.svg'
import Search from 'components/search/search'
import TemplateResult from 'components/result/templates/result'
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
			search: null,
			searchForm: null,
			searchInput: null,
			searchAutocomplete: null,
			map: null,
			nav: null,
			results: null,
			controls: null,
			geolocButton: null,
			zoomInButton: null,
			zoomOutButton: null
		}

		this.search = new Search({
			map: this
		})

		this.onClickResult = this.onClickResult.bind(this)
		this.onClickGeolocationButton = this.onClickGeolocationButton.bind(this)
		this.onClickZoomInButton = this.onClickZoomInButton.bind(this)
		this.onClickZoomOutButton = this.onClickZoomOutButton.bind(this)
	}

	build() {
		const container = document.querySelector('.storelocator')
		this.elements.container = container
		this.elements.results = container.querySelector('.sl-results')
		this.elements.map = container.querySelector('.sl-map')
		this.elements.nav = container.querySelector('.sl-nav')
		this.elements.controls = container.querySelector('.sl-controls')
		this.elements.geolocButton = container.querySelector('.sl-geolocButton')
		this.elements.zoomInButton = container.querySelector('.sl-zoomInButton')
		this.elements.zoomOutButton = container.querySelector('.sl-zoomOutButton')

		this.init()
		this.search.init()
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

	getZoom() {
		throw new Error('You have to implement the function "getZoom".')
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
		this.elements.searchInput.focus()
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
		this.elements.results.addEventListener('click', this.onClickResult)
		this.elements.geolocButton.addEventListener('click', this.onClickGeolocationButton)
		this.elements.zoomInButton.addEventListener('click', this.onClickZoomInButton)
		this.elements.zoomOutButton.addEventListener('click', this.onClickZoomOutButton)
	}

	/**
	 * On click on sidebar result item
	 * @param {Object} e Event listener datas
	 */
	onClickResult(e) {
		const target = e.target
		const isResultItem = validateTarget({
			target,
			selectorString: '.sl-result',
			nodeName: 'div'
		})

		if (isResultItem) {
			this.onClickResultItem(e)
		}
	}

	onClickResultItem(e) {
		e.preventDefault()

		const target = e.target
		const markerIndex = target.getAttribute('data-marker-index')
		const marker = this.markers[markerIndex]

		this.panTo(this.getMarkerLatLng(marker))
		this.openPopup(marker)
		this.resize()
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

	onClickZoomInButton(e) {
		e.preventDefault()
		this.setZoom(this.getZoom() + 1)
	}

	onClickZoomOutButton(e) {
		e.preventDefault()
		this.setZoom(this.getZoom() - 1)
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

				if (this.elements.searchInput.value !== '') {
					this.elements.searchInput.value = ''
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
			let html = '<ul class="sl-results-list">'
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

				html += `<li class="sl-results-listItem">${this.getResultTemplate()({
					feature
				})}</li>`
			})
			html += '</ul>'

			this.elements.results.innerHTML = html

			this.fitBounds({ latLngBounds: this.boundsGlobal })
		} else {
			this.elements.results.innerHTML =
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

	getResultTemplate() {
		if (this.templates?.result instanceof Function) {
			return this.templates.result
		}

		return TemplateResult
	}

	utils() {
		return {
			extend
		}
	}

	removeEvents() {
		this.elements.results.addEventListener('click', this.onClickResult)
		this.elements.nav.addEventListener('click', this.onClickOnNav)
		this.elements.geolocButton.addEventListener('click', this.onClickGeolocationButton)
	}

	destroy() {
		this.removeEvents()
		this.elements.container.remove()
	}
}
