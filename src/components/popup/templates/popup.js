export default function TemplatePopup({ feature }) {
	return `
		<div class="storelocator-popup">
			<div class="storelocator-detailStore">
				${
					feature.properties.title
						? `<span class="storelocator-detailStoreTitle">
                        ${feature.properties.title}
                    </span>`
						: ''
				}
				${
					feature.properties.address
						? `<span class="storelocator-detailStoreAddress">
							${feature.properties?.address} ${feature.properties?.zipcode} $
							${feature.properties?.city}
						</span>`
						: ''
				}
				${
					feature.properties.phone
						? `<a
							href="tel:${feature.properties.phone}"
							class="storelocator-detailStorePhone"
						>${feature.properties.phone}</a>`
						: ''
				}
			</div>
		</div>
	`
}
