# Map provider: Leaflet

Supports for Leaflet storelocator with the [Leaflet API](https://leafletjs.com/reference.html).

> **Note** The Leaflet API is automatically loaded by the provider.

## Overview

| <!-- -->    | <!-- -->                         |
| ----------- | -------------------------------- |
| Name        | `leaflet`                        |
| Path        | `storelocatorjs/map/leaflet`     |
| Entry point | `storelocatorjs/map/leaflet.js`  |
| Stylesheet  | `storelocatorjs/map/leaflet.css` |

## Usage

### HTML

```html
<div id="app"></div>
```

### JavaScript

```javascript
import 'storelocatorjs/storelocator.css';
import 'storelocatorjs/map/leaflet.css.css';
import Storelocatorjs from 'storelocatorjs';
import Leaflet from 'storelocatorjs/map/leaflet.js';

new Storelocatorjs({
  target: document.querySelector('#app'),
  licenseKey: 'LICENSE_KEY',
  api: {
    url: 'ENDPOINT_URL'
  },
  map: {
    provider: Leaflet
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

See the [Leaflet API](https://leafletjs.com/reference.html) documentation.
