import 'leaflet/dist/leaflet.css'

import { extend } from 'shared/utils/utils'
import markerSvg from 'shared/assets/svgs/marker.svg'
import Leaflet from 'leaflet'
import TemplatePopup from 'components/popup/templates/popup.js'
import 'leaflet.markercluster'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'

export default function LeafletProvider(Map, options) {
	return class MapLeaflet extends Map {
		constructor(props) {
			super(props)
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

		createCluster() {
			// this.Storelocatorjs.options.cluster.options
			this.cluster = Leaflet.markerClusterGroup({
				showCoverageOnHover: false,
				zoomToBoundsOnClick: true
			})
		}

		updateCluster() {
			this.cluster?.addLayers(this.markers)
			this.instance.addLayer(this.cluster)
		}

		clearCluster() {
			this.cluster?.clearLayers()
			this.cluster?.removeLayers(this.markers)
		}

		getInstance() {
			return this.instance
		}

		getMarkerLatLng(marker) {
			return marker.getLatLng()
		}

		panTo(latLng) {
			this.instance.panTo(latLng)
		}

		setZoom(value) {
			this.instance.setZoom(value)
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
				icon: L.icon({
					iconUrl: `${'data:image/svg+xml;charset=utf-8,'}${encodeURIComponent(
						svgData.svg
					)}`
				})
			}).addTo(this.instance)

			marker.feature = feature

			if (type !== 'geolocation') {
				marker.bindPopup(
					TemplatePopup({
						feature: marker.feature
					})
				)
			}

			return marker
		}

		openPopup(marker) {
			marker.openPopup()
		}

		removeMarker(marker) {
			this.instance.removeLayer(marker)
		}

		createOverlay({ boundsGlobal }) {
			this.overlayGlobal = Leaflet.rectangle(boundsGlobal, {
				color: '#54ff00',
				weight: 1,
				fillOpacity: 0.35
			}).addTo(this.instance)
		}

		removeOverlay() {
			this.overlayGlobal && this.overlayGlobal.remove()
		}

		resize() {
			this.instance.invalidateSize()
		}

		destroy() {}
	}
}
