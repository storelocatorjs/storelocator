// Import CSS
import '../css/reset.css'
import '../css/demo.css'

import '../assets/custom-style.css'
import '../../dist/storelocator.css'
import Storelocatorjs from '../../dist/storelocator.js'

var myStorelocator = new Storelocatorjs({
	options: {
		apiKey: 'AIzaSyA3tN03vyUXHDpxvAxke_qzLsEDHIo-my8',
		webServiceUrl: 'http://localhost:8000/'
	}
})
