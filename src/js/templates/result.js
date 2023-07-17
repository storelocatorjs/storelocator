export default function TemplateResult({ store }) {
	return (
		<li className="storelocator-resultsListItem">
			<div className="storelocator-detailStore">
				{store.title && (
					<button className="storelocator-detailStoreTitle" data-marker-id={store.id}>
						{store.title}
					</button>
				)}
				<span className="storelocator-detailStoreAddress">
					{store?.address} {store?.zipcode} {store?.city}
				</span>
				{store.phone && (
					<a href="tel:{store.phone}" class="storelocator-detailStorePhone">
						{store.phone}
					</a>
				)}
			</div>
		</li>
	)
}
