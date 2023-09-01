# Map provider: Google Maps

Supports for Google Maps storelocator with the [Google Maps API](https://developers.google.com/maps/documentation/javascript).

> **Note** The Google Maps API is automatically loaded by the provider.

## Overview

| <!-- -->    | <!-- -->                            |
| ----------- | ----------------------------------- |
| Name        | `google-maps`                       |
| Path        | `storelocatorjs/map/google-maps`    |
| Entry point | `storelocatorjs/map/google-maps.js` |
| Stylesheet  | -                                   |

## Usage

### HTML

```html
<div id="app"></div>
```

### JavaScript

```javascript
import 'storelocatorjs/storelocator.css';
import Storelocatorjs from 'storelocatorjs';
import GoogleMaps from 'storelocatorjs/map/google-maps.js';

new Storelocatorjs({
  target: document.querySelector('#app'),
  licenseKey: 'LICENSE_KEY',
  api: {
    url: 'ENDPOINT_URL'
  },
  map: {
    provider: GoogleMaps,
    token: 'GOOGLE_MAPS_API_KEY'
  },
  geocoder: {
    provider: 'mapbox',
    token: 'GEOCODER_PROVIDER_TOKEN'
  }
});
```

## Demo

<!-- See the [Youtube provider](https://glitch.com/edit/#!/vlitejs-youtube-video?previewSize=50&attributionHidden=false&sidebarCollapsed=false&path=index.html&previewFirst=false) demo. -->

## SDK documentation

See the [Google Maps API](https://developers.google.com/maps/documentation/javascript) documentation.
