import '../assets/reset.css'
import '../assets/demo.css'
import '../assets/custom-style.css'
import '../../dist/storelocator.css'
import Storelocatorjs from '../../dist/storelocator.js'

/* eslint-disable no-unused-vars */
const myStorelocator = new Storelocatorjs({
	options: {
		apiKey: 'CREATE_YOUR_API_KEY',
		webServiceUrl: 'http://localhost:8000',
		map: {
			markers: {
				width: 30,
				height: 40,
				styles: [
					{
						category: 'userPosition',
						colorBackground: '#33ccff',
						colorText: '#fff'
					},
					{
						category: '1',
						colorBackground: '#ff6600',
						colorText: '#fff'
					},
					{
						category: '2',
						colorBackground: '#ffcc33',
						colorText: '#fff'
					},
					{
						category: '3',
						colorBackground: '#ea4c89',
						colorText: '#fff'
					}
				]
			}
		}
	},
	onReady: function (map) {
		this.triggerRequest({
			lat: 48.8589507,
			lng: 2.2770202
		})
	}
})
