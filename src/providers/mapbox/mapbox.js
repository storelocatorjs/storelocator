import 'mapbox-gl/dist/mapbox-gl.css'

import { extend } from 'shared/utils/utils'
import markerSvg from 'shared/assets/svgs/marker.svg'
import mapboxgl from '!mapbox-gl'
import TemplatePopup from 'components/popup/templates/popup.js'

export default function MapboxProvider(Map, options) {
	return class MapMapbox extends Map {
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
				this.initMapbox().then(() => {
					resolve()
				})
			})
		}

		/**
		 * Initialize the player
		 */
		initMapbox() {
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

				mapboxgl.accessToken = this.Storelocatorjs.mapBoxToken
				this.instance = new mapboxgl.Map({
					container: 'storelocator-mapCanvas',
					style: 'mapbox://styles/mapbox/streets-v12',
					center: mapOptions.center,
					zoom: 6
				})

				resolve()
			})
		}

		getInstance() {
			return this.instance
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

		latLng({ lat, lng }) {
			return new mapboxgl.LngLat(lng, lat)
		}

		createMarker({ feature, type }) {
			const svgData = this.options.map.markers[type]
			const markerIcon = document.createElement('div')
			markerIcon.classList.add('storelocator-marker')
			markerIcon.insertAdjacentHTML('beforeend', svgData.svg)

			const marker = new mapboxgl.Marker({
				element: markerIcon,
				draggable: true
			})
				.setLngLat(feature.position)
				.addTo(this.instance)

			if (type !== 'geolocation') {
				const popup = new mapboxgl.Popup().setHTML(
					TemplatePopup({
						feature
					})
				)
				marker.setPopup(popup)
			}

			return marker
		}

		removeMarker(marker) {
			marker.remove()
		}

		createOverlay({ boundsGlobal, boundsWithLimit }) {
			// if (this.overlayGlobal !== null) {
			// 	this.overlayGlobal.setMap(null)
			// }

			function getCoordinates(bounds) {
				const east = bounds.getEast()
				const west = bounds.getWest()
				const north = bounds.getNorth()
				const south = bounds.getSouth()
				return [
					[
						[west, south],
						[east, south],
						[east, north],
						[west, north],
						[west, south]
					]
				]
			}

			this.instance.addLayer({
				id: 'overlayGlobal',
				type: 'fill',
				source: {
					type: 'geojson',
					data: {
						type: 'Feature',
						geometry: {
							type: 'Polygon',
							coordinates: getCoordinates(boundsGlobal)
						}
					}
				},
				layout: {},
				paint: {
					'fill-color': '#ff0000',
					'fill-opacity': 0.35
				}
			})

			// if (this.overlayLimit !== null) {
			// 	this.overlayLimit.setMap(null)
			// }

			this.instance.addLayer({
				id: 'overlayLimit',
				type: 'fill',
				source: {
					type: 'geojson',
					data: {
						type: 'Feature',
						geometry: {
							type: 'Polygon',
							coordinates: getCoordinates(boundsWithLimit)
						}
					}
				},
				layout: {},
				paint: {
					'fill-color': '#54ff00',
					'fill-opacity': 0.35
				}
			})
		}

		resize() {
			this.instance.resize()
		}

		destroy() {}
	}
}
