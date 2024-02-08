# Add Mirador IIIF Manifest Viewer

## What is Mirador?

[Mirador](https://projectmirador.org/) is an open source IIIF image and IIIF manifest viewer. Core GeoBlacklight contributors have contributed significantly to Mirador. Learn more on the [Project Mirador website](https://projectmirador.org).

## Install

Add the Mirador 3 javascript and stylesheet assets to your project. If you are using Yarn, you can just add mirador via:

```bash
yarn add mirador
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
    "mirador": "^3.3.0",
    "readmore-js": "^3.0.0-beta-1",
    "typeahead.js": "^0.11.1",
    "lodash": "^4.17.13",
    "lodash.template": "^4.5.0"
  }

```

```bash
yarn install
```

## Configure

With Mirador installed, you need to add the javascript library to your application.

application.js
```javascript

// Mirador
//= require mirador/dist/mirador.min.js

```

## Add a GeoBlacklight Viewer

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

## Enjoy!

Add a [IIIF Manifest-based fixture to your spec fixtures](https://raw.githubusercontent.com/geobtaa/geoportal/develop/test/fixtures/files/btaa_documents/b1g_iiif_manifest_book.json) and reload the application (rake geoblacklight:server).
