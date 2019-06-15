[![Gitter chat](https://badges.gitter.im/gitterHQ/gitter.png)](https://gitter.im/store-locator/store-locator)

# Storelocator.js <small>with Google Maps</small>

## Easily build a storelocator in Javascript

See [https://store-locator.bitbucket.io](https://store-locator.bitbucket.io) for complete docs and demos.<br />

Storelocator is a **fast** and **lightweight** Javascript library to easily build a storelocator using <a href="https://developers.google.com/maps/documentation/javascript/" target="_blank" title="Documentation">Google Maps API V3</a>. Only **6Kb** on production with Gzip, it has no dependency with any framework or library and is write in **Javascript native**.

<center style="image-rendering: -webkit-optimize-contrast;">
<img src="https://store-locator.bitbucket.io/img/desktop.jpg" alt="Storelocator on desktop" />
</center>

Storelocator is **responsive** desktop, tablet and mobile, and is autonomous with a full PHP webservice which includes ajax requests includes. List of included features:

* [Responsive design](https://store-locator.bitbucket.io/features/#responsive-design)
* [Map with options](https://store-locator.bitbucket.io/features/#maps-options)
* [Search with autocomplete](https://store-locator.bitbucket.io/features/#autocomplete)
* [Browser geolocation](https://store-locator.bitbucket.io/features/#geolocation)
* [Filters by category](https://store-locator.bitbucket.io/features/#filters)
* [PHP class and webservice](https://store-locator.bitbucket.io/features/#php-class-and-webservice)
* [AJAX research](https://store-locator.bitbucket.io/features/#ajax-research)
* [JSON structure](https://store-locator.bitbucket.io/features/#json-structure)
* [Markers](https://store-locator.bitbucket.io/features/#markers)
* [Clusters](https://store-locator.bitbucket.io/features/#clusters)
* [SVG for markers style](https://store-locator.bitbucket.io/features/#markers)
* [Update markers on bounds changed](https://store-locator.bitbucket.io/features/#markers-update-on-bounds-changed)
* [List of results](https://store-locator.bitbucket.io/features/#results)
* [Native info window popin](https://store-locator.bitbucket.io/features/#infowindow)
* [Loader](https://store-locator.bitbucket.io/features/#loader)

This module is fully writen in Javascript native. No need to import an additional librairy like jQuery or Handlebars. #YouMightNotNeedJquery<br />

Storelocator project is compatible with CMS like <strong>Wordpress</strong> and <strong>Drupal</strong>.<br />
It can also be used independently, as in the [demo](https://store-locator.bitbucket.io/demo).

## Download

Download Storelocator.js on [https://store-locator.bitbucket.io/download](https://store-locator.bitbucket.io/download)

## Licences

### Commercial licenses

If you want to use Storelocator to develop commercial sites, themes, projects, and applications, the commercial license is the appropriate license. With this option, your source code is kept proprietary.<br />
Purchase a Storelocator.js Commercial License at [https://store-locator.bitbucket.io](https://store-locator.bitbucket.io).

## How it works

### Structure

```html
<div class="container-storelocator">

  <div class="storelocator-loader"></div>

  <form id="form-search" name="form-search">
    <input type="text" id="input-search" placeholder="Enter a location" autocomplete="off" value="" required />
    <div class="aside-filters">
      <div class="filters-row">
          <div class="form-checkbox">
              <input type="checkbox" name="category-1" id="category-1" class="filter-map-js" checked="checked" value="1" />
          <label for="category-1" class="category-1">Restaurant</label>
        </div>
        <div class="form-checkbox">
            <input type="checkbox" name="category-2" id="category-2" class="filter-map-js" checked="checked" value="2" />
          <label for="category-2" class="category-2">Bar</label>
        </div>
      </div>
      <div class="filters-row">
        <div class="form-checkbox">
          <input type="checkbox" name="category-3" id="category-3" class="filter-map-js" checked="checked" value="3" />
          <label for="category-3" class="category-3">Concept store</label>
        </div>
      </div>
    </div>
  </form>

  <div id="container-google-maps">
    <div id="google-map"></div>
    <button class="map-geoloc-js"></button>
  </div>

  <div class="map-aside">
    <div class="aside-results"></div>
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
        mapGeoloc: '.map-geoloc-js', // {String}
        mapAside: '.map-aside', // {String}
        formSearch: '#form-search', // {String}
        inputSearch: '#input-search', // {String}
        filtersSearch: '.filter-map-js', // {String}
        asideResults: '.aside-results' // {String}
    }
};

var myStorelocator = new Storelocator(options, function(map){
    //Ready
});
```
