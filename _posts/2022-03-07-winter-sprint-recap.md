---
layout: post
title: GeoBlacklight Community Sprint Recap, Winter 2022
date: 2022-03-08 12:00:00
categories: blog | sprint
author: 
- Karen Majewicz
- Eric Larson (screenshots)
snippet: 'The 2022 GeoBlacklight Community Winter Codesprint Outcomes'
---
## Overview and outcomes

The latest GeoBlacklight Community Sprint took place from February 14-25, 2022. Long time GeoBlacklight sprinters have noted that this was likely our most productive event and undoubtedly featured the most participants.

Here are links to five tangible outcomes that we developed during the two-week sprint:

1. Production release of [GeoBlacklight, version 3.6.0](https://github.com/geoblacklight/geoblacklight/releases/tag/v3.6.0)
1. Release candidate of [GeoBlacklight, version 4.0.0-rc1](https://github.com/geoblacklight/geoblacklight/releases/tag/v4.0.0-rc1)
1. New metadata website: [opengeometadata.org](https://opengeometadata.org)
1. Migrated guides for GeoBlacklight development: [geoblacklight.org/guides](https://geoblacklight.org/guides)
1. New version of [GeoCombine](https://github.com/OpenGeoMetadata/GeoCombine/releases/tag/v0.6.0)

## Highlights
Our sprinters worked on numerous activities during the production of these outcomes, both individually and in subgroups. Here are a few highlights:

### New locations for documentation
All documentation for the GeoBlacklight application has been moved from the GitHub Wiki. Information about GeoBlacklight, development, and customization can now be found on the [Guides section of this website](https://geoblacklight.org/guides.html). All metadata documentation (both early schemas and the newer Aardvark) has been migrated to [opengeometadata.org](https://opengeometadata.org).

### New metadata website & tools
Last year, our community developed a new metadata schema for GeoBlacklight, lovingly called Aardvark. This new schema is a significant change:  it takes into account interoperability and the unique characteristics of geodata & maps, so we decided to begin promoting it as an all-purpose discovery schema for geospatial resources. To that end, we launched a new website, [opengeometadata.org](https://opengeometadata.org) that includes detailed schema documentation, guides, and examples. 

We also released a new update of [GeoCombine](https://github.com/OpenGeoMetadata/GeoCombine), a tool within OpenGeoMetadata for updating and converting metadata. This update includes improvements in (1) how it harvests from OpenGeoMetadata repositories and (2) the transformation template for FGDC to HTML. 

### Spatial geometry for search and display
We finally cracked a long-standing problem while enabling a long-desired enhancement at the same time. 

* **Problem:** bounding boxes that crossed the antimeridian would appear flipped or backward in search previews. 
* **Desired enhancement:** to be able to display complex or multiple geometries in search previews instead of just a single bounding box.
* **Our solution:** We were able to incorporate a new set of metadata fields that can use any kind of WKT POLYGON or MULTIPOLYGON for display and searches. This enhancement was built with Geo3D for Solr and opens up the possibilities for what kind of geometries the metadata can feature. This also solves the antimeridian problem, as the metadata can now have two adjacent bounding boxes that will display correctly. 
![multiple-bounding-boxes](/images/multiple-bbox.png)


### Accessibility & user interface (UI) improvements
We improved the layout of the item pages in the default GeoBlacklight user interface in a few ways:

1. The map preview is now above the metadata
2. Web services and downloads were converted from text links to "Call-to-Action" type buttons
3. Updated the index map to use a more accessible color palette and adds an index.


![web0services-button](/images/web-services-button.png)
![index-map-color](/images/index-map-color.png)

### Blacklight + future alignment plans
We have made a more dedicated effort to align with our framework application, Blacklight. During the sprint, we collaborated with Blacklight developers to clear up deprecation warnings and to remove an override customization used for bounding boxes. 

We also decided on a future plan to remove JQUERY dependencies to be consistent with Blacklight and allow us to eventually upgrade to Bootstrap 5. This will also involve rewriting our JavaScript code using the more modern version, known as 'ES6'.

## Future plans
- Over the next six months, selected institutions will **test the release candidate 4.0**, which includes full Aardvark metadata support and all of the new features developed during the sprint. 
- We plan to schedule a **dedicated documentation sprint** that will include a broad cross-section of skills within our community.

---
For even more details, view our [running notes](https://docs.google.com/document/d/11WH53ZQma51AbkYmBPEJkZAsX9sIj5dl-_cSlbTDE3Q/edit?usp=sharing) from the daily standups and the GitHub projects boards for [development](https://github.com/geoblacklight/geoblacklight/projects/19) and [metadata](https://github.com/orgs/OpenGeoMetadata/projects/1).