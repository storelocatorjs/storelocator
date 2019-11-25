export function serializeForm (lat, lng, storeLimit) {
	let dataAjax = ''
	let categories = []

	// Serialize params (input and filters value)
	if (this.inputSearch.value !== '') {
		dataAjax += 'input=' + this.inputSearch.value
	}

	this.filtersSearch.forEach(filter => {
		if (filter.checked) {
			categories.push(filter.value)
		}
	})

	dataAjax += ((dataAjax !== '') ? '&' : '') + 'categories=' + JSON.stringify(categories)

	if (lat && lng) {
		dataAjax += (dataAjax !== '' ? '&' : '') + 'lat=' + lat + '&lng=' + lng
	}

	dataAjax += '&radius=' + this.currentRadius + '&storesLimit=' + storeLimit

	return dataAjax
}

export function log (method, message) {
	if (this.options.debug) {
		console[method](message)
	}
}
