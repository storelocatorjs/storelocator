const storesDB = require('./datas/stores.json')
const Stores = require('./stores.js')
const fs = require('fs')
const https = require('https')
const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.post('/', (request, response) => {
	response.header('Content-type', 'application/json')

	response.header('Access-Control-Allow-Origin', '*')
	response.set('Access-Control-Allow-Methods', 'GET')
	// response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
	// response.set('Access-Control-Allow-Origin', 'http://sandbox.local')

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
	// console.log(results.length)
	response.status(200).json(results)
})
app.listen(port, () => console.log(`Server listening on port ${port}`))

// https.createServer({
// 	key: fs.readFileSync('./certificates/key.pem'),
// 	cert: fs.readFileSync('./certificates/cert.pem')
// }, app).listen(3000)

// https://127.0.0.1/stores?lat=48.8589507&lng=2.2770202&categories=[%221%22,%222%22,%223%22]&radius=50&storesLimit=0&input=Paris,%20France
app.get('/stores', function (request, response) {
	response.header('Content-type', 'application/json')
	// Set header origin
	// response.set('Access-Control-Allow-Origin', '*')
	response.set('Access-Control-Allow-Methods', 'POST')

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

app.get('*', function (req, res) {
	res.send('what???', 404)
})
