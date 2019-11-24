/**
* @license Commercial
* @name Storelocator
* @version 1.0.0
* @author: Joris DANIEL <joris.daniel@gmail.com>
* @description: Create your own storelocator in Javascript native with Google Maps API V3. Storelocator.js is customizable, responsive and included a PHP webservice with Ajax
* {@link https://store-locator.bitbucket.io}
* @copyright 2018 Joris DANIEL <https://store-locator.bitbucket.io>
**/

'use strict'

import templateSidebarItemResult from './templates/sidebar-item-result'
import templateInfoWindow from './templates/info-window'
import defaultOptions from './default-options'
import Markers from './markers'

export default class Storelocator {
	constructor ({options, onReady}) {
		this.options = Object.assign({}, defaultOptions, options)
		this.onReady = onReady
		this.isLoading = false
		this.isBrowserIE = !!((document.documentMode && document.documentMode >= 9))
		this.isMobile = window.matchMedia('(max-width: ' + this.options.breakpointMobile + ')').matches

		this.cacheSelectors()
		this.initLoader()
		this.detectTouchDevice()
		this.initNavMobile()
		this.clickOnMarkerList()

		this.win.googleMapLoaded = () => {
			if (this.options.geolocation.status) {
				this.initGeolocation()
			}

			this.initMap()
			this.initFilterEvent()
			this.initAutocomplete()
		}

		this.loadAPI(this.options.apiKey)
		this.resize()
	}

	cacheSelectors () {
		this.win = window
		this.doc = document
		this.containerStorelocator = this.doc.querySelector(this.options.selectors.container)
		this.asideResults = this.containerStorelocator.querySelector(this.options.selectors.asideResults)
		this.formSearch = this.containerStorelocator.querySelector(this.options.selectors.formSearch)
		this.inputSearch = this.containerStorelocator.querySelector(this.options.selectors.inputSearch)
		this.filtersSearch = this.containerStorelocator.querySelectorAll(this.options.selectors.filtersSearch)
		this.mapAside = this.containerStorelocator.querySelector(this.options.selectors.mapAside)
		this.mapGeoloc = this.containerStorelocator.querySelector(this.options.selectors.mapGeoloc)
	}

	initLoader () {
		this.loader = this.containerStorelocator.querySelector(this.options.selectors.loader)
		this.loader.innerHTML = '<div class="loader-bar"></div><div class="loader-bar"></div><div class="loader-bar"></div>'
	}

	detectTouchDevice () {
		// Detect touch devices
		if (('ontouchstart' in window) || (window.DocumentTouch && document instanceof window.DocumentTouch)) {
			document.querySelector('html').classList.add('touch')
		} else {
			document.querySelector('html').classList.add('no-touch')
		}
	}

	loadAPI (apiKey) {
		let tag = this.doc.createElement('script')
		tag.async = true
		tag.defer = true
		tag.type = 'text/javascript'
		tag.src = 'https://maps.googleapis.com/maps/api/js?key=' + apiKey + '&callback=window.googleMapLoaded&libraries=places'
		this.doc.getElementsByTagName('body')[0].appendChild(tag)
	}

	initNavMobile () {
		let buttons = this.containerStorelocator.querySelectorAll('.switch-view-js')
		let mapView = this.containerStorelocator.querySelector('#storelocator-googleMaps');

		[].forEach.call(buttons, button => {
			button.addEventListener('click', e => {
				e.preventDefault()

				this.containerStorelocator.querySelector('.switch-view-js.active').classList.remove('active')
				e.target.classList.add('active')

				if (e.target.classList.contains('view-map')) {
					mapView.classList.add('active')
					this.mapAside.classList.remove('active')
					window.google.maps.event.trigger(this.map, 'resize')
				} else {
					this.mapAside.classList.add('active')
					mapView.classList.remove('active')
				}
			})
		})
	}

	resize () {
		// Check breakpoint resolution for mobile mediaqueries
		this.win.addEventListener('resize', () => {
			this.isMobile = window.matchMedia('(max-width: ' + this.options.breakpointMobile + ')').matches
		})
	}

	loading (status) {
		if (status) {
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

	initMap () {
		// Create global variables for Google Maps
		this.overlayRed = null
		this.overlayGreen = null
		this.currentInfoWindow = null
		this.infoWindowOpened = false
		this.boundsChangeTimer = null

		this.Markers = new Markers()

		this.serviceDistanceMatrix = new window.google.maps.DistanceMatrixService()
		this.boundsGlobal = new window.google.maps.LatLngBounds()
		this.currentRadius = this.options.requests.searchRadius

		if (this.options.updateMarkerOnBoundsChanged.status) {
			this.boundsWithLimit = new window.google.maps.LatLngBounds()
		}

		this.infoWindow = new window.google.maps.InfoWindow()
		this.geocoder = new window.google.maps.Geocoder()
		this.searchData = {
			position: null
		}

		this.geolocationData = {
			userPositionChecked: false,
			marker: null,
			position: null
		}

		// Clone object before to prevent reference
		let cloneMapOptions = Object.assign({}, this.options.map.options)

		cloneMapOptions.center = new window.google.maps.LatLng(cloneMapOptions.center[0], cloneMapOptions.center[1])

		// Init Google Maps API
		this.map = new window.google.maps.Map(this.containerStorelocator.querySelector('#google-map'), cloneMapOptions)

		if (!this.isMobile) {
			this.offsetMapWithAsideBar()
		}

		if (typeof window.MarkerClusterer !== 'undefined') {
			if (this.options.cluster.status) {
				// Documentation: https://googlemaps.github.io/js-marker-clusterer/docs/reference.html
				// Clone object before to prevent reference
				let cloneClusterOptions = this.extend(true, this.options.cluster.options)
				this.markerCluster = new window.MarkerClusterer(this.map, this.Markers.markers, cloneClusterOptions)
			}
		} else {
			this.log('warn', 'Storelocator :: Cluster option is enabled, you need to load MarkerClusterer.js in your vendor before use it.')
		}

		// Detect zoom changed and bounds changed to refresh marker on the map
		if (this.options.updateMarkerOnBoundsChanged.status) {
			this.map.addListener('bounds_changed', () => {
				// Prevent multiple event triggered when loading and infoWindow opened
				if (!this.isLoading && !this.infoWindowOpened) {
					this.boundsChanged()
				}
			})
		}

		if (typeof this.onReady === 'function') {
			this.onReady(this.map)
		}
	}

	initGeolocation () {
		// If navigator support geolocation, aks user
		if (navigator.geolocation) {
			this.mapGeoloc.addEventListener('click', e => {
				e.preventDefault()
				this.loading(true)
				this.checkUserPosition()
			})

			// Enable geolocation on map load
			if (this.options.geolocation.startOnLoad) {
				if (window.location.protocol === 'https:') {
					this.checkUserPosition()
				} else {
					this.log('warn', 'Storelocator :: Geolocation no longer work on insecure origins, use HTTPS.')
				}
			}
		}
	}

	checkUserPosition () {
		navigator.geolocation.getCurrentPosition(position => {
			let lat = position.coords.latitude
			let lng = position.coords.longitude
			let markerGeoloc = null
			let positionGeoloc = new window.google.maps.LatLng(lat, lng)

			let options = {
				position: positionGeoloc,
				map: this.map
			}

			// Disable SVG for IE, they don't works
			if (!this.isBrowserIE) {
				options.icon = this.options.map.markers.styles.length ? this.getIconMarkerByCategory('userPosition').url : ''
			}

			markerGeoloc = new window.google.maps.Marker(options)

			// Store geolocation data
			this.geolocationData.userPositionChecked = true
			this.geolocationData.position = positionGeoloc
			this.geolocationData.marker = markerGeoloc

			if (this.inputSearch.value !== '') {
				this.inputSearch.value = ''
			}
			this.log('log', 'Storelocator :: geolocation success : ' + lat + ',' + lng)

			this.triggerRequest({
				'lat': lat,
				'lng': lng,
				fitBounds: true
			})
		}, response => {
			this.log('warn', 'Storelocator :: geolocation-error', response)
			this.loading(false)
		})
	}

	boundsChanged () {
		if (this.Markers.markers.length) {
			clearTimeout(this.boundsChangeTimer)
			this.boundsChangeTimer = setTimeout(() => {
				let listMarkerIndexInViewport = []

				this.Markers.markers.forEach((marker, index) => {
					if (marker.getVisible() && this.map.getBounds().contains(marker.getPosition())) {
						listMarkerIndexInViewport.push(index)
					}
				})

				// If map has no markers visible, change map position
				if (listMarkerIndexInViewport.length === 0) {
					this.refreshMapOnBoundsChanged({
						updatePosition: true
					})
				} else if (listMarkerIndexInViewport.length === this.Markers.markers.length) {
					// If user see already all markers, zoom is too small, increase it until maxRadius
					if (this.currentRadius < this.options.updateMarkerOnBoundsChanged.maxRadius) {
						this.refreshMapOnBoundsChanged({
							increaseRadius: true
						})
					}
				}
			}, 600)
		}
	}

	refreshMapOnBoundsChanged (options) {
		let radius = this.options.requests.searchRadius
		let lat = 0
		let lng = 0

		// If user move on the map and discover area without stores, update markers, with map center position
		if (options.updatePosition) {
			lat = this.map.getCenter().lat()
			lng = this.map.getCenter().lng()
		} else if (options.increaseRadius) {
			// Get lat/lng from searchData
			({lat, lng} = this.searchData)

			// Increase currentRadius
			this.currentRadius = this.currentRadius + this.options.updateMarkerOnBoundsChanged.stepRadius
			radius = this.currentRadius
		}

		// Prevent fitBounds when bounds changed (move or zoom)
		this.triggerRequest({
			'lat': lat,
			'lng': lng,
			'radius': radius,
			fitBounds: false
		})
	}

	offsetMapWithAsideBar () {
		let offsetMapWithAside = (this.mapAside.getBoundingClientRect().right / 2) * -1
		this.map.panBy(offsetMapWithAside, 0)
	}

	// More information here : https://developers.google.com/maps/documentation/javascript/places-autocomplete
	initAutocomplete () {
		let autocomplete = new window.google.maps.places.Autocomplete(this.inputSearch, {})

		window.google.maps.event.addDomListener(this.inputSearch, 'keydown', function (e) {
			if (e.keyCode === 13) {
				e.preventDefault()
			}
		})

		// Prevent native form submit, autocomplete manage
		this.formSearch.addEventListener('submit', (e) => {
			e.preventDefault()
		})

		this.inputSearch.focus()
		autocomplete.bindTo('bounds', this.map)

		autocomplete.addListener('place_changed', () => {
			this.loading(true)
			let place = autocomplete.getPlace()

			if (place.geometry) {
				this.autocompleteAjax(place.geometry.location.lat(), place.geometry.location.lng())
			} else {
				this.geocoder.geocode({
					'address': place.name
				}, (results, status) => {
					if (status === window.google.maps.GeocoderStatus.OK) {
						this.autocompleteAjax(results[0].geometry.location.lat(), results[0].geometry.location.lng())
					}
				})
			}
		})
	}

	autocompleteAjax (lat, lng) {
		this.userPositionChecked = false

		// Reset currentRadius on new search
		this.currentRadius = this.options.requests.searchRadius

		this.triggerRequest({
			'lat': lat,
			'lng': lng,
			fitBounds: true
		})
	}

	initFilterEvent () {
		for (let i = 0, lengthFilter = this.filtersSearch.length; i < lengthFilter; i++) {
			this.filtersSearch[i].addEventListener('change', () => {
				// Not filters if there is not search value
				if (this.inputSearch.value === '' && !this.geolocationData.userPositionChecked) {
					return false
				}

				this.triggerRequest({
					'lat': this.searchData.lat,
					'lng': this.searchData.lng,
					fitBounds: true
				})
			})
		}
	}

	triggerRequest (options) {
		this.loading(true)

		let {lat} = options
		let {lng} = options
		let {storeLimit = this.options.requests.storeLimit} = options
		let dataAjax = this.serializeForm(lat, lng, storeLimit)
		let {fitBounds = true} = options

		// Update search data stored
		this.searchData.lat = lat
		this.searchData.lng = lng
		this.searchData.position = new window.google.maps.LatLng(lat, lng)

		// let fetchConf = {
		// 	method: 'POST',
		// 	body: JSON.stringify(dataAjax)
		// }

		// fetch(this.options.urlWebservice, fetchConf)
		// 	.then(response => {
		// 		if (!response.ok) {
		// 			throw Error(response.statusText)
		// 		}
		// 		return response
		// 	})
		// 	.then(res => res.json())
		// 	.then(jsonResponse => {
		// 		console.log(jsonResponse)
		// 	})
		// 	.catch(error => {
		// 		throw new Error('error', error)
		// 	})

		this.ajax({
			url: this.options.urlWebservice,
			type: 'POST',
			data: dataAjax,
			success: (request) => {
				let data = JSON.parse(request.responseText)

				if (data !== null) {
					this.parseStores({
						stores: data,
						fitBounds: fitBounds
					})
				} else {
					this.log('warn', 'Storelocator :: Error ajax_get_stores.php, WS_stores has mandatory params (lat, lng)')
				}
			},
			error: (request) => {
				this.log('warn', 'Storelocator :: Connection error', request)
				this.loading(false)
			}
		})
	}

	serializeForm (lat, lng, storeLimit) {
		let dataAjax = ''
		let categories = []

		// Serialize params (input and filters value)
		if (this.inputSearch.value !== '') {
			dataAjax += 'input=' + this.inputSearch.value
		}

		for (let i = 0, {length} = this.filtersSearch; i < length; i++) {
			let currentFilter = this.filtersSearch[i]
			if (currentFilter.checked) {
				categories.push(currentFilter.value)
			}
		}

		dataAjax += ((dataAjax !== '') ? '&' : '') + 'categories=' + JSON.stringify(categories)

		if (lat && lng) {
			dataAjax += (dataAjax !== '' ? '&' : '') + 'lat=' + lat + '&lng=' + lng
		}

		dataAjax += '&radius=' + this.currentRadius + '&storesLimit=' + storeLimit

		return dataAjax
	}

	parseStores (options) {
		let noResult = true
		let {stores} = options
		let {fitBounds} = options
		let hmlListResult = `<p class="storelocator-sidebarIntro">${stores.length} results sorted by distance correspond to your research</p><ul>`

		// Destroy old markers before parse new stores
		this.Markers.destroyMarkers()

		// Reset infoWindow status
		this.infoWindowOpened = false

		// Re-declare bounds on new research, it's important else zoom bug after one request
		this.boundsGlobal = new window.google.maps.LatLngBounds()

		if (this.options.updateMarkerOnBoundsChanged.status) {
			this.boundsWithLimit = new window.google.maps.LatLngBounds()
		}

		// If geolocation enabled, add geolocation marker to the list and extend the bounds global
		if (this.geolocationData.userPositionChecked) {
			this.Markers.markers.push(this.geolocationData.marker)
			this.boundsGlobal.extend(this.geolocationData.position)
		}

		// Get lat/lng from searchData
		let origin = this.searchData.position

		// Loop on all stores by category
		stores.forEach((store, index) => {
			noResult = false
			store.index = index
			store.position = new window.google.maps.LatLng(store.lat, store.lng)

			this.boundsGlobal.extend(store.position)
			this.Markers.createMarkers(store)

			hmlListResult += templateSidebarItemResult({
				store: store,
				origin: origin
			})
		})

		hmlListResult += `</ul>`

		// If no result, show error message and center map on current country
		if (noResult) {
			this.asideResults.innerHTML = '<p class="storelocator-sidebarNoResults">No results for your request.<br />Please try a new search with differents choices.</p>'
			if (this.overlayGreen !== null) {
				this.overlayGreen.setMap(null)
			}
			if (this.overlayRed !== null) {
				this.overlayRed.setMap(null)
			}
		} else {
			this.asideResults.innerHTML = hmlListResult

			// Add all maskers to cluster if option is enabled
			if (typeof MarkerClusterer !== 'undefined') {
				if (this.options.cluster.status) {
					this.markerCluster.addMarkers(this.Markers.markers)
				}
			}

			// Create custom bounds with limit viewport, no fitBounds the boundsGlobal
			if (this.options.updateMarkerOnBoundsChanged.status) {
				this.createViewportWithLimitMarker({
					stores: stores,
					fitBounds: fitBounds
				})
			} else {
				// Else, and if requested, fitbounds the boundsGlobal
				if (fitBounds) {
					this.map.fitBounds(this.boundsGlobal)
				}
			}

			// Offset the map on desktop only, when the fitBounds is requested
			if (fitBounds) {
				if (!this.isMobile) {
					this.offsetMapWithAsideBar()
				}
			}
		}

		this.loading(false)
	}

	clickOnMarkerList () {
		this.asideResults.addEventListener('click', e => {
			if (e.target && e.target.parentNode.classList.contains('store-center-marker-js')) {
				e.preventDefault()

				let currentLink = e.target.parentNode
				let currentMarker = this.Markers.markers[currentLink.getAttribute('data-marker-index')]

				this.map.panTo(currentMarker.getPosition())
				this.map.setZoom(16)
				this.openInfoWindow(currentMarker)

				if (this.isMobile) {
					this.containerStorelocator.querySelector('.switch-view-js.view-map').click()
					window.google.maps.event.trigger(this.map, 'resize')
				} else {
					this.offsetMapWithAsideBar()
				}
			}
		})
	}

	createViewportWithLimitMarker (options) {
		let {stores} = options
		let maxMarkersInViewport = this.options.updateMarkerOnBoundsChanged.maxMarkersInViewportLimit
		let maxLoop = (stores.length < maxMarkersInViewport) ? stores.length : maxMarkersInViewport

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

	createOverlays () {
		if (this.overlayRed !== null) {
			this.overlayRed.setMap(null)
		}
		this.overlayRed = new window.google.maps.Rectangle({
			bounds: this.boundsGlobal,
			strokeColor: null,
			strokeOpacity: 0,
			fillColor: '#FF0000',
			fillOpacity: 0.35,
			map: this.map
		})

		if (this.overlayGreen !== null) {
			this.overlayGreen.setMap(null)
		}
		this.overlayGreen = new window.google.maps.Rectangle({
			bounds: this.boundsWithLimit,
			strokeColor: null,
			strokeOpacity: 0,
			fillColor: '#54ff00',
			fillOpacity: 0.35,
			map: this.map
		})
	}

	openInfoWindow (currentMarker) {
		// Get lat/lng from searchData
		let origin = this.searchData.position

		let hmlinfoWindow = templateInfoWindow({
			store: currentMarker.store,
			origin: origin
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

	// Detect store categorie and appropriate SVG icon
	getIconMarkerByCategory (category) {
		let stylesMarkers = this.options.map.markers.styles
		let styleMarker = null
		let offsetXLabel = (this.options.map.markers.width / 2) - 0.9
		let offsetYLabel = (this.options.map.markers.height / 2) - 3

		if (stylesMarkers.length) {
			this.options.map.markers.styles.forEach((marker) => {
				if (marker.category === category) {
					styleMarker = marker
				}
			})

			return {
				url: this.generateSVG({
					colorBackground: styleMarker.colorBackground,
					colorBorder: styleMarker.colorBorder,
					width: this.options.map.markers.width,
					height: this.options.map.markers.height
				}),
				labelOrigin: new window.google.maps.Point(offsetXLabel, offsetYLabel)
			}
		} else {
			return null
		}
	}

	generateSVG (options) {
		let customSVG = {
			mimetype: 'data:image/svg+xml;base64,',
			svg: '<svg width="' + options.width + 'px" height="' + options.height + 'px" version="1.1" id="marker-gmap" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="31.5 5.5 70.6 97.9" style="enable-background:new 31.5 5.5 70.6 97.9;" preserveAspectRatio="xMidYMin slice" xml:space="preserve"><path fill="{{colorBorder}}" d="M64.7,102.2c0.1,0.2,0.2,0.3,0.3,0.4c0.4,0.5,1,0.8,1.6,0.8c0.7,0,1.3-0.1,1.8-0.8c0.1-0.1,0.3-0.3,0.3-0.5c7.3-10.9,14.5-21.8,21.5-32.7c4.5-7,9.7-13.8,11.1-22.1c1.7-9.9-0.7-20.1-6.7-28.1C82.7,3.3,59.2,0.9,44,13.7c-7.3,6.1-11.8,15-12.4,24.5c-0.8,10,3,17.6,8.2,25.8C47.8,76.8,56.2,89.5,64.7,102.2z"/><path fill="{{colorBackground}}" class="st0" d="M97.1,47.2c-1.5,7.3-6.6,13.8-10.7,20c-6.4,10.1-12.9,20-19.6,29.9c-5.7-8.3-11.2-16.6-16.6-25c-3.7-5.7-7.5-11.4-10.8-17.3c-5.2-9.2-4.6-21.2,0.9-30.2C50.7,7.1,75.6,4.6,89.4,19.4C96.3,26.8,99.1,37.4,97.1,47.2z"/></svg>'
		}

		customSVG.scaledSize = new window.google.maps.Size(options.width, options.height)
		return customSVG.mimetype + btoa(customSVG.svg.replace('{{colorBorder}}', options.colorBorder).replace('{{colorBackground}}', options.colorBackground))
	}

	ajax (options) {
		let request = new XMLHttpRequest()
		let typeRequest = options.type
		let sendData = typeRequest === 'POST' ? options.data : ''

		request.open(typeRequest, options.url)

		if (typeRequest === 'POST') {
			request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
		}
		request.onload = function () {
			if (request.status >= 200 && request.status < 400) {
				// Success!
				options.success(request)
			} else {
				// We reached our target server, but it returned an error
				options.error(request)
			}
		}
		request.onerror = function () {
			// There was a connection error of some sort
			options.error(request)
		}
		request.send(sendData)
	}

	/* eslint-disable no-console */
	log (method, message) {
		if (this.options.debug) {
			console[method](message)
		}
	}
	/* eslint-enable no-console */
}
