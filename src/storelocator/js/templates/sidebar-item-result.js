import svgRoute from '../../svg/route.svg'

/**
 * storelocatorjs sidebar item result template
 * @module storelocatorjs/templateSidebarItemResult
 */
export default function ({store, origin}) {
	return `
        <li class="storelocator-sidebarResultsListItem" data-category="${store.category}">
            <div class="storelocator-detailStore">
                ${store.title
                    ? `<span class="storelocator-detailStoreTitle"><a href="" title="See on the map" class="store-center-marker-js" data-marker-index="${store.index}">${store.index + 1}. <span>${store.title}</span></a></span>`
                : ``}
                <a href="http://www.google.fr/maps/dir/${origin}/${store.lat},${store.lng}" title="See the itinerary on Google Maps" target="_blank" class="storelocator-detailStoreDistance">
                    <span>${store.distance.toFixed(2)}km</span>
                    ${svgRoute}
                </a>
                ${store.address
                    ? `<span class="storelocator-detailStoreAddress">${store.address}</span>`
                : ``}
                ${store.zipcode
                    ? `<span class="storelocator-detailStoreZipcode">${store.zipcode}</span>`
                : ``}
                ${store.city
                    ? `<span class="storelocator-detailStoreCity">${store.city}</span>`
                : ``}
                ${store.phone
                    ? `<span class="storelocator-detailStorePhone"><a href="tel:${store.phone}" title="Call">${store.phone}</a></span>`
                : ``}
            </div>
        </li>`
}
