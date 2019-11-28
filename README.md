[![Gitter chat](https://badges.gitter.im/gitterHQ/gitter.png)](https://gitter.im/store-locator/store-locator)

# Storelocator.js <small>with Google Maps</small>

## Easily build a storelocator in Javascript

See [https://yoriiis.github.io/storelocator.js](https://yoriiis.github.io/storelocator.js) for complete docs and demos.<br />

Storelocator is a **fast** and **lightweight** Javascript library to easily build a storelocator using <a href="https://developers.google.com/maps/documentation/javascript/" target="_blank" title="Documentation">Google Maps API V3</a>. Only **6Kb** on production with Gzip, it has no dependency with any framework or library and is write in **Javascript native**.

<center style="image-rendering: -webkit-optimize-contrast;">
<img src="https://yoriiis.github.io/storelocator.js/img/desktop.jpg" alt="Storelocator on desktop" />
</center>

Storelocator is **responsive** desktop, tablet and mobile, and is autonomous with a full PHP webservice which includes ajax requests includes. List of included features:

* [Responsive design](https://yoriiis.github.io/storelocator.js/features/#responsive-design)
* [Map with options](https://yoriiis.github.io/storelocator.js/features/#maps-options)
* [Search with autocomplete](https://yoriiis.github.io/storelocator.js/features/#autocomplete)
* [Browser geolocation](https://yoriiis.github.io/storelocator.js/features/#geolocation)
* [Filters by category](https://yoriiis.github.io/storelocator.js/features/#filters)
* [PHP class and webservice](https://yoriiis.github.io/storelocator.js/features/#php-class-and-webservice)
* [AJAX research](https://yoriiis.github.io/storelocator.js/features/#ajax-research)
* [JSON structure](https://yoriiis.github.io/storelocator.js/features/#json-structure)
* [Markers](https://yoriiis.github.io/storelocator.js/features/#markers)
* [Clusters](https://yoriiis.github.io/storelocator.js/features/#clusters)
* [SVG for markers style](https://yoriiis.github.io/storelocator.js/features/#markers)
* [Update markers on bounds changed](https://yoriiis.github.io/storelocator.js/features/#markers-update-on-bounds-changed)
* [List of results](https://yoriiis.github.io/storelocator.js/features/#results)
* [Native info window popin](https://yoriiis.github.io/storelocator.js/features/#infowindow)
* [Loader](https://yoriiis.github.io/storelocator.js/features/#loader)

This module is fully writen in Javascript native. No need to import an additional librairy like jQuery or Handlebars. #YouMightNotNeedJquery<br />

Storelocator project is compatible with CMS like <strong>Wordpress</strong> and <strong>Drupal</strong>.<br />
It can also be used independently, as in the [demo](https://yoriiis.github.io/storelocator.js/demo).

## Download

Download Storelocator.js on [https://yoriiis.github.io/storelocator.js/download](https://yoriiis.github.io/storelocator.js/download)

## Licenses

### Commercial licenses

If you want to use Storelocator to develop commercial sites, themes, projects, and applications, the commercial license is the appropriate license. With this option, your source code is kept proprietary.<br />
Purchase a Storelocator.js Commercial License at [https://yoriiis.github.io/storelocator.js](https://yoriiis.github.io/storelocator.js).

## How it works

### Structure

```html
<div class="container-storelocator">

  <div class="storelocator-loader"></div>

  <form class="storelocator-formSearch" name="form-search">
    <input type="text" class="storelocator-inputSearch" placeholder="Enter a location" autocomplete="off" value="" required />
    <div class="storelocator-formFilters">
      <div class="storelocator-formFiltersRow">
          <div class="storelocator-formCheckbox">
              <input type="checkbox" id="cat-1" class="filter-map-js" checked="checked" value="1" />
          <label for="cat-1" class="category-1">Restaurant</label>
        </div>
        <div class="storelocator-formCheckbox">
            <input type="checkbox" id="cat-2" class="filter-map-js" checked="checked" value="2" />
          <label for="cat-2" class="category-2">Bar</label>
        </div>
      </div>
      <div class="storelocator-formFiltersRow">
        <div class="storelocator-formCheckbox">
          <input type="checkbox" id="cat-3" class="filter-map-js" checked="checked" value="3" />
          <label for="cat-3" class="category-3">Concept store</label>
        </div>
      </div>
    </div>
  </form>

  <div class="storelocator-googleMaps">
    <div id="storelocator-googleMapsCanvas"></div>
    <button class="storelocator-geolocButton"></button>
  </div>

  <div class="storelocator-sidebar">
    <div class="storelocator-sidebarResults"></div>
  </div>

</div>
```

### Javascripts

Storelocator class accept two parameters, options and optional callback function. There are only two mandatory option (`apiKey` and `urlWebservice`), you can easily instanciate the Storelocator with this minimum options. All other options will use the default value.

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
            }, {
                category: 'userSelect', // {String}
                colorBackground: '#000', // {String}
                colorBorderOuter: '#000', // {String}
                colorBorderInner: '#fff' // {String}
            }]
        }
    },

    selectors: {
        container: '.container-storelocator', // {String}
        loader: '.storelocator-loader', // {String}
        geolocButton: '.storelocator-geolocButton', // {String}
        sidebar: '.storelocator-sidebar', // {String}
        formSearch: '.storelocator-formSearch', // {String}
        inputSearch: '.storelocator-inputSearch', // {String}
        searchFilters: '.filter-map-js', // {String}
        sidebar: '.storelocator-sidebarResults' // {String}
    }
};

var myStorelocator = new Storelocator(options, function(map){
    //Ready
});
```

