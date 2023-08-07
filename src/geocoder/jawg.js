import { fetchFromGeocoder } from 'shared/utils/utils'

export default async function jawgGeocode({ value, countries, token }) {
	const response = await fetchFromGeocoder(
		`https://api.jawg.io/places/v1/search?text=${value}&boundary.country=${countries}&access-token=${token}`
	)
	return response.features.map(({ geometry, properties }) => {
		return {
			text: properties.label,
			lat: geometry.coordinates[1],
			lng: geometry.coordinates[0]
		}
	})
}
