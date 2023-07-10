---
title: How it works - Storelocatorjs
description: Storelocatorjs includes multiple options to personnalize the map
---

Storelocatorjs contains many options to allow you to easily configure your map according to your needs. List of all options with their default values.

#### `apiKey`

`mandatory - default: string = ''`

Tells storelocatorjs the API key to use Google Maps API.

```js
new storelocatorjs({
  options: {
    apiKey: ''
  }
});
```

#### `webServiceUrl`

`mandatory - default: string = ''`

Tells storelocatorjs where is located the cloud function web service to get JSON store datas.

```js
new storelocatorjs({
  options: {
    webServiceUrl: ''
  }
});
```

#### `cluster.options`

`default: object`

Tells storelocatorjs marker clusters options. Documentation is available on [Google Developers](https://developers.google.com/maps/documentation/javascript/marker-clustering).

```js
new storelocatorjs({
    options: {
        cluster: {
            options: {
                {
                    averageCenter: true,
                    gridSize: 50,
                    imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
                    maxZoom: 13,
                    minimumClusterSize: 2,
                    styles: [],
                    zoomOnClick: true
                }
            }
        }
    }
});
```

#### `cluster.status`

`default: boolean = false`

Tells storelocatorjs whether to enable the marker clustering.

```js
new storelocatorjs({
  options: {
    cluster: {
      status: false
    }
  }
});
```

#### `debug`

`default: boolean = false`

Tells storelocatorjs whether to display the debug overlay.

```js
new storelocatorjs({
  options: {
    debug: false
  }
});
```

#### `geolocation.startOnLoad`

`default: integer = false`

Tells storelocatorjs whether to enable an auto geolocation request on page load.

```js
new storelocatorjs({
  options: {
    geolocation: {
      startOnLoad: false
    }
  }
});
```

#### `geolocation.status`

`default: boolean = true`

Tells storelocatorjs whether to enable the geolocation.

```js
new storelocatorjs({
  options: {
    geolocation: {
      status: true
    }
  }
});
```

#### `map.markers.width`

`default: integer = 30`

Tells storelocatorjs what is the marker width in pixel (without unity).

```js
new storelocatorjs({
  options: {
    map: {
      markers: {
        width: 30
      }
    }
  }
});
```

#### `map.markers.height`

`default: integer = 40`

Tells storelocatorjs what is the marker height in pixel (without unity).

```js
new storelocatorjs({
  options: {
    map: {
      markers: {
        height: 40
      }
    }
  }
});
```

#### `map.markers.styles`

`default: array`

Tells storelocatorjs what are the geolocation marker styles. The category `userPosition` is reserved to identify the geolocation marker.

```js
new storelocatorjs({
  options: {
    map: {
      markers: {
        styles: [
          {
            category: 'userPosition',
            colorBackground: '#4285f4',
            colorText: '#fff'
          }
        ]
      }
    }
  }
});
```

The array `map.markers.styles` can accept entries for each category to customize markers by category.

```js
new storelocatorjs({
  options: {
    map: {
      markers: {
        styles: [
          {
            category: '1',
            colorBackground: '#ff6600',
            colorText: '#fff'
          },
          {
            category: '2',
            colorBackground: '#ffcc33',
            colorText: '#fff'
          },
          {
            category: '3',
            colorBackground: '#ea4c89',
            colorText: '#fff'
          }
        ]
      }
    }
  }
});
```

#### `map.options`

`default: object`

Tells storelocatorjs marker options. Documentation is available on [Google Developers](https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions).

`map.options.styles` can be used to stylized the map. Documentation is available on the [feature page](https://yoriiis.github.io/storelocatorjs/features.html#maps-styles)

```js
new storelocatorjs({
  options: {
    map: {
      options: {
        center: [46.227638, 2.213749],
        disableDefaultUI: false,
        fullscreenControl: true,
        mapTypeControl: false,
        mapTypeId: 'roadmap',
        scaleControl: false,
        scrollwheel: true,
        streetViewControl: false,
        styles: [],
        zoom: 6
      }
    }
  }
});
```

#### `requests.searchRadius`

`default: integer = 50`

Tells storelocatorjs what is the search radius in kilometers, when a search is triggered by the user.

```js
new storelocatorjs({
  options: {
    requests: {
      searchRadius: 50
    }
  }
});
```

#### `requests.storesLimit`

`default: integer = 20`

Tells storelocatorjs what is the limit of results return by the request. Use `0` to return unlimited stores, according to the JSON database.

```js
new storelocatorjs({
  options: {
    requests: {
      storesLimit: 20
    }
  }
});
```

#### `selectors`

`default: object`

Tells storelocatorjs what are HTML identifier (class or data attribute) for each elements. You can personalize them.

```js
new storelocatorjs({
  options: {
    selectors: {
      container: '.storelocator',
      formSearch: '.storelocator-formSearch',
      geolocButton: '.storelocator-geolocButton',
      inputSearch: '.storelocator-inputSearch',
      loader: '.storelocator-loader',
      nav: '.storelocator-nav',
      searchFilters: '[data-filter]',
      sidebar: '.storelocator-sidebar',
      sidebarResults: '.storelocator-sidebarResults'
    }
  }
});
```

#### `markersUpdate.limitInViewport`

`default: integer = 30`

Tells storelocatorjs what is the maximum of results in the main viewport when an auto-search is triggered. Zoom or move events may trigger an auto-search if user extends the area.

```js
new storelocatorjs({
  options: {
    markersUpdate: {
      limitInViewport: 30
    }
  }
});
```

#### `markersUpdate.maxRadius`

`default: integer = 150`

Tells storelocatorjs what is the maximum search radius in kilometers during an auto-search.

```js
new storelocatorjs({
  options: {
    markersUpdate: {
      maxRadius: 150
    }
  }
});
```

#### `markersUpdate.status`

`default: boolean = true`

Tells storelocatorjs whether to enable auto-search to refresh markers on area bounds changed. Zoom or move events may trigger an auto-search if user extends the area.

```js
new storelocatorjs({
  options: {
    markersUpdate: {
      status: true
    }
  }
});
```

#### `markersUpdate.stepRadius`

`default: integer = 50`

Tells storelocatorjs what is the search radius when the default search limit of 30 kilometers is exceeded. Zoom or move events may trigger an auto-search if user extends the area.

```js
new storelocatorjs({
  options: {
    markersUpdate: {
      stepRadius: 50
    }
  }
});
```

<script>
  ((window.gitter = {}).chat = {}).options = {
    room: 'store-locator/store-locator'
  };
</script>
<script src="https://sidecar.gitter.im/dist/sidecar.v1.js" async defer></script>
