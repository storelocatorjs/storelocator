import svgRoute from '../../svg/route.svg'

/**
 * storelocatorjs info window template
 * @module storelocatorjs/templateInfoIndow
 */
export default function ({store, origin}) {
	return `
        <div class="storelocator-infoWindow">
            ${store.picture
                ? `<span class="storelocator-pictureStore">
                    <img src="${store.picture}" alt="${store.title}" />
                </span>`
            : ``}
            <div class="storelocator-detailStore">
                ${store.title
                    ? `<span class="storelocator-detailStoreTitle">${store.index + 1}. ${store.title}</span>`
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
                ${typeof store.link !== 'undefined'
                ? `<a href="${store.link}" title="Visit website" target="_blank" class="storelocator-detailStoreUrl">${store.link}</a>`
                : ``}
            </div>
        </div>`
}
