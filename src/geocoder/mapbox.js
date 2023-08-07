import { fetchFromGeocoder } from 'shared/utils/utils'

export default async function mapBoxGeocode({ value, countries, token, limit = 5 }) {
	const response = await fetchFromGeocoder(
		`https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json?limit=${limit}&access_token=${token}&country=${countries}`
	)
	return response.features.map(({ place_name, geometry: { coordinates } }) => {
		return {
			text: place_name,
			lat: coordinates[1],
			lng: coordinates[0]
		}
	})
}