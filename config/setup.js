const fs = require('fs')
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../examples/.env') })

let googleMapsToken = process.env.GOOGLEMAPS_TOKEN
let mapBoxToken = process.env.MAPBOX_TOKEN
let jawgToken = process.env.JAWG_TOKEN

if (process.env.CI) {
	googleMapsToken = 'xxxx'
	mapBoxToken = 'xxxx'
	jawgToken = 'xxxx'
}

if (googleMapsToken && mapBoxToken && jawgToken) {
	const data = JSON.stringify(
		{
			GOOGLEMAPS_TOKEN: process.env.GOOGLEMAPS_TOKEN,
			MAPBOX_TOKEN: process.env.MAPBOX_TOKEN,
			JAWG_TOKEN: process.env.JAWG_TOKEN
		},
		null,
		'\t'
	)

	fs.writeFile(path.resolve(__dirname, '../examples/credentials.json'), data, 'utf8', (err) => {
		if (err) {
			console.error('An error occured when creating credentials file', err)
		} else {
			console.log('Credentials file created')
		}
	})
} else {
	throw new Error(
		'Environments variables are missing in .env ("GOOGLEMAPS_TOKEN", "MAPBOX_TOKEN", "JAWG_TOKEN")'
	)
}
