const fs = require('fs')
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../examples/.env') })

let apiKey = process.env.GOOGLE_MAPS_API_KEY
let mapBoxToken = process.env.MAPBOX_TOKEN

if (process.env.CI) {
	apiKey = 'xxxx'
}

if (apiKey) {
	const data = JSON.stringify(
		{
			GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
			MAPBOX_TOKEN: process.env.MAPBOX_TOKEN
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
	throw new Error('Environment variable "GOOGLE_MAPS_API_KEY" is missing in .env')
}
