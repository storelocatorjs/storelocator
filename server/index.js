const storesDB = require('./datas/stores-full.json')
const Stores = require('./stores.js')
const fs = require('fs')
const https = require('https')
const express = require('express')
const app = express()

https.createServer({
	key: fs.readFileSync('./certificates/key.pem'),
	cert: fs.readFileSync('./certificates/cert.pem')
}, app).listen(443)

// https://127.0.0.1/stores?lat=48.8589507&lng=2.2770202&categories=[%221%22,%222%22,%223%22]&radius=50&storesLimit=0&input=Paris,%20France
app.get('/stores', function (request, response) {
	response.header('Content-type', 'application/json')

	// Get request parameters
	const lat = request.query['lat'] || null
	const lng = request.query['lng'] || null
	const categories = request.query['categories'] || []
	const radius = request.query['radius'] || 50
	const limit = request.query['storesLimit'] || 0
	let results = null

	// Filter stores if parameters are valid
	if (lat && lng && !isNaN(lat) && !isNaN(lng)) {
		const stores = new Stores({
			database: storesDB,
			lat: lat,
			lng: lng,
			categories: categories,
			radius: radius,
			limit: limit
		})
		results = stores.filter()
	}

	// Send the result
	return response.status(200).json(results)
})
