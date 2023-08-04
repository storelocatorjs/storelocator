export default function TemplatePopup({ feature }) {
	return `
		<div class="popup">
            <span class="popup-title">
                ${feature.properties.title}
            </span>
            <span class="popup-address">
                ${feature.properties?.address} ${feature.properties?.zipcode} $
                ${feature.properties?.city}
            </span>
            <a href="tel:${feature.properties.phone}" class="popup-phone">
                ${feature.properties.phone}
            </a>
        </div>
	`
}
