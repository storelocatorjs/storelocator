title: Features - Storelocator.js
description: The Storelocator is responsive and includes many features such as autocomplete, geolocation, markers with infoWindow and clusters. Markers can be filtered

### Responsive design

The Storelocator is responsive desktop, tablet and mobile. The default mobile breakpoint in CSS is 767px (under tablet portrait resolution). This breakpoint is linked to Storelocator option `breakpointMobile`, change both at the same time.<br /><br />

<center class="wrapper-screenshot-touch">
![Storelocator on tablet](images/ipad.png)![Storelocator on mobile](images/iphone.png)
</center>

### Callback function

The second parameter of the class constructor `Storelocator` is a callback function, called when the module is ready. Instance of Google Maps is available with `map` parameter.<br />

To manually trigger a request with parameter on init, use `this.triggerRequest` function. Here is an example below:

```javascript
var options = {
    apiKey: '',
    urlWebservice: ''
};
var myStorelocator = new Storelocator(options, function(map){

    this.triggerRequest({
        'lat': 48.8589507,
        'lng': 2.2770202,
        fitBounds: true
    });

});
```

### Maps options

You can customized the map with object configuration in `map.options`.

The array of options can be edit to suit your needs. Here is an example below, please read the <a href="https://developers.google.com/maps/documentation/javascript/tutorial" target="_blank" title="Documentation">documentation here</a> for more informations.

```json
{
    "center": [46.227638, 2.213749],
    "mapTypeId": "roadmap",
    "zoom": 6,
    "scrollwheel": true,
    "disableDefaultUI": false,
    "mapTypeControl": false,
    "streetViewControl": false,
    "scaleControl": false,
    "fullscreenControl": true,
    "styles": []
}
```

??? info "Data types"
    * `center` - {Array} latitude and longitude
    * `mapTypeId` - {String}
    * `zoom` - {Int}
    * `scrollwheel` - {Bool}
    * `disableDefaultUI` - {Bool}
    * `mapTypeControl` - {Bool}
    * `streetViewControl` - {Bool}
    * `scaleControl` - {Bool}
    * `fullscreenControl` - {Bool}
    * `styles` - {Array}

Array `center` is automatically transform by the Storelocator in the code below:

```javascript
new google.maps.LatLng(46.227638, 2.213749);
```

Object can contain `styles` key to customized the map style with your own style. Use for example <a href="https://snazzymaps.com/" title="Snazzy Maps" target="_blank">Snazzy Maps</a> tools to generate your JSON configuration, and paste it in the constructor options `maps.options.styles`. Here is an example below:

```json
{
    "styles": [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#6195a0"}]},{"featureType":"administrative.province","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"lightness":"0"},{"saturation":"0"},{"color":"#f5f5f2"},{"gamma":"1"}]},{"featureType":"landscape.man_made","elementType":"all","stylers":[{"lightness":"-3"},{"gamma":"1.00"}]},{"featureType":"landscape.natural.terrain","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#bae5ce"},{"visibility":"on"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45},{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#fac9a9"},{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"labels.text","stylers":[{"color":"#4e4e4e"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#787878"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"transit.station.airport","elementType":"labels.icon","stylers":[{"hue":"#0a00ff"},{"saturation":"-77"},{"gamma":"0.57"},{"lightness":"0"}]},{"featureType":"transit.station.rail","elementType":"labels.text.fill","stylers":[{"color":"#43321e"}]},{"featureType":"transit.station.rail","elementType":"labels.icon","stylers":[{"hue":"#ff6c00"},{"lightness":"4"},{"gamma":"0.75"},{"saturation":"-68"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#eaf6f8"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#c7eced"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"lightness":"-49"},{"saturation":"-53"},{"gamma":"0.79"}]
}
```

### Autocomplete

Storelocator include by default Google Maps Autocomplete, `places` librairy is automatically loaded. No need submit button, autocomplete input automatically submit the form.

### Geolocation

Storelocator integrate its own geolocation button `.storelocator-geolocButton`, you can easily change the CSS.

!!! warning
    Geolocation need SSL certificat with https on Google Chrome and somes others recents browsers.<br />More information <a href="https://developers.google.com/web/updates/2016/04/geolocation-on-secure-contexts-only" title="HTML5 Geolocation API">here</a>.


### Filters

You can add as many categories as you want on your markers, identified them by a unique ID ("0", "1", etc.) in a string. Markers can only have one category, but you can edit the Storelocator to suit your needs if you want. By default all results are automatically dispatch by category and show in the list results in ascending distance.

On the demo, markers have 3 categories and filters are linked to these categories with value attribute. Inputs radio have changed event to refresh markers and list results automatically.

Module accept marker categories in JSON with unique identifier ("0", "1", ...) in string.

### PHP class and webservice

Storelocator project includes two PHP files in the folder `/inc`:

* `inc/ajax_get_stores.php` - Webservice called by AJAX requests
* `inc/WS_Stores.php` - PHP class to filter stores by categories and distance

If necessary, edit the `inc/ajax_get_stores.php` file to suit your needs.

List of parameters sent by the AJAX requests to `inc/ajax_get_stores.php`:

* `input` - {String} - Value of the autocomplete input
* `categories` - {Array} (optional) - List of selected categories
* `lat` - {Float} - Latitude of the research
* `lng` - {Float} - Longitude of the research
* `radius` - {Int} (optional) - Radius of the research
* `storesLimit` - {Int} (optional) - Limit of stores returned by the webservice

The PHP class filters stores with somes parameters:

* Coordinates (lat, lng) are mandatory parameters
* Categories of stores. If there are no selected categories, the webservice return no results
* Search radius to configure the radius of research
* Store limit to configure the maximum of stores returned

!!! success "Too many stores ?"
    Storelocator is compatible with big JSON datas, which contains many stores, no worry about this.

### AJAX research

All AJAX requests are by default sent to the file `inc/ajax_get_stores.php` who works with the class `inc/WS_Stores.php` which return a JSON. To edit the path, use the `urlWebservice` option.

### JSON structure

Storelocator project includes a JSON example in the folder `/datas/stores.json`.
The stores JSON file is an array of object (for better performance), which contains all datas of stores.<br />
Category IDs in highlight line must correspond to the value attributes in the [HTML structure](how-it-works/#structure).

!!! warning "Structure"
    __It is important to respect the format of the keys in the JSON file.__

```json hl_lines="3"
[{
    "category": "1",
    "id": 1,
    "title": "Le crabe Marteau",
    "address": "34 Avenue de la Perrière",
    "city": "Lorient",
    "zipcode": "56100",
    "phone": "0297594071",
    "lat": 47.7342023,
    "lng": -3.3670051
}]
```

??? info "Data types"
    * `category` - {String}
    * `id` - {Int || String}
    * `title` - {String}
    * `address` - {String}
    * `city` - {String}
    * `zipcode` - {String}
    * `phone` - {String}
    * `lat` - {Float}
    * `lng` - {Float}

### Markers

Marker have a default style, the same as on Google Maps. Storelocator has an option to easily customized the style of the marker with a SVG.

To use this feature, fill the option `map.markers` as below:

```json
{
    "map": {
        "markers": {
            "width": 30,
            "height": 40,
            "styles": [{
                "category": "userPosition",
                "colorBackground": "#4285f4",
                "colorBorder": "#4285f4"
            }, {
                "category": "1",
                "colorBackground": "#ec4233",
                "colorBorder": "#ec4233"
            },{
                "category": "2",
                "colorBackground": "#009925",
                "colorBorder": "#009925"
            },{
                "category": "3",
                "colorBackground": "#eeb211",
                "colorBorder": "#eeb211"
            }]
        }
    }
}
```

??? info "Data types"
    * `width` - {Int}
    * `height` - {Int}
    * `category` - {String}
    * `colorBackground` - {String}
    * `colorBorder` - {String}

You can change the marker dimensions (width and height) in pixel by passing an integer.

`map.markers.style` contains object, each objects correspond to a marker category, with 4 parameters:

!!! tip "Category reserved"
    The marker category __`userPosition`__ allow you to customized the marker style of the user geolocation. Do not change the category of this marker.<br /><br />

!!! bug "Marker SVG on IE"
    Internet Explorer doesn't accept custom SVG for markers. Default markers are use on this browser.

### Clusters

!!! warning "Load the librairy"
    With cluster option enabled, you need to load `./js/libs/markerclusterer.js` separately in your vendors.<br />The library is included in the package.

Cluster options are available, please read the <a href="https://googlemaps.github.io/js-marker-clusterer/docs/reference.html" target="_blank" title="Documentation">documentation here</a>.

The default image is provided by <a href="https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m1.png" title="Cluster image" target="_blank">Google</a>. See the example below:

```json hl_lines="7"
{
    "cluster": {
        "status": true,
        "options": {
            "gridSize": 50,
            "maxZoom": 13,
            "imagePath": "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
            "zoomOnClick": true,
            "averageCenter": true,
            "minimumClusterSize": 2
        }
    }
}
```

??? info "Data types"
    * `imagePath` - {String}
<br />

Default image can be changed, fill the option `cluster.options.styles` as below, to easily customized the style of the cluster with a PNG image (included in the project):

```json hl_lines="10 11 12 13 14 15"
{
    "cluster": {
        "status": true,
        "options": {
            "gridSize": 50,
            "maxZoom": 13,
            "zoomOnClick": true,
            "averageCenter": true,
            "minimumClusterSize": 2,
            "styles": [{
                "url": "/images/cluster.png",
                "textColor": "#000",
                "width": 60,
                "height": 60
            }]
        }
    }
}
```

??? info "Data types"
    * `url` - {String}
    * `textColor` - {String}
    * `width` - {Int}
    * `height` - {Int}


### Markers update on bounds changed

The map can be refreshed when user moves or the zoom changes. To use this feature, enable options `updateMarkerOnBoundsChanged.status`. Default parameters are optimized but you can easily change them.<br />The functionality is automatically disabled when marker info Window is opened, to prevent marker removed.

!!! tip "Debug overlay"
    Enable `debug` option to see debug overlay above the map:

    * `green` - Limit the number of markers in the viewport `maxMarkersinViewportLimit`. Map is centered on this viewport
    * `red` - Viewport contains all markers related to the `searchRadius`. User can move on this area without refresh the map.

### Results

List of results are synchronized with markers. The list is filtered by category and store are sort by distance to the map center.
A small ES6 template string is use to built the HTML of each result.

```html
<div class="storelocator-detailStore">
    <span class="storelocator-detailStoreTitle">{title}</span>
    <span class="storelocator-detailStoreDistance"><a href="http://www.google.fr/maps/dir/{origin}/{destination}" title="Itinerary" target="_blank">{distance}km</a></span>
    <span class="storelocator-detailStoreAddress">{address}</span>
    <span class="storelocator-detailStoreZipcode">{zipcode}</span>
    <span class="storelocator-detailStoreCity">{city}</span>
    <span class="storelocator-detailStorePhone"><a href="tel:{phone}" title="Call">{phone}</a></span>
</div>
```

!!! info "Distance"
    You will notice that the distance information is caculate in backend with the PHP class. The value is not present in the original JSON.

### InfoWindow

Storelocator allow you to show more information of the marker when user click on it. It uses the native Google Maps infoWindow with a small ES6 template string to built the HTML of the info window.

```html
<div class="storelocator-infoWIndow">
    <span class="store-picture">><a href="{link}" title="Visit website" target="_blank"><img src="{picture}" alt="{title}" /></a></span>
    <div class="storelocator-detailStore">
        <span class="storelocator-detailStoreTitle">{title}</span>
        <span class="storelocator-detailStoreDistance"><a href="http://www.google.fr/maps/dir/${origin}/${destination}" title="Itinerary" target="_blank">{distance}km</a></span>
        <span class="storelocator-detailStoreAddress">{address}</span>
        <span class="storelocator-detailStoreZipcode">{zipcode}</span>
        <span class="storelocator-detailStoreCity">{city}</span>
        <span class="storelocator-detailStorePhone"><a href="tel:{phone}" title="Call">{phone}</a></span>
        <span class="store-link"><a href="{link}" title="Visit website" target="_blank">{link}</a></span>
    </div>
</div>
```

!!! info "Distance"
    You will notice that the distance information is caculate in backend with the PHP class. The value is not present in the original JSON.

You can easily edit the CSS to customized the style of the infoWindow.

Info window contains:

* Marker information
* Distance between search position/user position and marker position
* Link to Google Maps itinerary

### Loader

Storelocator integrate a small loader, visible during request on the top of the map. The display is trigger with a `.active` CSS class add to `.storelocator-loader`.

Structure of the loader:

```html
<div class="storelocator-loader active"></div>
```

### Log message

Storelocator includes log message on requests and errors when `debug` option is enabled. `log` function has two parameters, use it only during development:

* `method` - Choose between `log` and `warn` method of `window.console`
* `message` - The message to show in the console

<script>
  ((window.gitter = {}).chat = {}).options = {
    room: 'store-locator/store-locator'
  };
</script>
<script src="https://sidecar.gitter.im/dist/sidecar.v1.js" async defer></script>