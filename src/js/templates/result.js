/**
 * storelocatorjs result template
 */
export default function TemplateResult({ feature }) {
	return (
		<li className="storelocator-sidebarResultsListItem">
			<div className="storelocator-detailStore">
				{feature.properties.title && (
					<button
						className="storelocator-detailStoreTitle"
						data-marker-id={feature.properties.id}
					>
						{feature.properties.title}
					</button>
				)}
				<span className="storelocator-detailStoreAddress">
					{feature.properties?.address} {feature.properties?.zipcode}{' '}
					{feature.properties?.city}
				</span>
				{feature.properties.phone && (
					<a href="tel:{feature.properties.phone}" class="storelocator-detailStorePhone">
						{feature.properties.phone}
					</a>
				)}
			</div>
		</li>
	)
}
