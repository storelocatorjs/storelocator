import './css/vars.css'
import './css/storelocator.css'

import 'components/map/map.css'
import 'components/sidebar/sidebar.css'

import defaultOptions from './default-options'
import { extend } from 'shared/utils/utils'
import TemplateMap from 'components/map/templates/map'

/**
 * storelocatorjs
 * @module storelocatorjs
 */
class Storelocator {
	constructor({ target, api, map, geocoder, markers, onReady }) {
		this.target = target
		this.api = api
		this.map = map
		this.geocoder = geocoder
		this.onReady = onReady

		const customMap = new map.provider({
			api: extend(true, defaultOptions.api, api),
			map: {
				token: map.token,
				options: map.options
			},
			geocoder,
			markersOptions: extend(true, defaultOptions.markers, markers),
			onReady
		})

		this.render()
		customMap.init()
	}

	render() {
		this.target.insertAdjacentHTML('beforeend', TemplateMap())
	}
}

export default Storelocator
