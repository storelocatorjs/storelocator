title: How it works - Storelocator.js
description: The project includes a minimalist HTML structure example to start your Storelocator. All options are listed here and can be changed in the constructor

### Structure

HTML structure below is a simple base, use it and adjust (HTML and CSS) as you like.<br />
Category IDs in highlight lines must correspond to identifiers in the [JSON file](features/#json-structure).

```html hl_lines="10 14 20"
<div class="container-storelocator">

  <div class="storelocator-loader"></div>

  <form id="storelocator-formSearch" name="form-search">
    <input type="text" class="storelocator-inputSearch" placeholder="Enter a location" autocomplete="off" value="" required />
    <div class="storelocator-formFilters">
      <div class="storelocator-formFiltersRow">
          <div class="storelocator-formCheckbox">
              <input type="checkbox" name="category-1" id="category-1" class="filter-map-js" checked="checked" value="1" />
          <label for="category-1" class="category-1">Restaurant</label>
        </div>
        <div class="storelocator-formCheckbox">
            <input type="checkbox" name="category-2" id="category-2" class="filter-map-js" checked="checked" value="2" />
          <label for="category-2" class="category-2">Bar</label>
        </div>
      </div>
      <div class="storelocator-formFiltersRow">
        <div class="storelocator-formCheckbox">
          <input type="checkbox" name="category-3" id="category-3" class="filter-map-js" checked="checked" value="3" />
          <label for="category-3" class="category-3">Concept store</label>
        </div>
      </div>
    </div>
  </form>

  <div id="storelocator-googleMaps">
    <div id="google-map"></div>
    <button class="storelocator-geolocButton"></button>
  </div>

  <div class="storelocator-sidebar">
    <div class="storelocator-sidebarResults"></div>
  </div>

</div>
```

### Options

Storelocator contains many options to allow you to easily configure your map according to your needs. Add options directly in the constructor object.

#### Mandatory options

* `apiKey` - Use an Google Maps apiKey (__mandatory__)
* `urlWebservice` - Url of the webservice to get JSON (__mandatory__)

#### Default options

* `debug` - Enable log message in console and debug overlay
* `breakpointMobile` - Default breakpoint mobile

#### Cluster options

* `cluster.status` - Enable cluster of markers
* `cluster.options` - Configuration object for cluster

#### Geolocation options

* `geolocation.status` - Enable geolocation of markers
* `geolocation.startOnLoad` - Start geolocation on page loaded

#### updateMarkerOnBoundsChanged options

* `updateMarkerOnBoundsChanged.status` - Enable markers refresh on bounds changed (zoom or move events)
* `updateMarkerOnBoundsChanged.maxMarkersInViewportLimit` - Limit the number of markers in the viewport
* `updateMarkerOnBoundsChanged.stepRadius` - Step to increment the radius of research
* `updateMarkerOnBoundsChanged.maxRadius` - Limit the radius of research

#### Requests options

* `requests.searchRadius` - Radius of research in the map
* `requests.storeLimit` - Limit of number of stores return by the request (use 0 to unlimited stores)

#### Map options

* `map.options` - Configuration object for Google Maps
* `map.markers.width` - Width of custom marker SVG
* `map.markers.height` - Width of custom marker SVG
* `map.markers.styles` - Configuration for marker styles

#### Selectors options

* `selector` - Configuration of selectors used by the Storelocator

### Instantiation

Storelocator class accept two parameters, options and optional callback function. There are only two mandatory option ([`apiKey`](getting-started.md#create-an-api-key) and [`urlWebservice`](features.md#php-class-and-webservice)), you can easily instanciate the Storelocator with this minimum options. All other options will use the default value.

Below an example with the minimum of options.

```javascript
var options = {
    apiKey: '', // {String} MANDATORY
    urlWebservice: '' // {String} MANDATORY
}
var myStorelocator = new Storelocator(options, function(map){
    //Ready
})
```

Below an example of full object configuration of options with type of variable, default value, mandatory field and somes small details.

```javascript
var options = {
    apiKey: '', // {String} MANDATORY
    urlWebservice: '', // {String} MANDATORY
    debug: false, // {Bool}
    breakpointMobile: '767px', // {String}

    cluster: {
        status: true, // {Bool}
        options: {
            gridSize: 50, // {Int}
            maxZoom: 13, // {Int}
            imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m', // {String}
            zoomOnClick: true, // {Bool}
            averageCenter: true, // {Bool}
            minimumClusterSize: 2 // {Int}
        }
    },

    geolocation: {
        status: true, // {Bool}
        startOnLoad: false // {Bool}
    },

    updateMarkerOnBoundsChanged: {
        status: true, // {Bool}
        maxMarkersInViewportLimit: 30, // {Int}
        stepRadius: 50, // {Int} in kilometers
        maxRadius: 150 // {Int} in kilometers
    },

    requests: {
        searchRadius: 50, // {Int} in kilometers
        storeLimit: 20 // {Int}
    },

    map: {
        options: {
            center: [46.227638, 2.213749], // {Array} latitude and longitude
            mapTypeId: 'roadmap', // {String}
            zoom: 6, // {Int}
            scrollwheel: true, // {Bool}
            disableDefaultUI: false, // {Bool}
            mapTypeControl: false, // {Bool}
            streetViewControl: false, // {Bool}
            scaleControl: false, // {Bool}
            fullscreenControl: true, // {Bool}
            styles: [] // {Array}
        },
        markers: {
            width: 30, // {Int} in pixel
            height: 40, // {Int} in pixel
            styles: [{
                category: 'userPosition', // {String}
                colorBackground: '#4285f4', // {String}
                colorBorderOuter: '#4285f4', // {String}
                colorBorderInner: '#fff' // {String}
            }]
        }
    },

    selectors: {
        container: '.container-storelocator', // {String}
        loader: '.storelocator-loader', // {String}
        mapGeoloc: '.storelocator-geolocButton', // {String}
        mapAside: '.storelocator-sidebar', // {String}
        formSearch: '.storelocator-formSearch', // {String}
        inputSearch: 'storelocator-inputSearch', // {String}
        filtersSearch: '.filter-map-js', // {String}
        asideResults: '.storelocator-sidebarResults' // {String}
    }
};

var myStorelocator = new Storelocator(options, function(map){
    //Ready
});
```

<script>
  ((window.gitter = {}).chat = {}).options = {
    room: 'store-locator/store-locator'
  };
</script>
<script src="https://sidecar.gitter.im/dist/sidecar.v1.js" async defer></script>