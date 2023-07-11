/**
 * storelocatorjs info window template
 * @module storelocatorjs/templateInfoIndow
 */
export default function ({ feature }) {
	return (
		<div className="storelocator-popup">
			<div className="storelocator-detailStore">
				{feature.properties.title && (
					<span className="storelocator-detailStoreTitle">{feature.properties.title}</span>
				)}
				{feature.properties.address && (
					<span className="storelocator-detailStoreAddress">
						{feature.properties?.address} {feature.properties?.zipcode} {feature.properties?.city}
					</span>
				)}
				{feature.properties.phone && (
					<a href={`tel:${feature.properties.phone}`} class="storelocator-detailStorePhone">
						{feature.properties.phone}
					</a>
				)}
			</div>
		</div>
	)
}
