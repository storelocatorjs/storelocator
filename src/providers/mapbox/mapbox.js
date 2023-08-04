import 'mapbox-gl/dist/mapbox-gl.css'

import { extend } from 'shared/utils/utils'
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

				this.instance.on('load', () => {
					resolve()
				})
			})
		}

		createCluster() {
			// this.cluster = new MarkerClusterer({ map: this.instance })
			// this.Storelocatorjs.options.cluster.options
		}

		updateCluster({ features }) {
			// this.cluster?.addMarkers(this.markers)

			this.instance.addSource('earthquakes', {
				type: 'geojson',
				// Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
				// from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
				data: {
					features
				},
				cluster: true,
				clusterMaxZoom: 14, // Max zoom to cluster points on
				clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
			})

			this.instance.addLayer({
				id: 'clusters',
				type: 'circle',
				source: 'earthquakes',
				filter: ['has', 'point_count'],
				paint: {
					// Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
					// with three steps to implement three types of circles:
					//   * Blue, 20px circles when point count is less than 100
					//   * Yellow, 30px circles when point count is between 100 and 750
					//   * Pink, 40px circles when point count is greater than or equal to 750
					'circle-color': [
						'step',
						['get', 'point_count'],
						'#51bbd6',
						100,
						'#f1f075',
						750,
						'#f28cb1'
					],
					'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40]
				}
			})

			this.instance.addLayer({
				id: 'cluster-count',
				type: 'symbol',
				source: 'earthquakes',
				filter: ['has', 'point_count'],
				layout: {
					'text-field': ['get', 'point_count_abbreviated'],
					'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
					'text-size': 12
				}
			})

			this.instance.addLayer({
				id: 'unclustered-point',
				type: 'circle',
				source: 'earthquakes',
				filter: ['!', ['has', 'point_count']],
				paint: {
					'circle-color': '#11b4da',
					'circle-radius': 4,
					'circle-stroke-width': 1,
					'circle-stroke-color': '#fff'
				}
			})
		}

		clearCluster() {
			// this.cluster?.removeMarkers()
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

			marker.feature = feature

			if (type !== 'geolocation') {
				const popup = new mapboxgl.Popup().setHTML(
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

		createOverlay({ boundsGlobal }) {
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

			this.overlayGlobal = this.instance.addLayer({
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
					'fill-color': '#54ff00',
					'fill-opacity': 0.35
				}
			})
		}

		removeOverlay() {
			const layerGlobal = this.instance.getLayer('overlayGlobal')
			if (layerGlobal) {
				this.instance.removeLayer('overlayGlobal')
				this.instance.removeSource('overlayGlobal')
			}
		}

		resize() {
			this.instance.resize()
		}

		destroy() {}
	}
}
