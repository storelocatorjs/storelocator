import TemplateFormSearch from 'components/form-search/templates/form-search'
import TemplateAutocomplete from 'components/autocomplete/templates/autocomplete'
import TemplateNav from 'components/nav/templates/nav'

export default function TemplateMap() {
	return `
		<div class="sl-sidebar">
            ${TemplateFormSearch()}
            ${TemplateAutocomplete()}
            ${TemplateNav()}
            <div class="sl-sidebar-results"></div>
        </div>
	`
}
