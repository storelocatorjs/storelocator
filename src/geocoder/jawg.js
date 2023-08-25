import { fetchFromGeocoder } from 'shared/utils/utils'

export default async function jawgGeocode({ value, countries, token }) {
	return new window.Promise((resolve) => {
		fetchFromGeocoder(
			`https://api.jawg.io/places/v1/search?text=${value}&boundary.country=${countries}&access-token=${token}`
		).then((response) =>
			resolve(
				response.features.map((result) => ({
					text: result.properties.label,
					lat: result.geometry.coordinates[1],
					lng: result.geometry.coordinates[0]
				}))
			)
		)
	})
}
