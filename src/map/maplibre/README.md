# Map provider: MapLibre

Supports for MapLibre storelocator with the [MapLibre API](https://maplibre.org/maplibre-gl-js/docs).

> **Note** The MapLibre API is automatically loaded by the provider.

## Overview

| <!-- -->    | <!-- -->                          |
| ----------- | --------------------------------- |
| Name        | `maplibre`                        |
| Path        | `storelocatorjs/map/maplibre`     |
| Entry point | `storelocatorjs/map/maplibre.js`  |
| Stylesheet  | `storelocatorjs/map/maplibre.css` |

## Usage

### HTML

```html
<div id="app"></div>
```

### JavaScript

```javascript
import 'storelocatorjs/storelocator.css';
import 'storelocatorjs/map/maplibre.css';
import Storelocatorjs from 'storelocatorjs';
import MapLibre from 'storelocatorjs/map/maplibre.js';

new Storelocatorjs({
  target: document.querySelector('#app'),
  licenseKey: 'LICENSE_KEY',
  api: {
    url: 'ENDPOINT_URL'
  },
  map: {
    provider: MapLibre,
    token: 'MAPBOX_ACCESS_TOKEN'
  },
  geocoder: {
    provider: 'maplibre',
    token: 'GEOCODER_PROVIDER_TOKEN'
  }
});
```

## Demo

<!-- See the [Youtube provider](https://glitch.com/edit/#!/vlitejs-youtube-video?previewSize=50&attributionHidden=false&sidebarCollapsed=false&path=index.html&previewFirst=false) demo. -->

## SDK documentation

See the [MapLibre API](https://maplibre.org/maplibre-gl-js/docs) documentation.
