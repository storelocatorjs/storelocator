import glassSvg from 'shared/assets/svgs/glass.svg'

export default function TemplateSearch() {
	return `
		<div class="sl-search">
            <form class="sl-search-form">
                <div class="sl-search-icon">${glassSvg}</div>
                <input type="text" class="sl-search-input" placeholder="Enter a location" />
            </form>
            <div class="sl-search-autocomplete"></div>
        </div>
	`
}
