import glassSvg from 'shared/assets/svgs/glass.svg'
import listSvg from 'shared/assets/svgs/list.svg'
import mapSvg from 'shared/assets/svgs/map.svg'

export default function TemplateSearch() {
	return `
		<div class="sl-search">
            <form class="sl-search-form">
                <div class="sl-search-glass">${glassSvg}</div>
                <input type="text" class="sl-search-input" placeholder="Enter a location" />
                <button class="sl-search-toggleButton">
                    <div class="sl-search-toggleMap">${mapSvg}</div>
                    <div class="sl-search-toggleList sl-active">${listSvg}</div>
                </button>
            </form>
            <div class="sl-search-autocomplete"></div>
        </div>
	`
}
