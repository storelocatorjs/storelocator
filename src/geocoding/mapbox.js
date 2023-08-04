export default function mapBoxGeocode({ value, token }) {
	return new window.Promise((resolve) => {
		fetch(
			`//api.mapbox.com/geocoding/v5/mapbox.places/${value}.json?limit=2&access_token=${token}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			}
		)
			.then((response) => {
				if (!response.ok) {
					throw new Error(response)
				}
				return response
			})
			.then((res) => res.json())
			.then((response) => {
				const results = response.features.map(
					({ place_name, geometry: { coordinates } }) => {
						return {
							text: place_name,
							lat: coordinates[1],
							lng: coordinates[0]
						}
					}
				)
				resolve(results)
			})
	})
}
