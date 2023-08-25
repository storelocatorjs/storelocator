import { fetchFromGeocoder } from 'shared/utils/utils'

export default async function mapBoxGeocode({ value, countries, token, limit = 5 }) {
	return new window.Promise((resolve) => {
		fetchFromGeocoder(
			`https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json?limit=${limit}&access_token=${token}&country=${countries}`
		).then((response) =>
			resolve(
				response.features.map((result) => ({
					text: result.place_name,
					lat: result.geometry.coordinates[1],
					lng: result.geometry.coordinates[0]
				}))
			)
		)
	})
}
