import './css/vars.css'
import './css/storelocator.css'
import 'components/loader/loader.css'
import 'components/map/map.css'
import 'components/popup/popup.css'
import 'components/search/search.css'
import 'components/result/result.css'

import Map from 'core/map'
import TemplateMap from 'components/map/templates/map'
import TemplateLoader from 'components/loader/templates/loader'

class Storelocator {
	constructor({ target, api, map, geocoder, templates, onReady }) {
		this.target = target

		const MapProvider = map.provider(Map)
		this.mapProvider = new MapProvider({
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
			templates,
			onReady
		})

		this.init()
	}

	init() {
		this.render()
		this.buildLoader()
		this.mapProvider.build()
	}

	render() {
		this.target.insertAdjacentHTML('beforeend', TemplateMap())
	}

	buildLoader() {
		this.target
			.querySelector('.storelocator')
			.insertAdjacentHTML('afterbegin', TemplateLoader())
		this.mapProvider.elements.loader = this.target.querySelector('.sl-loader')
	}

	destroy() {
		this.mapProvider.destroy()
	}
}

export default Storelocator
