export default function ({store, origin}) {
	return `<li data-category="${store.category}" style="border-left-color: ${this.markerStyles[store.category].colorBackground}">
                <div class="storelocator-detailStore">
                    ${store.title
                        ? `<span class="storelocator-detailStoreTitle"><a href="" title="See on the map" class="store-center-marker-js" data-marker-index="${store.index}">${store.index + 1}. <span>${store.title}</span></a></span>`
                    : ``}
                    <a href="http://www.google.fr/maps/dir/${origin}/${store.lat},${store.lng}" title="See the itinerary on Google Maps" target="_blank" class="storelocator-detailStoreDistance"><span>${store.distance.toFixed(2)}km</span><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" class="storelocator-detailStoreIconRoute" viewBox="1772 1772 19.185 20" enable-background="new 1772 1772 19.185 20" xml:space="preserve"><path d="M1791.074,1775.318c0.074,0.073,0.11,0.159,0.11,0.257c0,0.096-0.036,0.182-0.11,0.257l-1.574,1.573c-0.209,0.21-0.464,0.313-0.761,0.313h-15.009c-0.192,0-0.361-0.069-0.502-0.213c-0.141-0.141-0.211-0.31-0.211-0.502v-2.859c0-0.192,0.07-0.36,0.211-0.502c0.141-0.141,0.31-0.211,0.502-0.211h6.434v-0.716c0-0.192,0.07-0.36,0.211-0.502c0.141-0.143,0.31-0.213,0.502-0.213h1.431c0.193,0,0.361,0.07,0.502,0.213c0.142,0.142,0.211,0.31,0.211,0.502v0.716h5.719c0.297,0,0.552,0.102,0.761,0.312L1791.074,1775.318z M1780.164,1785.58h2.856v5.716c0,0.196-0.069,0.361-0.211,0.505c-0.141,0.141-0.309,0.211-0.502,0.211h-1.431c-0.192,0-0.361-0.07-0.502-0.211c-0.141-0.144-0.211-0.309-0.211-0.505V1785.58zM1789.454,1780.577c0.193,0,0.361,0.07,0.502,0.211c0.142,0.142,0.212,0.31,0.212,0.502v2.859c0,0.192-0.07,0.361-0.212,0.504c-0.141,0.142-0.309,0.212-0.502,0.212h-15.009c-0.297,0-0.551-0.105-0.76-0.314l-1.574-1.572c-0.075-0.076-0.111-0.162-0.111-0.258c0-0.097,0.036-0.184,0.111-0.257l1.574-1.576c0.209-0.209,0.463-0.311,0.76-0.311h5.719v-2.146h2.856v2.146H1789.454z"/></svg></a>
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
