import { OpenStreetMapProvider } from 'leaflet-geosearch'

export default function openStreetMapGeocode({ value }) {
	return new window.Promise((resolve) => {
		new OpenStreetMapProvider()
			.search({ query: value })
			.then((response) => {
				console.log('openStreetMapGeocode', response)

				const results = response.map((result) => {
					return {
						text: result.label,
						lat: result.x,
						lng: result.y
					}
				})
				resolve(results)
			})
			.catch((e) => {
				console.warn('Geocode was not successful for the following reason: ' + e)
			})
	})
}
