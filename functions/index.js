import database from './database.json'
import Stores from './stores.js'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express()
require('dotenv').config()

// CORS configuration (add whitelist domain)
app.use(cors())

// Enable JSON parser
app.use(bodyParser.json())

// Set the default route
app.get('/', (request, response) => {
	response.header('Content-type', 'application/json')

	// Get request parameters
	const lat = request.body.lat || null
	const lng = request.body.lng || null
	const radius = request.body.radius || null
	const limit = request.body.limit || null
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
