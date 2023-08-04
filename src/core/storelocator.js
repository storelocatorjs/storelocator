import './css/vars.css'
import './css/storelocator.css'

import 'components/map/map.css'
import 'components/sidebar/sidebar.css'

import defaultOptions from './default-options'
import { registerProvider, getProviderInstance } from 'providers/provider'
import Map from './map'
import { extend } from 'shared/utils/utils'
import TemplateMap from 'components/map/templates/map'

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
