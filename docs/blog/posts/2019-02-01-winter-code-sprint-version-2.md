---
date: 2019-02-01
categories:
- sprints
authors:
  - Karen Majewicz
---

# GeoBlacklight 2.0 is Here!


Developers from Princeton, NYU, Cornell, and the University of Minnesota participated in a two-week [GeoBlacklight Winter Codesprint](https://github.com/geoblacklight/geoblacklight/projects/3) that resulted in a major new version, [GeoBlacklight 2.0](https://github.com/geoblacklight/geoblacklight/releases/tag/v2.0.0). This version is compatible with the latest release of the underlying framework, Blacklight 7, which itself includes several significant component upgrades for [Bootstrap 4](https://getbootstrap.com/docs/4.0/getting-started/introduction/) and [Rails 5.2](https://guides.rubyonrails.org/5_2_release_notes.html) support. [Visit the GeoBlacklight 2.0 Upgrade Guide](https://geoblacklight.org/guides.html#upgrading-to-geoblacklight-20) for more information.

<!-- more -->

### Notable enhancements for GeoBlacklight 2.0

* SPATIAL SEARCH RELEVANCY: A long standing [issue](https://github.com/geoblacklight/geoblacklight/issues/324) was addressed that implements a bounding box ratio relevancy strategy for the map search. This means that items that most closely fit the selected map extent will rise to the top of the search results.

* INDEX MAPS: Developers from Cornell University led the effort during the to improve several aspects of how GeoBlacklight handles [OpenIndexMaps](https://openindexmaps.org/). This [enhancement](https://github.com/geoblacklight/geoblacklight/pull/759) includes selected feature highlighting, a download link for the selected feature, and adjustments to the layout of the attribute table.

* SEARCH SUPPRESSION: This offers a method for handling parent-child records that suppresses child records in a search query. For example, an atlas with hundreds of records representing individual pages would only show up once in the search results. The pages are then accessed from the parent record entry.

* METADATA DOCUMENTATION: In an effort to provide guidance for new and existing GeoBlacklight metadata authors, we have added a new document, [Schema Commentary](https://github.com/geoblacklight/geoblacklight/blob/master/schema/schema-commentary.md), that discusses how several elements in the [GeoBlacklight 1.0 Metadata Schema](https://github.com/geoblacklight/geoblacklight/blob/master/schema/geoblacklight-schema.md) interact with the application and recommendations from the GeoBlacklight community of practice.

Thanks to everyone who participated with code development and review. Consider joining us for the next!
