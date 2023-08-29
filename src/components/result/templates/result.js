export default function TemplateResult({ feature }) {
	return `
        <span class="sl-result-title">
            ${feature.properties.title}
        </span>
        <span class="sl-result-adress">
            ${feature.properties?.address} ${feature.properties?.zipcode}${' '}
            ${feature.properties?.city}
        </span>
	`
}
