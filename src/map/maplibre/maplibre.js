import 'maplibre-gl/dist/maplibre-gl.css'
import maplibregl from '!maplibre-gl'

export default function MapLibre(Map) {
	return class MapLibre extends Map {
		constructor(props) {
			super(props)

			this.map = props.map
		}

		init() {
			this.waitUntilApiIsReady().then(() => super.onReady())
		}

		waitUntilApiIsReady() {
			return new window.Promise((resolve) => {
				this.initMapLibre().then(resolve)
			})
		}

		initMapLibre() {
			return new window.Promise((resolve) => {
				const mapOptions = this.utils().extend(
					true,
					{
						container: 'sl-mapCanvas',
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
			return new maplibregl.LngLatBounds()
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
			return new maplibregl.LngLat(lng, lat)
		}

		getLatLngWithOffset({ latLng, offsetX = 0, offsetY = 0 }) {
			const { x, y } = this.instance.project(latLng)
			return this.instance.unproject(this.point(x - offsetX, y + offsetY))
		}

		point(x, y) {
			return new maplibregl.Point(x, y)
		}

		createMarker({ feature, type }) {
			const markerIcon = document.createElement('div')
			markerIcon.classList.add('sl-marker', `sl-marker-${type}`)
			markerIcon.insertAdjacentHTML('beforeend', this.markerWithColors[type])

			const marker = new maplibregl.Marker({
				element: markerIcon,
				draggable: true
			})
				.setLngLat(feature.latLng)
				.addTo(this.instance)

			marker.feature = feature

			if (type !== 'geolocation') {
				const popup = new maplibregl.Popup().setHTML(
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
