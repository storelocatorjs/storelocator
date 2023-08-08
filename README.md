# Storelocatorjs

[![GitHub Workflow Status (branch)](https://img.shields.io/github/actions/workflow/status/yoriiis/storelocatorjs/build.yml?branch=main&style=for-the-badge)](https://github.com/yoriiis/storelocatorjs/actions/workflows/build.yml) [![jsDelivr](https://img.shields.io/jsdelivr/npm/hm/storelocatorjs?color=%23ff5627&style=for-the-badge)](https://www.jsdelivr.com/package/npm/storelocatorjs)

Storelocatorjs is a **fast** and **lightweight** Javascript library to easily build a store locator using <a href="https://developers.google.com/maps/documentation/javascript/" target="_blank" title="Documentation">Google Maps API V3</a>. Only **6Kb** on production with gzip, Storelocatorjs has no dependency with any framework or library and is written in **Javascript native**.<br /><br />

<p align="center">
    <a href="https://storelocatorjs.github.io/demo" title="Storelocatorjs demo">
        <img src="https://storelocatorjs.github.io/images/desktop.jpg" alt="Storelocatorjs on desktop" width="650px" />
    </a>
</p>

## Examples

The project includes several examples of `storelocatorjs` implementation in the directory `examples`. Run the following commands to build the assets for the examples:

```bash
npm run build && npm run build:example
```

## Installation

The library is available as the `storelocatorjs` package name on [npm](https://www.npmjs.com/package/storelocatorjs).

```bash
npm install storelocatorjs --save-dev
```

```bash
yarn add storelocatorjs --dev
```

## Demo

Online demo is available on [https://storelocatorjs.github.io/demo](https://storelocatorjs.github.io/demo).

## How it works

### Cloud functions

All requests to filter stores by geoposition are send to a cloud function as a web service. Storelocatorjs includes the cloud functions project from [Google Firebase](https://firebase.google.com/docs/functions) located in the `./functions` folder.

### Structure

The extended usage of the Storelocatorjs with filters and store categories used a minimalist HTML structure.

```html
<div class="storelocator">
  <div class="sl-loader"></div>
  <div class="sl-sidebar">
    <form class="sl-formSearch" name="form-search">
      <input type="text" class="sl-inputSearch" placeholder="Enter a location" autocomplete="off" />
      <div class="sl-formFilters">
        <div class="sl-formFiltersRow">
          <div class="sl-formCheckbox">
            <input type="checkbox" id="cat-1" data-filter checked="checked" value="1" />
            <label for="cat-1" class="category-1">Categorie 1</label>
          </div>
          <div class="sl-formCheckbox">
            <input type="checkbox" id="cat-2" data-filter checked="checked" value="2" />
            <label for="cat-2" class="category-2">Categorie 2</label>
          </div>
        </div>
        <div class="sl-formFiltersRow">
          <div class="sl-formCheckbox">
            <input type="checkbox" id="cat-3" data-filter value="3" />
            <label for="cat-3" class="category-3">Categorie 3</label>
          </div>
        </div>
      </div>
    </form>
    <nav class="sl-nav">
      <ul class="sl-navList">
        <li class="sl-navListItem active">
          <button class="sl-navButton" data-switch-view data-target="map">Map</button>
        </li>
        <li class="sl-navListItem">
          <button class="sl-navButton" data-switch-view data-target="list">List</button>
        </li>
      </ul>
    </nav>
    <div class="sl-sidebarResults"></div>
  </div>
  <div class="sl-googleMaps active">
    <div id="sl-mapCanvas"></div>
    <button class="sl-geolocButton"></button>
  </div>
</div>
```

### Options

Storelocatorjs contains many options to allow you to easily configure your map according to your needs. Options are available on the [Storelocatorjs website](https://storelocatorjs.github.io/available-options.html).

#### Example with the onReady function

The `onReady` function expose the Google Maps instance as `map` variable and is called when the map is instantiated and ready. With the example below, an automatic search is triggered with location coordinates passed in parameters.

```js
new Storelocator({
    apiKey: '',
    webServiceUrl: ''
}, onReady: function(map) {
    this.triggerRequest({
        'lat': 48.8589507,
        'lng': 2.2770202
    });
})
```

## Browsers support

The project is fully compatible with the most popular web browsers. More information about the Google Maps support on <a href="https://developers.google.com/maps/documentation/javascript/browsersupport?hl=fr" target="_blank" title="Google Maps support">Google Developers</a>. HTML and CSS files are W3C valid.

## Licenses

### Commercial license

If you want to use Storelocatorjs to develop commercial sites, themes, projects, and applications, the Commercial License is the appropriate license. With this option, your source code is kept proprietary.
Purchase a Storelocatorjs Commercial License on the [license page](https://storelocatorjs.github.io/licenses.html#purchasing).

### Open source license

If you are creating an open source application under a license compatible with the [GNU GPL license v3](https://www.gnu.org/licenses/gpl-3.0.html), you may use Storelocatorjs under the terms of the GPLv3.

## Contributors

Created with ♥ by [@yoriiis](http://github.com/yoriiis)
