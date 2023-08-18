import TemplateSidebar from 'components/sidebar/templates/sidebar'
import locationSvg from 'shared/assets/svgs/location.svg'

export default function TemplateMap() {
	return `
		<div class="storelocator">
			${TemplateSidebar()}
			<div id="sl-map" class="sl-map sl-active"></div>
            <button class="sl-geolocButton">${locationSvg}</button>
		</div>
	`
}
