import { fetchFromGeocoder } from 'shared/utils/utils'

export default async function googleMapsGeocode({ value, countries, token }) {
	// @todo: CORS error
	const response = await fetchFromGeocoder(
		`https://maps.googleapis.com/maps/api/geocode/json?address=${value}&region=${countries}&key=${token}`
	)
	return response.results.map((result) => {
		return {
			text: result.formatted_address,
			lat: result.geometry.location.lat(),
			lng: result.geometry.location.lng()
		}
	})
}
