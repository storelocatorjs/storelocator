export default function TemplateSidebarResult({ feature }) {
	return `
		<div class="sl-sidebarResult" data-marker-index="${feature.index}">
            <span class="sl-sidebarResult-title">
                ${feature.properties.title}
            </span>
            <span class="sl-sidebarResult-adress">
                ${feature.properties?.address} ${feature.properties?.zipcode}${' '}
                ${feature.properties?.city}
            </span>
		</div>
	`
}
