import { extend } from '../../utils'
import markerSvg from '../../../svg/marker.svg'
import Leaflet from 'leaflet'
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch'

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

				this.instance = Leaflet.map('storelocator-googleMapsCanvas', {
					center: mapOptions.center,
					zoomControl: false,
					zoom: 1
				})

				resolve()
			})
		}

		initAutocomplete() {
			this.instance.addControl(
				new GeoSearchControl({
					provider: new OpenStreetMapProvider(),
					style: 'bar',
					updateMap: false,
					showMarker: false
				})
			)
			this.instance.on('geosearch/showlocation', ({ x, y }) => {
				this.autocompleteRequest({
					lat: y,
					lng: x
				})
			})
		}

		getInstance() {
			return this.instance
		}

		latLngBounds() {
			return Leaflet.latLngBounds
		}

		latLngBoundsExtend({ latLngBounds, latLng }) {
			latLngBounds.extend(latLng)
		}

		fitBounds({ latLngBounds }) {
			this.instance.fitBounds(latLngBounds)
		}

		latLng({ lat, lng }) {
			return Leaflet.latLng(lng, lat)
		}

		createMarker({ feature }) {
			// const marker = new window.google.maps.Marker({
			// 	position: feature.position,
			// 	map: this.instance,
			// 	icon: {
			// 		url: 'data:image/svg+xml;base64,' + btoa(markerSvg),
			// 		scaledSize: new window.google.maps.Size(30, 40)
			// 	},
			// 	properties: feature?.properties
			// })

			const marker = Leaflet.marker([50.5, 30.5]).addTo(this.instance)

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
