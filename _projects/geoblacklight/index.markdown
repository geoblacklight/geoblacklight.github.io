---
layout: project
title: "GeoBlacklight"
github: https://github.com/geoblacklight/geoblacklight
snippet: A discovery application for geospatial data, built on Blacklight and Ruby on Rails
---
<div class = "browsers index">
  <div class = "browser">
    <div class="browser-top-bar">
      <div class="browser-circle"></div>
      <div class="browser-circle"></div>
      <div class="browser-circle"></div>
  </div>
  <div class="browser-content"></div>
  </div>
  <div class = "browser">
    <div class="browser-top-bar">
      <div class="browser-circle"></div>
      <div class="browser-circle"></div>
      <div class="browser-circle"></div>
    </div>
    <div class="browser-content">
    </div>
  </div>
  <div class = "browser">
    <div class="browser-top-bar">
      <div class="browser-circle"></div>
      <div class="browser-circle"></div>
      <div class="browser-circle"></div>
  </div>
  <div class="browser-content"></div>
  </div>
</div>

GeoBlacklight is the main discovery interface for geospatial data. It is developed as a Ruby on Rails engine and built on top of the popular open-source discovery interface [Blacklight](http://www.projectblacklight.org).

GeoBlacklight consumes the OpenGeoportal shared metadata catalog enabling discovery of thousands of datasets.

The application is structured as a Ruby on Rails Engine which allows for adopters of GeoBlacklight to easily upgrade to new releases of the software with minimal loss of local customizations.

Current features include:

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
     
  