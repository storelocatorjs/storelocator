import svgRoute from '../../svg/route.svg'
import { createElement } from 'jsx-dom'

/**
 * storelocatorjs sidebar item result template
 * @module storelocatorjs/templateSidebarItemResult
 */
export default function TemplateSidebarItemResult({ store, origin }) {
	return (
		<li className="storelocator-sidebarResultsListItem" data-category={store.category}>
			<div className="storelocator-detailStore">
				{store.title && (
					<span className="storelocator-detailStoreTitle">
						<a
							href=""
							title="See on the map"
							className="store-center-marker-js"
							data-marker-index={store.index}
						>
							{store.index + 1}. <span>{store.title}</span>
						</a>
					</span>
				)}
				<a
					href={`http://www.google.fr/maps/dir/{origin}/${store.lat},${store.lng}`}
					title="See the itinerary on Google Maps"
					target="_blank"
					className="storelocator-detailStoreDistance"
				>
					<span>{store.distance.toFixed(2)}km</span>
					<div innerHTML={svgRoute}></div>
				</a>
				{store.address && (
					<span className="storelocator-detailStoreAddress">{store.address}</span>
				)}
				{store.zipcode && (
					<span className="storelocator-detailStoreZipcode">{store.zipcode}</span>
				)}
				{store.city && <span className="storelocator-detailStoreCity">{store.city}</span>}
				{store.phone && (
					<span className="storelocator-detailStorePhone">
						<a href="tel:{store.phone}" title="Call">
							{store.phone}
						</a>
					</span>
				)}
			</div>
		</li>
	)
}
