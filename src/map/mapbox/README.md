# Map provider: Mapbox

Supports for Mapbox storelocator with the [Mapbox API](https://docs.mapbox.com/mapbox-gl-js/api).

> **Note** The Mapbox API is automatically loaded by the provider.

## Overview

| <!-- -->    | <!-- -->                        |
| ----------- | ------------------------------- |
| Name        | `mapbox`                        |
| Path        | `storelocatorjs/map/mapbox`     |
| Entry point | `storelocatorjs/map/mapbox.js`  |
| Stylesheet  | `storelocatorjs/map/mapbox.css` |

## Usage

### HTML

```html
<div id="app"></div>
```

### JavaScript

```javascript
import 'storelocatorjs/storelocator.css';
import 'storelocatorjs/map/mapbox.css.css';
import Storelocatorjs from 'storelocatorjs';
import Mapbox from 'storelocatorjs/map/mapbox.js';

new Storelocatorjs({
  target: document.querySelector('#app'),
  licenseKey: 'LICENSE_KEY',
  api: {
    url: 'ENDPOINT_URL'
  },
  map: {
    provider: Mapbox,
    token: 'MAPBOX_ACCESS_TOKEN'
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

See the [Mapbox API](https://docs.mapbox.com/mapbox-gl-js/api) documentation.
