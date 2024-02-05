# Dynamic Basemap Switching

!!! warning

	This kind of customization may potentially make your future GeoBlacklight upgrades more difficult. If you choose to implement this feature, you will need to be extra vigilant when GBL JavaScript files change in future releases.

Need a dynamic basemap switcher? You can customize GeoBlacklight to add support for Leaflet's basemap switching:

<img width="500" alt="basemap-switcher" src="https://user-images.githubusercontent.com/69827/189993636-e2bfb61a-0ddd-439e-b4a5-44088edb9079.gif"/>

## 1. Add JavaScript Cookie to your application

Use yarn to install [js-cookie](https://github.com/js-cookie/js-cookie):

```bash
$ yarn add js-cookie
```

Add the node_modules directory to your asset path:

`/config/initializers/assets.rb`

```ruby
Rails.application.config.assets.paths << Rails.root.join('node_modules')
```

Add js-cookie to your geoblacklight.js file:

`/app/assets/javascript/geoblacklight.js`

```javascript
//= require handlebars.runtime
//= require geoblacklight/geoblacklight
//= require geoblacklight/basemaps
//= require geoblacklight/controls
//= require geoblacklight/viewers
//= require geoblacklight/modules
//= require geoblacklight/downloaders
//= require leaflet-iiif
//= require esri-leaflet

// Local Customizations
//= require js-cookie/dist/js.cookie.js
//= require ./local/viewers/map

```

## 2. Add Basemap options

Configure the additional basemap options in your geoblacklight.js file:

`/app/assets/javascript/geoblacklight.js`

```javascript
...

// Local Customizations
//= require js-cookie/dist/js.cookie.js
//= require ./local/viewers/map

// LOCAL Namespace
if (!window.LOCAL){ LOCAL={}; }

// Basemap select - Text: Value
LOCAL.baseLayerMap = {
  "Default (Esri)": 'esri',
  "OpenStreetMaps": 'openstreetmapStandard',
  "World Imagery (Esri)": 'esri_world_imagery'
}

// Additional leaflet base layers
GeoBlacklight.Basemaps.esri =  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
  attribution: false,
  maxZoom: 18,
  worldCopyJump: true,
  detectRetina: true,
  noWrap: false
});

GeoBlacklight.Basemaps.esri_world_imagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  attribution: false,
  maxZoom: 18,
  worldCopyJump: true,
  detectRetina: true,
  noWrap: false
})

```

## 3. Modify GeoBlacklight's map.js file

Copy and move GeoBlacklight's `map.js` file to your local application.

Copy from GeoBlacklight:
`app/assets/javascripts/geoblacklight/viewers/map.js`

Move to your local application here:
`app/assets/javascripts/local/viewers/map.js`

Add a call to this.addBasemapSwitcher(); in the load block.

```javascript
//= require geoblacklight/viewers/viewer

GeoBlacklight.Viewer.Map = GeoBlacklight.Viewer.extend({

  options: {
    /**
    * Initial bounds of map
    * @type {L.LatLngBounds}
    */
    bbox: [[-82, -144], [77, 161]],
    opacity: 0.75
  },

  overlay: L.layerGroup(),

  load: function() {
    if (this.data.mapGeom) {
      this.options.bbox = L.geoJSONToBounds(this.data.mapGeom);
    }
    this.map = L.map(this.element).fitBounds(this.options.bbox);
    this.map.addLayer(this.selectBasemap());

    // Add initial bbox to map element for easier testing
    if (this.map.getBounds().isValid()) {
      this.element.setAttribute('data-js-map-render-bbox', this.map.getBounds().toBBoxString());
    }

    this.map.addLayer(this.overlay);
    if (this.data.map !== 'index') {
      this.addBoundsOverlay(this.options.bbox);
    }

    // Local Customizations
    this.addBasemapSwitcher();
  },

  ...
```

Now add the functions to switch basemaps and store the current basemap in JS Cookie:

```javascript
...

/**
* Selects basemap if specified in 1) cookie, 2) data options, 3) if not return mapquest
*/
selectBasemap: function() {
  console.log("Selecting basemap");
  console.log("Cookie: " + Cookies.get('basemap'));

  var _this = this;
  if (Cookies.get('basemap')) {
    return GeoBlacklight.Basemaps[LOCAL.baseLayerMap[Cookies.get('basemap')]];
  } else if (_this.data.basemap) {
    return GeoBlacklight.Basemaps[_this.data.basemap];
  } else {
    return _this.basemap.mapquest;
  }
},

addBasemapSwitcher: function() {
  // basemaps control
  console.log('Control: Base Layer');
  var baseLayers = {
    "Default (Esri)": GeoBlacklight.Basemaps.esri,
    "OpenStreetMaps": GeoBlacklight.Basemaps.openstreetmapStandard,
    "World Imagery (Esri)": GeoBlacklight.Basemaps.esri_world_imagery
  };

  L.control.layers(baseLayers, null, { position: 'bottomleft' }).addTo(this.map);

  // Event listener for layer switcher
  this.map.on('baselayerchange', function (e) {
    Cookies.set('basemap', e.name)
  });
}

...
```

## 4. Add Leaflet's CSS file to the asset pipeline

Unfortunately, Rails' asset pipeline cannot find Leaflet's Layer Group icon/images without some additional help.

Download a copy of Leaflet and copy the leaflet.css file into your local project here:

`app/assets/stylesheets/leaflet/leaflet.css.erb`

Add an import statement to `application.scss` for this new file:

```
...

// Customizations
@import 'leaflet/leaflet';

```

We'll need to modify this CSS file slightly to reference the images we need in the application.

At the top of this file add these lines:

```css
//= depend_on_asset 'layer.png'
//= depend_on_asset 'layers-2x.png'
```

Farther down the file, we'll need to edit this block too:

```css
...

/* layers control */

.leaflet-control-layers {
	box-shadow: 0 1px 5px rgba(0,0,0,0.4);
	background: #fff;
	border-radius: 5px;
	}
.leaflet-control-layers-toggle {
	background-image: url(<%= asset_url 'layers.png' %>);
	width: 36px;
	height: 36px;
	}
.leaflet-retina .leaflet-control-layers-toggle {
	background-image: url(<%= asset_url 'layers-2x.png' %>);
	background-size: 26px 26px;
	}

...
```

We need the background-image paths to use Rails' asset_url helper so these images are fingerprinted correctly.

Lastly, from your Leaflet download copy the `layers.png` and `layers-2x.png` files into your local application here:

* `app/assets/images/layers.png`
* `app/assets/images/layers-2x.png`
