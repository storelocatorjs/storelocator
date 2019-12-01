title: Features - Storelocatorjs
description: Storelocatorjs is responsive and includes many features such as autocomplete, geolocation, markers, info window, filters and clusters

### Responsive design

Storelocatorjs is responsive mobile first and can be customized with just a few CSS rules.

<center class="wrapper-screenshot-touch">
![Storelocatorjs on tablet](images/ipad.png)![Storelocatorjs on mobile](images/iphone.png)
</center>

### Maps styles

The map can be customized with a configuration object in the `map.options.styles` property. Use for example <a href="https://snazzymaps.com/" title="Snazzy Maps" target="_blank">Snazzy Maps</a> tools to generate a JSON configuration, and paste it in the constructor key `map.options.styles`.

Below, an example of configuration:

```json
{
    "styles": [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#6195a0"}]},{"featureType":"administrative.province","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"lightness":"0"},{"saturation":"0"},{"color":"#f5f5f2"},{"gamma":"1"}]},{"featureType":"landscape.man_made","elementType":"all","stylers":[{"lightness":"-3"},{"gamma":"1.00"}]},{"featureType":"landscape.natural.terrain","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#bae5ce"},{"visibility":"on"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45},{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#fac9a9"},{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"labels.text","stylers":[{"color":"#4e4e4e"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#787878"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"transit.station.airport","elementType":"labels.icon","stylers":[{"hue":"#0a00ff"},{"saturation":"-77"},{"gamma":"0.57"},{"lightness":"0"}]},{"featureType":"transit.station.rail","elementType":"labels.text.fill","stylers":[{"color":"#43321e"}]},{"featureType":"transit.station.rail","elementType":"labels.icon","stylers":[{"hue":"#ff6c00"},{"lightness":"4"},{"gamma":"0.75"},{"saturation":"-68"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#eaf6f8"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#c7eced"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"lightness":"-49"},{"saturation":"-53"},{"gamma":"0.79"}]
}
```

### Autocomplete

Storelocatorjs include by default [Google Maps Autocomplete](https://developers.google.com/maps/documentation/javascript/places-autocomplete). The `places` librairy is automatically loaded.

### Geolocation

Storelocatorjs integrate its own geolocation button `.storelocator-geolocButton` to trigger a geolocation request.

!!! warning
    Geolocation need SSL certificat with `https` on Google Chrome and somes others recents browsers. Documentation is available on [Google Developers](https://developers.google.com/web/updates/2016/04/geolocation-on-secure-contexts-only).

### Filters

Storelocatorjs can be used with or without filters. Filters let you filter stores by categories. Store categories can be unlimited but **must be unique** for each marker. Identifie them by a unique ID in the JSON key `categories` as string format.

### Marker styles

Marker have a default style, the same as on Google Maps. Storelocatorjs has an option to easily customized the style of the marker with a SVG.

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
                "colorText": "#fff"
            }, {
                "category": "1",
                "colorBackground": "#ec4233",
                "colorText": "#fff"
            },{
                "category": "2",
                "colorBackground": "#009925",
                "colorText": "#fff"
            },{
                "category": "3",
                "colorBackground": "#eeb211",
                "colorText": "#fff"
            }]
        }
    }
}
```

You can change the marker dimensions (width and height) in pixel by passing an integer.

`map.markers.style` contains object, each objects correspond to a marker category, with 3 parameters:

!!! tip "Geolocation marker"
    The marker category __`userPosition`__ allow you to customized the marker style of the user geolocation. Do not change the category name of this marker.<br /><br />

!!! bug "Marker SVG on IE"
    Internet Explorer doesn't accept custom SVG for markers. Default markers are use on this browser.

### Clusters

With cluster option enabled, you need to load the `markerclusterer.js` library before the Storelocator. Documentation is available on [Google Developers](https://developers.google.com/maps/documentation/javascript/marker-clustering)

```html
<script src="https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js"></script>
```

```javascript
new storelocatorjs({
    options: {
        cluster: {
            status: true,
            options: {
                gridSize: 50,
                maxZoom: 13,
                imagePath: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
                zoomOnClick: true,
                averageCenter: true,
                minimumClusterSize: 2,
                styles: []
            }
        }
    }
});
```

Default image can be changed, fill the option `cluster.options.styles` as below, to easily customized the style of the cluster image.

```javascript hl_lines="6 7 8 9"
new storelocatorjs({
    options: {
        cluster: {
            options: {
                styles: [{
                    "url": "/images/cluster.png",
                    "textColor": "#000",
                    "width": 60,
                    "height": 60
                }]
            }
        }
    }
});
```

### Markers update

Storelocatorjs auto-search allow to refresh markers on area bounds changed. Zoom or move events may trigger an auto-search if user extends the area. To use this feature, enable options `markersUpdate.status`.

!!! tip "Viewport overlays"
    Enable `debug` option to see viewport overlays above the map:

    * `red`: list of all stores according to `maxRadius` option. User can move on this area without refresh the map.
    * `green`: list of all stores according to the `limitInViewport` option. Map is centered on this viewport.

### Info window

Storelocatorjs allow to show marker information with the native Google Maps info window. Below, the default template displays the fields available in the JSON.

```html
<div class="storelocator-infoWindow">
    <span class="store-picture">
        <img src="{picture}" alt="{title}" />
    </span>
    <div class="storelocator-detailStore">
        <span class="storelocator-detailStoreTitle">{title}</span>
        <span class="storelocator-detailStoreDistance">
            <a href="http://www.google.fr/maps/dir/${origin}/${destination}" title="Itinerary" target="_blank">
                {distance}km
            </a>
        </span>
        <span class="storelocator-detailStoreAddress">{address}</span>
        <span class="storelocator-detailStoreZipcode">{zipcode}</span>
        <span class="storelocator-detailStoreCity">{city}</span>
        <span class="storelocator-detailStorePhone">
            <a href="tel:{phone}" title="Call">{phone}</a>
        </span>
        <span class="store-link">
            <a href="{link}" title="Visit website" target="_blank">{link}</a>
        </span>
    </div>
</div>
```

!!! info "Distance"
    You will notice that the distance information is automatically caculate with the cloud function script.

<script>
  ((window.gitter = {}).chat = {}).options = {
    room: 'store-locator/store-locator'
  };
</script>
<script src="https://sidecar.gitter.im/dist/sidecar.v1.js" async defer></script>