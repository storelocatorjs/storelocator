import './css/vars.css'
import './css/loader.css'
import './css/detail-store.css'
import './css/form-search.css'
import './css/info-window.css'
import './css/nav.css'
import './css/sidebar.css'
import './css/map.css'
import './css/storelocator.css'

import defaultOptions from './default-options'
import { registerProvider, getProviderInstance } from 'providers/provider'
import Map from './map'
import { extend } from 'shared/utils/utils'
import TemplateMap from './templates/map'

/**
 * storelocatorjs
 * @module storelocatorjs
 */
class Storelocator {
	constructor({ target, mapBoxToken, options, provider, onReady }) {
		this.target = target
		this.mapBoxToken = mapBoxToken
		this.options = extend(true, defaultOptions, options)
		this.onReady = onReady

		const ProviderInstance = getProviderInstance(provider, Map)
		this.map = new ProviderInstance({
			Storelocatorjs: this
		})

		this.render()
		this.map.build()
	}

	render() {
		this.target.insertAdjacentHTML('beforeend', TemplateMap())
	}
}

Storelocator.registerProvider = registerProvider

export default Storelocator
