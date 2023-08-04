export default function TemplateSidebarResult({ feature }) {
	return `
		<div class="sidebarResult" data-marker-index="${feature.index}">
            <span class="sidebarResult-title">
                ${feature.properties.title}
            </span>
            <span class="sidebarResult-adress">
                ${feature.properties?.address} ${feature.properties?.zipcode}${' '}
                ${feature.properties?.city}
            </span>
		</div>
	`
}
