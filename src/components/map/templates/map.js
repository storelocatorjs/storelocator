import locationSvg from 'shared/assets/svgs/location.svg'
import plusSvg from 'shared/assets/svgs/plus.svg'
import minusSvg from 'shared/assets/svgs/minus.svg'

export default function TemplateMap() {
	return `
		<div class="sl-app">
			<div class="sl-map">
                <div id="sl-mapCanvas" class="sl-mapCanvas"></div>
                <div class="sl-controls">
                    <button class="sl-geolocButton sl-button">${locationSvg}</button>
                    <button class="sl-zoomInButton sl-button">${plusSvg}</button>
                    <button class="sl-zoomOutButton sl-button">${minusSvg}</button>
                </div>
            </div>
            <div class="sl-results"></div>
		</div>
	`
}
