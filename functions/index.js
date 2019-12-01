'use strict'

const storesDB = require('./database.json')
const Stores = require('./stores.js')
const functions = require('firebase-functions')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

// CORS configuration (add whitelist domain)
app.use(
	cors({
		origin: process.env.CLOUD_FUNCTION_DOMAIN
	})
)

// Enable JSON parser
app.use(bodyParser.json())

// Set the default route
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

// Set the cloud function
const stores = functions.region('europe-west1').https.onRequest(app)

// Export the cloud function
module.exports = {
	stores
}
