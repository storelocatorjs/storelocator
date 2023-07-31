export default function TemplateResult({ feature }) {
	return `
		<li class="storelocator-resultsListItem">
			<div class="storelocator-detailStore">
				${
					feature.properties.title
						? `<button
						class="storelocator-detailStoreTitle"
						data-marker-id="${feature.properties.id}"
					>
						${feature.properties.title}
					</button>
                    `
						: ''
				}
				<span class="storelocator-detailStoreAddress">
					${feature.properties?.address} ${feature.properties?.zipcode}${' '}
					${feature.properties?.city}
				</span>
				${
					feature.properties.phone
						? `<a
						href="tel:${feature.properties.phone}"
						class="storelocator-detailStorePhone"
					>
						${feature.properties.phone}
					</a>`
						: ''
				}
			</div>
		</li>
	`
}
