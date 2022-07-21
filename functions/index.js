/**
 * @name Storelocatorjs/CloudFunction
 * @version 1.0.0
 * @license GPLv3 for Open Source use or Storelocatorjs Commercial License for commercial use
 * @author: Joris DANIEL aka Yoriiis
 * @description: Storelocatorjs cloud function
 * {@link https://yoriiis.github.io/storelocatorjs}
 * @copyright 2019 Joris DANIEL aka Yoriiis <https://yoriiis.github.io/storelocatorjs>
 */

const database = require('./database.json')
const Stores = require('./stores.js')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

// CORS configuration (add whitelist domain)
app.use(cors())

// Enable JSON parser
app.use(bodyParser.json())

// Set the default route
app.post('/', (request, response) => {
	response.header('Content-type', 'application/json')

	// Get request parameters
	const lat = request.body['lat'] || null
	const lng = request.body['lng'] || null
	const radius = request.body['radius'] || null
	const limit = request.body['limit'] || null
	let results = null

	// Filter stores if parameters are valid
	if (lat && lng && !isNaN(lat) && !isNaN(lng)) {
		const appStores = new Stores({
			database,
			lat,
			lng,
			radius,
			limit
		})
		results = appStores.filter()
	}

	// Send status 200 with JSON results
	response.status(200).json(results)
})

const port = 3001

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
