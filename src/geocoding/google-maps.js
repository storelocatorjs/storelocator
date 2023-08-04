export default function googleMapsGeocode({ value }) {
	return new window.Promise((resolve) => {
		new window.google.maps.Geocoder()
			.geocode({ address: value })
			.then((response) => {
				const results = response.results.map((result) => {
					return {
						text: result.formatted_address,
						lat: result.geometry.location.lat(),
						lng: result.geometry.location.lng()
					}
				})
				resolve(results)
			})
			.catch((e) => {
				console.warn('Geocode was not successful for the following reason: ' + e)
			})
	})
}
