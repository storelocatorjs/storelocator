import { createElement } from 'jsx-dom'

/**
 * storelocatorjs sidebar item result template
 * @module storelocatorjs/templateSidebarItemResult
 */
export default function TemplateSidebarItemResult({ store }) {
	return (
		<li className="storelocator-sidebarResultsListItem">
			<div className="storelocator-detailStore">
				{store.properties.title && (
					<button
						className="storelocator-detailStoreTitle"
						data-marker-id={store.properties.id}
					>
						{store.properties.title}
					</button>
				)}
				<span className="storelocator-detailStoreAddress">
					{store.properties?.address} {store.properties?.zipcode} {store.properties?.city}
				</span>
				{store.properties.phone && (
					<a href="tel:{store.properties.phone}" class="storelocator-detailStorePhone">
						{store.properties.phone}
					</a>
				)}
			</div>
		</li>
	)
}
