(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["storelocatorjs"] = factory();
	else
		root["storelocatorjs"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/default-options.js":
/*!***********************************!*\
  !*** ./src/js/default-options.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * storelocatorjs default options
 * @module storelocatorjs/defaultOptions
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  apiKey: '',
  webServiceUrl: '',
  cluster: {
    options: {
      averageCenter: true,
      gridSize: 50,
      imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
      maxZoom: 13,
      minimumClusterSize: 2,
      styles: [],
      zoomOnClick: true
    },
    status: false
  },
  debug: false,
  geolocation: {
    startOnLoad: false,
    status: true
  },
  map: {
    markers: {
      width: 30,
      height: 40,
      styles: [{
        category: 'userPosition',
        colorBackground: '#4285f4',
        colorText: '#fff'
      }]
    },
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
  },
  requests: {
    searchRadius: 50,
    storesLimit: 20
  },
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
  markersUpdate: {
    limitInViewport: 30,
    maxRadius: 150,
    status: true,
    stepRadius: 50
  }
});

/***/ }),

/***/ "./src/js/storelocator.js":
/*!********************************!*\
  !*** ./src/js/storelocator.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Storelocator)
/* harmony export */ });
/* harmony import */ var _templates_sidebar_item_result__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./templates/sidebar-item-result */ "./src/js/templates/sidebar-item-result.js");
/* harmony import */ var _templates_info_window__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./templates/info-window */ "./src/js/templates/info-window.js");
/* harmony import */ var _svg_marker_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../svg/marker.svg */ "./src/svg/marker.svg");
/* harmony import */ var _svg_marker_svg__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_svg_marker_svg__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _default_options__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./default-options */ "./src/js/default-options.js");
/**
 * @name Storelocatorjs
 * @version 2.1.0
 * @license GPLv3 for Open Source use or Storelocatorjs Commercial License for commercial use
 * @author: Joris DANIEL aka Yoriiis
 * @description: Storelocatorjs is a fast and lightweight Javascript library for build your own customizable store locator with a minimalist theme. The cloud function is included to handle store filter requests.
 * {@link https://yoriiis.github.io/storelocatorjs}
 * @copyright 2019 Joris DANIEL aka Yoriiis <https://yoriiis.github.io/storelocatorjs>
 */



function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }





/**
 * storelocatorjs
 * @module storelocatorjs
 */
var Storelocator = /*#__PURE__*/function () {
  /**
   * Instanciate the constructor
   * @constructor
   * @param {Object} options Storelocatorjs options
   * @param {Function} onReady Callback function executed when the store locator is ready
   */
  function Storelocator(_ref) {
    var _this = this;
    var options = _ref.options,
      onReady = _ref.onReady;
    _classCallCheck(this, Storelocator);
    this.options = this.extend(true, _default_options__WEBPACK_IMPORTED_MODULE_3__["default"], options);
    this.onReady = onReady;
    this.isLoading = false;
    this.mapHasRequest = false;
    if (this.options.webServiceUrl === '') {
      throw new Error('storelocatorjs :: webServiceUrl is empty');
    }
    if (this.options.apiKey === '') {
      throw new Error('storelocatorjs :: apiKey is empty');
    }
    this.cacheSelectors();
    this.buildLoader();
    this.markerStyles = this.getMarkerStylesByCategory();
    window.googleMapLoaded = function () {
      if (_this.options.geolocation.status) {
        _this.initGeolocation();
      }
      _this.initMap();
      _this.addGoogleMapsEvents();
      _this.initAutocomplete();
    };
    this.loadAPI(this.options.apiKey);
    this.addEvents();
  }

  /**
   * Cache DOM selectors
   */
  _createClass(Storelocator, [{
    key: "cacheSelectors",
    value: function cacheSelectors() {
      this.containerStorelocator = document.querySelector(this.options.selectors.container);
      this.formSearch = this.containerStorelocator.querySelector(this.options.selectors.formSearch);
      this.inputSearch = this.containerStorelocator.querySelector(this.options.selectors.inputSearch);
      this.searchFilters = _toConsumableArray(this.containerStorelocator.querySelectorAll(this.options.selectors.searchFilters));
      this.nav = this.containerStorelocator.querySelector(this.options.selectors.nav);
      this.sidebar = this.containerStorelocator.querySelector(this.options.selectors.sidebar);
      this.sidebarResults = this.containerStorelocator.querySelector(this.options.selectors.sidebarResults);
      this.geolocButton = this.containerStorelocator.querySelector(this.options.selectors.geolocButton);
    }

    /**
     * Build the loader
     */
  }, {
    key: "buildLoader",
    value: function buildLoader() {
      this.loader = this.containerStorelocator.querySelector(this.options.selectors.loader);
      this.loader.innerHTML = "\n\t\t\t<div class=\"storelocator-loaderBar\"></div>\n\t\t\t<div class=\"storelocator-loaderBar\"></div>\n\t\t\t<div class=\"storelocator-loaderBar\"></div>";
    }

    /**
     * Load the Youtube API
     * @param {String} apiKey Youtube API key
     */
  }, {
    key: "loadAPI",
    value: function loadAPI(apiKey) {
      var script = document.createElement('script');
      script.async = true;
      script.type = 'text/javascript';
      script.src = "https://maps.googleapis.com/maps/api/js?key=".concat(apiKey, "&callback=window.googleMapLoaded&libraries=places");
      document.getElementsByTagName('body')[0].appendChild(script);
    }

    /**
     * Create event listeners
     */
  }, {
    key: "addEvents",
    value: function addEvents() {
      var _this2 = this;
      // Event listener on sidebar result items
      this.sidebarResults.addEventListener('click', this.onClickSidebarResultItem.bind(this));

      // Event listeners on sidebar navigation items
      var buttons = _toConsumableArray(this.nav.querySelectorAll('[data-switch-view]'));
      buttons.forEach(function (button) {
        button.addEventListener('click', _this2.onClickSidebarNav.bind(_this2));
      });

      // Event listener on search form
      // Prevent native form submit, managed by autocomplete
      this.formSearch.addEventListener('submit', function (e) {
        e.preventDefault();
      });

      // Event listener on search form filters
      this.searchFilters.forEach(function (filter) {
        filter.addEventListener('change', _this2.onChangeSearchFormFilter.bind(_this2));
      });
      this.geolocButton.addEventListener('click', this.onClickGeolocationButton.bind(this));
    }

    /**
     * Create Google Maps event listeners
     */
  }, {
    key: "addGoogleMapsEvents",
    value: function addGoogleMapsEvents() {
      // Event listener on search form input
      this.inputSearch.addEventListener('keydown', function (e) {
        if (e.keyCode === 13) {
          e.preventDefault();
        }
      });
    }

    /**
     * Update the loader status
     * @param {Boolean} state Status of the loader
     */
  }, {
    key: "loading",
    value: function loading(state) {
      var _this3 = this;
      if (state) {
        this.loader.classList.add('active');
        this.isLoading = true;
      } else {
        // Wait a moment to show the loader
        setTimeout(function () {
          _this3.loader.classList.remove('active');
          _this3.isLoading = false;
        }, 1050);
      }
    }

    /**
     * Initialize the Google Maps
     */
  }, {
    key: "initMap",
    value: function initMap() {
      var _this4 = this;
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
      if (this.options.markersUpdate.status) {
        this.boundsWithLimit = new window.google.maps.LatLngBounds();
      }
      this.infoWindow = new window.google.maps.InfoWindow();
      this.geocoder = new window.google.maps.Geocoder();
      this.searchData = {
        position: null
      };

      // Set default geolocation datas
      this.geolocationData = {
        userPositionChecked: false,
        marker: null,
        position: null
      };

      // Clone object before to prevent reference
      var mapOptions = this.extend(true, {}, this.options.map.options);
      mapOptions.center = new window.google.maps.LatLng(mapOptions.center[0], mapOptions.center[1]);

      // Init Google Maps API with options
      var googleMapsCanvas = this.containerStorelocator.querySelector('#storelocator-googleMapsCanvas');
      this.map = new window.google.maps.Map(googleMapsCanvas, mapOptions);
      if (typeof window.MarkerClusterer !== 'undefined') {
        if (this.options.cluster.status) {
          // Clone object before to prevent reference
          var cloneClusterOptions = this.extend(true, this.options.cluster.options);
          this.markerCluster = new window.MarkerClusterer(this.map, this.markers, cloneClusterOptions);
        }
      }

      // Detect zoom changed and bounds changed to refresh marker on the map
      if (this.options.markersUpdate.status) {
        this.map.addListener('bounds_changed', function () {
          // Prevent multiple event triggered when loading and infoWindow opened
          if (!_this4.isLoading && !_this4.infoWindowOpened) {
            _this4.boundsChanged();
          }
        });
      }

      // Called the user callback if available
      if (typeof this.onReady === 'function') {
        this.onReady(this.map);
      }
    }

    /**
     * Initialize the user geolocation
     */
  }, {
    key: "initGeolocation",
    value: function initGeolocation() {
      // Check the browser support
      if (navigator.geolocation) {
        // Start geolocation on page load
        if (this.options.geolocation.startOnLoad) {
          if (window.location.protocol === 'https:') {
            this.checkUserPosition();
          }
        }
      }
    }

    /**
     * On click on geolocation button
     * @param {Object} e Event listener datas
     */
  }, {
    key: "onClickGeolocationButton",
    value: function onClickGeolocationButton(e) {
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
  }, {
    key: "onClickSidebarNav",
    value: function onClickSidebarNav(e) {
      var mapView = this.containerStorelocator.querySelector('.storelocator-googleMaps');
      e.preventDefault();
      this.nav.querySelector('.active').classList.remove('active');
      e.target.parentNode.classList.add('active');
      if (e.target.getAttribute('data-target') === 'map') {
        mapView.classList.add('active');
        this.sidebar.classList.remove('active');
        window.google.maps.event.trigger(this.map, 'resize');
      } else {
        this.sidebar.classList.add('active');
        mapView.classList.remove('active');
      }
    }

    /**
     * On change on search form filters
     * @param {Object} e Event listener datas
     */
  }, {
    key: "onChangeSearchFormFilter",
    value: function onChangeSearchFormFilter(e) {
      // Not filters if there is not search value
      if (!this.mapHasRequest) return false;
      this.triggerRequest({
        lat: this.searchData.lat,
        lng: this.searchData.lng,
        fitBounds: true
      });
    }

    /**
     * On click on sidebar result item
     * @param {Object} e Event listener datas
     */
  }, {
    key: "onClickSidebarResultItem",
    value: function onClickSidebarResultItem(e) {
      if (e.target && e.target.parentNode.classList.contains('store-center-marker-js')) {
        e.preventDefault();
        var currentLink = e.target.parentNode;
        var markerIndex = currentLink.getAttribute('data-marker-index');
        var currentMarker = this.markers[markerIndex];
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
  }, {
    key: "checkUserPosition",
    value: function checkUserPosition() {
      var _this5 = this;
      navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        var markerGeoloc = null;
        var positionGeoloc = new window.google.maps.LatLng(lat, lng);
        var options = {
          position: positionGeoloc,
          map: _this5.map
        };

        // Disable SVG for IE, they don't works
        if (!_this5.isBrowserIE()) {
          options.icon = _this5.options.map.markers.styles.length ? _this5.getIconMarkerByCategory('userPosition').url : '';
        }
        markerGeoloc = new window.google.maps.Marker(options);

        // Store geolocation data
        _this5.geolocationData.userPositionChecked = true;
        _this5.geolocationData.position = positionGeoloc;
        _this5.geolocationData.marker = markerGeoloc;
        if (_this5.inputSearch.value !== '') {
          _this5.inputSearch.value = '';
        }
        _this5.triggerRequest({
          lat: lat,
          lng: lng
        });
      }, function (response) {
        _this5.loading(false);
      });
    }

    /**
     * Function called on user map moved event
     */
  }, {
    key: "boundsChanged",
    value: function boundsChanged() {
      var _this6 = this;
      if (this.markers.length) {
        clearTimeout(this.boundsChangeTimer);
        this.boundsChangeTimer = setTimeout(function () {
          var listMarkerIndexInViewport = [];
          _this6.markers.forEach(function (marker, index) {
            if (marker.getVisible() && _this6.map.getBounds().contains(marker.getPosition())) {
              listMarkerIndexInViewport.push(index);
            }
          });

          // If map has no markers visible, change map position
          if (listMarkerIndexInViewport.length === 0) {
            _this6.refreshMapOnBoundsChanged({
              updatePosition: true
            });
          } else if (listMarkerIndexInViewport.length === _this6.markers.length) {
            // If user see already all markers, zoom is too small, increase it until maxRadius
            if (_this6.currentRadius < _this6.options.markersUpdate.maxRadius) {
              _this6.refreshMapOnBoundsChanged({
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
  }, {
    key: "refreshMapOnBoundsChanged",
    value: function refreshMapOnBoundsChanged(_ref2) {
      var updatePosition = _ref2.updatePosition,
        increaseRadius = _ref2.increaseRadius;
      var lat = 0;
      var lng = 0;

      // If user move on the map and discover area without stores, update markers, with map center position
      if (updatePosition) {
        lat = this.map.getCenter().lat();
        lng = this.map.getCenter().lng();
      } else if (increaseRadius) {
        // Get lat/lng from searchData
        ;
        // Increase currentRadius
        var _this$searchData = this.searchData;
        lat = _this$searchData.lat;
        lng = _this$searchData.lng;
        this.currentRadius = this.currentRadius + this.options.markersUpdate.stepRadius;
      }
      this.triggerRequest({
        lat: lat,
        lng: lng,
        fitBounds: false // Prevent fitBounds when bounds changed (move or zoom)
      });
    }

    /**
     * Initialize Google Maps Autocomplete
     * @documentation https://developers.google.com/maps/documentation/javascript/places-autocomplete
     */
  }, {
    key: "initAutocomplete",
    value: function initAutocomplete() {
      var _this7 = this;
      var autocomplete = new window.google.maps.places.Autocomplete(this.inputSearch, {});
      this.inputSearch.focus();
      autocomplete.bindTo('bounds', this.map);
      autocomplete.addListener('place_changed', function () {
        _this7.loading(true);
        var place = autocomplete.getPlace();
        if (place.geometry) {
          _this7.autocompleteRequest({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          });
        } else {
          _this7.geocoder.geocode({
            address: place.name
          }, function (results, status) {
            if (status === window.google.maps.GeocoderStatus.OK) {
              _this7.autocompleteRequest({
                lat: results[0].geometry.location.lat(),
                lng: results[0].geometry.location.lng()
              });
            }
          });
        }
      });
    }

    /**
     * Function called on autocomplete changes
     * Trigger a request with the new user research
     * @param {String} lat Latitude of the research
     * @param {String} lng Longitude of the research
     */
  }, {
    key: "autocompleteRequest",
    value: function autocompleteRequest(_ref3) {
      var lat = _ref3.lat,
        lng = _ref3.lng;
      this.userPositionChecked = false;

      // Reset currentRadius on new search
      this.currentRadius = this.options.requests.searchRadius;
      this.triggerRequest({
        lat: lat,
        lng: lng
      });
    }

    /**
     * Trigger a request to the web service to get all store results
     * according to the position (lat, lng)
     * @param {String} lat Latitude of the research
     * @param {String} lng Longitude of the research
     * @param {Boolean} fitBounds Fit bounds on the map
     */
  }, {
    key: "triggerRequest",
    value: function triggerRequest(_ref4) {
      var _this8 = this;
      var lat = _ref4.lat,
        lng = _ref4.lng,
        _ref4$fitBounds = _ref4.fitBounds,
        fitBounds = _ref4$fitBounds === void 0 ? true : _ref4$fitBounds;
      this.mapHasRequest = true;
      this.loading(true);
      var requestDatas = this.serializeForm({
        lat: lat,
        lng: lng
      });

      // Update search data stored
      this.searchData.lat = lat;
      this.searchData.lng = lng;
      this.searchData.position = new window.google.maps.LatLng(lat, lng);

      // Fecth configuration
      var fetchConf = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestDatas)
      };

      // Fecth store datas from the web service
      fetch(this.options.webServiceUrl, fetchConf).then(function (response) {
        if (!response.ok) {
          throw new Error(response);
        }
        return response;
      }).then(function (res) {
        return res.json();
      }).then(function (jsonResponse) {
        var data = jsonResponse;
        if (data !== null) {
          _this8.parseStores({
            stores: data,
            fitBounds: fitBounds
          });
        }
      })["catch"](function (error) {
        _this8.loading(false);
        throw new Error(error);
      });
    }

    /**
     * Serialize form datas
     * @param {String} lat Latitude
     * @param {String} lng Longitude
     * @return {Object} formData Datas required for the request (lat, lng, storesLimit, input, categories, radius)
     */
  }, {
    key: "serializeForm",
    value: function serializeForm(_ref5) {
      var _ref5$lat = _ref5.lat,
        lat = _ref5$lat === void 0 ? false : _ref5$lat,
        _ref5$lng = _ref5.lng,
        lng = _ref5$lng === void 0 ? false : _ref5$lng;
      var formDatas = {};
      var categories = [];

      // Get all selected categories
      this.searchFilters.forEach(function (filter, index) {
        if (filter.checked) {
          categories.push(filter.value);
        }
      });
      formDatas.categories = categories;
      if (lat && lng) {
        formDatas.lat = lat;
        formDatas.lng = lng;
      }
      formDatas.radius = this.currentRadius;
      formDatas.limit = this.options.requests.storesLimit;
      return formDatas;
    }

    /**
     * Parse store datas from the web service
     * Create all markers
     * Create all store results
     * @param {Object} options Store datas from the web service
     */
  }, {
    key: "parseStores",
    value: function parseStores(options) {
      var _this9 = this;
      var noResult = true;
      var stores = options.stores;
      var fitBounds = options.fitBounds;
      var hmlListResult = "\n\t\t\t<p class=\"storelocator-sidebarIntro\">\n\t\t\t\t".concat(stores.length, " results sorted by distance correspond to your research\n\t\t\t</p>\n\t\t\t<ul class=\"storelocator-sidebarResultsList\">");

      // Destroy old markers before parse new stores
      this.destroyMarkers();

      // Reset infoWindow status
      this.infoWindowOpened = false;

      // Re-declare bounds on new research, it's important else zoom bug after one request
      this.boundsGlobal = new window.google.maps.LatLngBounds();
      if (this.options.markersUpdate.status) {
        this.boundsWithLimit = new window.google.maps.LatLngBounds();
      }

      // If geolocation enabled, add geolocation marker to the list and extend the bounds global
      if (this.geolocationData.userPositionChecked) {
        this.markers.push(this.geolocationData.marker);
        this.boundsGlobal.extend(this.geolocationData.position);
      }

      // Get lat/lng from searchData
      var origin = this.searchData.position;

      // Loop on all stores by category
      stores.forEach(function (store, index) {
        noResult = false;
        store.index = index;
        store.position = new window.google.maps.LatLng(store.lat, store.lng);
        _this9.boundsGlobal.extend(store.position);
        _this9.createMarkers(store);
        hmlListResult += _templates_sidebar_item_result__WEBPACK_IMPORTED_MODULE_0__["default"].call(_this9, {
          store: store,
          origin: origin
        });
      });
      hmlListResult += "</ul>";

      // If no result, show error message and center map on current country
      if (noResult) {
        this.sidebarResults.innerHTML = "\n\t\t\t\t<p class=\"storelocator-sidebarNoResults\">\n\t\t\t\t\tNo results for your request.<br />\n\t\t\t\t\tPlease try a new search with differents choices.\n\t\t\t\t</p>";
        if (this.overlayLimit !== null) {
          this.overlayLimit.setMap(null);
        }
        if (this.overlayGlobal !== null) {
          this.overlayGlobal.setMap(null);
        }
      } else {
        this.sidebarResults.innerHTML = hmlListResult;

        // Add all maskers to cluster if option is enabled
        if (typeof MarkerClusterer !== 'undefined') {
          if (this.options.cluster.status) {
            this.markerCluster.addMarkers(this.markers);
          }
        }

        // Create custom bounds with limit viewport, no fitBounds the boundsGlobal
        if (this.options.markersUpdate.status) {
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
     * Display a minimal list of markers according to the limitInViewport option
     * @param {Object} options Datas to create the custom viewport
     */
  }, {
    key: "createViewportWithLimitMarker",
    value: function createViewportWithLimitMarker(options) {
      var stores = options.stores;
      var maxMarkersInViewport = this.options.markersUpdate.limitInViewport;
      var maxLoop = stores.length < maxMarkersInViewport ? stores.length : maxMarkersInViewport;

      // If geolocation enabled, add geolocation marker to the list and extend the bounds limit
      if (this.geolocationData.userPositionChecked) {
        this.boundsWithLimit.extend(this.geolocationData.position);
      }
      for (var i = 0; i < maxLoop; i++) {
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
     * overlayLimit: list of all stores according to the limitInViewport option
     */
  }, {
    key: "createOverlays",
    value: function createOverlays() {
      if (this.overlayGlobal !== null) {
        this.overlayGlobal.setMap(null);
      }
      this.overlayGlobal = new window.google.maps.Rectangle({
        bounds: this.boundsGlobal,
        strokeColor: null,
        strokeOpacity: 0,
        fillColor: '#ff0000',
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
  }, {
    key: "openInfoWindow",
    value: function openInfoWindow(currentMarker) {
      var _this10 = this;
      // Get lat/lng from searchData
      var origin = this.searchData.position;
      var hmlinfoWindow = (0,_templates_info_window__WEBPACK_IMPORTED_MODULE_1__["default"])({
        store: currentMarker.store,
        origin: origin
      });
      this.infoWindow.setContent(hmlinfoWindow);

      // Change infoWindow status
      window.google.maps.event.addListener(this.infoWindow, 'closeclick', function () {
        _this10.infoWindowOpened = false;
      });

      // Close previous infoWindow open
      if (this.currentInfoWindow !== null) {
        this.currentInfoWindow.close();
      }

      // Store marker info for next infoWindow
      this.currentInfoWindow = this.infoWindow;

      // Open infoWindow
      this.infoWindow.open(this.map, currentMarker);
    }

    /**
     * Destroy all created Google Map markers
     */
  }, {
    key: "destroyMarkers",
    value: function destroyMarkers() {
      // Destroy all maskers references in cluster is enabled
      if (typeof MarkerClusterer !== 'undefined') {
        if (this.options.cluster.status) {
          this.markerCluster.clearMarkers();
        }
      }

      // Loop backwards on markers and remove them
      for (var i = this.markers.length - 1; i >= 0; i--) {
        var currentMarker = this.markers[i];

        // Remove listener from marker instance
        window.google.maps.event.clearInstanceListeners(currentMarker);

        // Remove the marker
        currentMarker.setMap(null);
      }
      this.markers = [];
    }

    /**
     * Create a Google Maps markers
     * @param {Object} data Marker datas
     */
  }, {
    key: "createMarkers",
    value: function createMarkers(data) {
      var _this11 = this;
      var markerStyle = this.markerStyles[data.category];
      var options = {
        position: data.position,
        map: this.map,
        optimized: true,
        label: {
          text: (data.index + 1).toString(),
          fontFamily: 'inherit',
          fontSize: '13px',
          fontWeight: '500',
          color: markerStyle ? markerStyle.colorText : '#000'
        }
      };

      // Disable SVG for IE, they don't works
      if (!this.isBrowserIE()) {
        options.icon = this.options.map.markers.styles.length ? this.getIconMarkerByCategory(data.category) : '';
      }
      var marker = new window.google.maps.Marker(options);

      // Push marker data in marker
      marker.store = data;
      this.markers.push(marker);

      // Click on marker to show infoWindow
      window.google.maps.event.addListener(marker, 'click', function () {
        _this11.infoWindowOpened = true;
        _this11.openInfoWindow(marker);
      });
    }

    /**
     * Get marker styles by category, from options
     * @return {Object} Formatted object with category name into key and marker styles datas
     */
  }, {
    key: "getMarkerStylesByCategory",
    value: function getMarkerStylesByCategory() {
      var styles = {};
      this.options.map.markers.styles.forEach(function (marker) {
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
  }, {
    key: "getIconMarkerByCategory",
    value: function getIconMarkerByCategory(category) {
      var offsetXLabel = this.options.map.markers.width / 2 - 0.9;
      var offsetYLabel = this.options.map.markers.height / 2 - 3;
      var colorBackground = this.markerStyles[category] ? this.markerStyles[category].colorBackground : '#e5454c';
      return {
        url: this.generateMarkerSVG({
          colorBackground: colorBackground,
          width: this.options.map.markers.width,
          height: this.options.map.markers.height
        }),
        labelOrigin: new window.google.maps.Point(offsetXLabel, offsetYLabel)
      };
    }

    /**
     * Generate SVG from the associated SVG file
     * @param {Object} Style datas to customize the SVG
     * @return {Object} Custom SVG to generate a Google Maps marker icons
     */
  }, {
    key: "generateMarkerSVG",
    value: function generateMarkerSVG(options) {
      // Create DOMParser from SVG string
      var parser = new DOMParser();
      var parserSvg = parser.parseFromString((_svg_marker_svg__WEBPACK_IMPORTED_MODULE_2___default()), 'text/html');
      var elementMarkerSvg = parserSvg.querySelector('svg');

      // Change SVG attributes
      elementMarkerSvg.setAttribute('width', "".concat(options.width, "px"));
      elementMarkerSvg.setAttribute('height', "".concat(options.height, "px"));
      elementMarkerSvg.querySelectorAll('path').forEach(function (path) {
        path.setAttribute('fill', options.colorBackground);
      });

      // Create Serializer from element
      var serializer = new XMLSerializer();
      var stringMarkerSvg = serializer.serializeToString(elementMarkerSvg);

      // Format SVG to generate an icon on the map
      var customSVG = {
        mimetype: 'data:image/svg+xml;base64,',
        scaledSize: new window.google.maps.Size(options.width, options.height)
      };
      return customSVG.mimetype + btoa(stringMarkerSvg);
    }

    /**
     * Check if browser is an old Internet Explorer
     */
  }, {
    key: "isBrowserIE",
    value: function isBrowserIE() {
      return !!(document.documentMode && document.documentMode >= 9);
    }

    /**
     * Extends multiple object into one
     * @param {Boolean} deep Enable extend for deep object properties
     * @param {Array} objects List of objects to merged
     * @return {Object} Objects merged into one
     */
  }, {
    key: "extend",
    value: function extend() {
      var _this12 = this;
      var deep = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var extended = {};

      // Merge the object into the extended object
      var merge = function merge(obj) {
        for (var prop in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, prop)) {
            // If deep merge and property is an object, merge properties
            if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
              extended[prop] = _this12.extend(true, extended[prop], obj[prop]);
            } else {
              extended[prop] = obj[prop];
            }
          }
        }
      };

      // Loop through each object and conduct a merge
      for (var _len = arguments.length, objects = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        objects[_key - 1] = arguments[_key];
      }
      objects.forEach(function (object) {
        merge(object);
      });
      return extended;
    }
  }]);
  return Storelocator;
}();


/***/ }),

/***/ "./src/js/templates/info-window.js":
/*!*****************************************!*\
  !*** ./src/js/templates/info-window.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _svg_route_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../svg/route.svg */ "./src/svg/route.svg");
/* harmony import */ var _svg_route_svg__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_svg_route_svg__WEBPACK_IMPORTED_MODULE_0__);


/**
 * storelocatorjs info window template
 * @module storelocatorjs/templateInfoIndow
 */
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(_ref) {
  var store = _ref.store,
    origin = _ref.origin;
  return "\n\t\t<div class=\"storelocator-infoWindow\">\n\t\t\t".concat(store.picture ? "<span class=\"storelocator-pictureStore\">\n\t\t\t\t\t<img src=\"".concat(store.picture, "\" alt=\"").concat(store.title, "\" />\n\t\t\t\t</span>") : "", "\n\t\t\t<div class=\"storelocator-detailStore\">\n\t\t\t\t").concat(store.title ? "<span class=\"storelocator-detailStoreTitle\">".concat(store.index + 1, ". ").concat(store.title, "</span>") : "", "\n\t\t\t\t<a href=\"http://www.google.fr/maps/dir/").concat(origin, "/").concat(store.lat, ",").concat(store.lng, "\" title=\"See the itinerary on Google Maps\" target=\"_blank\" class=\"storelocator-detailStoreDistance\">\n\t\t\t\t\t<span>").concat(store.distance.toFixed(2), "km</span>\n\t\t\t\t\t").concat((_svg_route_svg__WEBPACK_IMPORTED_MODULE_0___default()), "\n\t\t\t\t\t</a>\n\t\t\t\t").concat(store.address ? "<span class=\"storelocator-detailStoreAddress\">".concat(store.address, "</span>") : "", "\n\t\t\t\t").concat(store.zipcode ? "<span class=\"storelocator-detailStoreZipcode\">".concat(store.zipcode, "</span>") : "", "\n\t\t\t\t").concat(store.city ? "<span class=\"storelocator-detailStoreCity\">".concat(store.city, "</span>") : "", "\n\t\t\t\t").concat(store.phone ? "<span class=\"storelocator-detailStorePhone\"><a href=\"tel:".concat(store.phone, "\" title=\"Call\">").concat(store.phone, "</a></span>") : "", "\n\t\t\t\t").concat(typeof store.link !== 'undefined' ? "<a href=\"".concat(store.link, "\" title=\"Visit website\" target=\"_blank\" class=\"storelocator-detailStoreUrl\">").concat(store.link, "</a>") : "", "\n\t\t\t</div>\n\t\t</div>");
}

/***/ }),

/***/ "./src/js/templates/sidebar-item-result.js":
/*!*************************************************!*\
  !*** ./src/js/templates/sidebar-item-result.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _svg_route_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../svg/route.svg */ "./src/svg/route.svg");
/* harmony import */ var _svg_route_svg__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_svg_route_svg__WEBPACK_IMPORTED_MODULE_0__);


/**
 * storelocatorjs sidebar item result template
 * @module storelocatorjs/templateSidebarItemResult
 */
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(_ref) {
  var store = _ref.store,
    origin = _ref.origin;
  return "\n\t\t<li class=\"storelocator-sidebarResultsListItem\" data-category=\"".concat(store.category, "\">\n\t\t\t<div class=\"storelocator-detailStore\">\n\t\t\t\t").concat(store.title ? "<span class=\"storelocator-detailStoreTitle\"><a href=\"\" title=\"See on the map\" class=\"store-center-marker-js\" data-marker-index=\"".concat(store.index, "\">").concat(store.index + 1, ". <span>").concat(store.title, "</span></a></span>") : "", "\n\t\t\t\t<a href=\"http://www.google.fr/maps/dir/").concat(origin, "/").concat(store.lat, ",").concat(store.lng, "\" title=\"See the itinerary on Google Maps\" target=\"_blank\" class=\"storelocator-detailStoreDistance\">\n\t\t\t\t\t<span>").concat(store.distance.toFixed(2), "km</span>\n\t\t\t\t\t").concat((_svg_route_svg__WEBPACK_IMPORTED_MODULE_0___default()), "\n\t\t\t\t</a>\n\t\t\t\t").concat(store.address ? "<span class=\"storelocator-detailStoreAddress\">".concat(store.address, "</span>") : "", "\n\t\t\t\t").concat(store.zipcode ? "<span class=\"storelocator-detailStoreZipcode\">".concat(store.zipcode, "</span>") : "", "\n\t\t\t\t").concat(store.city ? "<span class=\"storelocator-detailStoreCity\">".concat(store.city, "</span>") : "", "\n\t\t\t\t").concat(store.phone ? "<span class=\"storelocator-detailStorePhone\"><a href=\"tel:".concat(store.phone, "\" title=\"Call\">").concat(store.phone, "</a></span>") : "", "\n\t\t\t</div>\n\t\t</li>");
}

/***/ }),

/***/ "./src/css/detail-store.css":
/*!**********************************!*\
  !*** ./src/css/detail-store.css ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/css/form-search.css":
/*!*********************************!*\
  !*** ./src/css/form-search.css ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/css/info-window.css":
/*!*********************************!*\
  !*** ./src/css/info-window.css ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/css/loader.css":
/*!****************************!*\
  !*** ./src/css/loader.css ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/css/map.css":
/*!*************************!*\
  !*** ./src/css/map.css ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/css/nav.css":
/*!*************************!*\
  !*** ./src/css/nav.css ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/css/sidebar.css":
/*!*****************************!*\
  !*** ./src/css/sidebar.css ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/css/storelocator.css":
/*!**********************************!*\
  !*** ./src/css/storelocator.css ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/css/vars.css":
/*!**************************!*\
  !*** ./src/css/vars.css ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/svg/marker.svg":
/*!****************************!*\
  !*** ./src/svg/marker.svg ***!
  \****************************/
/***/ ((module) => {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"31.5 5.5 70.6 97.9\"><path d=\"M64.7 102.2c.1.2.2.3.3.4.4.5 1 .8 1.6.8.7 0 1.3-.1 1.8-.8.1-.1.3-.3.3-.5C76 91.2 83.2 80.3 90.2 69.4c4.5-7 9.7-13.8 11.1-22.1 1.7-9.9-.7-20.1-6.7-28.1C82.7 3.3 59.2.9 44 13.7c-7.3 6.1-11.8 15-12.4 24.5-.8 10 3 17.6 8.2 25.8 8 12.8 16.4 25.5 24.9 38.2z\"></path><path d=\"M97.1 47.2c-1.5 7.3-6.6 13.8-10.7 20-6.4 10.1-12.9 20-19.6 29.9-5.7-8.3-11.2-16.6-16.6-25-3.7-5.7-7.5-11.4-10.8-17.3-5.2-9.2-4.6-21.2.9-30.2 10.4-17.5 35.3-20 49.1-5.2 6.9 7.4 9.7 18 7.7 27.8z\"></path></svg>"

/***/ }),

/***/ "./src/svg/route.svg":
/*!***************************!*\
  !*** ./src/svg/route.svg ***!
  \***************************/
/***/ ((module) => {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"storelocator-detailStoreIconRoute\" viewBox=\"1772 1772 19.185 20\"><path d=\"M1791.074 1775.318a.356.356 0 0 1 0 .514l-1.574 1.573c-.209.21-.464.313-.761.313h-15.009a.679.679 0 0 1-.502-.213.688.688 0 0 1-.211-.502v-2.859c0-.192.07-.36.211-.502a.688.688 0 0 1 .502-.211h6.434v-.716c0-.192.07-.36.211-.502a.682.682 0 0 1 .502-.213h1.431a.68.68 0 0 1 .502.213c.142.142.211.31.211.502v.716h5.719c.297 0 .552.102.761.312l1.573 1.575zm-10.91 10.262h2.856v5.716a.69.69 0 0 1-.211.505.686.686 0 0 1-.502.211h-1.431a.688.688 0 0 1-.502-.211.693.693 0 0 1-.211-.505v-5.716zm9.29-5.003c.193 0 .361.07.502.211.142.142.212.31.212.502v2.859c0 .192-.07.361-.212.504a.684.684 0 0 1-.502.212h-15.009c-.297 0-.551-.105-.76-.314l-1.574-1.572a.357.357 0 0 1 0-.515l1.574-1.576c.209-.209.463-.311.76-.311h5.719v-2.146h2.856v2.146h6.434z\"></path></svg>"

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!***********************!*\
  !*** ./src/config.js ***!
  \***********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _js_storelocator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/storelocator.js */ "./src/js/storelocator.js");
/* harmony import */ var _css_vars_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./css/vars.css */ "./src/css/vars.css");
/* harmony import */ var _css_loader_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./css/loader.css */ "./src/css/loader.css");
/* harmony import */ var _css_detail_store_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./css/detail-store.css */ "./src/css/detail-store.css");
/* harmony import */ var _css_form_search_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./css/form-search.css */ "./src/css/form-search.css");
/* harmony import */ var _css_info_window_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./css/info-window.css */ "./src/css/info-window.css");
/* harmony import */ var _css_nav_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./css/nav.css */ "./src/css/nav.css");
/* harmony import */ var _css_sidebar_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./css/sidebar.css */ "./src/css/sidebar.css");
/* harmony import */ var _css_map_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./css/map.css */ "./src/css/map.css");
/* harmony import */ var _css_storelocator_css__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./css/storelocator.css */ "./src/css/storelocator.css");
// Import JS


// Import CSS









/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_js_storelocator_js__WEBPACK_IMPORTED_MODULE_0__["default"]);
})();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=storelocator.js.map