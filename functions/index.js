const storesDB = require('./database.json')
const Stores = require('./stores.js')
const app = require('express')()
const bodyParser = require('body-parser')
const cors = require('cors')

const port = 8000

app.use(cors())

// Enable JSON parser
app.use(bodyParser.json())

// Set the default route
app.get('/', (request, response) => {
	response.header('Content-type', 'application/json')

	// Get request parameters
	const lat = request.body.lat || null
	const lng = request.body.lng || null
	const categories = request.body.categories || []
	const radius = request.body.radius || null
	const limit = request.body.limit || null
	let results = null

	// Filter stores if parameters are valid
	if (lat && lng && !isNaN(lat) && !isNaN(lng)) {
		const appStores = new Stores({
			database: storesDB,
			lat,
			lng,
			categories,
			radius,
			limit
		})
		results = appStores.filter()
	}

	// Send status 200 with JSON results
	response.status(200).json(results)
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})

// module.exports = app
