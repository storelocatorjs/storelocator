import validateTarget from 'validate-target'
import geocoderMapBox from 'geocoder/mapbox'
import geocoderGoogleMaps from 'geocoder/google-maps'
import geocoderJawg from 'geocoder/jawg'

export default class Autocomplete {
	constructor({ map }) {
		this.map = map
		this.geocoderFunctions = {
			mapbox: geocoderMapBox,
			googlemaps: geocoderGoogleMaps,
			jawg: geocoderJawg
		}
		this.timerAutocomplete = null

		this.onClickOnAutocomplete = this.onClickOnAutocomplete.bind(this)
		this.onKeyupOnInputSearch = this.onKeyupOnInputSearch.bind(this)
	}

	init() {
		this.map.elements.autocomplete =
			this.map.elements.container.querySelector('.sl-autocomplete')

		this.addEvents()
	}

	addEvents() {
		this.map.elements.autocomplete.addEventListener('click', this.onClickOnAutocomplete)
		this.map.elements.inputSearch.addEventListener('keyup', this.onKeyupOnInputSearch)
		this.map.elements.formSearch.addEventListener('submit', (e) => e.preventDefault())
	}

	onClickOnAutocomplete(e) {
		const target = e.target
		const isAutocompleteItem = validateTarget({
			target,
			selectorString: '.sl-autocomplete-item',
			nodeName: 'div'
		})

		if (isAutocompleteItem) {
			this.map.elements.autocomplete.classList.remove('sl-active')
			this.map.elements.autocomplete.replaceChildren()
			this.map.userPositionChecked = false

			this.map.triggerRequest({
				lat: parseFloat(target.getAttribute('data-lat')),
				lng: parseFloat(target.getAttribute('data-lng'))
			})
		}
	}

	onKeyupOnInputSearch(e) {
		e.preventDefault()

		if (e.target.value !== '') {
			window.clearTimeout(this.timerAutocomplete)
			this.timerAutocomplete = window.setTimeout(() => {
				this.onFormSearchSubmit()
			}, 200)
		}
	}

	onFormSearchSubmit() {
		if (
			typeof this.map.geocoder.provider === 'string' &&
			this.geocoderFunctions[this.map.geocoder.provider]
		) {
			this.geocoderFunctions[this.map.geocoder.provider]({
				value: this.map.elements.inputSearch.value,
				token: this.map.geocoder?.token,
				countries: this.map.geocoder.countries?.join(',') || 'fr'
			}).then((results) => {
				this.renderAutocomplete({
					results
				})
			})
		} else if (this.map.geocoder.provider instanceof Function) {
			this.geocoderFunctions[this.map.geocoder.provider]().then((results) => {
				this.renderAutocomplete({
					results
				})
			})
		}
	}

	renderAutocomplete({ results }) {
		const html = results
			.map(({ text, lat, lng }) => {
				return `<div class="sl-autocomplete-item" data-lat="${lat}" data-lng="${lng}">${text}</div>`
			})
			.join('')
		this.map.elements.autocomplete.innerHTML = html
		this.map.elements.autocomplete.classList.add('sl-active')
	}
}
