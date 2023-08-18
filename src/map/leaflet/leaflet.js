import 'leaflet/dist/leaflet.css'
import Leaflet from 'leaflet'

export default function LeafletMap(Map) {
	return class LeafletMap extends Map {
		constructor(props) {
			super(props)

			this.map = props.map
		}

		init() {
			this.waitUntilApiIsReady().then(() => super.onReady())
		}

		waitUntilApiIsReady() {
			return new window.Promise((resolve) => {
				this.initLeaflet().then(resolve)
			})
		}

		initLeaflet() {
			return new window.Promise((resolve) => {
				const mapOptions = this.utils().extend(
					true,
					{
						center: [46.227638, 2.213749],
						zoomControl: false,
						zoom: 6
					},
					this.map.options
				)

				this.instance = Leaflet.map('sl-map', mapOptions)

				Leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png?', {
					maxZoom: 19,
					attribution: '© OpenStreetMap'
				}).addTo(this.instance)

				resolve()
			})
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
			const marker = Leaflet.marker(feature.latLng, {
				icon: Leaflet.divIcon({
					className: `sl-marker sl-marker-${type}`,
					html: this.markerWithColors[type]
				})
			}).addTo(this.instance)

			marker.feature = feature

			if (type !== 'geolocation') {
				marker.bindPopup(
					this.getPopupTemplate()({
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

		resize() {
			this.instance.invalidateSize()
		}

		destroy() {}
	}
}
