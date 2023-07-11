import '../assets/custom-style.css'
import '../../dist/storelocator.css'
import Storelocatorjs from '../../dist/storelocator.js'

/* eslint-disable no-unused-vars */
const myStorelocator = new Storelocatorjs({
	options: {
		apiKey: 'CREATE_YOUR_API_KEY',
		webServiceUrl: 'https://storelocator-functions.vercel.app'
	}
})
