export default function GoogleMaps(Map) {
	return class GoogleMaps extends Map {
		constructor(props) {
			super(props)

			this.map = props.map
			this.currentPopup = null
			this.markerWithColors = {
				search: '',
				geolocation: ''
			}
		}

		init() {
			this.waitUntilApiIsReady().then(() => super.onReady())
		}

		waitUntilApiIsReady() {
			return new window.Promise((resolve) => {
				// @todo: check if sdk is already loaded
				window.googleMapLoaded = () => this.initGoogleMaps().then(resolve)
				this.loadSdk()
			})
		}

		initGoogleMaps() {
			return new window.Promise((resolve) => {
				if (this.map.options?.center) {
					this.map.options.center = {
						lat: this.map.options.center[0],
						lng: this.map.options.center[1]
					}
				}

				const mapOptions = this.utils().extend(
					true,
					{
						center: {
							lat: 46.227638,
							lng: 2.213749
						},
						disableDefaultUI: true,
						fullscreenControl: false,
						mapTypeControl: false,
						mapTypeId: 'roadmap',
						scaleControl: false,
						scrollwheel: true,
						streetViewControl: false,
						zoom: 6
					},
					this.map.options
				)

				this.instance = new window.google.maps.Map(
					document.querySelector('#sl-mapCanvas'),
					mapOptions
				)

				resolve()
			})
		}

		loadSdk() {
			const script = document.createElement('script')
			script.async = true
			script.type = 'text/javascript'
			script.src = `https://maps.googleapis.com/maps/api/js?key=${this.map.token}&callback=window.googleMapLoaded`
			document.getElementsByTagName('body')[0].appendChild(script)
		}

		getInstance() {
			return this.instance
		}

		getMarkerLatLng(marker) {
			return marker.getPosition()
		}

		panTo(latLng) {
			// @todo: move common method into base class?
			this.instance.panTo(latLng)
		}

		panBy(x, y) {
			this.instance.panBy(x, y)
		}

		setZoom(value) {
			this.instance.setZoom(value)
		}

		getZoom() {
			return this.instance.getZoom()
		}

		latLngBounds() {
			return new window.google.maps.LatLngBounds()
		}

		latLngBoundsExtend({ latLngBounds, latLng }) {
			latLngBounds.extend(latLng)
		}

		fitBounds({ latLngBounds }) {
			this.instance.fitBounds(latLngBounds)
		}

		onFitBoundsEnd(callback) {
			callback()
		}

		latLng({ lat, lng }) {
			return new window.google.maps.LatLng(lat, lng)
		}

		getLatLngWithOffset({ latLng, offsetX = 0, offsetY = 0 }) {
			const scale = Math.pow(2, this.getZoom())
			const projection = this.instance.getProjection()
			const { x, y } = projection.fromLatLngToPoint(latLng)
			return projection.fromPointToLatLng(
				this.point(x - offsetX / scale, y + offsetY / scale)
			)
		}

		point(x, y) {
			return new google.maps.Point(x, y)
		}

		createMarker({ feature, type }) {
			const marker = new window.google.maps.Marker({
				position: feature.latLng,
				map: this.instance,
				icon: {
					url: `${'data:image/svg+xml;charset=utf-8,'}${encodeURIComponent(
						this.markerWithColors[type]
					)}`
				}
			})

			marker.feature = feature

			if (type !== 'geolocation') {
				marker.addListener('click', () => {
					this.openPopup(marker)
				})
			}

			return marker
		}

		removeMarker(marker) {
			window.google.maps.event.clearInstanceListeners(marker)
			marker.setMap(null)
		}

		openPopup(marker) {
			const popup = new window.google.maps.InfoWindow({ disableAutoPan: true })
			popup.setContent(
				this.getPopupTemplate()({
					feature: marker.feature
				})
			)

			this.currentPopup && this.currentPopup.close()
			this.currentPopup = popup

			popup.open(this.instance, marker)
		}

		resize() {
			window.google.maps.event.trigger(this.instance, 'resize')
		}

		destroy() {
			this.instance = null
			// this.instance.destroy()
			super.destroy()
		}
	}
}
