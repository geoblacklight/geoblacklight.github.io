# GeoBlacklight Quick Start
This guide covers getting up and running with GeoBlacklight.
After reading this guide, you will know:
 - How to install GeoBlacklight on your local computer.
 - How to create a new application.
 - How to add and index geospatial content.   

## Installation

  To bootstrap a new GeoBlacklight Rails application using the template:
```
$ DISABLE_SPRING=1 rails new app-name -m https://raw.githubusercontent.com/geoblacklight/geoblacklight/main/template.rb
```
  Then:
```
$ cd app-name
$ rake geoblacklight:server
```
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
