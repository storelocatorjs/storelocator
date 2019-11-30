'use strict'

const functions = require('firebase-functions')
const storesDB = require('../../json-datas/stores-full.json')
const Stores = require('./stores.js')

exports.Stores = functions
	.region('europe-west1')
	.https.onRequest((request, response) => {
		// if (request.method === 'OPTIONS') {
		// 	// Send response to OPTIONS requests
		// 	response.set('Access-Control-Allow-Methods', 'POST')
		// 	response.set('Access-Control-Allow-Headers', 'Content-Type')
		// 	response.set('Access-Control-Max-Age', '3600')
		// 	response.status(204).send('')
		// } else {

		response.set('Access-Control-Allow-Origin', 'https://yoriiis.github.io')
		response.set('Access-Control-Allow-Methods', 'POST')

		// Get request parameters
		const lat = request.query['lat'] || 'null2'
		const lng = request.query['lng'] || null
		const categories = request.query['categories'] || []
		const radius = request.query['radius'] || null
		const limit = request.query['limit'] || null
		let results = null

		// // Filter stores if parameters are valid
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

		// Send status 200 with JSON results
		response.status(200).send(results)
		// }
	})
