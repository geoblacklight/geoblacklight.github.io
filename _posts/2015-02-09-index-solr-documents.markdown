---
layout: tutorial-c4l
title:  Index Solr documents - Part 4 - GeoBlacklight Workshop"
date:   2015-02-09 14:56:00
categories: tutorial
author: 'Jack Reed'
author_link: 'https://twitter.com/mejackreed'
snippet: Index Solr documents into your GeoBlacklight application. Created as part of a tutorial series given in a GeoBlacklight Workshop'
---



## Index Solr documents
  1. [Overview](#overview)
  1. [Download fixture documents](#download-fixture-documents)
  1. [Index documents](#index-documents)

### Overview

GeoBlacklight uses the GeoBlacklight Schema, Version 1.0 as a template for metadata documents indexed by Solr.

GeoBlacklight provides a rake task to index documents as fixtures for tests. We will use this rake task to index several documents as an example.

### Download fixture metadata documents

  1. Assuming that you have already navigated to the directory of your GeoBlacklight app, create a directory for some Solr documents and then move to it:

     ```sh
     $ mkdir -p spec/fixtures/solr_documents && cd spec/fixtures/solr_documents
     ```

  1. Download some metadata documents (in JSON format) to the directory

     ```sh
     $ curl -O https://gist.githubusercontent.com/mejackreed/84abc598927c43af665b/raw/geoblacklight-documents.json
     ```

  1. Move back to app root directory

     ```sh
     $ cd - # Or cd ../../../
     ```

  1. Make sure your Solr server and Rails application are started.

     ```sh
     $ rake geoblacklight:server
     ```

  1. *Optional* Commit your work

     ```sh
     $ git add .
     $ git commit -m 'Adds in JSON fixtures'
     ```

The fixtures directory is useful for quickly indexing a small number documents in Solr (built specifically for populating Solr for testing). I would caution though in using this task for large scale indexing and committing, as we've developed other best practices for production-scale indexing.
{: .flash-alert}


Now you should see <a href="http://127.0.0.1:3000">facets listed</a> on the lower left hand part of the page. Try a search! You can <a href="http://127.0.0.1:3000/?q=*">search for *</a> to search for everything.
{: .flash-success}

Want to index some more documents? Check out [this tutorial]({% post_url 2015-02-05-using-geocombine-to-harvest-and-index-opengeometadata %}) on how to easily index metadata from OpenGeoMetadata.


<div class='flash-notice'>
  <a href="{% post_url 2015-02-09-customize-your-application %}">Next → Part 5 - Customize your application</a>
</div>
