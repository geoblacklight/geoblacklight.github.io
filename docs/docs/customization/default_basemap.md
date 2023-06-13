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
