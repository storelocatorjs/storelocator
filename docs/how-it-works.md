title: How it works - Storelocator.js
description: The project includes a minimalist HTML structure example to start your Storelocator. All options are listed here and can be changed in the constructor

## Node.js server

The project need a Node.js server to execute search requests. The code of the web service is included in the project and located in the `./server` folder. Host the script on a Node.js server.

## HTML structure

### Basic usage

The basic usage of the storelocator without filters and store categories used a minimalist HTML structure.

```html
<div class="storelocator">
    <div class="storelocator-loader"></div>
    <div class="storelocator-sidebar">
        <nav class="storelocator-nav">
            <ul class="storelocator-navList">
                <li class="storelocator-navListItem active">
                    <button class="storelocator-navButton" data-switch-view data-target="map">
                        Map
                    </button>
                </li>
                <li class="storelocator-navListItem">
                    <button class="storelocator-navButton" data-switch-view data-target="list">
                        List
                    </button>
                </li>
            </ul>
        </nav>
        <div class="storelocator-sidebarResults"></div>
    </div>
    <div class="storelocator-googleMaps active">
        <div id="storelocator-googleMapsCanvas"></div>
        <button class="storelocator-geolocButton"></button>
    </div>
</div>
```

### Usage with filters

The storelocator can have filters matches with store categories. Add the `<form>` tag highlight inside the sidebar. Categories can be personalized and category ids must correspond to identifiers in the JSON.

```html hl_lines="4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24"
<div class="storelocator">
    <div class="storelocator-loader"></div>
    <div class="storelocator-sidebar">
        <form class="storelocator-formSearch" name="form-search">
            <input type="text" class="storelocator-inputSearch" placeholder="Enter a location" autocomplete="off" />
            <div class="storelocator-formFilters">
                <div class="storelocator-formFiltersRow">
                    <div class="storelocator-formCheckbox">
                        <input type="checkbox" id="cat-1" data-filter checked="checked" value="1" />
                        <label for="cat-1" class="category-1">Categorie 1</label>
                    </div>
                    <div class="storelocator-formCheckbox">
                        <input type="checkbox" id="cat-2" data-filter checked="checked" value="2" />
                        <label for="cat-2" class="category-2">Categorie 2</label>
                    </div>
                </div>
                <div class="storelocator-formFiltersRow">
                    <div class="storelocator-formCheckbox">
                        <input type="checkbox" id="cat-3" data-filter value="3" />
                        <label for="cat-3" class="category-3">Categorie 3</label>
                    </div>
                </div>
            </div>
        </form>
        <nav class="storelocator-nav">
            <ul class="storelocator-navList">
                <li class="storelocator-navListItem active">
                    <button class="storelocator-navButton" data-switch-view data-target="map">
                        Map
                    </button>
                </li>
                <li class="storelocator-navListItem">
                    <button class="storelocator-navButton" data-switch-view data-target="list">
                        List
                    </button>
                </li>
            </ul>
        </nav>
        <div class="storelocator-sidebarResults"></div>
    </div>
    <div class="storelocator-googleMaps active">
        <div id="storelocator-googleMapsCanvas"></div>
        <button class="storelocator-geolocButton"></button>
    </div>
</div>
```

## Instantiation

The storelocatorjs class accept an object as parameter with 2 keys:

* `options` - Object of options (mandatory key `apiKey` and `webServiceUrl`)
* `onReady` - Callback function (optional)

#### Simple example

The simplest way to use storelocator is like the example below. All default options are used except them passed in the constructor.

```javascript
new Storelocator({
    apiKey: '',
    webServiceUrl: ''
})
```

#### Example with the onReady function

The `onReady` function expose the `map` instance and is called when the map is instantiated and ready. With the example below, An automatic search is triggered with location coordinates passed in parameters.

```javascript
new Storelocator({
    apiKey: '',
    webServiceUrl: ''
}, onReady: function(map) {
    this.triggerRequest({
        'lat': 48.8589507,
        'lng': 2.2770202
    });
})
```

## Requests

All search requests use the fetch API to communicate with the Node.js server with the following parameters. Datas are transmitted by JSON format.

#### `lat`

`default: float = null`

Tells storelocatorjs what is the latitude of the research.

#### `lng`

`default: float = null`

Tells storelocatorjs what is the latitude of the research.

#### `categories`

`default: [] = null`

Tells storelocatorjs what are the selected categories.

#### `radius`

`default: integer = 50`

Tells storelocatorjs what is the search radius of the request in kilometers.

#### `limit`

`default: Integer = 0`

Tells storelocatorjs what is the limit of results return by the request. Use `0` to return unlimited stores, according to the JSON database.

<script>
  ((window.gitter = {}).chat = {}).options = {
    room: 'store-locator/store-locator'
  };
</script>
<script src="https://sidecar.gitter.im/dist/sidecar.v1.js" async defer></script>