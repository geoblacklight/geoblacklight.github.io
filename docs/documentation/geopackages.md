
## Accessing Raster and Vector Layers in GeoPackages

### OGC GeoPackage
[GeoPackage](http://www.geopackage.org/) is an encoding standard specified and maintained by the [Open Geospatial Consortium](http://www.opengeospatial.org/), primarily directed towards the structure of SQLite geodatabases.  As the GeoPackage standard provides standardization for vector features, tile matrix sets, and raster maps, it may be used as a container for either [vector or raster spatial data sets](https://www.ordnancesurvey.co.uk/support/understanding-gis/raster-vector.html).

To indicate the download is a “GeoPackage”, add this term to the `dct_format_s` [OpenGeoMetadata schema](https://opengeometadata.org/ogm-aardvark/#format) field.

### GIS Web Services
GeoPackages may be rendered using the layer viewer by providing the URL of a standard Web Map Service ([WMS](http://www.opengeospatial.org/standards/wms)) or Web Feature Service ([WFS](http://www.opengeospatial.org/standards/wfs)) within the `dct_references_s` field of [the schema](https://opengeometadata.org/ogm-aardvark/#references).

#### GeoServer Support
For those who are currently using GeoServer in order to provide access to these data sets, the documentation outlines the process for uploading data sets and extracting [vector](http://docs.geoserver.org/latest/en/user/data/vector/geopkg.html) or [raster](http://docs.geoserver.org/latest/en/user/data/raster/geopkg.html) layers.  Further, there also exists a [plugin](http://docs.geoserver.org/latest/en/user/community/geopkg/) which permits one to export vector or raster data layers into GeoPackages (please see [further documentation outlining the extended WMS/WFS output formats](http://docs.geoserver.org/stable/en/user/community/geopkg/output.html)).
Unfortunately (as stated above), exporting into GeoPackage in GeoServer requires that one install a plugin.  Only reading is supported by GeoServer core.

#### ArcMap and ArcGIS Pro Support
For those using Esri's ArcMap, the process of connecting to a GeoPackage data source is identical to that of connecting to any SQLite database: https://desktop.arcgis.com/en/arcmap/latest/manage-data/databases/connect-sqlite.htm.  This is the case also for users of ArcGIS Pro: [https://pro.arcgis.com/en/pro-app/help/data/databases/work-with-sqlite-databases-in-arcgis-pro.htm
](https://pro.arcgis.com/en/pro-app/help/data/databases/work-with-sqlite-databases-in-arcgis-pro.htm)
