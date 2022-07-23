import svgRoute from '../../svg/route.svg'
import { createElement } from 'jsx-dom'

/**
 * storelocatorjs info window template
 * @module storelocatorjs/templateInfoIndow
 */
export default function ({ store, origin }) {
	return (
		<div className="storelocator-infoWindow">
			{store.properties.picture && (
				<span className="storelocator-pictureStore">
					<img src={store.properties.picture} alt={store.properties.title} />
				</span>
			)}
			<div className="storelocator-detailStore">
				{store.properties.title && (
					<span className="storelocator-detailStoreTitle">{store.properties.title}</span>
				)}
				{store.properties.distance && (
					<a
						href={`http://www.google.fr/maps/dir/${origin}/${store.properties.lat},${store.properties.lng}`}
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
				$
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
						<a href={`tel:${store.properties.phone}`} title="Call">
							{store.properties.phone}
						</a>
					</span>
				)}
				{typeof store.link !== 'undefined' && (
					<a
						href={store.properties.link}
						title="Visit website"
						target="_blank"
						className="storelocator-detailStoreUrl"
					>
						{store.properties.link}
					</a>
				)}
			</div>
		</div>
	)
}
