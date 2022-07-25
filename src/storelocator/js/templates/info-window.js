import { createElement } from 'jsx-dom'

/**
 * storelocatorjs info window template
 * @module storelocatorjs/templateInfoIndow
 */
export default function ({ store }) {
	return (
		<div className="storelocator-popup">
			<div className="storelocator-detailStore">
				{store.properties.title && (
					<span className="storelocator-detailStoreTitle">{store.properties.title}</span>
				)}
				{store.properties.address && (
					<span className="storelocator-detailStoreAddress">
						{store.properties?.address} {store.properties?.zipcode}{' '}
						{store.properties?.city}
					</span>
				)}
				{store.properties.phone && (
					<a href={`tel:${store.properties.phone}`} class="storelocator-detailStorePhone">
						{store.properties.phone}
					</a>
				)}
			</div>
		</div>
	)
}
