## Configuring Index Maps for Use in GeoBlacklight


### Index Maps: Introduction

The 2020 Geo4LibCamp featured a [workshop](https://kgjenkins.github.io/openindexmaps-workshop/) on index maps that provides useful information if you are new to index maps and want a basic primer. Many of the links below will lead you to relevant parts of this workshop.

For a conceptual introduction to index maps (i.e. what are index maps anyway?), see this [explanation](https://kgjenkins.github.io/openindexmaps-workshop/index-maps).

Here are examples of "live" index maps hosted within the GeoBlacklight instances of [Cornell](https://cugir.library.cornell.edu/catalog/cugir-008187) and [Stanford](https://earthworks.stanford.edu/catalog/stanford-qb865wf0229).  

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

Here are some recommendations to keep in mind when generating metadata for index maps:

* The Geometry Type/Resource Type field (`layer_geom_type_s` in Metadata 1.0 or `gbl_resourceType_sm` in OpenGeoMetadata Aardvark) in the index map's metadata record should reflect the geometry type of the scanned map, aerial photo, LiDAR dataset etc. (i.e. the underlying data for which the index map serves as a contextual guide). It should not indicate the geom type of the index map itself.

* The Subject field (`dc_subject_sm` or `dct_subject_sm)`) in the index map's metadata should include "index map" (in addition to other keywords relevant to the underlying data collection).

* The Source field (`dc_source_sm` or `dct_source_sm`) in the metadata records of the underlying data should should reference the index map, since the index map can be seen as a "source dataset" that offers a guide to the broader collection.

### Committing GeoBlacklight Index Maps to the OpenIndexMaps Github repository

Once you have generated your index map and its associated metadata, the index map must go "live" on the web. There are different ways to pursue the task of making an index map go "live", but the recommended approach is to commit the map/GeoJSON to OpenIndexMaps' [Github Repository](https://github.com/OpenIndexMaps), which facilitates the discovery and sharing of index maps across institutions.

Once your map has been committed to your OpenIndexMaps repository, you will want to take the url for the map's blob ("blob" stands for binary large object, which is an object that contains the contents of your file), and add this information back to your GeoBlacklight metadata record (in particular, you'll want to add this information to the `dct_references_s` section).

To get the blob url, click the "Raw" link on your map's Github page, and copy the url of the page to which you are taken upon clicking this link.

The `dct_references_s` section of the index map's GeoBlacklight metadata contains relevant external links, and are organized as a serialized JSON array of key/value pairs (for more information on this section in the GeoBlacklight metadata schema, see [here](https://opengeometadata.org/configure-external-links/)). In this case, the blob url which you copied (above) will be the value associated with the OpenIndexMaps url (which is the key).

The following site, from the GeoBlacklight team at [NYU](https://github.com/NYULibraries/sdr-documentation/blob/master/metadata-management.md#Adding-a-key-value-URL-in-the-references-field-to-one-or-more-records), provides a script that adds references to existing GeoBlacklight metadata records. This script can be adapted to add the OpenIndexMaps/Blob-url key-value pair into the metadata's `dct_references_s` section.
