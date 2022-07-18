import '../../dist/storelocator/css/storelocator.css'
import Storelocator from '../../dist/storelocator/js/storelocator'

const myStorelocator = new Storelocator({
	options: {
		// apiKey: 'CREATE_YOUR_API_KEY',
		// webServiceUrl: 'http://localhost:5000/storelocatorjs/europe-west1/stores'
		geolocation: {
			startOnLoad: false,
			status: true
		}
	}
})
