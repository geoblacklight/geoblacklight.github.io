---
layout: tutorial-c4l
title:  GeoBlacklight Overview - Part 1 - GeoBlacklight Workshop"
date:   2015-02-09 14:59:00
categories: tutorial
author: 'Jack Reed'
author_link: 'https://twitter.com/mejackreed'
snippet: 'An overview of GeoBlacklight, its uses, and the technology stack. Created as part of a tutorial series given in a GeoBlacklight Workshop'
---

## GeoBlacklight Overview
  - [Why and what is GeoBlacklight?](#why-and-what-is-geoblacklight?)
  - Software [projects][geoblacklightproject] overview and technology 
  - GeoBlacklight feature set
  
### Why and what is GeoBlacklight?

GeoBlacklight is a [Ruby on Rails](http://rubyonrails.org) engine, based on the popular opensource project [Blacklight](http://projectblacklight.org/). The aim of the project is to provide a simple, effective open-source application for discovery of geospatial data. Many institutions (including [Stanford](https://earthworks.stanford.edu)) are using GeoBlacklight to provide a search engine across a federated catalog of geospatial data.

Discovery services and metadata have been key challenges for many organizations who provide geospatial data. GeoBlacklight hopes to build on the successes of projects like [OpenGeoPortal](http://opengeoportal.org) and [Blacklight](http://projectblacklight.org/) by integrating with an ecosystem of plugins and an already active developper community. Bridging the gap between the digital library and geospatial communities, GeoBlacklight aims to bring expertise from both fields to provide a better experience for finding geospatial data.


#### What do you mean by geospatial data?

We primarily mean Geographic Information Systems (GIS) data which are structured data in specific file formats (Shapefiles, Rasters, etc.). That is, GIS data you would be serving data through a spatial data infrastructure (SDI).

GeoBlacklight is flexible enough, however, to act as a discovery service for a variety of sources, but is designed for GIS data specifically.  Traditionally GIS and SDI software have not done great job at discovery and has always felt like an afterthought, thus the opportunity for GeoBlacklight to advance the state of GIS data discovery.

#### But I don't have a spatial data infrastructure?

That's ok. GIS data indexed into GeoBlacklight becomes progressively more useful based on the services that back them. For example, the minimum required metadata for GeoBlacklight is a bounding box and description, and no references to services that will actually provide that data are required. GeoBlacklight can also help with serving static files available through a URL. Moreover, GeoBlacklight also natively supports [IIIF](http://iiif.io/) objects so organizations who have IIIF servers for scanned maps can start using GeoBlacklight today.

[GeoBlacklight-Schema][geoblacklightschema] uses a field `dct_references_s` to define external services and references using the [CatInterOp](https://github.com/OSGeo/Cat-Interop) approach. `dct_references_s` contains a  serialized JSON array of key/value pairs, with keys representing XML namespace URI's and values the URL.

A GeoBlacklight-Schema example for `dct_references_s`:

```xml
<field name="dct_references_s">
  {
    "http://schema.org/url":"http://purl.stanford.edu/bb509gh7292",
    "http://schema.org/downloadUrl":"http://stacks.stanford.edu/file/druid:bb509gh7292/data.zip",
    "http://www.loc.gov/mods/v3":"http://purl.stanford.edu/bb509gh7292.mods",
    "http://www.isotc211.org/schemas/2005/gmd/":"http://opengeometadata.stanford.edu/metadata/edu.stanford.purl/druid:bb509gh7292/iso19139.xml",
    "http://www.w3.org/1999/xhtml":"http://opengeometadata.stanford.edu/metadata/edu.stanford.purl/druid:bb509gh7292/default.html",
    "http://www.opengis.net/def/serviceType/ogc/wfs":"https://geowebservices-restricted.stanford.edu/geoserver/wfs",
    "http://www.opengis.net/def/serviceType/ogc/wms":"https://geowebservices-restricted.stanford.edu/geoserver/wms"
  }
</field>
```

#### Types of external references and features they enable in GeoBlacklight

Type | Reference URI | Enables in GeoBlacklight
---- | ------------- | ------------------------
Web Mapping Service (WMS) | http://www.opengis.net/def/serviceType/ogc/wms | Layer preview, layer preview feature inspection, downloads (vector: KMZ, raster: GeoTIFF)
Web Feature Service (WFS) | http://www.opengis.net/def/serviceType/ogc/wfs | Vector downloads in GeoJSON and Shapefile
International Image Interoperability Framework (IIIF) Image API | http://iiif.io/api/image | Image viewer using [Leaflet-IIIF](https://github.com/mejackreed/Leaflet-IIIF)
Direct download file | http://schema.org/downloadUrl | Direct file download feature
Data dictionary / documentation download | http://lccn.loc.gov/sh85035852 | Direct documentation download link
Full layer description | http://schema.org/url | Further descriptive information about layer
Metadata in ISO 19139 | http://www.isotc211.org/schemas/2005/gmd/ | Structured metadata in ISO format
Metadata in MODS | http://www.loc.gov/mods/v3 | Structured metadata in MODS format
Metadata in HTML | http://www.w3.org/1999/xhtml | Structured metadata in HTML format
ArcGIS FeatureLayer | urn:x-esri:serviceType:ArcGIS#FeatureLayer| Previewing of ArcGIS FeatureLayer Service
ArcGIS TiledMapLayer | urn:x-esri:serviceType:ArcGIS#TiledMapLayer | Previewing of ArcGIS TiledMapLayer Service
ArcGIS DynamicMapLayer | urn:x-esri:serviceType:ArcGIS#DynamicMapLayer | Previewing of ArcGIS DynamicMapLayer Service
ArcGIS ImageMapLayer | urn:x-esri:serviceType:ArcGIS#ImageMapLayer | Previewing of ArcGIS ImageMapLayer Service

### Software projects

GeoBlacklight (the Ruby on Rails, Blacklight based application) is part of a larger effort to provide library services to geospatial data users. Several additional software augment GeoBlacklight and discovery capabilities.

 - [GeoBlacklight-Schema](https://github.com/geoblacklight/geoblacklight-schema) - the metadata schema used in GeoBlacklight
 - [GeoBlacklight-Icons](https://github.com/geoblacklight/geoblacklight-icons) - the custom icon font used in GeoBlacklight
 - [GeoMonitor](https://github.com/geoblacklight/geomonitor) - a WMS service monitor that provides atomic updates to Solr
 - [GeoBlacklight-Docker](https://github.com/geoblacklight/geoblacklight-docker) - Docker images for GeoBlacklight

#### Metadata Sharing

Worth mentioning is a new effort, [OpenGeoMetadata](https://github.com/OpenGeoMetadata), which aims to share geospatial metadata in an open and collaborative way. Instead of focusing on building an application that must be deployed at multiple institutions, OpenGeoMetadata uses Github as a common, highly available repository. Using Github as a platform allows for software development to focus on conversion tools and harvesting tools.

OpenGeoMetadata builds on the groundwork laid by the [OpenGeoPortal Metadata Working group](http://opengeoportal.org/working-groups/metadata/).

### GeoBlacklight Feature Set

GeoBlacklight extends the functionality of Blacklight by providing the following:

 - spatial search with a spatial relevancy algorithm
 - download functionality for geospatial web services
 - map view of search results
 - easily customizable
 - extendable to new types of data and functionality
 - and more...
 
<div class='flash-notice'> 
  <a href="{% post_url 2015-02-09-setting-up-your-environment %}">Next → Part 2 - Setting up your environment</a>
</div>

[geoblacklight]:        http://geoblacklight.org
[geoblacklightproject]: /projects/geoblacklight
[geoblacklightschema]:  https://github.com/geoblacklight/geoblacklight-schema
