(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["storelocatorjs"] = factory();
	else
		root["storelocatorjs"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/storelocator/config.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/storelocator/config.js":
/*!************************************!*\
  !*** ./src/storelocator/config.js ***!
  \************************************/
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _storelocator = _interopRequireDefault(__webpack_require__(/*! ./js/storelocator.js */ "./src/storelocator/js/storelocator.js"));

__webpack_require__(/*! ./css/vars.css */ "./src/storelocator/css/vars.css");

__webpack_require__(/*! ./css/loader.css */ "./src/storelocator/css/loader.css");

__webpack_require__(/*! ./css/detail-store.css */ "./src/storelocator/css/detail-store.css");

__webpack_require__(/*! ./css/form-search.css */ "./src/storelocator/css/form-search.css");

__webpack_require__(/*! ./css/info-window.css */ "./src/storelocator/css/info-window.css");

__webpack_require__(/*! ./css/nav.css */ "./src/storelocator/css/nav.css");

__webpack_require__(/*! ./css/sidebar.css */ "./src/storelocator/css/sidebar.css");

__webpack_require__(/*! ./css/map.css */ "./src/storelocator/css/map.css");

__webpack_require__(/*! ./css/storelocator.css */ "./src/storelocator/css/storelocator.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Import JS
// Import CSS
var _default = _storelocator.default;
exports.default = _default;

/***/ }),

/***/ "./src/storelocator/css/detail-store.css":
/*!***********************************************!*\
  !*** ./src/storelocator/css/detail-store.css ***!
  \***********************************************/
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/storelocator/css/form-search.css":
/*!**********************************************!*\
  !*** ./src/storelocator/css/form-search.css ***!
  \**********************************************/
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/storelocator/css/info-window.css":
/*!**********************************************!*\
  !*** ./src/storelocator/css/info-window.css ***!
  \**********************************************/
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/storelocator/css/loader.css":
/*!*****************************************!*\
  !*** ./src/storelocator/css/loader.css ***!
  \*****************************************/
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/storelocator/css/map.css":
/*!**************************************!*\
  !*** ./src/storelocator/css/map.css ***!
  \**************************************/
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/storelocator/css/nav.css":
/*!**************************************!*\
  !*** ./src/storelocator/css/nav.css ***!
  \**************************************/
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/storelocator/css/sidebar.css":
/*!******************************************!*\
  !*** ./src/storelocator/css/sidebar.css ***!
  \******************************************/
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/storelocator/css/storelocator.css":
/*!***********************************************!*\
  !*** ./src/storelocator/css/storelocator.css ***!
  \***********************************************/
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/storelocator/css/vars.css":
/*!***************************************!*\
  !*** ./src/storelocator/css/vars.css ***!
  \***************************************/
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/storelocator/js/default-options.js":
/*!************************************************!*\
  !*** ./src/storelocator/js/default-options.js ***!
  \************************************************/
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  apiKey: '',
  // {String} mandatory parameter
  urlWebservice: '',
  // {String}
  debug: false,
  // {Bool}
  cluster: {
    status: true,
    // {Bool}
    options: {
      gridSize: 50,
      // {Int}
      maxZoom: 13,
      // {Int}
      imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
      zoomOnClick: true,
      // {Bool}
      averageCenter: true,
      // {Bool}
      minimumClusterSize: 2,
      // {Int}
      styles: [] // {Array}

    }
  },
  geolocation: {
    status: true,
    // {Bool}
    startOnLoad: false // {Bool}

  },
  updateMarkerOnBoundsChanged: {
    status: true,
    // {Bool}
    maxMarkersInViewportLimit: 30,
    // {Int}
    stepRadius: 50,
    // {Int} in kilometers
    maxRadius: 150 // {Int} in kilometers

  },
  requests: {
    searchRadius: 50,
    // {Int} in kilometers
    storeLimit: 20 // {Int}

  },
  map: {
    options: {
      center: [46.227638, 2.213749],
      // {Array} latitude and longitude
      mapTypeId: 'roadmap',
      // {String}
      zoom: 6,
      // {Int}
      scrollwheel: true,
      // {Bool}
      disableDefaultUI: false,
      // {Bool}
      mapTypeControl: false,
      // {Bool}
      streetViewControl: false,
      // {Bool}
      scaleControl: false,
      // {Bool}
      fullscreenControl: true,
      // {Bool}
      styles: [] // {Array}

    },
    markers: {
      width: 30,
      // {Int} in pixel
      height: 40,
      // {Int} in pixel
      styles: [{
        category: 'userPosition',
        // {String}
        colorBackground: '#4285f4',
        // {String}
        colorBorder: '#4285f4' // {String}

      }]
    }
  },
  selectors: {
    container: '.storelocator',
    // {String}
    loader: '.storelocator-loader',
    // {String}
    mapGeoloc: '.storelocator-geolocButton',
    // {String}
    mapAside: '.storelocator-sidebar',
    // {String}
    formSearch: '.storelocator-formSearch',
    // {String}
    inputSearch: '.storelocator-inputSearch',
    // {String}
    filtersSearch: '[data-filter-map]',
    // {String}
    asideResults: '.storelocator-sidebarResults' // {String}

  }
};
exports.default = _default;

/***/ }),

/***/ "./src/storelocator/js/storelocator.js":
/*!*********************************************!*\
  !*** ./src/storelocator/js/storelocator.js ***!
  \*********************************************/
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
* @license Commercial
* @name Storelocator
* @version 2.0.0
* @author: Joris DANIEL <joris.daniel@gmail.com>
* @description: Create your own storelocator in Javascript native with Google Maps API V3. Storelocator.js is customizable, responsive and included a PHP webservice with Ajax
* {@link https://store-locator.bitbucket.io}
* @copyright 2018 Joris DANIEL <https://store-locator.bitbucket.io>
**/


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sidebarItemResult = _interopRequireDefault(__webpack_require__(/*! ./templates/sidebar-item-result */ "./src/storelocator/js/templates/sidebar-item-result.js"));

var _markerSvg = _interopRequireDefault(__webpack_require__(/*! ./templates/marker-svg */ "./src/storelocator/js/templates/marker-svg.js"));

var _infoWindow = _interopRequireDefault(__webpack_require__(/*! ./templates/info-window */ "./src/storelocator/js/templates/info-window.js"));

var _defaultOptions = _interopRequireDefault(__webpack_require__(/*! ./default-options */ "./src/storelocator/js/default-options.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * storelocatorjs
 * @module storelocatorjs
 */
class Storelocator {
  /**
   * Instanciate the constructor
   * @constructor
   * @param {Object} options Storelocator options
   * @param {Function} onReady Callback function executed when the storelocator is ready
   */
  constructor({
    options,
    onReady
  }) {
    this.options = Object.assign({}, _defaultOptions.default, options);
    this.onReady = onReady;
    this.isLoading = false;
    this.cacheSelectors();
    this.buildLoader();
    this.markerStyles = this.getColorByMarkerCategory();

    window.googleMapLoaded = () => {
      if (this.options.geolocation.status) {
        this.initGeolocation();
      }

      this.initMap();
      this.addGoogleMapsEvents();
      this.initAutocomplete();
    };

    this.loadAPI(this.options.apiKey);
    this.addEvents();
  }
  /**
   * Cache DOM selectors
   */


  cacheSelectors() {
    this.containerStorelocator = document.querySelector(this.options.selectors.container);
    this.asideResults = this.containerStorelocator.querySelector(this.options.selectors.asideResults);
    this.formSearch = this.containerStorelocator.querySelector(this.options.selectors.formSearch);
    this.inputSearch = this.containerStorelocator.querySelector(this.options.selectors.inputSearch);
    this.filtersSearch = [...this.containerStorelocator.querySelectorAll(this.options.selectors.filtersSearch)];
    this.mapAside = this.containerStorelocator.querySelector(this.options.selectors.mapAside);
    this.mapGeoloc = this.containerStorelocator.querySelector(this.options.selectors.mapGeoloc);
  }
  /**
   * Build the loader
   */


  buildLoader() {
    this.loader = this.containerStorelocator.querySelector(this.options.selectors.loader);
    this.loader.innerHTML = `
			<div class="storelocator-loaderBar"></div>
			<div class="storelocator-loaderBar"></div>
			<div class="storelocator-loaderBar"></div>`;
  }
  /**
   * Load the Youtube API
   * @param {String} apiKey Youtube API key
   */


  loadAPI(apiKey) {
    let script = document.createElement('script');
    script.async = true;
    script.type = 'text/javascript';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=window.googleMapLoaded&libraries=places`;
    document.getElementsByTagName('body')[0].appendChild(script);
  }
  /**
   * Create event listeners
   */


  addEvents() {
    // Event listener on sidebar result items
    this.asideResults.addEventListener('click', this.onClickSidebarResultItem.bind(this)); // Event listeners on sidebar navigation items

    let buttons = [...this.containerStorelocator.querySelectorAll('[data-switch-view]')];
    buttons.forEach(button => {
      button.addEventListener('click', this.onClickSidebarNav.bind(this));
    }); // Event listener on search form
    // Prevent native form submit, managed by autocomplete

    this.formSearch.addEventListener('submit', e => {
      e.preventDefault();
    }); // Event listener on search form filters

    this.filtersSearch.forEach(filter => {
      filter.addEventListener('change', this.onChangeSearchFormFilter.bind(this));
    });
    this.mapGeoloc.addEventListener('click', this.onClickGeolocationButton.bind(this));
  }
  /**
   * Create Google Maps event listeners
   */


  addGoogleMapsEvents() {
    // Event listener on search form input
    window.google.maps.event.addDomListener(this.inputSearch, 'keydown', function (e) {
      if (e.keyCode === 13) {
        e.preventDefault();
      }
    });
  }
  /**
   * Update the loader status
   * @param {Boolean} state Status of the loader
   */


  loading(state) {
    if (state) {
      this.loader.classList.add('active');
      this.isLoading = true;
    } else {
      // Wait a moment to show the loader
      setTimeout(() => {
        this.loader.classList.remove('active');
        this.isLoading = false;
      }, 1050);
    }
  }
  /**
   * Initialize the Google Maps
   */


  initMap() {
    // Create global variables for Google Maps
    this.overlayGlobal = null;
    this.overlayLimit = null;
    this.markers = [];
    this.currentInfoWindow = null;
    this.infoWindowOpened = false;
    this.boundsChangeTimer = null;
    this.serviceDistanceMatrix = new window.google.maps.DistanceMatrixService();
    this.boundsGlobal = new window.google.maps.LatLngBounds();
    this.currentRadius = this.options.requests.searchRadius;

    if (this.options.updateMarkerOnBoundsChanged.status) {
      this.boundsWithLimit = new window.google.maps.LatLngBounds();
    }

    this.infoWindow = new window.google.maps.InfoWindow();
    this.geocoder = new window.google.maps.Geocoder();
    this.searchData = {
      position: null
    }; // Set default geolocation datas

    this.geolocationData = {
      userPositionChecked: false,
      marker: null,
      position: null
    }; // Clone object before to prevent reference

    let cloneMapOptions = Object.assign({}, this.options.map.options);
    cloneMapOptions.center = new window.google.maps.LatLng(cloneMapOptions.center[0], cloneMapOptions.center[1]); // Init Google Maps API

    this.map = new window.google.maps.Map(this.containerStorelocator.querySelector('#storelocator-googleMapsCanvas'), cloneMapOptions);

    if (typeof window.MarkerClusterer !== 'undefined') {
      if (this.options.cluster.status) {
        // Clone object before to prevent reference
        let cloneClusterOptions = this.extend(true, this.options.cluster.options);
        this.markerCluster = new window.MarkerClusterer(this.map, this.markers, cloneClusterOptions);
      }
    } else {
      this.log('warn', 'Storelocator :: Cluster option is enabled, you need to load MarkerClusterer.js in your vendor before use it.');
    } // Detect zoom changed and bounds changed to refresh marker on the map


    if (this.options.updateMarkerOnBoundsChanged.status) {
      this.map.addListener('bounds_changed', () => {
        // Prevent multiple event triggered when loading and infoWindow opened
        if (!this.isLoading && !this.infoWindowOpened) {
          this.boundsChanged();
        }
      });
    } // Called the user callback if available


    if (typeof this.onReady === 'function') {
      this.onReady(this.map);
    }
  }
  /**
   * Initialize the user geolocation
   */


  initGeolocation() {
    // Check the browser support
    if (navigator.geolocation) {
      // Start geolocation on page load
      if (this.options.geolocation.startOnLoad) {
        if (window.location.protocol === 'https:') {
          this.checkUserPosition();
        } else {
          this.log('warn', 'Storelocator :: Geolocation no longer work on insecure origins, use HTTPS.');
        }
      }
    }
  }
  /**
   * On click on geolocation button
   * @param {Object} e Event listener datas
   */


  onClickGeolocationButton(e) {
    e.preventDefault();

    if (navigator.geolocation) {
      this.loading(true);
      this.checkUserPosition();
    }
  }
  /**
   * Click on sidebar navigation item
   * @param {Object} e Event listener datas
   */


  onClickSidebarNav(e) {
    let mapView = this.containerStorelocator.querySelector('.storelocator-googleMaps');
    e.preventDefault();
    this.containerStorelocator.querySelector('[data-switch-view].active').classList.remove('active');
    e.target.classList.add('active');

    if (e.target.getAttribute('data-target') === 'map') {
      mapView.classList.add('active');
      this.mapAside.classList.remove('active');
      window.google.maps.event.trigger(this.map, 'resize');
    } else {
      this.mapAside.classList.add('active');
      mapView.classList.remove('active');
    }
  }
  /**
   * On change on search form filters
   * @param {Object} e Event listener datas
   */


  onChangeSearchFormFilter(e) {
    // Not filters if there is not search value
    if (this.inputSearch.value === '' && !this.geolocationData.userPositionChecked) {
      return false;
    }

    this.triggerRequest({
      'lat': this.searchData.lat,
      'lng': this.searchData.lng,
      fitBounds: true
    });
  }
  /**
   * On click on sidebar result item
   * @param {Object} e Event listener datas
   */


  onClickSidebarResultItem(e) {
    if (e.target && e.target.parentNode.classList.contains('store-center-marker-js')) {
      e.preventDefault();
      let currentLink = e.target.parentNode;
      let currentMarker = this.markers[currentLink.getAttribute('data-marker-index')];
      this.map.panTo(currentMarker.getPosition());
      this.map.setZoom(16);
      this.openInfoWindow(currentMarker);
      this.containerStorelocator.querySelector('[data-switch-view][data-target="map"]').click();
      window.google.maps.event.trigger(this.map, 'resize');
    }
  }
  /**
   * Check user position with Google Maps geolocation API
   * Get the user current position if available
   */


  checkUserPosition() {
    navigator.geolocation.getCurrentPosition(position => {
      let lat = position.coords.latitude;
      let lng = position.coords.longitude;
      let markerGeoloc = null;
      let positionGeoloc = new window.google.maps.LatLng(lat, lng);
      let options = {
        position: positionGeoloc,
        map: this.map
      }; // Disable SVG for IE, they don't works

      if (!this.isBrowserIE()) {
        options.icon = this.options.map.markers.styles.length ? this.getIconMarkerByCategory('userPosition').url : '';
      }

      markerGeoloc = new window.google.maps.Marker(options); // Store geolocation data

      this.geolocationData.userPositionChecked = true;
      this.geolocationData.position = positionGeoloc;
      this.geolocationData.marker = markerGeoloc;

      if (this.inputSearch.value !== '') {
        this.inputSearch.value = '';
      }

      this.log('log', 'Storelocator :: geolocation success : ' + lat + ',' + lng);
      this.triggerRequest({
        'lat': lat,
        'lng': lng,
        fitBounds: true
      });
    }, response => {
      this.log('warn', 'Storelocator :: geolocation-error', response);
      this.loading(false);
    });
  }
  /**
   * Function called on user map moved event
   */


  boundsChanged() {
    if (this.markers.length) {
      clearTimeout(this.boundsChangeTimer);
      this.boundsChangeTimer = setTimeout(() => {
        let listMarkerIndexInViewport = [];
        this.markers.forEach((marker, index) => {
          if (marker.getVisible() && this.map.getBounds().contains(marker.getPosition())) {
            listMarkerIndexInViewport.push(index);
          }
        }); // If map has no markers visible, change map position

        if (listMarkerIndexInViewport.length === 0) {
          this.refreshMapOnBoundsChanged({
            updatePosition: true
          });
        } else if (listMarkerIndexInViewport.length === this.markers.length) {
          // If user see already all markers, zoom is too small, increase it until maxRadius
          if (this.currentRadius < this.options.updateMarkerOnBoundsChanged.maxRadius) {
            this.refreshMapOnBoundsChanged({
              increaseRadius: true
            });
          }
        }
      }, 600);
    }
  }
  /**
   * Refresh the map on user map moved
   * Trigger a request with the new map position
   * @param {Object} options Options to refresh the map
   */


  refreshMapOnBoundsChanged(options) {
    let radius = this.options.requests.searchRadius;
    let lat = 0;
    let lng = 0; // If user move on the map and discover area without stores, update markers, with map center position

    if (options.updatePosition) {
      lat = this.map.getCenter().lat();
      lng = this.map.getCenter().lng();
    } else if (options.increaseRadius) {
      // Get lat/lng from searchData
      ({
        lat,
        lng
      } = this.searchData); // Increase currentRadius

      this.currentRadius = this.currentRadius + this.options.updateMarkerOnBoundsChanged.stepRadius;
      radius = this.currentRadius;
    }

    this.triggerRequest({
      'lat': lat,
      'lng': lng,
      'radius': radius,
      fitBounds: false // Prevent fitBounds when bounds changed (move or zoom)

    });
  }
  /**
   * Initialize Google Maps Autocomplete
   * @documentation https://developers.google.com/maps/documentation/javascript/places-autocomplete
   */


  initAutocomplete() {
    let autocomplete = new window.google.maps.places.Autocomplete(this.inputSearch, {});
    this.inputSearch.focus();
    autocomplete.bindTo('bounds', this.map);
    autocomplete.addListener('place_changed', () => {
      this.loading(true);
      let place = autocomplete.getPlace();

      if (place.geometry) {
        this.autocompleteRequest(place.geometry.location.lat(), place.geometry.location.lng());
      } else {
        this.geocoder.geocode({
          'address': place.name
        }, (results, status) => {
          if (status === window.google.maps.GeocoderStatus.OK) {
            this.autocompleteRequest(results[0].geometry.location.lat(), results[0].geometry.location.lng());
          }
        });
      }
    });
  }
  /**
   * Function called on autocomplete changes
   * Trigger a request with the new user research
   * @param {*} lat Latitude of the research
   * @param {*} lng Longitude of the research
   */


  autocompleteRequest(lat, lng) {
    this.userPositionChecked = false; // Reset currentRadius on new search

    this.currentRadius = this.options.requests.searchRadius;
    this.triggerRequest({
      'lat': lat,
      'lng': lng,
      fitBounds: true
    });
  }
  /**
   * Trigger a request to the web service to get all store results
   * according to the position (lat, lng)
   * @param {*} options Coordinate (lat, lng) and fitBounds
   */


  triggerRequest(options) {
    this.loading(true);
    let {
      lat
    } = options;
    let {
      lng
    } = options;
    let {
      storeLimit = this.options.requests.storeLimit
    } = options;
    let {
      fitBounds = true
    } = options;
    let requestDatas = this.serializeForm({
      lat: lat,
      lng: lng,
      storeLimit: storeLimit
    }); // Update search data stored

    this.searchData.lat = lat;
    this.searchData.lng = lng;
    this.searchData.position = new window.google.maps.LatLng(lat, lng); // Fecth configuration

    let fetchConf = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestDatas)
    }; // Fecth store datas from the web service

    fetch(this.options.urlWebservice, fetchConf).then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }

      return response;
    }).then(res => res.json()).then(jsonResponse => {
      let data = jsonResponse;

      if (data !== null) {
        this.parseStores({
          stores: data,
          fitBounds: fitBounds
        });
      } else {
        this.log('warn', 'Storelocator :: Error ajax_get_stores.php, WS_stores has mandatory params (lat, lng)');
      }
    }).catch(error => {
      this.loading(false);
      console.warn(error);
      throw new Error('Storelocator :: Connection error');
    });
  }
  /**
   * Serialize form datas
   * @param {String} lat Latitude
   * @param {String} lng Longitude
   * @param {Integer} storeLimit Limit of stores in the request
   * @return {Object} formData Datas required for the request (lat, lng, storeLimit, input, categories, radius)
   */


  serializeForm({
    lat,
    lng,
    storeLimit
  }) {
    let formDatas = {};
    let categories = [];
    this.filtersSearch.forEach((filter, index) => {
      if (filter.checked) {
        categories.push(filter.value);
      }
    });

    if (categories.length) {
      formDatas.categories = categories;
    }

    if (this.inputSearch.value !== '') {
      formDatas.input = this.inputSearch.value;
    }

    if (lat && lng) {
      formDatas.lat = lat;
      formDatas.lng = lng;
    }

    formDatas.radius = this.currentRadius;
    formDatas.storesLimit = storeLimit;
    return formDatas;
  }
  /**
   * Parse store datas from the web service
   * Create all markers
   * Create all store results
   * @param {Object} options Store datas from the web service
   */


  parseStores(options) {
    let noResult = true;
    let {
      stores
    } = options;
    let {
      fitBounds
    } = options;
    let hmlListResult = `
			<p class="storelocator-sidebarIntro">
				${stores.length} results sorted by distance correspond to your research
			</p>
			<ul class="storelocator-sidebarResultsList">`; // Destroy old markers before parse new stores

    this.destroyMarkers(); // Reset infoWindow status

    this.infoWindowOpened = false; // Re-declare bounds on new research, it's important else zoom bug after one request

    this.boundsGlobal = new window.google.maps.LatLngBounds();

    if (this.options.updateMarkerOnBoundsChanged.status) {
      this.boundsWithLimit = new window.google.maps.LatLngBounds();
    } // If geolocation enabled, add geolocation marker to the list and extend the bounds global


    if (this.geolocationData.userPositionChecked) {
      this.markers.push(this.geolocationData.marker);
      this.boundsGlobal.extend(this.geolocationData.position);
    } // Get lat/lng from searchData


    let origin = this.searchData.position; // Loop on all stores by category

    stores.forEach((store, index) => {
      noResult = false;
      store.index = index;
      store.position = new window.google.maps.LatLng(store.lat, store.lng);
      this.boundsGlobal.extend(store.position);
      this.createMarkers(store);
      hmlListResult += _sidebarItemResult.default.call(this, {
        store: store,
        origin: origin
      });
    });
    hmlListResult += `</ul>`; // If no result, show error message and center map on current country

    if (noResult) {
      this.asideResults.innerHTML = `
				<p class="storelocator-sidebarNoResults">
					No results for your request.<br />
					Please try a new search with differents choices.
				</p>`;

      if (this.overlayLimit !== null) {
        this.overlayLimit.setMap(null);
      }

      if (this.overlayGlobal !== null) {
        this.overlayGlobal.setMap(null);
      }
    } else {
      this.asideResults.innerHTML = hmlListResult; // Add all maskers to cluster if option is enabled

      if (typeof MarkerClusterer !== 'undefined') {
        if (this.options.cluster.status) {
          this.markerCluster.addMarkers(this.markers);
        }
      } // Create custom bounds with limit viewport, no fitBounds the boundsGlobal


      if (this.options.updateMarkerOnBoundsChanged.status) {
        this.createViewportWithLimitMarker({
          stores: stores,
          fitBounds: fitBounds
        });
      } else {
        // Else, and if requested, fitbounds the boundsGlobal
        if (fitBounds) {
          this.map.fitBounds(this.boundsGlobal);
        }
      }
    }

    this.loading(false);
  }
  /**
   * Create a custom viewport (boundsWithLimit)
   * Display a minimal list of markers according to the maxMarkersInViewportLimit option
   * @param {Object} options Datas to create the custom viewport
   */


  createViewportWithLimitMarker(options) {
    let {
      stores
    } = options;
    let maxMarkersInViewport = this.options.updateMarkerOnBoundsChanged.maxMarkersInViewportLimit;
    let maxLoop = stores.length < maxMarkersInViewport ? stores.length : maxMarkersInViewport; // If geolocation enabled, add geolocation marker to the list and extend the bounds limit

    if (this.geolocationData.userPositionChecked) {
      this.boundsWithLimit.extend(this.geolocationData.position);
    }

    for (let i = 0; i < maxLoop; i++) {
      this.boundsWithLimit.extend(stores[i].position);
    }

    if (options.fitBounds) {
      this.map.fitBounds(this.boundsWithLimit);
    }

    if (this.options.debug) {
      this.createOverlays();
    }
  }
  /**
   * Create custom overlay on the map for the debug mode
   * overlayGlobal: list of all stores according to maxRadius option
   * overlayLimit: list of all stores according to the maxMarkersInViewportLimit option
   */


  createOverlays() {
    if (this.overlayGlobal !== null) {
      this.overlayGlobal.setMap(null);
    }

    this.overlayGlobal = new window.google.maps.Rectangle({
      bounds: this.boundsGlobal,
      strokeColor: null,
      strokeOpacity: 0,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map: this.map
    });

    if (this.overlayLimit !== null) {
      this.overlayLimit.setMap(null);
    }

    this.overlayLimit = new window.google.maps.Rectangle({
      bounds: this.boundsWithLimit,
      strokeColor: null,
      strokeOpacity: 0,
      fillColor: '#54ff00',
      fillOpacity: 0.35,
      map: this.map
    });
  }
  /**
   * Open the Google Maps native InfoWindow
   * @param {Object} currentMarker Marker data display inside the infoWindow
   */


  openInfoWindow(currentMarker) {
    // Get lat/lng from searchData
    let origin = this.searchData.position;
    let hmlinfoWindow = (0, _infoWindow.default)({
      store: currentMarker.store,
      origin: origin
    });
    this.infoWindow.setContent(hmlinfoWindow); // Change infoWindow status

    window.google.maps.event.addListener(this.infoWindow, 'closeclick', () => {
      this.infoWindowOpened = false;
    }); // Close previous infoWindow open

    if (this.currentInfoWindow !== null) {
      this.currentInfoWindow.close();
    } // Store marker info for next infoWindow


    this.currentInfoWindow = this.infoWindow; // Open infoWindow

    this.infoWindow.open(this.map, currentMarker);
  }
  /**
   * Destroy all created Google Map markers
   */


  destroyMarkers() {
    // Destroy all maskers references in cluster is enabled
    if (typeof MarkerClusterer !== 'undefined') {
      if (this.options.cluster.status) {
        this.markerCluster.clearMarkers();
      }
    } // Loop backwards on markers and remove them


    for (let i = this.markers.length - 1; i >= 0; i--) {
      let currentMarker = this.markers[i]; // Remove listener from marker instance

      window.google.maps.event.clearInstanceListeners(currentMarker); // Remove the marker

      currentMarker.setMap(null);
    }

    this.markers = [];
  }
  /**
   * Create a Google Maps markers
   * @param {Object} data Marker datas
   */


  createMarkers(data) {
    let markerStyle = this.markerStyles[data.category];
    let options = {
      position: data.position,
      map: this.map,
      optimized: true,
      label: {
        text: (data.index + 1).toString(),
        fontFamily: 'Roboto, Arial, sans-serif',
        fontSize: '13px',
        fontWeight: '500',
        color: markerStyle.colorText
      }
    }; // Disable SVG for IE, they don't works

    if (!this.isBrowserIE()) {
      options.icon = this.options.map.markers.styles.length ? this.getIconMarkerByCategory(data.category) : '';
    }

    let marker = new window.google.maps.Marker(options); // Push marker data in marker

    marker.store = data;
    this.markers.push(marker); // Click on marker to show infoWindow

    window.google.maps.event.addListener(marker, 'click', () => {
      this.infoWindowOpened = true;
      this.openInfoWindow(marker);
    });
  }
  /**
   * Get marker color by category, from options
   * @return {Object} Formatted object with category name into key and marker styles datas
   */


  getColorByMarkerCategory() {
    let styles = {};
    this.options.map.markers.styles.forEach(marker => {
      styles[marker.category] = {
        colorBackground: marker.colorBackground,
        colorText: marker.colorText
      };
    });
    return styles;
  }
  /**
   * Get SVG icon by category styles
   * @param {String} category Marker category
   * @return {Object} Icon datas to generate a Google Maps markers
   */


  getIconMarkerByCategory(category) {
    let offsetXLabel = this.options.map.markers.width / 2 - 0.9;
    let offsetYLabel = this.options.map.markers.height / 2 - 3;
    return {
      url: this.generateSVG({
        colorBackground: this.markerStyles[category].colorBackground,
        width: this.options.map.markers.width,
        height: this.options.map.markers.height
      }),
      labelOrigin: new window.google.maps.Point(offsetXLabel, offsetYLabel)
    };
  }
  /**
   * Generate SVG from the associated template
   * @param {Object} Style datas to customize the SVG
   * @return {Object} Custom SVG to generate a Google Maps marker icons
   */


  generateSVG(options) {
    let customSVG = {
      mimetype: 'data:image/svg+xml;base64,',
      svg: (0, _markerSvg.default)(options)
    };
    customSVG.scaledSize = new window.google.maps.Size(options.width, options.height);
    return customSVG.mimetype + btoa(customSVG.svg.replace(new RegExp('{{colorBackground}}', 'g'), options.colorBackground));
  }
  /**
   * Log message
   * @param {Function} method Method of global console object
   * @param {String} message Message to post
   */


  log(method, message) {
    if (this.options.debug) {
      console[method](message);
    }
  }
  /**
   * Check if browser is an old Internet Explorer
   */


  isBrowserIE() {
    return !!(document.documentMode && document.documentMode >= 9);
  }

}

exports.default = Storelocator;

/***/ }),

/***/ "./src/storelocator/js/templates/info-window.js":
/*!******************************************************!*\
  !*** ./src/storelocator/js/templates/info-window.js ***!
  \******************************************************/
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _route = _interopRequireDefault(__webpack_require__(/*! ../../svg/route.svg */ "./src/storelocator/svg/route.svg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default({
  store,
  origin
}) {
  return `<div class="storelocator-infoWIndow">
                ${store.picture ? `<span class="storelocator-pictureStore">
                        <a href="${store.link}" title="Visit website" target="_blank">
                            <img src="${store.picture}" alt="${store.title}" />
                        </a>
                    </span>` : ``}
                <div class="storelocator-detailStore">
                    ${store.title ? `<span class="storelocator-detailStoreTitle">${store.index + 1}. ${store.title}</span>` : ``}
                    <a href="http://www.google.fr/maps/dir/${origin}/${store.lat},${store.lng}" title="See the itinerary on Google Maps" target="_blank" class="storelocator-detailStoreDistance">
                        <span>${store.distance.toFixed(2)}km</span>
                        ${_route.default}
                        </a>
                    ${store.address ? `<span class="storelocator-detailStoreAddress">${store.address}</span>` : ``}
                    ${store.zipcode ? `<span class="storelocator-detailStoreZipcode">${store.zipcode}</span>` : ``}
                    ${store.city ? `<span class="storelocator-detailStoreCity">${store.city}</span>` : ``}
                    ${store.phone ? `<span class="storelocator-detailStorePhone"><a href="tel:${store.phone}" title="Call">${store.phone}</a></span>` : ``}
                    ${typeof store.link !== 'undefined' ? `<a href="${store.link}" title="Visit website" target="_blank" class="store-website">${store.link}</a>` : ``}
                </div>
            </div>`;
}

/***/ }),

/***/ "./src/storelocator/js/templates/marker-svg.js":
/*!*****************************************************!*\
  !*** ./src/storelocator/js/templates/marker-svg.js ***!
  \*****************************************************/
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(options) {
  return `<svg width="${options.width}px" height="${options.height}px" version="1.1" id="marker-gmap" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="31.5 5.5 70.6 97.9" style="enable-background:new 31.5 5.5 70.6 97.9;" preserveAspectRatio="xMidYMin slice" xml:space="preserve">
                <path fill="{{colorBackground}}" d="M64.7,102.2c0.1,0.2,0.2,0.3,0.3,0.4c0.4,0.5,1,0.8,1.6,0.8c0.7,0,1.3-0.1,1.8-0.8c0.1-0.1,0.3-0.3,0.3-0.5c7.3-10.9,14.5-21.8,21.5-32.7c4.5-7,9.7-13.8,11.1-22.1c1.7-9.9-0.7-20.1-6.7-28.1C82.7,3.3,59.2,0.9,44,13.7c-7.3,6.1-11.8,15-12.4,24.5c-0.8,10,3,17.6,8.2,25.8C47.8,76.8,56.2,89.5,64.7,102.2z"/>
                <path fill="{{colorBackground}}" d="M97.1,47.2c-1.5,7.3-6.6,13.8-10.7,20c-6.4,10.1-12.9,20-19.6,29.9c-5.7-8.3-11.2-16.6-16.6-25c-3.7-5.7-7.5-11.4-10.8-17.3c-5.2-9.2-4.6-21.2,0.9-30.2C50.7,7.1,75.6,4.6,89.4,19.4C96.3,26.8,99.1,37.4,97.1,47.2z"/>
            </svg>`;
}

/***/ }),

/***/ "./src/storelocator/js/templates/sidebar-item-result.js":
/*!**************************************************************!*\
  !*** ./src/storelocator/js/templates/sidebar-item-result.js ***!
  \**************************************************************/
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default({
  store,
  origin
}) {
  return `<li class="storelocator-sidebarResultsListItem" data-category="${store.category}">
                <div class="storelocator-detailStore">
                    ${store.title ? `<span class="storelocator-detailStoreTitle"><a href="" title="See on the map" class="store-center-marker-js" data-marker-index="${store.index}">${store.index + 1}. <span>${store.title}</span></a></span>` : ``}
                    <a href="http://www.google.fr/maps/dir/${origin}/${store.lat},${store.lng}" title="See the itinerary on Google Maps" target="_blank" class="storelocator-detailStoreDistance"><span>${store.distance.toFixed(2)}km</span><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" class="storelocator-detailStoreIconRoute" viewBox="1772 1772 19.185 20" enable-background="new 1772 1772 19.185 20" xml:space="preserve"><path d="M1791.074,1775.318c0.074,0.073,0.11,0.159,0.11,0.257c0,0.096-0.036,0.182-0.11,0.257l-1.574,1.573c-0.209,0.21-0.464,0.313-0.761,0.313h-15.009c-0.192,0-0.361-0.069-0.502-0.213c-0.141-0.141-0.211-0.31-0.211-0.502v-2.859c0-0.192,0.07-0.36,0.211-0.502c0.141-0.141,0.31-0.211,0.502-0.211h6.434v-0.716c0-0.192,0.07-0.36,0.211-0.502c0.141-0.143,0.31-0.213,0.502-0.213h1.431c0.193,0,0.361,0.07,0.502,0.213c0.142,0.142,0.211,0.31,0.211,0.502v0.716h5.719c0.297,0,0.552,0.102,0.761,0.312L1791.074,1775.318z M1780.164,1785.58h2.856v5.716c0,0.196-0.069,0.361-0.211,0.505c-0.141,0.141-0.309,0.211-0.502,0.211h-1.431c-0.192,0-0.361-0.07-0.502-0.211c-0.141-0.144-0.211-0.309-0.211-0.505V1785.58zM1789.454,1780.577c0.193,0,0.361,0.07,0.502,0.211c0.142,0.142,0.212,0.31,0.212,0.502v2.859c0,0.192-0.07,0.361-0.212,0.504c-0.141,0.142-0.309,0.212-0.502,0.212h-15.009c-0.297,0-0.551-0.105-0.76-0.314l-1.574-1.572c-0.075-0.076-0.111-0.162-0.111-0.258c0-0.097,0.036-0.184,0.111-0.257l1.574-1.576c0.209-0.209,0.463-0.311,0.76-0.311h5.719v-2.146h2.856v2.146H1789.454z"/></svg></a>
                    ${store.address ? `<span class="storelocator-detailStoreAddress">${store.address}</span>` : ``}
                    ${store.zipcode ? `<span class="storelocator-detailStoreZipcode">${store.zipcode}</span>` : ``}
                    ${store.city ? `<span class="storelocator-detailStoreCity">${store.city}</span>` : ``}
                    ${store.phone ? `<span class="storelocator-detailStorePhone"><a href="tel:${store.phone}" title="Call">${store.phone}</a></span>` : ``}
                </div>
            </li>`;
}

/***/ }),

/***/ "./src/storelocator/svg/route.svg":
/*!****************************************!*\
  !*** ./src/storelocator/svg/route.svg ***!
  \****************************************/
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

module.exports = "<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" class=\"storelocator-detailStoreIconRoute\" viewBox=\"1772 1772 19.185 20\" enable-background=\"new 1772 1772 19.185 20\" xml:space=\"preserve\"><path d=\"M1791.074,1775.318c0.074,0.073,0.11,0.159,0.11,0.257c0,0.096-0.036,0.182-0.11,0.257l-1.574,1.573c-0.209,0.21-0.464,0.313-0.761,0.313h-15.009c-0.192,0-0.361-0.069-0.502-0.213c-0.141-0.141-0.211-0.31-0.211-0.502v-2.859c0-0.192,0.07-0.36,0.211-0.502c0.141-0.141,0.31-0.211,0.502-0.211h6.434v-0.716c0-0.192,0.07-0.36,0.211-0.502c0.141-0.143,0.31-0.213,0.502-0.213h1.431c0.193,0,0.361,0.07,0.502,0.213c0.142,0.142,0.211,0.31,0.211,0.502v0.716h5.719c0.297,0,0.552,0.102,0.761,0.312L1791.074,1775.318z M1780.164,1785.58h2.856v5.716c0,0.196-0.069,0.361-0.211,0.505c-0.141,0.141-0.309,0.211-0.502,0.211h-1.431c-0.192,0-0.361-0.07-0.502-0.211c-0.141-0.144-0.211-0.309-0.211-0.505V1785.58zM1789.454,1780.577c0.193,0,0.361,0.07,0.502,0.211c0.142,0.142,0.212,0.31,0.212,0.502v2.859c0,0.192-0.07,0.361-0.212,0.504c-0.141,0.142-0.309,0.212-0.502,0.212h-15.009c-0.297,0-0.551-0.105-0.76-0.314l-1.574-1.572c-0.075-0.076-0.111-0.162-0.111-0.258c0-0.097,0.036-0.184,0.111-0.257l1.574-1.576c0.209-0.209,0.463-0.311,0.76-0.311h5.719v-2.146h2.856v2.146H1789.454z\"></path></svg>"

/***/ })

/******/ })["default"];
});
//# sourceMappingURL=storelocator.js.map