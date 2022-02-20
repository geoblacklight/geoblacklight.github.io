
# Customization
Because GeoBlacklight was built using Ruby on Rails and Blacklight, many local customization techniques are outlined in Ruby on Rails and Blacklight documentation.

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

Next, you need to configure your settings to tell the viewers to load your control. Your application's `settings.yml` should look something like this:

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
// In your applications's app/assets/javascripts/geoblacklight.js
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

Customizing Leaflet has certain limitations which can fortunately be overcome through the usage of plugins developed by third parties.  Leaflet provides the following listing of plugins for the library: https://leafletjs.com/plugins.html#search--popups

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

## Configuring Leaflet for retina displays
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

```
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

## Using the Data Relations Widget

Beginning with v1.3.0, GeoBlacklight supports simple visualization of parent/children relations between records in a catalog. When records that were derived from a parent record point back to that parent, it enables a toolbar widget that displays the relation.

To make use of this, we have introduced support for a "source" field in GeoBlacklight metadata records. The actual key of this field is arbitrary –– just make sure that `Settings.FIELDS.SOURCE` properly reflects what you want to use –– but the GeoBlacklight schema allocates the Dublin Core field `dc_source_sm` for this purpose.

The responsibility of this field is to point to a parent document (a document from which the current one is derived). The value should be the `layer_slug_s` of that parent (or parents), which also resides in your catalog. No modifications need to be made to the parent record in order to point back towards the derived records.

Here is an example use of the `dc_source_sm` field, from a GeoBlacklight schema record:
```json
  "dc_source_sm": [
    "nyu_2451_34635",
    "nyu_2451_34636"
  ],
```
In the above case, the record being described is derived from two different records in the catalog (namely, `nyu_2451_34635` and `nyu_2451_34636`).

Now, when navigating to the show page for either the current record, or one of the two parent records, a user will see something like this:

<img src="https://cloud.githubusercontent.com/assets/10469527/20073023/98a54434-a4f8-11e6-9976-41910875be73.png" alt="Child's view" width="325">
<img src="https://cloud.githubusercontent.com/assets/10469527/20073029/9c71482e-a4f8-11e6-9a5e-f0a364eb382c.png" alt="Parent's view" width="325">


This functionality also provides a HTML and JSON API for viewing all parent/child datasets for a record. The route used is:
`localhost:3000/catalog/fake-record-001/relations`

A sample JSON response for a record with two parents and no children might look like this:
```json
{
  "ancestors": {
    "numFound": 2,
    "start": 0,
    "docs": [
      {
        "dc_title_s": "2016 NYC Geodatabase, ArcGIS Version (jan2016)",
        "layer_slug_s": "nyu_2451_34636"
      },
      {
        "dc_title_s": "2016 NYC Geodatabase, Open Source Version (jan2016)",
        "layer_slug_s": "nyu_2451_34635"
      }
    ]
  },
  "descendants": {
    "numFound": 0,
    "start": 0,
    "docs": []
  },
  "current_doc": "nyu_2451_34513"
}
```

## Configuring Index Maps for Use in GeoBlacklight


### Index Maps: Introduction

The 2020 Geo4LibCamp featured a [workshop](https://kgjenkins.github.io/openindexmaps-workshop/) on index maps that provides useful information if you are new to index maps and want a basic primer. Many of the links below will lead you to relevant parts of this workshop.

For a conceptual introduction to index maps (i.e. what are index maps anyway?), see this [explanation](https://kgjenkins.github.io/openindexmaps-workshop/index-maps).

Here are examples of "live" index maps hosted within the GeoBlacklight instances of, [NYU](https://geo.nyu.edu/catalog/nyu-2451-38684), [Cornell](https://cugir.library.cornell.edu/catalog/cugir-008187), and [Stanford](https://earthworks.stanford.edu/catalog/stanford-qb865wf0229).  

### Making Index Maps

Before making index maps for use in GeoBlacklight, it is important to be familiar with OpenIndexMaps, a specific index map standard that is used by the GeoBlacklight community. For an introduction to this standard, see [here](https://kgjenkins.github.io/openindexmaps-workshop/openindexmaps). For more detailed information on making index maps according to the OpenIndexMaps standard, see [here](https://openindexmaps.org/).

Index maps that are made according to the OpenIndexMaps standard are encoded in the GeoJSON format. For more information about GeoJSON, see [here](https://kgjenkins.github.io/openindexmaps-workshop/geojson).  For a longer guide to GeoJSON with additional useful information, please see the Data Curation Network (DCN) [primer on GeoJSON](https://github.com/DataCurationNetwork/data-primers/blob/master/GeoJSON%20Data%20Curation%20Primer/GeoJSON-data-curation-primer.md).

When working with GeoJSON, it is recommended to use QGIS. For a quick overview of QGIS features that are relevant to working with GeoJSON, see [here](https://kgjenkins.github.io/openindexmaps-workshop/qgis).

The following tutorials cover how to [make a polygon index map from an existing shapefile](https://kgjenkins.github.io/openindexmaps-workshop/exercise1), [how to make a point index map from a spreadsheet containing coordinates](https://kgjenkins.github.io/openindexmaps-workshop/exercise2), [how to create a grid index map from scratch](https://kgjenkins.github.io/openindexmaps-workshop/exercise3), and [how to create a polygon index map using virtual layer magic](https://kgjenkins.github.io/openindexmaps-workshop/exercise4).  


### Adding, Customizing, and Displaying Index Maps

[#588](https://github.com/geoblacklight/geoblacklight/pull/588) added index map discovery
and preview to GeoBlacklight. Index map preview can be added to a layer by adding an accessible url to a GeoJSON file in a layer's `dct_references_s` section:

```
"dct_references_s": "{\"https://openindexmaps.org\": \"https://gist.githubusercontent.com/mejackreed/4a44f1f7cc4fbb926068738e903a9e96/raw/fedfb0e599d647920f084627b7dca8f88a358757/stanford-fb897vt9938.geojson\"}",
```

As noted above, index maps should be created using the [OpenIndexMaps](https://openindexmaps.org/) specification. In GeoBlacklight, the `label` property will be used for the tooltip that appears when the user hovers over a feature on the index map.

The index map preview can be customized by overriding the Handlebars template `index_map_info.hbs` and/or overriding the `GeoBlacklight.Util.indexMapTemplate` method.

[#759](https://github.com/geoblacklight/geoblacklight/pull/759) added selection styling for GeoJSON index map features and adjusted where style customizations are set. Styling for index map features can be customized in `settings.yml`. Any style that is set in the `DEFAULT` section will be applied to all feature states unless overwritten within each specific state. Style options follow the [Leaflet Path Options](https://leafletjs.com/reference-1.4.0.html#path), so any new style added should be from those available.

### Metadata for Index Maps

Here are some considerations to keep in mind when generating metadata for index maps:

* The `layer_geom_type_s` field in the index map's metadata record should reflect the geometry type of the scanned map, aerial photo, LiDAR dataset etc. (i.e. the underlying data for which the index map serves as a contextual guide). It should not indicate the geom type of the index map itself.

* The `dc_subject_sm` field in the index map's metadata should include "index map" (in addition to other keywords relevant to the underlying data collection).

* The `dc_source_sm` field in the metadata records of the underlying data should should reference the index map, since the index map can be seen as a "source dataset" that offers a guide to the broader collection.

### Committing GeoBlacklight Index Maps to the OpenIndexMaps Github repository

Once you have generated your index map and its associated metadata, the index map must go "live" on the web. There are different ways to pursue the task of making an index map go "live", but the recommended approach is to commit the map/GeoJSON to OpenIndexMaps' [Github Repository](https://github.com/OpenIndexMaps), which facilitates the discovery and sharing of index maps across institutions.

Once your map has been committed to your OpenIndexMaps repository, you will want to take the url for the map's blob ("blob" stands for binary large object, which is an object that contains the contents of your file), and add this information back to your GeoBlacklight metadata record (in particular, you'll want to add this information to the `dct_references_s` section).

To get the blob url, click the "Raw" link on your map's Github page, and copy the url of the page to which you are taken upon clicking this link.

The `dct_references_s` section of the index map's GeoBlacklight metadata contains relevant external links, and are organized as a serialized JSON array of key/value pairs (for more information on this section in the GeoBlacklight metadata schema, see [here](https://github.com/geoblacklight/geoblacklight/blob/master/schema/schema-commentary.md)). In this case, the blob url which you copied (above) will be the value associated with the OpenIndexMaps url (which is the key).

The following site, from the GeoBlacklight team at [NYU](https://github.com/NYULibraries/sdr-documentation/blob/master/metadata-management.md#Adding-a-key-value-URL-in-the-references-field-to-one-or-more-records), provides a script that adds references to existing GeoBlacklight metadata records. This script can be adapted to add the OpenIndexMaps/Blob-url key-value pair into the metadata's `dct_references_s` section.

## Switching the default basemap

GeoBlacklight comes with a default open-source basemap, Carto's Positron, but it is possible to switch to one of the [seven baselayers supported within the GeoBlacklight application](http://bl.ocks.org/Xatpy/raw/854297419bd7eb3421d0/). They are:

* Dark Matter
* Positron
* Positron Lite
* World Antique
* World Eco
* Flat Blue
* Midnight Commander

In order to toggle between them, all you need to do is go to the [catalog-controller.rb](https://github.com/geoblacklight/geoblacklight/blob/master/lib/generators/geoblacklight/templates/catalog_controller.rb) file in your application and replace the config.basemap_provider value. The valid values are in the comments above this line as a helpful reminder.

## Adding support for item images

### GeoBlacklight Sidecar Images
The [GeoBlacklight Sidecar Images](https://github.com/geoblacklight/geoblacklight_sidecar_images) plugin adds support for harvesting remote images from geographic web services.

#### Requirements

GBL Sidecar Images requires:

* [Ruby on Rails 5.2](https://weblog.rubyonrails.org/releases/)
* [ImageMagick](https://github.com/ImageMagick/ImageMagick)

A background job processor like [Sidekiq](https://github.com/mperham/sidekiq) is optional, but highly recommended.

#### Example Screenshot
![Screenshot](https://github.com/geoblacklight/geoblacklight_sidecar_images/blob/develop/screenshot.png)

#### Installation and Use

See the [plugin project repo](https://github.com/geoblacklight/geoblacklight_sidecar_images) for full installation and use documentation.

## Adding Mirador IIIF Manifest Viewer

### Mirador

[Mirador](https://projectmirador.org/) is an open source IIIF image and IIIF manifest viewer. Core GeoBlacklight contributors (Jack!) have contributed significantly to Mirador and the new Mirador v3 release (currently in alpha).

### Install

Add the Mirador 3 javascript and stylesheet assets to your project. If you are using Yarn, you can just add mirador via:

```bash
yarn add mirador@^3.0.0-alpha.16
```

Or you can edit your package.json file like so, and run:

```json
  ...
  "dependencies": {
    "@babel/cli": "^7.5.5",
    "@babel/core": "^7.5.5",
    "@rails/webpacker": "^4.0.7",
    "babel-loader": "^8.0.6",
    "bloodhound-js": "^1.2.3",
    "bootstrap": "^4.3.1",
    "jquery": "^3.4.0",
    "mirador": "^3.0.0-alpha.16",
    "readmore-js": "^3.0.0-beta-1",
    "typeahead.js": "^0.11.1",
    "lodash": "^4.17.13",
    "lodash.template": "^4.5.0"
  }

```

```bash
yarn install
```

### Configure

With Mirador installed, you need to add the javascript library to your application.

application.js
```javascript

// Mirador
//= require mirador/dist/mirador.min.js

```

### Add a GeoBlacklight Viewer

Within app/assets/javascripts/geoblacklight/viewers add a new iiif_manifest.js viewer, and specify your Mirador [configuration values](https://github.com/ProjectMirador/mirador/blob/master/src/config/settings.js).

```javascript
//= require geoblacklight/viewers/viewer

GeoBlacklight.Viewer.IiifManifest = GeoBlacklight.Viewer.extend({
  load: function() {
    var manifest_uri = document.getElementById('map').getAttribute('data-url');

    var miradorInstance = Mirador.viewer({
       id: 'map',
       themes: {
         light: {
           palette: {
             type: 'light',
             primary: {
               main: '#0088ce',
             },
           },
         },
       },
       windows: [{
         manifestId: manifest_uri,
         thumbnailNavigationPosition: 'far-bottom',
       }],
       window: {
         hideSearchPanel: false,
         hideWindowTitle: true,
         hideAnnotationsPanel: true,
         allowClose: false,
         allowMaximize: false,
         allowFullscreen: true,
       },
       workspace: {
         showZoomControls: true,
       },
       workspaceControlPanel: {
         enabled: false,
       }
     });
  }
});
```

Override the GeoBlacklight ItemViewer to add support for your iiif_manifest viewer. In the B1G Geoportal we keep our local ItemViewer customizations in [config/initializers/item_viewer.rb](https://github.com/BTAA-Geospatial-Data-Project/geoportal/blob/a03fdf91ed968167878ad0fec0cc07121768906e/config/initializers/item_viewer.rb)

```ruby
module Geoblacklight
  class ItemViewer
    def initialize(references)
      @references = references
    end

    def viewer_protocol
      return 'map' if viewer_preference.nil?
      viewer_preference.keys.first.to_s
    end

    def viewer_endpoint
      return '' if viewer_preference.nil?
      viewer_preference.values.first.to_s
    end

    def wms
      @references.wms
    end

    def iiif
      @references.iiif
    end

    # HERE - Added viewer
    def iiif_manifest
      @references.iiif_manifest
    end

    def tiled_map_layer
      @references.tiled_map_layer
    end

    def dynamic_map_layer
      @references.dynamic_map_layer
    end

    def feature_layer
      @references.feature_layer
    end

    def image_map_layer
      @references.image_map_layer
    end

    def index_map
      @references.index_map
    end

    # HERE - also need to specify viewer preference
    def viewer_preference
      [index_map, wms, iiif, iiif_manifest, tiled_map_layer, dynamic_map_layer,
       image_map_layer, feature_layer].compact.map(&:to_hash).first
    end
  end
end
```

### Enjoy!

Add a [IIIF Manifest-based fixture to your spec fixtures](https://raw.githubusercontent.com/BTAA-Geospatial-Data-Project/geoportal/develop/spec/fixtures/solr_documents/b1g_iiif_manifest_book.json) and reload the application (rake geoblacklight:server).

## Accessing Raster and Vector Layers in GeoPackages

### OGC GeoPackage
[GeoPackage](http://www.geopackage.org/) is an encoding standard specified and maintained by the [Open Geospatial Consortium](http://www.opengeospatial.org/), primarily directed towards the structure of SQLite geodatabases.  As the GeoPackage standard provides standardization for vector features, tile matrix sets, and raster maps, it may be used as a container for either [vector or raster spatial data sets](https://www.ordnancesurvey.co.uk/support/understanding-gis/raster-vector.html).

Librarians or curators are responsible for the data imported into GeoBlacklight, and as such, this application  cannot disambiguate between GeoPackages and other (non-compliant) SQLite geodatabases.  The [GeoBlacklight schema](https://github.com/geoblacklight/geoblacklight/blob/master/schema/geoblacklight-schema.md#format) does provide one with the ability to provide a “GeoPackage” value to the `dc_format_s` field.

### GIS Web Services
GeoPackages may be rendered using the layer viewer by providing the URL of a standard Web Map Service ([WMS](http://www.opengeospatial.org/standards/wms)) or Web Feature Service ([WFS](http://www.opengeospatial.org/standards/wfs)) within the `dct_references_s` field of [the schema](https://github.com/geoblacklight/geoblacklight/blob/master/schema/geoblacklight-schema.md#format).

#### GeoServer Support
For those who are currently using GeoServer in order to provide access to these data sets, the documentation outlines the process for uploading data sets and extracting [vector](http://docs.geoserver.org/latest/en/user/data/vector/geopkg.html) or [raster](http://docs.geoserver.org/latest/en/user/data/raster/geopkg.html) layers.  Further, there also exists a [plugin](http://docs.geoserver.org/latest/en/user/community/geopkg/) which permits one to export vector or raster data layers into GeoPackages (please see [further documentation outlining the extended WMS/WFS output formats](http://docs.geoserver.org/stable/en/user/community/geopkg/output.html)).
Unfortunately (as stated above), exporting into GeoPackage in GeoServer requires that one install a plugin.  Only reading is supported by GeoServer core.

#### ArcMap and ArcGIS Pro Support
For those using Esri's ArcMap, the process of connecting to a GeoPackage data source is identical to that of connecting to any SQLite database: https://desktop.arcgis.com/en/arcmap/latest/manage-data/databases/connect-sqlite.htm.  This is the case also for users of ArcGIS Pro: https://pro.arcgis.com/en/pro-app/help/data/databases/work-with-sqlite-databases-in-arcgis-pro.htm

## Adding SVG Icons

### Adding SVGs

Adding new SVGs to GeoBlacklight or your local GBL application:

1. Add your new or replacement SVG icon into the app/assets/images/blacklight directory
1. Write the :en I18n translation entry for the SVG aria label via:

```yaml
    ...
      blacklight:
        icon:
          arrow-circle-down: Arrow within a circle, pointing down (icon)
          baruch-cuny: Baruch College (logo)
          new-icon-filename: New icon descriptive text
```

Render your new SVG icon using the blacklight_icon helper like so:

```erb
<%= blacklight_icon('icon-filename') %>
```


### Accessibility

Each SVG in GeoBlacklight has an aria-labelledby value, example:

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 32" aria-label="University of California, Berkeley">
  <title>
    University of California, Berkeley
  </title>
...
```

### SVG Icon Maintenance

The stock GeoBlacklight SVG icons come from institutional partners and Font Awesome. The [IcoMoon App](https://icomoon.io/app/#/select) was used to generate a working project board of icons.

To view the IcoMoon project board:

1. Visit https://icomoon.io/app/#/select
1. Drag and drop the geoblacklight-icons.json file onto the page

Now you'll see all icons in the project. You can add additional icons, change the default color value, or export to other formats here, ex. PNGs.

<img width="1032" alt="Screen Shot 2019-08-09 at 11 02 51 AM" src="https://user-images.githubusercontent.com/69827/62792672-6641ea00-ba95-11e9-9b02-155d962527b3.png">

## Rendering line breaks or HTML from the Description field

Blacklight includes a helper_method argument for catalog_controller.rb field configuration. You can use that helpful technique to output whatever you need from the solr field value.

An example for adding line breaks and even HTML to a dc_description_s field would work like this:

1) Add a custom helper for presenting the data, using Rails' [simple_format](https://api.rubyonrails.org/v6.0.3.2/classes/ActionView/Helpers/TextHelper.html#method-i-simple_format) helper

```ruby
# ApplicationHelper / application_helper.rb

def render_html_description(args)
  simple_format(Array(args[:value]).flatten.join(' '))
end
```

2) Point the show field at your new helper_method

```ruby
# CatalogController / catalog_controller.rb

config.add_show_field Settings.FIELDS.DESCRIPTION, label: 'Description', itemprop: 'description', helper_method: :render_html_description
```

3) Example description value with line breaks ("\n\n") and some HTML markup, too:

```text
  "dc_description_s": "This table shows all 911 police emergency response and officer-initiated calls for service in the City of Detroit since September 20, 2016. Emergency response calls are the result of people calling 911 to request police services.\n\n Officer-initiated calls include traffic stops, street investigations and other policing activities (such as observing crimes in progress) where police officers initiate the response. The table includes all calls taken, dispatch, travel, and total response times for those calls serviced by a police agency. The data also include the responding agency, unit, call type and category of each call. Should you have questions about this dataset, you may contact the Commanding Officer of the Detroit Police Department's Crime Intelligence Unit at 313-596-2250 or <a href=\"mailto:CrimeIntelligenceBureau@detroitmi.gov\">CrimeIntelligenceBureau@detroitmi.gov</a>. ",
```

4) Now the show page will render like this

<img width="866" alt="Screen Shot 2020-08-06 at 3 30 38 PM" src="https://user-images.githubusercontent.com/69827/89579682-d47cd200-d7f9-11ea-8032-f77b3cc55a3f.png">

---
