title: How it works - Storelocator.js
description: The project includes a minimalist HTML structure example to start your Storelocator. All options are listed here and can be changed in the constructor

## Node.js server

The project need a Node.js server to execute search requests. The code of the web service is included in the project and located in the `./server` folder. Host the script on a Node.js server.

## HTML structure

### Basic usage

The basic usage of the storelocator without filters and store categories used a minimalist HTML structure.

```html
<div class="storelocator">
    <div class="storelocator-loader"></div>
    <div class="storelocator-sidebar">
        <nav class="storelocator-nav">
            <ul class="storelocator-navList">
                <li class="storelocator-navListItem active">
                    <button class="storelocator-navButton" data-switch-view data-target="map">
                        Map
                    </button>
                </li>
                <li class="storelocator-navListItem">
                    <button class="storelocator-navButton" data-switch-view data-target="list">
                        List
                    </button>
                </li>
            </ul>
        </nav>
        <div class="storelocator-sidebarResults"></div>
    </div>
    <div class="storelocator-googleMaps active">
        <div id="storelocator-googleMapsCanvas"></div>
        <button class="storelocator-geolocButton"></button>
    </div>
</div>
```

### Usage with filters

The storelocator can have filters matches with store categories. Add the `<form>` tag highlight inside the sidebar. Categories can be personalized and category ids must correspond to identifiers in the JSON.

```html hl_lines="4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24"
<div class="storelocator">
    <div class="storelocator-loader"></div>
    <div class="storelocator-sidebar">
        <form class="storelocator-formSearch" name="form-search">
            <input type="text" class="storelocator-inputSearch" placeholder="Enter a location" autocomplete="off" />
            <div class="storelocator-formFilters">
                <div class="storelocator-formFiltersRow">
                    <div class="storelocator-formCheckbox">
                        <input type="checkbox" id="cat-1" data-filter checked="checked" value="1" />
                        <label for="cat-1" class="category-1">Catégorie 1</label>
                    </div>
                    <div class="storelocator-formCheckbox">
                        <input type="checkbox" id="cat-2" data-filter checked="checked" value="2" />
                        <label for="cat-2" class="category-2">Catégorie 2</label>
                    </div>
                </div>
                <div class="storelocator-formFiltersRow">
                    <div class="storelocator-formCheckbox">
                        <input type="checkbox" id="cat-3" data-filter value="3" />
                        <label for="cat-3" class="category-3">Catégorie 3</label>
                    </div>
                </div>
            </div>
        </form>
        <nav class="storelocator-nav">
            <ul class="storelocator-navList">
                <li class="storelocator-navListItem active">
                    <button class="storelocator-navButton" data-switch-view data-target="map">
                        Map
                    </button>
                </li>
                <li class="storelocator-navListItem">
                    <button class="storelocator-navButton" data-switch-view data-target="list">
                        List
                    </button>
                </li>
            </ul>
        </nav>
        <div class="storelocator-sidebarResults"></div>
    </div>
    <div class="storelocator-googleMaps active">
        <div id="storelocator-googleMapsCanvas"></div>
        <button class="storelocator-geolocButton"></button>
    </div>
</div>
```

## Options

Storelocator contains many options to allow you to easily configure your map according to your needs. List of all options with their default values.

#### `apiKey`

`mandatory - default: string = ''`

Tells storelocatorjs the API key to use Google Maps API.

```javascript
new storelocatorjs({
    options: {
        apiKey: ''
    }
});
```

#### `urlWebservice`

`mandatory - default: string = ''`

Tells storelocatorjs where is located the Node.js web service to get JSON store datas.

```javascript
new storelocatorjs({
    options: {
        urlWebservice: ''
    }
});
```

#### `cluster.options`

`default: object`

Tells storelocatorjs marker clusters options. Documentation is available on [Google Developers](https://developers.google.com/maps/documentation/javascript/marker-clustering).

```javascript
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

Tells storelocatorjs whether to enable the cluster of markers.

```javascript
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

```javascript
new storelocatorjs({
    options: {
        debug: false
    }
});
```

#### `geolocation.startOnLoad`

`default: integer = false`

Tells storelocatorjs whether to enable an auto geolocation request on page load.

```javascript
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

```javascript
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

Tells storelocatorjs what is the marker width.

```javascript
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

Tells storelocatorjs what is the marker height.

```javascript
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

```javascript
new storelocatorjs({
    options: {
        map: {
            markers: {
                styles: [{
                    category: 'userPosition',
                    colorBackground: '#4285f4',
                    colorBorder: '#4285f4'
                }]
            }
        }
    }
});
```

The array `map.markers.styles` can accept entries for each category to customize markers by category

```javascript
new storelocatorjs({
    options: {
        map: {
            markers: {
                styles: [{
                    category: '1',
                    colorBackground: '#ff6600',
                    colorText: '#fff'
                },{
                    category: '2',
                    colorBackground: '#ffcc33',
                    colorText: '#fff'
                },{
                    category: '3',
                    colorBackground: '#ea4c89',
                    colorText: '#fff'
                }]
            }
        }
    }
});
```

#### `map.options`

`default: object`

Tells storelocatorjs marker options. Documentation is available on [Google Developers](https://developers.google.com/maps/documentation/javascript/reference/3.37/map#MapOptions).

```javascript
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

```javascript
new storelocatorjs({
    options: {
        requests: {
            searchRadius: 50
        }
    }
});
```

#### `requests.storeLimit`

`default: integer = 20`

Tells storelocatorjs what is the limit of results return by the request. Use `0` to return unlimited stores, according to the JSON database.

```javascript
new storelocatorjs({
    options: {
        requests: {
            storeLimit: 20
        }
    }
});
```

#### `selectors`

`default: integer = 30`

Tells storelocatorjs what are HTML identifier (class or data attribute) for each elements. You can personalize them.

```javascript
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
        },
    }
});
```

#### `updateMarkerOnBoundsChanged.maxMarkersInViewportLimit`

`default: integer = 30`

Tells storelocatorjs what is the maximum of results in the main viewport when an auto-search is triggered. Zoom or move events may trigger an auto-search if user extends the area.

```javascript
new storelocatorjs({
    options: {
        updateMarkerOnBoundsChanged: {
            maxMarkersInViewportLimit: 30
        }
    }
});
```

#### `updateMarkerOnBoundsChanged.maxRadius`

`default: integer = 150`

Tells storelocatorjs what is the maximum search radius in kilometers during an auto-search.

```javascript
new storelocatorjs({
    options: {
        updateMarkerOnBoundsChanged: {
            maxRadius: 150
        }
    }
});
```

#### `updateMarkerOnBoundsChanged.status`

`default: boolean = true`

Tells storelocatorjs whether to enable auto-search to refresh markers on area bounds changed. Zoom or move events may trigger an auto-search if user extends the area.

```javascript
new storelocatorjs({
    options: {
        updateMarkerOnBoundsChanged: {
            status: true
        }
    }
});
```

#### `updateMarkerOnBoundsChanged.stepRadius`

`default: integer = 50`

Tells storelocatorjs what is the search radius when the default search limit of 30 kilometers is exceeded. Zoom or move events may trigger an auto-search if user extends the area.

```javascript
new storelocatorjs({
    options: {
        updateMarkerOnBoundsChanged: {
            stepRadius: 50
        }
    }
});
```

## Instantiation

The storelocatorjs class accept an object as parameter with 2 keys:

* `options` - Object of options (mandatory key `apiKey` and `urlWebservice`)
* `onReady` - Callback function (optional)

#### Simple example

The simplest way to use storelocator is like the example below. All default options are used except them passed in the constructor.

```javascript
new Storelocator({
    apiKey: '',
    urlWebservice: ''
})
```

#### Example with the onReady function

The `onReady` function expose the `map` instance and is called when the map is instantiated and ready. With the example below, An automatic search is triggered with location coordinates passed in parameters.

```javascript
new Storelocator({
    apiKey: '',
    urlWebservice: ''
}, onReady: (map) => {
    map.triggerRequest({
        'lat': 48.8589507,
        'lng': 2.2770202
    });
})
```

## Requests

Search requests used Fetch API with the following parameters:

#### `lat`

`default: float = null`

Tells storelocatorjs what is the latitude of the research.

#### `lng`

`default: float = null`

Tells storelocatorjs what is the latitude of the research.

#### `categories`

`default: [] = null`

Tells storelocatorjs what are the selected categories.

#### `radius`

`default: integer = 50`

Tells storelocatorjs what is the search radius of the request in kilometers.

#### `limit`

`default: Integer = 0`

Tells storelocatorjs what is the limit of results return by the request. Use `0` to return unlimited stores, according to the JSON database.

<script>
  ((window.gitter = {}).chat = {}).options = {
    room: 'store-locator/store-locator'
  };
</script>
<script src="https://sidecar.gitter.im/dist/sidecar.v1.js" async defer></script>