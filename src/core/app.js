import './app.css'
import 'components/loader/loader.css'
import 'components/map/map.css'
import 'components/popup/popup.css'
import 'components/search/search.css'
import 'components/result/result.css'

import Map from 'core/map'
import check from './check'
// import check from 'check'
import TemplateMap from 'components/map/templates/map'
import TemplateLoader from 'components/loader/templates/loader'

class Storelocator {
	constructor({ target, licenseKey, api, map, geocoder, templates, onReady }) {
		this.target = target
		this.licenseKey = licenseKey

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
		check(this.licenseKey)
			.then(({ valid, message, dev }) => {
				if (valid) {
					dev && console.warn(dev)
					this.render()
					this.buildLoader()
					this.mapProvider.build()
				}
			})
			.catch((error) => console.error(error))
	}

	render() {
		this.target.insertAdjacentHTML('beforeend', TemplateMap())
	}

	buildLoader() {
		this.target.querySelector('.sl-app').insertAdjacentHTML('afterbegin', TemplateLoader())
		this.mapProvider.elements.loader = this.target.querySelector('.sl-loader')
	}

	destroy() {
		this.mapProvider.destroy()
	}
}

export default Storelocator
