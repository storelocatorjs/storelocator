import 'leaflet/dist/leaflet.css'

import { extend } from 'shared/utils/utils'
import markerSvg from 'shared/assets/svgs/marker.svg'
import Leaflet from 'leaflet'
import { OpenStreetMapProvider } from 'leaflet-geosearch'

export default function LeafletProvider(Map, options) {
	return class MapLeaflet extends Map {
		constructor(props) {
			super(props)

			this.currentPopup = null
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
				this.initLeaflet().then(() => {
					resolve()
				})
			})
		}

		/**
		 * Initialize the player
		 */
		initLeaflet() {
			return new window.Promise((resolve) => {
				const mapOptions = extend(
					true,
					{
						disableDefaultUI: false,
						fullscreenControl: false,
						mapTypeControl: false,
						mapTypeId: 'roadmap',
						scaleControl: false,
						scrollwheel: true,
						streetViewControl: false,
						styles: [],
						zoom: 6,
						zoomControl: false
					},
					this.Storelocatorjs.options.map.options
				)

				mapOptions.center = this.latLng({
					lat: mapOptions.center[0],
					lng: mapOptions.center[1]
				})

				this.instance = Leaflet.map('storelocator-mapCanvas', {
					center: mapOptions.center,
					zoomControl: false,
					zoom: 6
				})

				Leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png?', {
					maxZoom: 19,
					attribution: '© OpenStreetMap'
				}).addTo(this.instance)

				resolve()
			})
		}

		setCenter({ lat, lng }) {
			this.instance.setView(this.latLng({ lat, lng }))
		}

		getInstance() {
			return this.instance
		}

		latLngBounds() {
			return Leaflet.latLngBounds()
		}

		latLngBoundsExtend({ latLngBounds, latLng }) {
			latLngBounds.extend(latLng)
		}

		fitBounds({ latLngBounds }) {
			this.instance.fitBounds(latLngBounds)
		}

		latLng({ lat, lng }) {
			return Leaflet.latLng(lat, lng)
		}

		createMarker({ feature, type }) {
			const svgData = this.options.map.markers[type]

			const marker = Leaflet.marker(feature.position, {
				icon: Leaflet.divIcon({
					html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="${svgData.path}"/></svg>`,
					iconSize: [svgData.width, svgData.height],
					iconAnchor: [12, 40]
				})
			}).addTo(this.instance)

			// window.google.maps.event.addListener(marker, 'click', this.onClickOnMarker)

			return marker
		}

		removeMarker(marker) {
			this.instance.removeLayer(marker)
		}

		openPopup({ template, marker }) {
			const popup = marker.bindPopup(template, {
				offset: Leaflet.point(0, -35)
			})

			if (this.currentPopup !== null) {
				this.closePopup.close()
			}

			this.currentPopup = popup

			popup.openPopup()
		}

		createOverlay({ boundsGlobal, boundsWithLimit }) {
			Leaflet.rectangle(boundsGlobal, { color: '#ff0000', weight: 1 }).addTo(this.instance)
			Leaflet.rectangle(boundsWithLimit, { color: '#54ff00', weight: 1 }).addTo(this.instance)
		}

		resize() {
			this.instance.invalidateSize()
		}

		destroy() {}
	}
}
