title: Getting started - Storelocatorjs
description: Project includes CSS, Javascript and PHP files. The installation is fast and the Storelocator is easily customizable. Google Maps API is automatically loaded

## Installation

Google Maps API V3 is automatically loaded by the module, no need to import it.

### NPM

Install Storelocatorjs with npm:

```shell
npm install storelocatorjs
```

```javascript
import storelocatorjs from 'storelocatorjs';
import 'storelocatorjs.css';

new storelocatorjs({
    selector: '#player'
});
```

### Manual import

Includes files manually in your project:

```html
<link rel="stylesheet" href="storelocator.css" />
<script src="storelocator.js"></script>

<script>
    new storelocatorjs({
        selector: '#player'
    });
</script>
```

### Google Maps API key

Create an API key to use Google Maps API on the <a href="https://developers.google.com/maps/documentation/javascript/get-api-key?hl=Fr" target="_blank" title="Google Console API">Google Console API</a>.

### Virtual host

Create the following virtual host and replace the variable `{directoryPath}` by the directory path of your project.

``` hl_lines="2 4"
<VirtualHost *:80>
    DocumentRoot {directoryPath}
    ServerName storelocator.local
    <Directory  "{directoryPath}">
        Options +Indexes
    </Directory>
</VirtualHost>
```
Add host on your local OS `127.0.0.1 storelocator.local`<br />
_(On Windows, files is located to `C:\windows\System32\drivers\etc\`)_

### CSS

CSS files are available in the `./css` folder, import it directly in your project. The Storelocator styles includes a small reset CSS from <a href="https://meyerweb.com/eric/tools/css/reset/" target="_blank" title="Reset CSS">Eric Meyer</a>.

!!! tip "SASS"
    CSS file is also available with SASS.

### Javascripts

The Storelocator Javascripts files are available in the `./js` folder, import it directly in your project.

Instanciate the Storelocator constructor and set your options. There is only two mandatory options to start the Storelocator. The second parameter is a callback function with Google Maps instance, called when module is ready.<br />

```javascript
var options = {
    apiKey: '',
    urlWebservice: ''
};
var myStorelocator = new Storelocator(options, function(map){
    //Module is ready
});
```

!!! tip "First, create your API key!"
    Google Maps API V3 is automatically loaded by the module, no need to import it.<br />Before to use the Javascript API, you need to create an API key: <a href="https://developers.google.com/maps/documentation/javascript/get-api-key?hl=Fr" target="_blank" title="Google Console API">Create API key on the Google Console API</a>

### Images

The project includes a `/images` folder that includes store sample images and a custom cluster image.

### PHP <small>(Compatible Wordpress & Drupal)</small>

The project includes `/inc` folder with two PHP scripts.

* `ajax_get_stores.php` - File called by the AJAX request
* `WS_Stores.php` - PHP class to filter stores by categories and distance

If you use a CMS like <strong>Wordpress</strong> or <strong>Drupal</strong>, scripts are also compatible.<br />
To configure access to `ajax_get_stores.php`, use the Storelocator `urlWebservice` option in Javascript.

<script>
  ((window.gitter = {}).chat = {}).options = {
    room: 'store-locator/store-locator'
  };
</script>
<script src="https://sidecar.gitter.im/dist/sidecar.v1.js" async defer></script>