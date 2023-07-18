import defaultOptions from './default-options'
import { registerProvider, getProviderInstance } from './providers/provider'
import Map from './map'
import { extend } from './utils'

/**
 * storelocatorjs
 * @module storelocatorjs
 */
class Storelocator {
	constructor({ options, provider, onReady }) {
		this.options = extend(true, defaultOptions, options)
		this.onReady = onReady

		const ProviderInstance = getProviderInstance(provider, Map)
		this.map = new ProviderInstance({
			Storelocatorjs: this
		})

		this.map.build()
	}
}

Storelocator.registerProvider = registerProvider

export default Storelocator
