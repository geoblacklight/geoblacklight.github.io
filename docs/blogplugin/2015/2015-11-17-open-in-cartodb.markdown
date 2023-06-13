---
layout: post
title:  "Open in CartoDB, now in GeoBlacklight"
date:   2015-11-17 12:00:00
categories: blog
author: 'Jack Reed'
author_link: 'https://twitter.com/mejackreed'
description: 'Open in CartoDB was recently added to GeoBlacklight.'
---

One of the primary goals of GeoBlacklight is to make finding geospatial data a simple, pleasant experience for end users. By removing visualization and analysis features, we can focus on discovery and getting our users quicker access to data they need. A recent enhancement to GeoBlacklight furthers this goal by providing a painless way for users to import public data into [CartoDB](https://cartodb.com).
  
CartoDB is an open source [software as a service application](https://en.wikipedia.org/wiki/Software_as_a_service) for visualization and analysis of geospatial data. CartoDB recently introduced an [import API](https://cartodb.com/open-in-cartodb/) which allows applications to provide their users a way to import data directly into their CartoDB account. "Open in CartoDB" was first implemented in [Data.gov](http://blog.cartodb.com/data-gov/) and we were excited to add the same functionality in GeoBlacklight. This feature in GeoBlacklight is implemented using the [Blacklight document actions framework](https://github.com/projectblacklight/blacklight/wiki/Adding-new-document-actions).

Integrating with CartoDB was quite painless. One of the best parts of working on open source and integrating with an open company like CartoDB was we were able to provide feedback directly to developers who work on their platform. They were able to improve their product quickly (which improves our user's experience) which allowed this feature to come in so quickly.

<img src="../images/cartodb-github.jpg">

You can checkout "Open in CartoDB" now in [EarthWorks](https://earthworks.stanford.edu/catalog/stanford-hq627gh2501) by viewing this Natural Earth dataset. We are interested in [hearing your feedback](https://groups.google.com/forum/#!forum/geoblacklight-working-group) about this. The "Open in CartoDB" feature is enabled for all of the public datasets in EarthWorks.

<img src="../images/open-in-cartodb-button.jpg">