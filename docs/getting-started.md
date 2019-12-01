title: Getting started - Storelocatorjs
description: Install Storelocatorjs with npm or manual import. Installation is fast and the map is easily customizable. Google Maps API is automatically loaded

## Installation

### NPM

Install Storelocatorjs with npm:

```shell
npm install storelocatorjs
```

```javascript
import storelocatorjs from 'storelocatorjs';
import 'storelocatorjs.css';

new storelocatorjs({
    selector: '#player'
});
```

### Manual import

Includes files manually in your project:

```html
<link rel="stylesheet" href="storelocator.css" />
<script src="storelocator.js"></script>

<script>
    new storelocatorjs({
        selector: '#player'
    });
</script>
```

## Load Google Maps API

Google Maps API is automatically loaded by storelocator. The map is instanciate when the API is ready.

## API key

Create an API key to use Google Maps API on the <a href="https://developers.google.com/maps/documentation/javascript/get-api-key?hl=Fr" target="_blank" title="Google Console API">Google Console API</a>.

## Cloud functions

All requests to filter stores by geoposition are send to a cloud function as a web service. Storelocatorjs includes the cloud functions project from [Google Firebase](https://firebase.google.com/docs/functions) located in the `./functions` folder.

Storelocatorjs examples are linked to the cloud function. Ton run run locally the cloud function, simply create a `.env` file from the `.env.dist` file in the `./functions` directory and fill the `CLOUD_FUNCTION_DOMAIN` variable with you virtual host to authorize the CORS requests.

Then, to run Storelocatorjs examples, simply run the following commands:

```
cd functions
npm install
npm run serve
```

Cloud function will be automatically accessible locally on Storelocatorjs examples in the `./examples` folder.

## JSON structure

The storelocatorjs project includes a JSON example in the folder `./server/datas/stores.json`.
Datas are stored in an array of object for better performance.<br />

!!! warning "Mandatory JSON structure"
    __It is important to respect the format of the keys in the JSON file.__

In case of filters usage, the category value in the highlight line must correspond to the filter `value` attributes in the HTML.

```json hl_lines="3"
[{
    "address": "34 Avenue de la Perrière",
    "category": "1",
    "city": "Lorient",
    "id": 1,
    "lat": 47.7342023,
    "lng": -3.3670051,
    "phone": "0297594071",
    "title": "Le crabe Marteau",
    "zipcode": "56100"
}]
```

```html
<input type="checkbox" id="cat-1" data-filter value="1" />
```

## JSON fields

List of available fields in the JSON. Mandatory fields are `lat` and `lng`.

#### `lat`

`mandatory - float`

The latitude of the store.

```javascript
[{
    "lat": ""
}]
```

#### `lng`

`mandatory - string`

The longitude of the store.

```javascript
[{
    "lng": ""
}]
```

#### `address`

`string`

The address of the store.

```javascript
[{
    "address": ""
}]
```

#### `category`

`string`

The category of the store.

```javascript
[{
    "category": ""
}]
```

#### `city`

`string`

The city of the store.

```javascript
[{
    "city": ""
}]
```

#### `id`

`integer`

The id of the store.

```javascript
[{
    "id": ""
}]
```

#### `phone`

`string`

The phone of the store.

```javascript
[{
    "phone": ""
}]
```

#### `title`

`string`

The title of the store.

```javascript
[{
    "title": ""
}]
```

#### `zipcode`

`string`

The zipcode of the store.

```javascript
[{
    "zipcode": ""
}]
```

<script>
  ((window.gitter = {}).chat = {}).options = {
    room: 'store-locator/store-locator'
  };
</script>
<script src="https://sidecar.gitter.im/dist/sidecar.v1.js" async defer></script>