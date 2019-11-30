'use strict'

const functions = require('firebase-functions')
const storesDB = require('./json-datas/stores-full.json')
const Stores = require('./stores.js')

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

// Enable CORS
app.use(cors())

// Enable JSON parser
app.use(bodyParser.json())

app.post('/', (request, response) => {
	response.header('Content-type', 'application/json')

	// Get request parameters
	const lat = request.body['lat'] || null
	const lng = request.body['lng'] || null
	const categories = request.body['categories'] || []
	const radius = request.body['radius'] || null
	const limit = request.body['limit'] || null
	let results = null

	// Filter stores if parameters are valid
	if (lat && lng && !isNaN(lat) && !isNaN(lng)) {
		const appStores = new Stores({
			database: storesDB,
			lat: lat,
			lng: lng,
			categories: categories,
			radius: radius,
			limit: limit
		})
		results = appStores.filter()
	}

	// Send status 200 with JSON results
	response.status(200).json(results)
})

const stores = functions.region('europe-west1').https.onRequest(app)

module.exports = {
	stores
}
