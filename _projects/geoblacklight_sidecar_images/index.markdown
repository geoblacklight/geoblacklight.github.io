---
layout: project
title: "GeoBlacklight Sidecar Images"
github: https://github.com/geoblacklight/geoblacklight_sidecar_images
snippet: Store local copies of remote imagery in GeoBlacklight
---
This GeoBlacklight plugin captures remote images from geographic web services and saves them locally. It borrows the concept of a [SolrDocumentSidecar](https://github.com/projectblacklight/spotlight/blob/master/app/models/spotlight/solr_document_sidecar.rb) from [Spotlight](https://github.com/projectblacklight/spotlight), to have an ActiveRecord-based "sidecar" to match each non-AR SolrDocument. This allows us to use [ActiveStorage](https://github.com/rails/rails/tree/main/activestorage) to attach images to our solr documents.
