const storesDB = require('./datas/stores-full.json')
const Stores = require('./stores.js')
const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())

app.post('/', (request, response) => {
	response.header('Content-type', 'application/json')

	// Get request parameters
	const lat = request.body['lat'] || null
	const lng = request.body['lng'] || null
	const categories = request.body['categories'] || []
	const radius = request.body['radius'] || 50
	const limit = request.body['storesLimit'] || 0
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
	response.status(200).json(results)
})

app.get('*', function (req, res) {
	res.send('404 Not found', 404)
})

app.listen(port, () => console.log(`Server listening on port ${port}`))
