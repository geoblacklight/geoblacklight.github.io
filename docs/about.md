---
hide:

---

GeoBlacklight is an open-source software application for discovering geospatial content, including GIS datasets, web services, and digitized paper maps.

## The GeoBlacklight Ecosystem

### Technical Core Stack

- GeoBlacklight: A [Ruby on Rails](https://rubyonrails.org/) engine 
- [Blacklight](https://projectblacklight.org/): A widely-used open-source discovery framework 
- [Apache Solr](https://solr.apache.org): Search index to make geospatial metadata searchable. 
- SQL database: For production uses, GeoBlacklight installations require an SQL database such as MySQL, MariaDB, or PostgreSQL. 

### External Services

One of GeoBlacklight's strengths is its ability to serve as a bridge to geospatial content hosted on various platforms, simplifying the way users find and interact with data. Instead of storing data directly, GeoBlacklight focuses on integrating with existing data repositories and web services.GeoBlacklight does this through providing useful preview, download, and exports of open standards-based services, including Web Mapping Services (WMS), Web Feature Services (WFS), ArcGIS Rest API, and International Image Interoperability Framework (IIIF). There is also support for externally referenced metadata viewing and file download support.

This includes offering previews, downloads, and access to data through web standards such as Web Mapping Services (WMS), Web Feature Services (WFS), the ArcGIS Rest API, and the International Image Interoperability Framework (IIIF). Additionally, GeoBlacklight enables supplemental metadata views and downloads.

Examples of technology providing external services:

- GeoServer:  previews and generated downloads via OGC Web Services
- ArcGIS Platforms:  previews via ArcGIS REST Services
- Various IIIF Servers:  previews and generated downloads of scanned images
- Digital Repositories: direct downloads of datasets and related files

### Metadata

GeoBlacklight uses the OpenGeoMetadata Aardvark Metadata Schema by default, which has been designed to privilege discovery use cases. It supports text searching, faceted searching and refinement, and spatial searching to improve relevance and findability of data.  [Visit OpenGeoMetadata for more information and full documentation.](https://opengeometadata.org) 

	
## Key  Features

* Text and spatial search with ranking
* Facet by institution, year, publisher, data type, access, format
* Facet by place, subject
* Results list view with icons, snippets, and map view of bounding boxes
* Spatial search on map in result list
* Detail map view for WMS features with feature inspection
* IIIF scanned map viewer
* Download the original file (Shapefile, GeoTIFF, GeoJSON, Esri Geodatabase, GeoPackage, or other SQLite database)
* Download generated Shapefile/GeoTIFF/KML/GeoJSON
* Built-in sample Solr 8.3+ index
* Built on top of [Blacklight platform](https://projectblacklight.org)
  * Search history
  * Bookmark layers
  * Share link via email
  * Sort by relevance, year, title
  * Customizable skin and facets
  

##  Technical Values


- Our core focus is **geospatial discovery**. This focus initially was limited to discretely catalogued data objects, but has expanded over time to include a wider range of information sources.

- We emphasize **end-user experience**, including inclusivity and accessibility in design features.

- We prioritize **stability** by semantically versioning our application releases and metadata schemas.

- We aim for GeoBlacklight to be **simple to adopt** and **easy to maintain**. We recognize that many adopters are in the cultural heritage space where metadata and software development resources can be limited.

- We make GeoBlacklight **customizable** for common use cases, and **extensible** to a plugin for a less-common use case.

- We leverage **existing communities**. Building on established standards gives us more bandwidth to focus on discovery and developing plugins.

- Excellent geospatial analysis and mapping tools already exist. Rather than build new ones in GeoBlacklight, we focus on **integration with these existing tools**.


## Connected Projects

The GeoBlacklight software stack consists of several open source software projects which work together to enable a better discovery experience. 

<div class="grid cards" markdown>

- ### GeoBlacklight 
	  
	GeoBlacklight is the main discovery interface for geospatial data. It is developed as a Ruby on Rails engine and built on top of the popular open-source discovery interface Blacklight.
  
- ### Dockerized GeoBlacklight  
	  
	Developers from Harvard University have created a built instance of GeoBlacklight in a Docker context. This will allow new and existing users to test and develop an instance of GeoBlacklight within the Docker environment.
  
	https://github.com/harvard-lts/GeoBlacklightDockerized

- ### OpenGeoMetadata
	  
	GeoBlacklight is built to use the OpenGeoMetadata schema, which is designed for GIS resource discovery and focuses mainly on discovery use cases. Text search, faceted search and refinement, and spatial search and relevancy are among the primary features that the schema enables.
	  
	https://opengeometadata.org

- ### OpenIndexMaps
	  
	A community format for sharing index maps in GeoBlacklight and a repository that hosts community-produced GeoJSON index maps that facilitate discovery within GeoBlacklight portals.
	  
	https://openindexmaps.org/
  
- ### GeoBlacklight Sidecar images
	  
	This GeoBlacklight plugin captures remote images from geographic web services and saves them locally. 
	  
	https://github.com/geoblacklight/geoblacklight_sidecar_images
  
- ### Geomonitor
	  
	GeoMonitor is a Ruby on Rails application used to monitor geowebservices. It was built out of the premise that users who are looking for and find data should actually be able to access and use it. The application is setup to periodically monitor WMS web services and log data on a layers availability.
	  
	https://github.com/geoblacklight/geo_monitor
  
</div>

