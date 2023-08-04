import 'components/form-search/form-search.css'
import 'components/autocomplete/autocomplete.css'
import 'components/nav/nav.css'

import TemplateFormSearch from 'components/form-search/templates/form-search'
import TemplateAutocomplete from 'components/autocomplete/templates/autocomplete'
import TemplateNav from 'components/nav/templates/nav'

export default function TemplateMap() {
	return `
		<div class="sidebar">
            ${TemplateFormSearch()}
            ${TemplateAutocomplete()}
            ${TemplateNav()}
            <div class="sidebar-results"></div>
        </div>
	`
}
