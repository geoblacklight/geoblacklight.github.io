---
date:   2015-02-05
categories: 
- tutorials
authors:
- Jack Reed
---

# Using GeoCombine to harvest and index OpenGeoMetadata

A quick tutorial on how to harvest and index OpenGeoMetadata for your GeoBlacklight installation.

<!-- more -->

!!! warning

	This tutorial from **2015** may be outdated. Please refer to the [GeoCombine repo](https://github.com/OpenGeoMetadata/GeoCombine) for up to date instructions.



Sharing, collaborating, and harvesting geospatial metadata is not really easy. A recent development in the world of geospatial metadata sharing is the new project [OpenGeoMetadata](https://github.com/OpenGeoMetadata). OpenGeoMetadata aims to be a shared repository for institutions looking to share, collaborate, and harvest geospatial metadata. For more details on how the project is structured and why we think this is really cool, [see this readme](https://github.com/OpenGeoMetadata/metadatarepository/blob/master/README.md).

We started work on software focused on harvesting, converting, and indexing this metadata called [GeoCombine](https://github.com/OpenGeoMetadata/GeoCombine).

## GeoCombine - A ruby toolkit for geospatial metadata

GeoCombine is envisioned as an easy to use toolkit for metadata conversions with integration into applications and projects like [GeoBlacklight](https://github.com/geoblacklight/geoblacklight), [GeoMonitor](https://github.com/geoblacklight/geomonitor), and OpenGeoMetadata.

Currently (as of 2015-02-05), GeoCombine really just does three things:

 - Clones OpenGeoMetadata repositories
 - Updates the local cloned repositories (using `git pull`)
 - Indexes into Solr `geoblacklight.xml` files from the cloned repositories

### Getting started

This guide assumes a few things already.

 - You have [Git](https://gorails.com/setup/#git) installed
 - You have [Ruby](https://gorails.com/setup/#ruby) installed
 - You have Solr running locally on port 8983 (default Solr port) and it is configured with [GeoBlacklight-Schema](https://github.com/geoblacklight/geoblacklight-schema/tree/master/conf) configuration


### Install GeoCombine

If you have already have a GeoBlacklight application, skip steps 1 and 2. You can just add <code>gem 'geo_combine'</code> to your GeoBlacklight application's <code>Gemfile</code>
{: .flash-notice}

  1. To get started, first clone the GeoCombine repository

     ```sh
     $ git clone https://github.com/OpenGeoMetadata/GeoCombine.git
     ```

  1. Switch to its folder

     ```sh
     $ cd GeoCombine
     ```

  1. Install GeoCombine's dependencies

     ```sh
     $ bundle install
     ```

  1. Create a `tmp` directory (if it doesn't already exist)

     ```sh
     $ mkdir tmp
     ```

  1. Clone all of the 'edu.*' repositories to tmp.

     ```sh
     $ rake geocombine:clone
     ```

     Since other software projects live in OpenGeoMetadata we only want to clone the metadata repositories. All of these are currently namespaced with "edu.institution.subdomain".
     {: .flash-notice}

  1. Index all of the `geoblacklight.xml` documents located in cloned repositories.

     ```sh
     $ rake geocombine:index
     ```

     Go grab a coffee or lunch, because this might take a while! But afterwards your index should have +30,000 new records in it.
