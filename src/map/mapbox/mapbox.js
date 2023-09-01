import 'mapbox-gl/dist/mapbox-gl.css'
import mapboxgl from 'mapbox-gl'

export default function Mapbox(Map) {
	return class Mapbox extends Map {
		constructor(props) {
			super(props)

			this.map = props.map
			this.currentPopup = null
		}

		init() {
			this.waitUntilApiIsReady().then(() => super.onReady())
		}

		waitUntilApiIsReady() {
			return new window.Promise((resolve) => {
				this.initMapbox().then(resolve)
			})
		}

		initMapbox() {
			return new window.Promise((resolve) => {
				const mapOptions = this.utils().extend(
					true,
					{
						container: 'sl-mapCanvas',
						style: 'mapbox://styles/mapbox/streets-v12',
						center: [2.213749, 46.227638],
						zoom: 6
					},
					this.map.options
				)

				mapboxgl.accessToken = this.map.token
				this.instance = new mapboxgl.Map(mapOptions)
				this.instance.on('load', resolve)
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

		panBy(x, y) {
			this.instance.panBy(this.point(x, y))
		}

		setZoom(value) {
			this.instance.setZoom(value)
		}

		getZoom() {
			return this.instance.getZoom()
		}

		latLngBounds() {
			return new mapboxgl.LngLatBounds()
		}

		latLngBoundsExtend({ latLngBounds, latLng }) {
			latLngBounds.extend(latLng)
		}

		fitBounds({ latLngBounds }) {
			this.instance.fitBounds(latLngBounds)
		}

		onFitBoundsEnd(callback) {
			const context = this
			function onMoveEnd() {
				context.instance.off('moveend', onMoveEnd)
				callback()
			}
			this.instance.on('moveend', onMoveEnd)
		}

		latLng({ lat, lng }) {
			return new mapboxgl.LngLat(lng, lat)
		}

		getLatLngWithOffset({ latLng, offsetX = 0, offsetY = 0 }) {
			const { x, y } = this.instance.project(latLng)
			return this.instance.unproject(this.point(x - offsetX, y + offsetY))
		}

		point(x, y) {
			return new mapboxgl.Point(x, y)
		}

		createMarker({ feature, type }) {
			const markerIcon = document.createElement('div')
			markerIcon.classList.add('sl-marker', `sl-marker-${type}`)
			markerIcon.insertAdjacentHTML('beforeend', this.markerWithColors[type])

			const marker = new mapboxgl.Marker({
				element: markerIcon,
				draggable: true
			})
				.setLngLat(feature.latLng)
				.addTo(this.instance)

			marker.feature = feature

			if (type !== 'geolocation') {
				const popup = new mapboxgl.Popup().setHTML(
					this.getPopupTemplate()({
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

		destroy() {
			this.instance.remove()
			super.destroy()
		}
	}
}
