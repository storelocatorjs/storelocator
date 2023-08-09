import './css/vars.css'
import './css/storelocator.css'
import 'components/autocomplete/autocomplete.css'
import 'components/form-search/form-search.css'
import 'components/loader/loader.css'
import 'components/map/map.css'
import 'components/nav/nav.css'
import 'components/popup/popup.css'
import 'components/sidebar/sidebar.css'
import 'components/sidebar-result/sidebar-result.css'

import { extend } from 'shared/utils/utils'
import TemplateMap from 'components/map/templates/map'
import TemplateLoader from 'components/loader/templates/loader'

/**
 * storelocatorjs
 * @module storelocatorjs
 */
class Storelocator {
	constructor({ target, api, map, geocoder, onReady }) {
		this.target = target
		this.api = api
		this.map = map
		this.geocoder = geocoder
		this.onReady = onReady

		this.customMap = new map.provider({
			api: Object.assign(
				{},
				{
					radius: 50,
					limit: 50
				},
				api
			),
			map: {
				token: map.token,
				options: map.options
			},
			geocoder,
			onReady
		})

		this.init()
	}

	init() {
		this.render()
		this.buildLoader()
		this.customMap.build()
	}

	render() {
		this.target.insertAdjacentHTML('beforeend', TemplateMap())
	}

	/**
	 * Build the loader
	 */
	buildLoader() {
		this.target.insertAdjacentHTML('afterbegin', TemplateLoader())
		this.customMap.elements.loader = this.target.querySelector('.sl-loader')
	}
}

export default Storelocator
