import '../../dist/storelocator/css/storelocator.css'
import Storelocator from '../../dist/storelocator/js/storelocator'

const myStorelocator = new Storelocator({
	options: {
		webServiceUrl: 'http://localhost:3001',
		geolocation: {
			startOnLoad: false,
			status: true
		},
		cluster: {
			status: true
		}
	}
})
