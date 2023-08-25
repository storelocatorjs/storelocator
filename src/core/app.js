import './app.css'
import 'components/loader/loader.css'
import 'components/map/map.css'
import 'components/popup/popup.css'
import 'components/search/search.css'
import 'components/result/result.css'

import Map from 'core/map'
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

	checkLicense() {
		return new window.Promise((resolve) => {
			fetch('https://api.gumroad.com/v2/licenses/verify', {
				method: 'POST',
				body: JSON.stringify({
					product_id: 'RspHbyOxxkC8KsDwAnM9Pw==',
					license_key: this.licenseKey,
					increment_uses_count: false
				})
			})
				.then((res) => res.json())
				.then((response) => resolve(response))
		})
	}

	init() {
		// this.checkLicense().then(({ success, message }) => {
		// if (success) {
		this.render()
		this.buildLoader()
		this.mapProvider.build()
		// 	} else {
		// 		throw new Error(`Storelocator::${message}`)
		// 	}
		// })
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
