import 'maplibre-gl/dist/maplibre-gl.css'
import markerSvg from 'shared/assets/svgs/marker.svg'

import Map from 'core/map'
import { extend } from 'shared/utils/utils'
import maplibregl from '!maplibre-gl'
import TemplatePopup from 'components/popup/templates/popup.js'

export default class MapMapLibre extends Map {
	constructor(props) {
		super(props)

		this.map = props.map
	}

	init() {
		this.waitUntilApiIsReady().then(() => {
			super.onReady()
		})
	}

	/**
	 * Wait until the API is ready
	 * @returns The player is ready
	 */
	waitUntilApiIsReady() {
		return new window.Promise((resolve) => {
			this.initMapLibre().then(() => {
				resolve()
			})
		})
	}

	/**
	 * Initialize the player
	 */
	initMapLibre() {
		return new window.Promise((resolve) => {
			const mapOptions = extend(
				true,
				{
					container: 'sl-map',
					style: 'https://demotiles.maplibre.org/style.json',
					center: [2.213749, 46.227638],
					zoom: 6
				},
				this.map.options
			)

			this.instance = new maplibregl.Map(mapOptions)

			resolve()
		})
	}

	getInstance() {
		return this.instance
	}

	getMarkerLatLng(marker) {
		return marker.getLngLat()
	}

	panTo(lngLat) {
		this.instance.panTo(lngLat)
	}

	setZoom(value) {
		this.instance.setZoom(value)
	}

	latLngBounds() {
		return new maplibregl.LngLatBounds()
	}

	latLngBoundsExtend({ latLngBounds, latLng }) {
		latLngBounds.extend(latLng)
	}

	fitBounds({ latLngBounds }) {
		this.instance.fitBounds(latLngBounds)
	}

	latLng({ lat, lng }) {
		return new maplibregl.LngLat(lng, lat)
	}

	createMarker({ feature, type }) {
		const markerIcon = document.createElement('div')
		markerIcon.classList.add('sl-marker', `sl-marker-${type}`)
		markerIcon.insertAdjacentHTML('beforeend', markerSvg)

		const marker = new maplibregl.Marker({
			element: markerIcon,
			draggable: true
		})
			.setLngLat(feature.latLng)
			.addTo(this.instance)

		marker.feature = feature

		if (type !== 'geolocation') {
			const popup = new maplibregl.Popup().setHTML(
				TemplatePopup({
					feature
				})
			)
			popup.on('open', () => {
				this.currentPopup = popup
			})
			marker.setPopup(popup)
		}

		return marker
	}

	openPopup(marker) {
		if (this.currentPopup) {
			this.currentPopup.remove()
			this.currentPopup = null
		}

		if (!marker.getPopup().isOpen()) {
			marker.togglePopup()
		}
	}

	removeMarker(marker) {
		marker.remove()
	}

	resize() {
		this.instance.resize()
	}

	destroy() {}
}
