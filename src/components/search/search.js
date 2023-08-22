import TemplateSearch from 'components/search/templates/search'
import validateTarget from 'validate-target'
import geocoderMapBox from 'geocoder/mapbox'
import geocoderGoogleMaps from 'geocoder/google-maps'
import geocoderJawg from 'geocoder/jawg'

export default class Search {
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
		this.onClickOnToggleButton = this.onClickOnToggleButton.bind(this)
	}

	init() {
		this.render()

		this.map.elements.search = this.map.elements.container.querySelector('.sl-search')
		this.map.elements.searchForm = this.map.elements.container.querySelector('.sl-search-form')
		this.map.elements.searchInput =
			this.map.elements.container.querySelector('.sl-search-input')
		this.map.elements.searchAutocomplete =
			this.map.elements.container.querySelector('.sl-search-autocomplete')
		this.map.elements.searchToggleButton =
			this.map.elements.container.querySelector('.sl-search-toggleButton')

		this.addEvents()
	}

	render() {
		this.map.elements.container.insertAdjacentHTML('afterbegin', TemplateSearch())
	}

	addEvents() {
		this.map.elements.searchAutocomplete.addEventListener('click', this.onClickOnAutocomplete)
		this.map.elements.searchInput.addEventListener('keyup', this.onKeyupOnInputSearch)
		this.map.elements.searchForm.addEventListener('submit', (e) => e.preventDefault())
		this.map.elements.searchToggleButton.addEventListener('click', this.onClickOnToggleButton)
	}

	onClickOnAutocomplete(e) {
		const target = e.target
		const isAutocompleteItem = validateTarget({
			target,
			selectorString: '.sl-search-autocompleteItem',
			nodeName: 'div'
		})

		if (isAutocompleteItem) {
			this.onClickOnAutocompleteItem(e)
		}
	}

	onClickOnAutocompleteItem(e) {
		const target = e.target

		this.map.elements.searchAutocomplete.classList.remove('sl-active')
		this.map.elements.searchAutocomplete.replaceChildren()
		this.map.userPositionChecked = false

		this.map.requestStores({
			lat: parseFloat(target.getAttribute('data-lat')),
			lng: parseFloat(target.getAttribute('data-lng'))
		})
	}

	onKeyupOnInputSearch(e) {
		e.preventDefault()

		if (e.target.value !== '') {
			window.clearTimeout(this.timerAutocomplete)
			this.timerAutocomplete = window.setTimeout(() => this.onFormSearchSubmit(), 200)
		}
	}

	onFormSearchSubmit() {
		if (
			typeof this.map.geocoder.provider === 'string' &&
			this.geocoderFunctions[this.map.geocoder.provider]
		) {
			this.geocoderFunctions[this.map.geocoder.provider]({
				value: this.map.elements.searchInput.value,
				token: this.map.geocoder?.token,
				countries: this.map.geocoder.countries?.join(',') || 'fr'
			}).then((results) => {
				this.renderAutocomplete({
					results
				})
			})
		} else if (this.map.geocoder.provider instanceof Function) {
			this.map.geocoder
				.provider({
					value: this.map.elements.searchInput.value
				})
				.then((results) => {
					this.renderAutocomplete({
						results
					})
				})
		}
	}

	renderAutocomplete({ results }) {
		const html = results
			.map(({ text, lat, lng }) => {
				return `<div class="sl-search-autocompleteItem" data-lat="${lat}" data-lng="${lng}">${text}</div>`
			})
			.join('')
		this.map.elements.searchAutocomplete.innerHTML = html
		this.map.elements.results.classList.contains('sl-visible') && this.map.toggleMapList()
		this.map.elements.searchAutocomplete.classList.add('sl-active')
	}

	onClickOnToggleButton(e) {
		e.preventDefault()
		this.map.toggleMapList()
	}
}
