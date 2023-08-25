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
			searchToggleButton: null,
			searchAutocomplete: null,
			map: null,
			results: null,
			controls: null,
			geolocButton: null,
			zoomInButton: null,
			zoomOutButton: null
		}
		this.mapEvents = []

		this.search = new Search({
			map: this
		})

		this.onClickResult = this.onClickResult.bind(this)
		this.onClickGeolocationButton = this.onClickGeolocationButton.bind(this)
		this.onClickZoomInButton = this.onClickZoomInButton.bind(this)
		this.onClickZoomOutButton = this.onClickZoomOutButton.bind(this)
	}

	build() {
		const container = document.querySelector('.sl-app')
		this.elements.container = container
		this.elements.results = container.querySelector('.sl-results')
		this.elements.map = container.querySelector('.sl-map')
		this.elements.controls = container.querySelector('.sl-controls')
		this.elements.geolocButton = container.querySelector('.sl-geolocButton')
		this.elements.zoomInButton = container.querySelector('.sl-zoomInButton')
		this.elements.zoomOutButton = container.querySelector('.sl-zoomOutButton')

		this.init()
		this.search.init()
	}

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

	onReady() {
		this.markers = []
		this.markerWithColors = this.getMarkerWithColors()
		this.addEvents()
		this.elements.searchInput.focus()
		this.callback instanceof Function && this.callback(this)
	}

	on(type, listener) {
		if (listener instanceof Function) {
			this.mapEvents.push({ type, listener })
			this.elements.container.addEventListener(type, listener)
		}
	}

	off(type, listener) {
		if (listener instanceof Function) {
			this.elements.container.removeEventListener(type, listener)
		}
	}

	dispatchEvent(type, detail) {
		this.elements.container.dispatchEvent(
			new window.CustomEvent(type, {
				detail
			})
		)
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

		if (this.isMobile()) {
			this.panTo(
				this.getLatLngWithOffset({
					latLng: this.getMarkerLatLng(marker),
					offsetX: this.elements.search.offsetWidth / 2
				})
			)
		} else {
			this.panTo(this.getMarkerLatLng(marker))
		}

		this.openPopup(marker)
		this.resize()
		this.elements.results.classList.contains('sl-visible') && this.toggleMapList()
	}

	toggleMapList() {
		this.elements.results.classList.toggle('sl-visible')
		this.elements.searchToggleButton
			.querySelector('.sl-search-toggleMap')
			.classList.toggle('sl-active')
		this.elements.searchToggleButton
			.querySelector('.sl-search-toggleList')
			.classList.toggle('sl-active')
	}

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
		this.dispatchEvent('zoomIn')
	}

	onClickZoomOutButton(e) {
		e.preventDefault()
		this.setZoom(this.getZoom() - 1)
		this.dispatchEvent('zoomOut')
	}

	checkUserPosition() {
		navigator.geolocation.getCurrentPosition(
			({ coords: { latitude: lat, longitude: lng } }) => {
				this.dispatchEvent('checkUserPosition', {
					lat,
					lng
				})
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
						resolve()
					})
			} catch (error) {
				console.warn('Storelocatorjs::requestStores', error)
				this.loading(false)
			}
		})
	}

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
			this.onFitBoundsEnd(() => {
				this.panBy(-(this.elements.search.offsetWidth / 2), 0)
			})

			this.dispatchEvent('storeFound')
		} else {
			this.dispatchEvent('storeNotFound')
			this.elements.results.innerHTML =
				'<p class="sl-sidebar-noResults">No results for your request.<br />Please try a new search with differents choices.</p>'
		}

		this.elements.searchToggleButton.classList.add('sl-active')
		this.elements.results.classList.add('sl-active')
		this.loading(false)
	}

	destroyMarkers() {
		for (let i = this.markers.length - 1; i >= 0; i--) {
			this.removeMarker(this.markers[i])
		}
		this.markers = []
	}

	loading(state) {
		this.isLoading = state
		this.elements.loader.classList[state ? 'add' : 'remove']('sl-active')
		this.dispatchEvent('progress')
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

	isMobile() {
		return window.matchMedia('(min-width: 750px)').matches
	}

	removeEvents() {
		this.elements.results.removeEventListener('click', this.onClickResult)
		this.elements.geolocButton.removeEventListener('click', this.onClickGeolocationButton)
		this.elements.zoomInButton.removeEventListener('click', this.onClickZoomInButton)
		this.elements.zoomOutButton.removeEventListener('click', this.onClickZoomOutButton)
	}

	destroy() {
		this.instance = null
		this.removeEvents()
		this.elements.container.remove()
	}
}
