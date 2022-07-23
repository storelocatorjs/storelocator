import svgRoute from '../../svg/route.svg'
import { createElement } from 'jsx-dom'

/**
 * storelocatorjs sidebar item result template
 * @module storelocatorjs/templateSidebarItemResult
 */
export default function TemplateSidebarItemResult({ store, origin }) {
	return (
		<li className="storelocator-sidebarResultsListItem">
			<div className="storelocator-detailStore">
				{store.properties.title && (
					<span className="storelocator-detailStoreTitle">
						<a
							href=""
							title="See on the map"
							className="store-center-marker-js"
							data-marker-id={store.properties.id}
						>
							{store.properties.index}. <span>{store.properties.title}</span>
						</a>
					</span>
				)}
				{store.properties.distance && (
					<a
						href={`http://www.google.fr/maps/dir/{origin}/${store.properties.lat},${store.properties.lng}`}
						title="See the itinerary on Google Maps"
						target="_blank"
						className="storelocator-detailStoreDistance"
					>
						<span>{store.properties.distance.toFixed(2)}km</span>
						<div innerHTML={svgRoute}></div>
					</a>
				)}
				{store.properties.address && (
					<span className="storelocator-detailStoreAddress">
						{store.properties.address}
					</span>
				)}
				{store.properties.zipcode && (
					<span className="storelocator-detailStoreZipcode">
						{store.properties.zipcode}
					</span>
				)}
				{store.properties.city && (
					<span className="storelocator-detailStoreCity">{store.properties.city}</span>
				)}
				{store.properties.phone && (
					<span className="storelocator-detailStorePhone">
						<a href="tel:{store.properties.phone}" title="Call">
							{store.properties.phone}
						</a>
					</span>
				)}
			</div>
		</li>
	)
}
