
## Adding Leaflet controls
GeoBlacklight supports adding customized Leaflet plugin controls to the maps. This can useful for adding a [geocoding](http://leafletjs.com/plugins#geocoding) or [fullscreen](http://leafletjs.com/plugins#fullscreen-controls). This guide will walkthrough adding the [Leaflet.fullscreen](https://github.com/Leaflet/Leaflet.fullscreen) control plugin.

### Add required Javascript and CSS
To add a custom control, first make sure that you require the needed JavaScript and/or CSS styles in your GeoBlacklight application.

```javascript
// In your applications's app/assets/javascripts/geoblacklight.js

//= require geoblacklight/geoblacklight
//= require geoblacklight/basemaps
//= require geoblacklight/controls
//= require geoblacklight/viewers
//= require geoblacklight/modules
//= require geoblacklight/downloaders
//= require leaflet-iiif
//= require esri-leaflet
//= require readmore.min

//= require Leaflet.fullscreen.js
```

You should do something similar for vendor css files and images. GeoBlacklight uses the [Rails asset pipeline](http://guides.rubyonrails.org/asset_pipeline.html) for asset management. Vendor maintained files should usually be added under `./vendor/assets`.

```scss
// In your applications's app/assets/stylesheets/geoblacklight.css.scss
/*
*= require geoblacklight/application
*= require leaflet.fullscreen
*/
```

### Configure your settings

Next, you need to configure your settings to tell the viewers to load your control. Your application's `lib/generators/geoblacklight/templates/settings.yml` should look something like this:

```yml
...
OPACITY_CONTROL: &opacity_control
  CONTROLS:
    - 'Opacity'

LEAFLET:
  MAP:
  LAYERS:
  VIEWERS:
    WMS:
      <<: *opacity_control
    TILEDMAPLAYER:
      <<: *opacity_control
    FEATURELAYER:
      <<: *opacity_control
    DYNAMICMAPLAYER:
      <<: *opacity_control
    IMAGEMAPLAYER:
      <<: *opacity_control
...
```

Let's say you want to add the fullscreen control for just your WMS viewer. You will need to update your `WMS` viewer controls to add it like so:

```yml
...
  VIEWERS:
      WMS:
        CONTROLS:
          - 'Opacity'
          - 'Fullscreen'
...
```

### Initialize your plugin

Finally you need to initialize your controls like this. You can initialize the plugin with additional options.

```javascript
// In your applications's app/assets/javascripts/geoblacklight/geoblacklight.js
...
//= require Leaflet.fullscreen.js

GeoBlacklight.Controls.Fullscreen = function() {
  this.map.addControl(new L.Control.Fullscreen({
    position: 'topright'
  }));
};
```

You should now have a working fullscreen button in your application!

![GeoBlacklight WMS viewer with Fullscreen plugin](https://cloud.githubusercontent.com/assets/1656824/14321740/5270d6f4-fbcf-11e5-92f5-dbfe00a7d5a4.png)

### Adding a Search Control

Customizing Leaflet has certain limitations which can fortunately be overcome through the usage of plugins developed by third parties.  Leaflet provides the following listing of plugins for the library: [https://leafletjs.com/plugins.html#search--popups](https://leafletjs.com/plugins.html#search--popups)

#### Downloading Leaflet Plugins
Firstly, in order to integrate a plugin, the JavaScript source file(s) are downloaded into the `vendor/assets/javascripts` directory, where names are all in the lower case, with whitespace being replaced by dash characters (e. g. `vendor/assets/javascripts/esri-leaflet.js`)

#### Downloading JavaScript Source Files
**Using `wget`**
```
$ wget -O vendor/assets/javascripts/leaflet-search.js https://raw.githubusercontent.com/stefanocudini/leaflet-search/master/dist/leaflet-search.src.js
```
**Using `curl`**
```
$ curl -o vendor/assets/javascripts/leaflet-search.js https://raw.githubusercontent.com/stefanocudini/leaflet-search/master/dist/leaflet-search.src.js
```
**For Production Builds**
```
$ wget -O vendor/assets/javascripts/leaflet-search.js https://raw.githubusercontent.com/stefanocudini/leaflet-search/master/dist/leaflet-search.min.js
```
or
```
$ curl -o vendor/assets/javascripts/leaflet-search.js https://raw.githubusercontent.com/stefanocudini/leaflet-search/master/dist/leaflet-search.min.js
```

#### Downloading CSS Files
**`wget`**
```
$ wget -O vendor/assets/stylesheets/leaflet-search.css https://raw.githubusercontent.com/stefanocudini/leaflet-search/master/dist/leaflet-search.src.css

$ wget -O vendor/assets/stylesheets/leaflet-search.mobile.css https://raw.githubusercontent.com/stefanocudini/leaflet-search/master/dist/leaflet-search.mobile.src.css
```
**`curl`**
```
$ curl -o vendor/assets/stylesheets/leaflet-search.css https://raw.githubusercontent.com/stefanocudini/leaflet-search/master/dist/leaflet-search.src.css

$ curl -o vendor/assets/stylesheets/leaflet-search.mobile.css https://raw.githubusercontent.com/stefanocudini/leaflet-search/master/dist/leaflet-search.mobile.src.css
```
**Production Builds**
```
$ wget -O vendor/assets/stylesheets/leaflet-search.css https://raw.githubusercontent.com/stefanocudini/leaflet-search/master/dist/leaflet-search.min.css

$ wget -O vendor/assets/stylesheets/leaflet-search.mobile.css https://raw.githubusercontent.com/stefanocudini/leaflet-search/master/dist/leaflet-search.mobile.min.css
```
or
```
$ curl -o vendor/assets/stylesheets/leaflet-search.css https://raw.githubusercontent.com/stefanocudini/leaflet-search/master/dist/leaflet-search.min.css

$ curl -o vendor/assets/stylesheets/leaflet-search.mobile.css https://raw.githubusercontent.com/stefanocudini/leaflet-search/master/dist/leaflet-search.mobile.min.css
```

#### Downloading Image Files
```
$ wget -O app/assets/images/loader.gif https://github.com/stefanocudini/leaflet-search/raw/master/images/loader.gif
$ wget -O app/assets/images/search-icon-mobile.png https://github.com/stefanocudini/leaflet-search/raw/master/images/search-icon-mobile.png
$ wget -O app/assets/images/search-icon.png https://github.com/stefanocudini/leaflet-search/raw/master/images/search-icon.png
```
or
```
$ curl -o app/assets/images/loader.gif https://github.com/stefanocudini/leaflet-search/raw/master/images/loader.gif
$ curl -o app/assets/images/search-icon-mobile.png https://github.com/stefanocudini/leaflet-search/raw/master/images/search-icon-mobile.png
$ curl -o app/assets/images/search-icon.png https://github.com/stefanocudini/leaflet-search/raw/master/images/search-icon.png
```

### Integrating Plugins into Leaflet
Integrating a plugin varies depending upon precisely what is being used, but the general approach seems to often follow a pattern such as the following:
```
var searchLayer = L.layerGroup().addTo(map);
//... adding data in searchLayer ...
map.addControl( new L.Control.Search({layer: searchLayer}) );
```
...where the `map` Object invokes `addControl` using the search `L.Control` Object as an argument.

#### Configuring GeoBlacklight
When integrating this GeoBlacklight, the approach above could modified by extending the previous example:

```
...
  VIEWERS:
      WMS:
        CONTROLS:
          - 'Opacity'
          - 'Fullscreen'
          - 'Search'
...
```

```
// In the application app/assets/javascripts/geoblacklight.js
...
//= require
//= require leaflet-search

GeoBlacklight.Controls.Search = function() {
  this.map.addControl(new L.control.search({
    url: 'http://nominatim.openstreetmap.org/search?format=json&q={s}',
		jsonpParam: 'json_callback',
		propertyName: 'display_name',
		propertyLoc: ['lat','lon'],
		marker: L.circleMarker([0,0], { radius: 30 }),
		autoCollapse: true,
		autoType: false,
		minLength: 2
  }));
};
```

```
// In the application app/assets/stylesheets/geoblacklight.scss
/*
*= require geoblacklight/application
*= require leaflet-label
*= require leaflet-search
*= require leaflet-search.mobile
*/

// SCSS overrides for the default styles properties
.leaflet-container {
  .leaflet-control-search {
    margin-top: 3.2rem;

    .search-button {
      background-image: image-url('search-icon-mobile');

      &:hover {
        background-image: image-url('search-icon-mobile');
      }
    }
  }
}
```
After refreshing your web browser, the map viewer should now have a search control integrated:

<img width="893" alt="geoblacklight_issues_528_screenshot_0" src="https://user-images.githubusercontent.com/1443986/43652664-d5958160-9713-11e8-845f-445f322a8eea.png">
