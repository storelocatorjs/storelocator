# Storelocatorjs

[![GitHub Workflow Status (branch)](https://img.shields.io/github/actions/workflow/status/yoriiis/storelocatorjs/build.yml?branch=main&style=for-the-badge)](https://github.com/yoriiis/storelocatorjs/actions/workflows/build.yml) [![jsDelivr](https://img.shields.io/jsdelivr/npm/hm/storelocatorjs?color=%23ff5627&style=for-the-badge)](https://www.jsdelivr.com/package/npm/storelocatorjs)

<!-- LOGO -->

## Features

- **Video & audio** - [HTML5 video](./src/providers/html5/README.md), [HTML5 audio](./src/providers/html5/README.md), [Youtube](./src/providers/youtube/README.md), [Vimeo](./src/providers/vimeo/README.md), [Dailymotion](./src/providers/dailymotion/README.md).
- **Customization** - Choose the control elements you want to display.
- **No dependency** - Written in native Javascript without any framework.
- [**Provider API**](./src/providers/README.md) - Use the available providers or create your own.
- [**Geocoder API**](./src/plugins/README.md) - Use the available geocoder or create your own.
- [**Events**](#events) - Standardized events for all web browsers, providers and plugins.
- **Autoload API** - Google Maps, Leaflet, Mapbox and MapLibre API are automatically loaded by their provider.
- **SVG icons** - SVG are inlined into the library, no sprites to includes.
- [**Shortcuts**](#shortcuts) - Supports keyboard shortcuts.

<!-- TODO -->
<!-- - **Accessibility** - W3C and A11Y valid. -->

<p align="center">
    <a href="https://storelocatorjs.github.io/demo" title="Storelocatorjs demo">
        <img src="https://storelocatorjs.github.io/images/desktop.jpg" alt="Storelocatorjs on desktop" width="650px" />
    </a>
</p>

:sparkles: You can support this project with [GitHub Sponsors](https://github.com/sponsors/storelocatorjs)! &#9825;

## License

The project is available with a license key on the Lemon Squeezy store. [Read more about fullPage's license](https://storelocator.lemonsqueezy.com/checkout/buy/5d697bb7-4cc8-4e6e-b7d7-fec4372a94b1?discount=0).

### Examples

The project includes several examples of `storelocatorjs` implementation in the directory `examples`. Run the following commands to build the assets for the examples:

```bash
npm run build && npm run build:example
```

## Installation

> **Warning** storelocatorjs@3 is ESM and uses the [Node.js package `exports`](https://nodejs.org/api/packages.html#exports).

### NPM

NPM is the recommended installation method. Install `storelocatorjs` in your project with the following command:

```bash
npm install storelocatorjs --save-dev
```

```bash
yarn add storelocatorjs --dev
```

> **Note** Minimum supported `Node.js` version is `16.20.0`.

### CDN

You can also download it and include it with a script tag as an ESM.

```html
<link
  href="https://cdn.jsdelivr.net/npm/storelocatorjs@3/dist/storelocator.css"
  rel="stylesheet"
  crossorigin
/>
<script type="module">
  import Storelocatorjs from 'https://cdn.jsdelivr.net/npm/storelocatorjs@3';
</script>
```

> **Note** You can browse the source of the NPM package at [jsdelivr.com/package/npm/storelocatorjs](https://www.jsdelivr.com/package/npm/storelocatorjs).

## How it works

### HTML

```html
<div id="app"></div>
```

### Initialization

Import `storelocatorjs` styleheet and the JavaScript library as an ES6 modules.

```javascript
import 'storelocatorjs/storelocator.css';
import Storelocatorjs from 'storelocatorjs';
```

The `storelocatorjs` constructor accepts an object as configuration with the following parameters:

| Arguments           |        Type        | Description                                                                      |
| ------------------- | :----------------: | -------------------------------------------------------------------------------- |
| `target`            |   `HTMLElement`    | Unique `HTMLElement` to target the storelocator                                  |
| `licenseKey`        |      `String`      | Mandatory license key                                                            |
| `api.url`           |      `String`      | Endpoint to request and search stores                                            |
| `api.radius`        |      `Number`      | Radius in km for the research                                                    |
| `api.limit`         |      `Number`      | Limit of search result in the research                                           |
| `map.provider`      |      `String`      | Map provider                                                                     |
| `map.token`         |      `String`      | Map provider token                                                               |
| `map.options`       |      `String`      | Map provider options                                                             |
| `geocoder.provider` | `String\|Function` | Geocoder provider                                                                |
| `geocoder.token`    |      `String`      | Geocoder provider token                                                          |
| `templates.popup`   |     `Function`     | Custom template for marker popup                                                 |
| `templates.result`  |     `Function`     | Custom template for search result                                                |
| `onReady`           |     `Function`     | Callback function executed when the [storelocator is ready](#storelocator-ready) |

Initialize the storelocator with the configuration object.

```javascript
new Storelocatorjs({
  target: document.querySelector('#app'),
  licenseKey: 'LICENSE_KEY',
  api: {
    url: 'ENDPOINT_URL'
  },
  map: {
    provider: GoogleMaps,
    token: 'MAP_PROVIDER_TOKEN'
  },
  geocoder: {
    provider: 'mapbox',
    token: 'GEOCODER_PROVIDER_TOKEN'
  }
});
```

---

<!-- TODO: add geocoder doc -->
<!-- TODO: add endpoint doc and hosting -->

### Storelocator ready

The callback function `onReady` is automatically executed when the storelocator is ready. The Google Maps, Leaflet, Mapbox and MapLibre provider listen to the `onready` event returned by their API.

The function exposes the `storelocator` parameter as the storelocator instance. You can use it to interact with the storelocator instance and the [storelocator methods](#methods).

Example of a storelocator with geolocation requested when ready:

```javascript
new Storelocatorjs({
  onReady: function (storelocator) {
    storelocator.requestUserPosition();
  }
});
```

> **Note** The `onReady` function can also be written with an arrow function.

### Events

`storelocatorjs` exposes the following native `Event` on the `.sl-app` element. Events are standardized for all providers.

| Event Type      | Description                                                                      |
| --------------- | -------------------------------------------------------------------------------- |
| `progress`      | Sent periodically to inform interested parties of progress downloading the media |
| `userPosition`  | Sent when the user location is requested                                         |
| `storeFound`    | Sent when results where found                                                    |
| `storeNotFound` | Sent when no results found                                                       |
| `zoomIn`        | Sent when zooming in                                                             |
| `zoomOut`       | Sent when zooming out                                                            |

Example of a listener when the storelocator triggers the user position event.

```javascript
new Storelocatorjs({
  onReady: (storelocator) => {
    storelocator.on('userPosition', () => {
      // The user location is requested
    });
  }
});
```

### Methods

The storelocator instance exposes the following methods, accessible when the storelocator is ready.

| Method                  |     Parameters     | Promise | Description                                                         |
| ----------------------- | :----------------: | :-----: | ------------------------------------------------------------------- |
| `requestUserPosition()` |         -          |    -    | Request the user position to search for results around its position |
| `getInstance()`         |         -          |    -    | Get the storelocator instance                                       |
| `loading()`             |     `Boolean`      |    -    | Set the loading status                                              |
| `on(event, function)`   | `String, Function` |    -    | Add an event listener                                               |
| `off(event, function)`  | `String, Function` |    -    | Remove an event listener                                            |
| `destroy()`             |         -          |    -    | Destroy the storelocator                                            |

Example of media `duration` recovery.

```javascript
new Storelocatorjs({
  onReady: (storelocator) => {
    storelocator.requestUserPosition();
  }
});
```

### Custom CSS properties

The storelocator exposes some custom CSS properties, locally scopped under the `.v-vlite` selector. You can use them to customize the design.

| Name                          | Value        | Description              |
| ----------------------------- | ------------ | ------------------------ |
| `--sl-markerSearchColor`      | `#107a8b`    | Marker search color      |
| `--sl-markerGeolocationColor` | `#107a8b`    | Marker geolocation color |
| `--sl-colorSecondary`         | `0.25s ease` | Secondary color          |
| `--sl-transition`             | `0.25s ease` | Transition               |
| `--sl-controlsColor`          | `0.25s ease` | Controls color           |

---

## License

<!-- `storelocatorjs` is licensed under the [MIT License](https://opensource.org/licenses/MIT). -->

Created with &#9825; by [@yoriiis](https://github.com/yoriiis).
