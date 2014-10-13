---
layout: project
title: "GeoBlacklight"
github: https://github.com/geoblacklight/geoblacklight
---
GeoBlacklight is the main discovery interface for geospatial data. It is developed as a Ruby on Rails engine and built on top of the popular open-source discovery interface [Blacklight](http://www.projectblacklight.org).

GeoBlacklight consumes the OpenGeoportal shared metadata catalog enabling discovery of thousands of datasets.

The application is structured as a Ruby on Rails Engine which allows for adopters of GeoBlacklight to easily upgrade to new releases of the software with minimal loss of local customizations.

**Current features include:**

  - Unique shareable urls for data and searches
    - Share a dataset with colleagues or students
    - Customize views based off of certain search terms
  - Download in multiple formats
    - Shapefile
    - KMZ
    - Geotiff
  - Inspection of data before download
    - View a dataset's attribute table before downloading it
  - Responsive design
  - Spatial search
  - Easy to update, customize, and theme
     - GeoBlacklight uses semantic versioning to provide a sane upgrade path
     - Uses [Twitter Bootstrap](http://getbootstrap.com) for easy SASS theming
     
**Participating:**

We welcome contributions to this project and we are always looking for new development partners. 

To follow the conversation, join the [geoblacklight-working-group mailing list](https://groups.google.com/forum/#!forum/geoblacklight-working-group)

Our source code is available via the [geoblacklight page on github](https://github.com/geoblacklight/geoblacklight)

We use [gemnasium](https://gemnasium.com) to track our dependencies and stay on top of security vulnerabilities. If you'd like to receive our gemnasium alerts, subscribe to the [geoblacklight-ops google group](https://groups.google.com/forum/#!forum/geoblacklight-ops).

You can see our continuous integration build status and history at [our travis-ci page](https://travis-ci.org/geoblacklight/geoblacklight).