import { fetchFromGeocoder } from 'shared/utils/utils'

export default async function googleMapsGeocode({ value, countries, token }) {
	return new window.Promise((resolve) => {
		fetchFromGeocoder(
			`https://maps.googleapis.com/maps/api/geocode/json?address=${value}&region=${countries}&key=${token}`
		).then((response) =>
			resolve(
				response.results.map((result) => ({
					text: result.formatted_address,
					lat: result.geometry.location.lat,
					lng: result.geometry.location.lng
				}))
			)
		)
	})
}
