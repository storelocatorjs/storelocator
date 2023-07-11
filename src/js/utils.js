/**
 * Check whether an object has the property
 * @param {Object} obj Object reference
 * @param {String} key Object property key inside the object
 * @returns {Boolean} Object has the property key
 */
function hasOwn(obj, key) {
	return Object.prototype.hasOwnProperty.call(obj, key)
}

/**
 * Deep clone for multiple objects
 * @param {Boolean} deep Deep clone
 * @param {Array<Object>} objects List of objects to merged
 * @returns Merged object
 */
function extend(deep = false, ...objects) {
	const extended = {}

	// Merge the object into the extended object
	const merge = (obj) => {
		const keys = obj ? Object.keys(obj) : []
		for (let i = 0, length = keys.length; i < length; i++) {
			const key = keys[i]
			if (hasOwn(obj, key)) {
				// If deep merge and property is an object, merge properties
				if (deep && Object.prototype.toString.call(obj[key]) === '[object Object]') {
					// @ts-ignore
					extended[key] = extend(true, extended[key], obj[key])
				} else {
					// @ts-ignore
					extended[key] = obj[key]
				}
			}
		}
	}

	// Loop through each object and conduct a merge
	for (let i = 0, length = objects.length; i < length; i++) {
		merge(objects[i])
	}

	return extended
}

export { extend, hasOwn }
