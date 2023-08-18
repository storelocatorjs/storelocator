import { fetchFromGeocoder } from 'shared/utils/utils'

export default async function jawgGeocode({ value, countries, token }) {
	const response = await fetchFromGeocoder(
		`https://api.jawg.io/places/v1/search?text=${value}&boundary.country=${countries}&access-token=${token}`
	)
	return response.features.map((result) => {
		return {
			text: result.properties.label,
			lat: result.geometry.coordinates[1],
			lng: result.geometry.coordinates[0]
		}
	})
}
