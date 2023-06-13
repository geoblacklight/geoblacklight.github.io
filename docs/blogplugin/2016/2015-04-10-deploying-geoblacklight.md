---
layout: post
title:  "Deploying GeoBlacklight"
date:   2015-04-10 12:00:00
categories: blog
author: Jack Reed
author_link: 'https://twitter.com/mejackreed'
snippet: 'What it takes to deploy GeoBlacklight'
---
At Stanford, we have been preparing to launch our new GeoBlacklight instance, [EarthWorks][earthworks]. Over the past few weeks we have had several questions from others about what it takes to deploy GeoBlacklight. This blog post hopes to address these questions. A follow up post will discuss enhancements to this scheme for added functionality.

## System Requirements

At its core, GeoBlacklight is a [Ruby on Rails][rubyonrails] application. It depends on having access to two things:

  - a [relational database](#relational-database)
    - usually [PostgreSQL][postgresql] or [MySQL][mysql]
    - used for storing session, bookmarks, and user data
  - a [Solr index](#solr-index)
    - used as the search engine for metadata

### Simple GeoBlacklight application architecture

<div class='center-image'>
  <img src='../images/simple-architecture.png'>
</div>

<hr>

### GeoBlacklight Application
EarthWorks is Stanford's deployment of GeoBlacklight.  Our virtualized VMWare infrastructure hosts the application on several load balanced virtual machines. Phusion Passenger and Apache httpd to serve the application from the vm's. This setup is pretty standard for Ruby on Rails applications in our infrastructure.

If you don't have a server to deploy the application on you have other options! Because GeoBlacklight is a Ruby on Rails application, there are many options available. You can deploy your application to [Heroku](https://devcenter.heroku.com/articles/getting-started-with-rails4), [Digital Ocean](https://www.digitalocean.com/community/tutorials/how-to-deploy-a-rails-app-with-passenger-and-nginx-on-ubuntu-14-04) or other hosting services.


### Relational database
At Stanford we use [PostgreSQL][postgresql] for our GeoBlacklight application. This can be [configured in the Ruby on Rails](http://guides.rubyonrails.org/configuring.html#configuring-a-database) application in the `config/database.yml` file. While we use PostgreSQL for [EarthWorks][earthworks] we also use [MySQL][mysql] for other projects. Blacklight and GeoBlacklight have deployments using PostgreSQL and MySQL. By default, the development environment of GeoBlacklight uses SQLite. SQLite is not recommended for production.

For a comparison between these relations databases, see [this extensive tutorial](https://www.digitalocean.com/community/tutorials/sqlite-vs-mysql-vs-postgresql-a-comparison-of-relational-database-management-systems) from Digital Ocean.

### Solr index
GeoBlacklight uses [Solr][solr] for as an index for advanced querying and faceting. Documents indexed into Solr need to be in the [geoblacklight-schema](https://github.com/geoblacklight/geoblacklight-schema/blob/master/docs/geoblacklight-schema.markdown) format. You can also configure your Solr deployment using the geoblacklight-schema [Solr configuration files](https://github.com/geoblacklight/geoblacklight-schema/tree/master/conf).


#### Solr version
GeoBlacklight requires Solr version 4.7 or later. This hard version rule is due to new [advanced spatial support](https://issues.apache.org/jira/browse/LUCENE-5395) introduced in this release.

#### Solr security
The GeoBlacklight software accesses Solr only from the server. This means that you can deploy your Solr server behind a firewall. The front end of the application should never query Solr directly.

## Wrap up
That's all that is needed for a basic GeoBlacklight deployment! I hope this is helpful as you plan your GeoBlacklight deployment. Coming soon, a post on enhancing your GeoBlacklight deployment by adding additional services.

#### Useful links:

##### Rails and Blacklight
 - [Understanding Rails and Blacklight](https://github.com/projectblacklight/blacklight/wiki/Understanding-Rails-and-Blacklight) from the Blacklight Wiki
 - [Configuring Rails Applications](http://guides.rubyonrails.org/configuring.html) from RailsGuides
 - [Getting Started with Rails 4.x on Heroku](https://devcenter.heroku.com/articles/getting-started-with-rails4) from Heroku
 - [How To Deploy a Rails App with Passenger and Nginx on Ubuntu 14.04](https://www.digitalocean.com/community/tutorials/how-to-deploy-a-rails-app-with-passenger-and-nginx-on-ubuntu-14-04) from Digital Ocean

##### Relational Databases
 - [SQLite vs MySQL vs PostgreSQL: A Comparison Of Relational Database Management Systems](https://www.digitalocean.com/community/tutorials/sqlite-vs-mysql-vs-postgresql-a-comparison-of-relational-database-management-systems) from Digital Ocean

##### Solr
 - [Solr configuration](https://github.com/projectblacklight/blacklight/wiki/Solr-Configuration) from the Blacklight Wiki
 - [How To Install Solr on Ubuntu 14.04](https://www.digitalocean.com/community/tutorials/how-to-install-solr-on-ubuntu-14-04) from Digital Ocean
 - [Spatial Search in Solr](https://cwiki.apache.org/confluence/display/solr/Spatial+Search) from the Solr Wiki

[solr]:                 http://lucene.apache.org/solr/
[mysql]:                https://www.mysql.com/
[postgresql]:           http://www.postgresql.org/
[earthworks]:           https://earthworks.stanford.edu
[geoblacklight]:        http://geoblacklight.org
[geoblacklightproject]: /projects/geoblacklight
[rubyonrails]:          http://rubyonrails.org/
[blacklight]:           http://projectblacklight.org/
[twitter]:              https://twitter.com/geoblacklight
[googlegroup]:          mailto:geoblacklight-working-group@googlegroups.com
