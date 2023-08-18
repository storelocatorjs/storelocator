export default function TemplatePopup({ feature }) {
	return `
		<div class="sl-popup">
            <span class="sl-popup-title">
                ${feature.properties.title}
            </span>
            <span class="sl-popup-address">
                ${feature.properties?.address} ${feature.properties?.zipcode}
                ${feature.properties?.city}
            </span>
            <a class="sl-popup-phone" href="tel:${feature.properties.phone}">
                ${feature.properties.phone}
            </a>
        </div>
	`
}
