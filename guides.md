---
layout: default
title: "Guides"
---
<h1>GeoBlacklight Guides</h1>
<hr>
<div markdown="1">
* table of contents
{:toc}

# What is GeoBlacklight?

GeoBlacklight is a world-class discovery platform for geospatial (GIS) holdings. It
is an open collaborative project aiming to build off of the successes
of the Blacklight Solr-powered discovery interface and the
multi-institutional OpenGeoportal federated metadata sharing
communities. We're actively looking for [community input and development partners](/connect.html).

## Features

* Text and spatial search with ranking
* Facet by institution, year, publisher, data type, access, format
* Facet by place, subject
* Results list view with icons, snippets, and map view of bounding boxes
* Spatial search on map in result list
* Detail map view for WMS features with feature inspection
* IIIF scanned map viewer
* Download the original file (Shapefile, GeoTIFF, GeoJSON, Esri Geodatabase, GeoPackage, or other SQLite database)
* Download generated Shapefile/GeoTIFF/KML/GeoJSON
* Built-in sample Solr 4.7+ index
* Built on top of [Blacklight platform](http://projectblacklight.org)
  * Search history
  * Bookmark layers
  * Share link via email
  * Sort by relevance, year, title
  * Customizable skin and facets

# GeoBlacklight Quick Start
This guide covers getting up and running with GeoBlacklight.
After reading this guide, you will know:
 - How to install GeoBlacklight on your local computer.
 - How to create a new application.
 - How to add and index geospatial content.   

## Installation

  To bootstrap a new GeoBlacklight Rails application using the template:

      $ DISABLE_SPRING=1 rails new app-name -m https://raw.githubusercontent.com/geoblacklight/geoblacklight/main/template.rb

  Then:

      $ cd app-name
      $ rake geoblacklight:server

## Configuration

  To configure your own instances of GeoBlacklight, follow these steps:

  1. Build a [Solr](http://lucene.apache.org/solr/) 4.7+ index with [geoblacklight-schema](https://github.com/geoblacklight/geoblacklight/blob/master/schema/geoblacklight-schema.md) documents. The [GeoCombine](https://github.com/OpenGeoMetadata/GeoCombine) project has converters from FGDC and ISO 19139 to GeoBlacklight. You can use these as a starting point to generate GeoBlacklight documents. Also, you can see examples of `geoblacklight.json` Solr documents in Stanford's [OpenGeoMetadata repository](http://github.com/OpenGeoMetadata/edu.stanford.purl) -- for example, [here](https://github.com/OpenGeoMetadata/edu.stanford.purl/blob/master/bc/899/yk/4538/geoblacklight.json).

  2. Configure your GeoBlacklight application's `config/blacklight.yml` to point to your Solr index.

  3. Configure your `config/environments/` and `app/controllers/catalog_controller.rb` as needed.

  4. `rails server` to run GeoBlacklight.

  **Please note: GeoBlacklight v4.0.0 is currently a pre-production, alpha release.** A final v4.0.0 release will be released in the future.

  ## Aardvark Metadata Schema by Default
  This release is the first to feature GeoBlacklight's new Aardvark metadata schema by default. Find additional information and details about Aardvark at [OpenGeoMetadata](https://opengeometadata.github.io/docs/aboutAardvark/).

---

# Getting Started for Developers

This guide covers:
After reading this guide, you will know:
 - How to install a local instance of GeoBlacklight for Development purposes.
 - How to make small changes to the application.
 - How to see how those changes look in a browser.   

For a more in-depth guide to development, see the [series of tutorials on the GeoBlacklight project website.](https://geoblacklight.org/tutorials.html)

## Dependencies

--------

Software you should have installed on your development computer
* Ruby > 2.6.6
* Rails > 6.0
* Git
* Java > 1.8 (Download JDK for local Solr server)
* Node.js > 14.15 LTS
* Yarn > 1.13

---------

## Installation for Development

To set up a working space, navigate to where you'd like to put your test GeoBlacklight app and then clone the repository
```
git clone git@github.com:geoblacklight/geoblacklight.git
```
Once the files are downloaded, run
```
bundle exec rake geoblacklight:server
```
This command executes everything needed to run a local version of GeoBlacklight. In order to see the version you have running, open a web browser and go to [http://localhost:3000/](http://localhost:3000/). You should be able to navigate around the site. Remember that your Rails server is running locally, so to stop it, run ^C (ctrl + c).

Refer to the Customization pages of the wiki for instructions on making look and feel changes. Refer to the Metadata section of the wiki for instructions on testing new records.

### Running Solr and Rails server separately

You may decide to run either the Solr server or Rails server separately. With Solr, for instance, run
```
rake geoblacklight:solr
```
Then, open another Terminal window, navigate to the place where your app is located, and run:
```
rake engine_cart:server
```
Once the server is running, you can open a web browser and visit the URL it prompts, usually [http://localhost:8983/solr/#/blacklight-core](http://localhost:8983/solr/#/blacklight-core) to see the admin interface of your test instance of Solr. As before, remember that ^C (ctrl + c) stops the server.

## Unit Testing

### Running all the tests
As you develop and make changes, you may want to run tests on parts of the app to see if any warning occur. You can run the following to test the app
```
rake ci
```
Note that a test like this could take up to 5-6 minutes to complete, or longer. Warnings, deprecations, and other messages will be printed on your Terminal screen.

### Running the tests separately
```
rake geoblacklight:solr
```
Then, in another terminal window:
```
rspec spec/
```
*Note:* It is not necessary to run tests after every change you make. You can, for instance, change the name of a facet field, save your file, and then refresh your browser to see the change. However, if you add a new fixture metadata record, you will have to stop the servers and then restart them so the new file will be indexed.

## Browser Testing

Cross-browser testing provided by:

<a href="https://www.browserstack.com/"><img src="https://user-images.githubusercontent.com/784196/43614155-d65e3f98-9677-11e8-8ecf-89f0746f91e0.png" width="150"></a>

## Helpful Development Tools

### Version Managers
Using version management tools for compatible versions of Ruby ([rvm](https://rvm.io/), [rbenv](http://rbenv.org/), [asdf](https://asdf-vm.com/)) and Node ([nvm](https://github.com/nvm-sh/nvm/blob/master/README.md), [asdf](https://asdf-vm.com/)) can make development easier.

#### asdf
Many developers like asdf because you can manage versions for Ruby and Node in a single utility. For developers who use asdf, it is helpful to add a `.tool-versions` file for each app.

Example:
```
ruby 2.7.5
nodejs 17.4.0
java openjdk-11.0.2
```
---
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
wget -O vendor/assets/javascripts/leaflet-search.js https://raw.githubusercontent.com/stefanocudini/leaflet-search/master/dist/leaflet-search.src.js
```
**Using `curl`**
```
curl -o vendor/assets/javascripts/leaflet-search.js https://raw.githubusercontent.com/stefanocudini/leaflet-search/master/dist/leaflet-search.src.js
```
**For Production Builds**
```
wget -O vendor/assets/javascripts/leaflet-search.js https://raw.githubusercontent.com/stefanocudini/leaflet-search/master/dist/leaflet-search.min.js
```
or
```
curl -o vendor/assets/javascripts/leaflet-search.js https://raw.githubusercontent.com/stefanocudini/leaflet-search/master/dist/leaflet-search.min.js
```

#### Downloading CSS Files
**`wget`**
```
wget -O vendor/assets/stylesheets/leaflet-search.css https://raw.githubusercontent.com/stefanocudini/leaflet-search/master/dist/leaflet-search.src.css

wget -O vendor/assets/stylesheets/leaflet-search.mobile.css https://raw.githubusercontent.com/stefanocudini/leaflet-search/master/dist/leaflet-search.mobile.src.css
```
**`curl`**
```
curl -o vendor/assets/stylesheets/leaflet-search.css https://raw.githubusercontent.com/stefanocudini/leaflet-search/master/dist/leaflet-search.src.css

curl -o vendor/assets/stylesheets/leaflet-search.mobile.css https://raw.githubusercontent.com/stefanocudini/leaflet-search/master/dist/leaflet-search.mobile.src.css
```
**Production Builds**
```
wget -O vendor/assets/stylesheets/leaflet-search.css https://raw.githubusercontent.com/stefanocudini/leaflet-search/master/dist/leaflet-search.min.css

wget -O vendor/assets/stylesheets/leaflet-search.mobile.css https://raw.githubusercontent.com/stefanocudini/leaflet-search/master/dist/leaflet-search.mobile.min.css
```
or
```
curl -o vendor/assets/stylesheets/leaflet-search.css https://raw.githubusercontent.com/stefanocudini/leaflet-search/master/dist/leaflet-search.min.css

curl -o vendor/assets/stylesheets/leaflet-search.mobile.css https://raw.githubusercontent.com/stefanocudini/leaflet-search/master/dist/leaflet-search.mobile.min.css
```

#### Downloading Image Files
```
wget -O app/assets/images/loader.gif https://github.com/stefanocudini/leaflet-search/raw/master/images/loader.gif
wget -O app/assets/images/search-icon-mobile.png https://github.com/stefanocudini/leaflet-search/raw/master/images/search-icon-mobile.png
wget -O app/assets/images/search-icon.png https://github.com/stefanocudini/leaflet-search/raw/master/images/search-icon.png
```
or
```
curl -o app/assets/images/loader.gif https://github.com/stefanocudini/leaflet-search/raw/master/images/loader.gif
curl -o app/assets/images/search-icon-mobile.png https://github.com/stefanocudini/leaflet-search/raw/master/images/search-icon-mobile.png
curl -o app/assets/images/search-icon.png https://github.com/stefanocudini/leaflet-search/raw/master/images/search-icon.png
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
# Upgrading
This guide provides steps to be followed when you upgrade your applications to a newer version of GeoBlacklight.

## Upgrading to GeoBlacklight 4.0

### Gemfile
  Upgrade your GeoBlacklight dependency to `4.0.0.pre.alpha.3`

### Data Migration
  Migrate your Solr documents from the GBLv1 metadata standard to Aardvark. Contact the GeoBlacklight community for assistance and access to migration tools still under development.

### Apache Solr
  GeoBlacklight's Solr configuration files are updated to support the Aardvark's metadata element list. See the default versions of schema.xml and solrconfig.xml and update your local files as necessary.

### Application Configuration
  Review the configuration files for your GBL instance. You will need to update your `settings.yml` file and `catalog_controller.rb` file to use the new Aardvark field mappings. See the default versions of these files in GeoBlacklight v4 and alter your files as necessary:

  You will also need to search your local application code for any old `Settings.FIELDS.X` mappings and update them as necessary.

### settings.yml
  List of GBL v4 [settings.yml](https://github.com/geoblacklight/geoblacklight/blob/main/lib/generators/geoblacklight/templates/settings.yml) changes:

  * Solr field mappings: Settings.FIELDS
  * Relationships to display: Settings.RELATIONSHIPS_SHOWN
  * Parent/Child SVG Icon titles (https://github.com/geoblacklight/geoblacklight/pull/1166/files)

### catalog_controller.rb

  List of GBL v4 [catalog_controller.rb](https://github.com/geoblacklight/geoblacklight/blob/main/lib/generators/geoblacklight/templates/catalog_controller.rb) changes:

  * config.default_document_solr_params / Using Settings.FIELDS.ID now
  * config.view defaults / Adds the "map" split view for catalog#index
  * config.add_facet_field(s) / Mapped to Aardvark fields
  * config.add_index_field(s) / Mapped to Aardvark fields
  * config.add_show_field(s) / Mapped to Aardvark fields, many non-activated optional fields added too
  * config.add_sort_field(s) / Mapped to Aardvark fields

#### locales

  List of GBL v4 [config/locales/geoblacklight.en.yml](https://github.com/geoblacklight/geoblacklight/blob/main/lib/generators/geoblacklight/templates/catalog_controller.rb) changes:

  * additional relations entries

## Upgrading to GeoBlacklight 2.0

  While we suggest using the latest version of GeoBlacklight to take advantage of its modern features, sometimes you need to upgrade to an older release. GeoBlacklight 2.0 adds support for [Blacklight 7.0](https://github.com/projectblacklight/blacklight/releases/tag/v7.0.0), which itself includes several significant component upgrades:

  * [Bootstrap 4](https://getbootstrap.com/docs/4.0/getting-started/introduction/)
  * [Rails 5.2](https://guides.rubyonrails.org/5_2_release_notes.html) support
  * Webpacker support (see below)
  * JSON-API support
  * Solr 7.2+ support

  The Bootstrap 3 to Bootstrap 4 migration will require existing GeoBlacklight installations to update any local view or layout customizations they have created. See the [Blacklight guide on updating Bootstrap](https://github.com/projectblacklight/blacklight/wiki/Bootstrap-3-to-4-Migration-Guide) for additional assistance.

### Blacklight 7 upgrades

#### Update User Model
  With the release of Blacklight 7, the `Blacklight::Utils` Module has been deprecated.  `User` Models must have the following removed:
  ```ruby
  class User < ApplicationRecord
    ## Please remove or comment this code:
    ##
    # if Blacklight::Utils.needs_attr_accessible?
    #   attr_accessible :email, :password, :password_confirmation
    # end

    # Connects this user object to Blacklights Bookmarks.
    include Blacklight::User
    # Include default devise modules. Others available are:
    # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
    devise :database_authenticatable, :registerable,
           :recoverable, :rememberable, :validatable

    # Method added by Blacklight; Blacklight uses #to_s on your
    # user class to get a user-displayable login/identifier for
    # the account.
    def to_s
      email
    end
  end
  ```

#### Update CatalogController
  Release 2.0 provides the ability to request JSON representations of Solr Documents by using the  path `/catalog/:id/raw` In other words, append `/raw` to the end of a catalog URL stem. Note that this is different from previous versions of GeoBlacklight and is a result of Blacklight 7 incorporating a [JSON:API compliant](https://jsonapi.org) specification. Appending `.json` to the end of a catalog URL stem will now return a JSON:API compliant record, which is nested and not Solr compatible. For more information, see the [metadata documentation on this wiki](https://github.com/geoblacklight/geoblacklight/wiki/GeoBlacklight-Metadata#viewing-metadata).

  The JSON record return is enabled within the `CatalogController` by setting `config.raw_endpoint.enabled` to `true`:
  ```ruby
    configure_blacklight do |config|

      # Ensures that JSON representations of Solr Documents can be retrieved using
      # the path /catalog/:id/raw
      # Please see https://github.com/projectblacklight/blacklight/pull/2006/
      config.raw_endpoint.enabled = true

      ## Default parameters to send to solr for all search-like requests. See also SolrHelper#solr_search_params
      ## @see https://lucene.apache.org/solr/guide/6_6/common-query-parameters.html
      ## @see https://lucene.apache.org/solr/guide/6_6/the-dismax-query-parser.html#TheDisMaxQueryParser-Theq.altParameter
      config.default_solr_params = {
  ```

#### Webpacker
  Rails currently offers the ability for one to manage JavaScript source files and package dependencies using the [Webpacker Gem](https://github.com/rails/webpacker).  By default, this is available for usage in GeoBlacklight, but not enabled.

#### Requirements
  Webpacker requires that either [Yarn](https://yarnpkg.com/) or the [Node Package Manager](https://www.npmjs.com/) be installed in the environment where the GeoBlacklight implementation is deployed.

#### Installing Webpacker
  From within the root directory path of the GeoBlacklight application, please execute the following:
  ```
  bundle exec rails generate geoblacklight:webpacker --force
  ```

  This will create a number of directories and files, most notably:
  - `package.json`
  - `app/javascript/packs/application.js`

  Running `yarn install` or `npm install`, followed by `yarn upgrade`/`npm update` would be best in order to install and update any JavaScript dependencies.

##### Adding packs
  In order to add JavaScript packs to a GeoBlacklight application, one should override the view template `app/views/layouts/blacklight/base.html.erb` (provided in https://github.com/projectblacklight/blacklight/blob/v7.0.1/app/views/layouts/blacklight/base.html.erb) with the following line:
  ```ruby
      <%= javascript_include_tag "application" %>
      <%= javascript_pack_tag 'application' %>
      <%= csrf_meta_tags %>
      <%= content_for(:head) %>
    </head>
  ```

  For any new JS file added to `app/javascript/packs`, this will need to be added with a different name.  For example, `app/javascript/packs/my_new_script.js` would be added with:
  ```ruby
      <%= javascript_include_tag "application" %>
      <%= javascript_pack_tag 'application' %>
      <%= javascript_pack_tag 'my_new_script' %>
      <%= csrf_meta_tags %>
      <%= content_for(:head) %>
    </head>
  ```

##### Running the Webpack server
  Release 2.0 uses the [Foreman Gem](https://rubygems.org/gems/foreman/) in order to run both the Rails server and Webpack development server in parallel.  This is useful for development environments where the Webpack dev. server listens for source file changes, and automatically recompiles packs.  A file (named `Procfile`) within the root path of the application should be created with the following content:
  ```
  rails: bin/rails server --port=3000
  webpack: bin/webpack-dev-server
  ```

  This can then be executed using `bundle exec foreman start`.

  For deployments to testing, staging, or production environments, it is perhaps preferred to simply precompile the Webpack builds.  This can be achieved with the task `bundle exec rails webpacker:compile`

### GeoBlacklight updates

#### Dropped leaflet-rails; Vendorized a rails-savvy leaflet.js file

  To fix a Leaflet FeatureLayer asset path issue, we decided to remove leaflet-rails as a gem dependency. Instead of the gem, we're now using a slightly modified leaflet.js file in vendor/javascripts.

  For existing GBL installations, you will need to [remove the require leaflet-rails statement](https://github.com/geoblacklight/geoblacklight/commit/c65dab54a8b59f7a4a4c7c964fb2f21fd32657bb#diff-75f2c11ee17f1317e0fe69daff3dddb7) from lib/geoblacklight/engine.rb to avoid an error upon application restart.

#### Added Spatial Search BBox overlapRatio Relevancy Option

  A new Settings constant was added to provide optional support for [Solr's BBoxField overlapRatio](https://lucene.apache.org/solr/guide/7_6/spatial-search.html#bboxfield) relevancy boosting within spatial searches.

  For existing GBL installations, you will need to [add the Settings.OVERLAP_RATIO_BOOST](https://github.com/geoblacklight/geoblacklight/blob/master/lib/generators/geoblacklight/templates/settings.yml#L16-L17) setting to your settings.yml file.

  ```yml
      # The bf boost value for overlap ratio
      OVERLAP_RATIO_BOOST: '2'
  ```

  If this option has a value, the boost will be [appended to the spatial search](https://github.com/geoblacklight/geoblacklight/blob/master/app/models/concerns/geoblacklight/spatial_search_behavior.rb#L22-L26) like so:

  ```ruby
      if Settings.OVERLAP_RATIO_BOOST
        solr_params[:overlap] =
          "{!field uf=* defType=lucene f=solr_bboxtype score=overlapRatio}Intersects(#{envelope_bounds})"
        solr_params[:bf] = "$overlap^#{Settings.OVERLAP_RATIO_BOOST}"
      end
  ```

#### Relevancy is Best Tuned Locally

  Everyone's idea of relevancy is different. The default boost value here ("2") might not be the best for your collection or user needs. Please adjust this relevancy boost as necessary to ensure best results for your GBL install.



#### Homepage
  The `_homepage_text.html.erb` view partial has been updated to use a view component for rendering the featured facets feature. You should update any local customizations to this file to use the components.

---

# Contributing to the project
GeoBlacklight is a collaborative open source project where contributions are :sparkles:welcome:sparkles:. This contributing guide is borrowed in part from the [Samvera Contributing Guide](https://github.com/samvera/hydra/blob/master/CONTRIBUTING.md) and the [Blacklight Contributing Wiki](https://github.com/projectblacklight/blacklight/wiki/Contributing-to-Blacklight).

## Who can contribute?
**Anyone** is welcome to contribute to GeoBlacklight. We follow a set of contribution practices to maintain a technically sustainable and stable software project for everyone.

## Reporting issues
Did you find a bug in GeoBlacklight or interested in a new feature? Make sure to add an issue for it in the [issue tracker](https://github.com/geoblacklight/geoblacklight/issues).

 - Make sure you have a [GitHub account](https://github.com/signup/free)
 - Submit a [GitHub issue](./issues) by:
    - Clearly describing the issue
    - Provide a descriptive summary
    - Explain the expected behavior
    - Explain the actual behavior
    - Provide steps to reproduce the actual behavior

## GeoBlacklight Software Versioning
GeoBlacklight follows the practice of [Semantic Versioning](https://semver.org/) for software releases. The declared semantically versioned public API includes:
 - the GeoBlacklight-Schema
 - the [public GeoBlacklight Ruby codebase classes](http://www.rubydoc.info/github/geoblacklight/geoblacklight/master/frames)
 - the GeoBlacklight JavaScript interface
 - the GeoBlacklight view interface

## Contributing code or documentation
GeoBlacklight welcomes code and documentation contributions. You do *not* need to be a "GeoBlacklight Committer" to contribute code or documentation. We follow the [pull request](https://help.github.com/articles/using-pull-requests/) model for contributing on GitHub. GeoBlacklight uses a suite of tests to express its features and protect from bugs:bug:.

When proposing major new features or changes that may introduce an API or schema change, please make sure to communicate with the [community](http://geoblacklight.org/connect) so the full implications are understood. Likely there are ways to introduce these changes in a backwards compatible way that others may be able to help with.

### Pull request overview
1. Fork it ( http://github.com/my-github-username/geoblacklight/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

### Merging Changes

- It is considered "poor form" to merge your own request.
- Please take the time to review the changes and get a sense of what is being changed. Things to consider:
  - Does the commit message explain what is going on?
  - Does the code changes have tests? _Not all changes need new tests, some changes are refactorings_
  - Do all new methods, modules, and classes have comments? Do changed methods, modules, and classes have comments?
  - Does the commit contain more than it should? Are two separate concerns being addressed in one commit?
  - Did the Travis tests complete successfully?
- If you are uncertain, bring other contributors into the conversation by creating a comment that includes their @username.
- If you like the pull request, but want others to chime in, create a +1 comment and tag a user.

If you wish to ask questions or participate further, email the [GeoBlacklight Working Group](https://groups.google.com/forum/#!forum/geoblacklight-working-group) at [geoblacklight-working-group@googlegroups.com](mailto:geoblacklight-working-group@googlegroups.com).

# DRAFT - GeoBlacklight Development Roadmap

The purpose of this roadmap is to document the next minor/point release of the GeoBlacklight web application codebase and the next major release of the software. GeoBlacklight uses [semantic versioning](https://semver.org/) to define its release versions.



## v4.0 - “Aardvark” - Next Release


*   Enhancement - GBLM v4 Aardvark metadata schema
*   Enhancement - Metadata crosswalk tools
*   Enhancement - New relationship views
*   Supersedes, etc.
*   Bug fix / Enhancement - Support for antimeridian wrapping / multiple geometries


## Future Development Goals

*   Sprockets v4+ support
*   View Component
*   Bootstrap v5 beta
*   JavaScript Updates
    *   Webpacker
    *   ES6


### Support Goals

Framework and dependency support goals for GeoBlacklight. We will do our best to maintain the software with these targets in mind. Base support goals are defined in the project’s testing matrix.

*   Web Framework / Ruby on Rails
    *   Support for last two major releases
        *   Rails 6.1 / 6.0
        *   Rails 5.2
*   Programming Language / Ruby
    *   Support for last two major releases
        *   Ruby 3.0
        *   Ruby 2.7
*   Umbrella Application / Blacklight
    *   Support for last two major releases
        *   Blacklight 7
        *   Blacklight 6
*   Browser Support
    *   Bootstrap v4
    *   Support Bootstrap supported browsers
        *   “Bootstrap supports the latest, stable releases of all major browsers and platforms. On Windows, we support Internet Explorer 10-11 / Microsoft Edge.”
*   Accessibility
    *   Fulfill WCAG 2.0 (A/AA/AAA), Section 508, and similar accessibility standards and requirements.
    *   VPAT document
