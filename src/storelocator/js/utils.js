/**
 * Serialize form datas
 * @param {String} lat Latitude
 * @param {String} lng Longitude
 * @param {Integer} storeLimit Limit of stores in the request
 * @param {Integer} currentRadius Radius of the request
 * @param {String} inputValue Value of the input form search
 * @param {Array} categories Value of selected filters
 */
export function serializeForm ({lat, lng, storeLimit, currentRadius, inputValue, categories}) {
	let params = ''

	// Serialize params (input and filters value)
	if (inputValue !== '') {
		params += `input=${inputValue}`
	}

	params += `${(params !== '') ? '&' : ''}categories=${JSON.stringify(categories)}`

	if (lat && lng) {
		params += `${params !== '' ? '&' : ''}lat=${lat}&lng=${lng}`
	}

	params += `&radius=${currentRadius}&storesLimit=${storeLimit}`

	return params
}

/**
 * Log message
 * @param {Function} method Method of global console object
 * @param {String} message Message to post
 */
export function log (method, message) {
	if (this.options.debug) {
		console[method](message)
	}
}

/**
 * Check if breakpoint mobile is enabled
 */
export function isMobile (breakpoint) {
	return window.matchMedia('(max-width: ' + this.options.breakpointMobile + ')').matches
}

export function isBrowserIE () {
	return !!((document.documentMode && document.documentMode >= 9))
}
