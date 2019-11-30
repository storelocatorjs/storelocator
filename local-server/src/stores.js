/**
 * Class Stores to filter stores in Node.js
 * @module storelocatorjs/Stores
 */
const Stores = class Stores {
	/**
	 * Instanciate the constructor
	 * @constructor
	 * @param {Object} database Database of stores (JSON)
	 * @param {String} lat Latitude of the request
	 * @param {String} lng Longitude of the request
	 * @param {Array} categories Selected categories of the request
	 * @param {Integer} radius Radius of the request
	 * @param {Integer} limit Limit of results of the request
	 */
	constructor ({database, lat, lng, categories = [], radius = 50, limit = 0}) {
		this.database = database
		this.lat = lat
		this.lng = lng
		this.categories = categories
		this.radius = radius
		this.limit = limit
	}

	/**
	 * Filter stores according to request options
	 * @return {Object} List of stores filtered (JSON)
	 */
	filter () {
		// Check if the request is filtered by category
		let stores = this.categories.length === 0 ? this.database : this.filterStoreByCategory(this.categories)

		// Filter store by geoposition
		return this.filterStoreByGeoPosition(stores)
	}

	/**
	 * Filter store by categories in the database
	 * @param {Array} categories Array of selected categories
	 * @return {Object} Stores filtered by categories
	 */
	filterStoreByCategory (categories) {
		let storesFiltered = []

		// Loop on all stores, with filter
		for (let i = 0, lengthStores = this.database.length; i < lengthStores; i++) {
			let currentStore = this.database[i]
			if (categories.indexOf(currentStore.category) !== -1) {
				storesFiltered.push(currentStore)
			}
		}

		return storesFiltered
	}

	/**
	 * Filter store by geoposition
	 * @param {Object} stores Stores filtered by categories
	 * @return {Object} Stores filtered by geoposition
	 */
	filterStoreByGeoPosition (stores) {
		let listStores = []
		let currentStore
		let storesByDistance

		// Loop on all store and calculate distance between point
		for (let i = 0, lengthStores = stores.length; i < lengthStores; i++) {
			currentStore = stores[i]

			// Calculate the distance between store coordinate and request coordinate
			storesByDistance = this.getDistanceBetweenCoordinate({
				lat1: this.lat,
				lng1: this.lng,
				lat2: currentStore.lat,
				lng2: currentStore.lng,
				unit: 'K'
			})
			currentStore.distance = storesByDistance
			listStores.push(currentStore)
		}

		// Sort by distance to mapcenter
		listStores.sort((arrayA, arrayB) => {
			if (arrayA.distance < arrayB.distance) {
				return -1
			} else if (arrayA.distance > arrayB.distance) {
				return 1
			} else {
				return 0
			}
		})

		let storesFiltered = []
		for (let i = 0, lengthStores = listStores.length; i < lengthStores; i++) {
			if (listStores[i].distance > this.radius) {
				break
			}
			storesFiltered.push(listStores[i])
			if (this.limit !== 0 && storesFiltered.length === this.limit) {
				break
			}
		}

		return storesFiltered
	}

	// This routine calculates the distance between two points (given the
	// latitude/longitude of those points). It is being used to calculate
	// the distance between two locations using GeoDataSource(TM) Products
	//
	// Definitions:
	//   South latitudes are negative, east longitudes are positive
	//
	// Passed to function:
	//   lat1, lon1 = Latitude and Longitude of point 1 (in decimal degrees)
	//   lat2, lon2 = Latitude and Longitude of point 2 (in decimal degrees)
	//   unit = the unit you desire for results
	//          where: 'M' is statute miles (default)
	//                 'K' is kilometers
	//                 'N' is nautical miles
	// Worldwide cities and other features databases with latitude longitude
	// are available at http://www.geodatasource.com
	//
	// For enquiries, please contact sales@geodatasource.com
	//
	// Official Web site: http://www.geodatasource.com
	//
	// GeoDataSource.com (C) All Rights Reserved 2015
	getDistanceBetweenCoordinate ({lat1, lng1, lat2, lng2, unit}) {
		let theta = lng1 - lng2
		let dist =
			Math.sin(this.deg2rad(lat1)) * Math.sin(this.deg2rad(lat2)) +
			Math.cos(this.deg2rad(lat1)) *
			Math.cos(this.deg2rad(lat2)) *
			Math.cos(this.deg2rad(theta))
		let miles = this.rad2deg(Math.acos(dist)) * 60 * 1.1515
		unit = unit.toUpperCase()

		if (unit === 'K') {
			return miles * 1.609344
		} else if (unit === 'N') {
			return miles * 0.8684
		} else {
			return miles
		}
	}

	/**
	 * Utils function to calculate a degree to a radius
	 * @param {Float} x Number
	 * @return Radius number
	 */
	deg2rad (x) {
		return x * (Math.PI / 180)
	}

	/**
	 * Utils function to calculate a radius to a degree
	 * @param {Float} x Number
	 * @return Degree number
	 */
	rad2deg (x) {
		return x * (180 / Math.PI)
	}
}

module.exports = Stores
