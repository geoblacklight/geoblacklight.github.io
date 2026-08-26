# Customizing Leaflet

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

## Switching the default basemap

GeoBlacklight comes with a default open-source basemap, Carto's Positron, but it is possible to switch to one of the [seven baselayers supported within the GeoBlacklight application](http://bl.ocks.org/Xatpy/raw/854297419bd7eb3421d0/). They are:

* Dark Matter
* Positron
* Positron Lite
* World Antique
* World Eco
* Flat Blue
* Midnight Commander

In order to toggle between them, all you need to do is go to the [catalog_controller.rb](https://github.com/geoblacklight/geoblacklight/blob/master/lib/generators/geoblacklight/templates/catalog_controller.rb) file in your application and replace the config.basemap_provider value. The valid values are in the comments above this line as a helpful reminder.

## Dynamic Basemap Switching

!!! warning

	This kind of customization may potentially make your future GeoBlacklight upgrades more difficult. If you choose to implement this feature, you will need to be extra vigilant when GBL JavaScript files change in future releases.

Need a dynamic basemap switcher? You can customize GeoBlacklight to add support for Leaflet's basemap switching:

<img width="500" alt="basemap-switcher" src="https://user-images.githubusercontent.com/69827/189993636-e2bfb61a-0ddd-439e-b4a5-44088edb9079.gif"/>

### 1. Add JavaScript Cookie to your application

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

### 2. Add Basemap options

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

### 3. Modify GeoBlacklight's map.js file

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

### 4. Add Leaflet's CSS file to the asset pipeline

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
```

We need the background-image paths to use Rails' asset_url helper so these images are fingerprinted correctly.

Lastly, from your Leaflet download copy the `layers.png` and `layers-2x.png` files into your local application here:

* `app/assets/images/layers.png`
* `app/assets/images/layers-2x.png`



## Homepage Map Centroid Clusters

!!! warning

	This kind of customization may potentially make your future GeoBlacklight upgrades more difficult. If you choose to implement this feature, you will need to be extra vigilant when GBL JavaScript files change in future releases.


Want your homepage map to display centroid clusters? You can customize GeoBlacklight to add support for that:

<img alt="homepage-centroid-visualization" src="https://user-images.githubusercontent.com/69827/190460417-861da2f8-9580-4903-8215-4dc10d7166cf.png"/>

### 1. Add a rake task to generate a centroids.json file

Create a new rake file here:
`/lib/tasks/generate_centroids_json.rake`

This rake task will write a `centroids.json` file to your application's public directory. Add these lines to the file:

```ruby
require 'rsolr'

namespace :geoportal do
  desc 'Generate homepage centroids for map clustering'
  task generate_centroids_json: :environment do
    response = Blacklight.default_index.connection.get 'select', params: { q: "*:*", rows: '1000000' }

    docs = []
    response["response"]["docs"].each_with_index do |doc, index|
      begin
        if doc.key?('dcat_centroid') && !doc['dcat_centroid'].empty?
          entry = {}
          entry['l'] = doc['id']
          entry['t'] = ActionController::Base.helpers.truncate(doc['dct_title_s'], length: 50)
          lat,lng    = doc['dcat_centroid'].split(",")
          lat = lat.to_f.round(4) # Truncate long values
          lng = lng.to_f.round(4) # Truncate long values
          entry['c'] = "#{lat},#{lng}"
          docs << entry
        end
      rescue Exception => e
        puts "Caught #{e}"
        puts "BBox or centroid no good - #{doc['id']}"
      end
    end

    centroids_file = "#{Rails.root}/public/centroids.json"
    File.open(centroids_file, "w"){ |f| f.write(JSON.generate(docs)) }
  end
end

```

Run this rake task via this command: `bundle exec rake geoportal:generate_centroids_json`

### 2. Install JavaScript Dependencies

* Oboe - Oboe.js reads json, giving you the objects as they are found without waiting for the stream to finish
* PruneCluster - Fast and realtime marker clustering for Leaflet

Use yarn to add these two new dependencies to the project:

`yarn add oboe`
`yarn add @sintef/prune-cluster`

Add the node_modules directory to your asset path:

`/config/initializers/assets.rb`

```ruby
Rails.application.config.assets.paths << Rails.root.join('node_modules')
```

### 3. Add our JavaScript changes for the Homepage Map

We need to override the GeoBlacklight `app/assets/javascripts/geoblacklight/modules/home.js` file to add our customization.

To override a Rails Engine's javascript (GeoBlacklight), we need to update our asset pipeline calls to require specific files from the GeoBlacklight modules directory instead of globbing all of the file from `/modules/`.

Change your local `geoblacklight.js` file to look like this:

```javascript
//= require handlebars.runtime
//= require geoblacklight/geoblacklight
//= require geoblacklight/basemaps
//= require geoblacklight/controls
//= require geoblacklight/viewers

// Local Customization - Start
//= require geoblacklight/modules/bookmarks
//= require geoblacklight/modules/download
//= require geoblacklight/modules/geosearch
//= require geoblacklight/modules/help_text
//= require ./geoportal/modules/home
//= require geoblacklight/modules/item
//= require geoblacklight/modules/layer_opacity
//= require geoblacklight/modules/metadata_download_button
//= require geoblacklight/modules/metadata
//= require geoblacklight/modules/relations
//= require geoblacklight/modules/results
//= require geoblacklight/modules/svg_tooltips
//= require geoblacklight/modules/util
// Local Customization - End

//= require geoblacklight/downloaders
//= require leaflet-iiif
//= require esri-leaflet

```

As included in the code snippet above, add a file named `app/assets/javascripts/geoportal/modules/home.js` to your application.

Inside that file write these lines:

```javascript
Blacklight.onLoad(function() {
  $('[data-map="home"]').each(function(i, element) {
    var geoblacklight = new GeoBlacklight.Viewer.Map(this);
    var data = $(this).data();

    geoblacklight.map.addControl(L.control.geosearch({
      baseUrl: data.catalogPath,
      dynamic: false,
      searcher: function() {
        window.location.href = this.getSearchUrl();
      },
      staticButton: '<a href="#" class="btn btn-primary">Search here</a>'
    }));

    // Local Customization - Start
    var pruneCluster = new PruneClusterForLeaflet();

    oboe('/centroids.json')
      .node('*', function( doc ){
          if(typeof doc.c != 'undefined'){
            var latlng = doc.c.split(",")

            var marker = new PruneCluster.Marker(latlng[0],latlng[1], {popup: "<a href='/catalog/" + doc.l + "'>" + doc.t + "</a>"});
            pruneCluster.RegisterMarker(marker);
          }
        }
      )
      .done(function(){
        geoblacklight.map.addLayer(pruneCluster)
      });
    // Local Customization - End
  });
});

```

### 4. Add our Stylesheet changes for the Homepage Map

All that is missing now are is the CSS changes to style our clusters. Update your `application.scss` file to include the missing stylesheet:

```scss
@import 'customizations';
@import 'bootstrap';
@import 'blacklight';
@import 'geoblacklight';

// Local Customization
@import '@sintef/prune-cluster/dist/LeafletStyleSheet';

```

Reload your homepage and you should see something like this:

<img alt='homepage-result-clusters' src='https://user-images.githubusercontent.com/69827/190491281-b320babf-4d6a-45c2-a2e2-a2f6c1fdb5d1.png'/>


## Configure Leaflet for retina displays
GeoBlacklight allows implementers to configure the way in which basemaps and tile layers (WMS) are displayed on high pixel density 'retina' screens. When retina detection settings are enabled, Leaflet will request larger tiles to take advantage of the increased resolution.

### Tile layers

In your application's settings.yml, find `DETECT_RETINA` and set it to `true` or `false`.

```
...
LEAFLET:
  MAP:
  LAYERS:
    DETECT_RETINA: true
...

```

When set to `true`, Leaflet will load 512 pixel tiles on retina displays.

<img width="681" alt="retina-layer" src="https://cloud.githubusercontent.com/assets/784196/17187497/1966c73c-53ff-11e6-9b57-2d53ca1b1bc4.png">

### Basemaps

To configure the stock CartoDB basemaps for higher resolution display you will have to override the `GeoBlacklight.Basemaps` javascript module. In your application, create a `geoblacklight` directory in `app/assets/javascripts/` and then create a new file called `basemaps.js` in that directory.

<img width="195" alt="basemap" src="https://cloud.githubusercontent.com/assets/784196/17187370/9343a206-53fe-11e6-9239-0500564d831b.png">

Now copy the contents of the [Geoblacklight basemaps.js file](https://raw.githubusercontent.com/geoblacklight/geoblacklight/master/app/assets/javascripts/geoblacklight/basemaps.js) into your new file. On any basemaps that you want to enable retina, set `detectRetina` to `true`. Your file should look something like this:

```js
// basemaps

GeoBlacklight.Basemaps = {
  darkMatter: L.tileLayer(
    'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}{retina}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
      maxZoom: 18,
      worldCopyJump: true,
      retina: '@2x',
      detectRetina: true
    }
  ),
  positron: L.tileLayer(
    'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}{retina}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
      maxZoom: 18,
      worldCopyJump: true,
      retina: '@2x',
      detectRetina: true
    }
  )
};

```

