const Stores = class Stores {
	constructor (options) {
		this.options = options
	}

	filter () {
		return this.filterStoreByGeoPosition({
			stores:
				this.options.categories.length === 0
					? this.options.database
					: this.filterStoreByCategory(this.options.categories),
			lat: this.options.lat,
			lng: this.options.lng,
			radius: this.options.radius,
			limit: this.options.limit
		})
	}

	filterStoreByCategory (categories) {
		let storesFiltered = []

		// Search in all stores, with filter
		for (
			let i = 0, lengthStores = this.options.database.length;
			i < lengthStores;
			i++
		) {
			let currentStore = this.options.database[i]
			if (categories.indexOf(currentStore.category) !== -1) {
				storesFiltered.push(currentStore)
			}
		}

		return storesFiltered
	}

	filterStoreByGeoPosition ({ stores, lat, lng, radius, limit }) {
		let listStores = []
		let currentStore
		let storesByDistance

		for (let i = 0, lengthStores = stores.length; i < lengthStores; i++) {
			currentStore = stores[i]
			storesByDistance = this.getDistanceBetweenCoordinate(
				lat,
				lng,
				currentStore.lat,
				currentStore.lng,
				'K'
			)
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
			if (listStores[i].distance > radius) {
				break
			}
			storesFiltered.push(listStores[i])
			if (limit !== 0 && storesFiltered.length === limit) {
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
	getDistanceBetweenCoordinate (lat1, lng1, lat2, lng2, unit) {
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

	deg2rad (x) {
		return x * (Math.PI / 180)
	}

	rad2deg (x) {
		return x * (180 / Math.PI)
	}
}

module.exports = Stores
