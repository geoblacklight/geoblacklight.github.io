# Homepage Map Centroid Clusters

!!! warning

	This kind of customization may potentially make your future GeoBlacklight upgrades more difficult. If you choose to implement this feature, you will need to be extra vigilant when GBL JavaScript files change in future releases.


Want your homepage map to display centroid clusters? You can customize GeoBlacklight to add support for that:

<img alt="homepage-centroid-visualization" src="https://user-images.githubusercontent.com/69827/190460417-861da2f8-9580-4903-8215-4dc10d7166cf.png"/>

## 1. Add a rake task to generate a centroids.json file

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

## 2. Install JavaScript Dependencies

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

## 3. Add our JavaScript changes for the Homepage Map

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

## 4. Add our Stylesheet changes for the Homepage Map

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
