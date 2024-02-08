# Releases

GeoBlacklight release and technology dependency matrix.

|                                                                                                                                       | GBL v3 LTS                                                            | GBL v4 • Current Major Release                                        | GBL v5 • Next Major Release                                                                  |
| ------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Support Status                                                                                                                        | Released 2020; Ends 2025                                              | Released 2022; Ends 2026                                              | ETA 2024                                                                                     |
| [Metadata](https://opengeometadata.org/)                                                                                              | [GBL 1.0](https://opengeometadata.org/gbl-1.0)                   | [Aardvark](https://opengeometadata.org/ogm-aardvark)             | [Aardvark](https://opengeometadata.org/ogm-aardvark)                                    |
| [Ruby](https://www.ruby-lang.org/en/)                                                                                                 | v3+                                                                   | v3+                                                                   | v3.2+                                                                                        |
| [Ruby on Rails](https://rubyonrails.org/)                                                                                             | v6-v7                                                                 | v6-v7                                                                 | v7.0+                                                                                        |
| [Blacklight](http://projectblacklight.org/)                                                                                           | v7                                                                    | v7                                                                    | v8+                                                                                          |
| [Bootstrap](https://getbootstrap.com/)                                                                                                | [v4](https://getbootstrap.com/docs/4.6/getting-started/introduction/) | [v4](https://getbootstrap.com/docs/4.6/getting-started/introduction/) | [v5](https://getbootstrap.com/docs/5.3/getting-started/introduction/)                        |
| [ViewComponents](https://viewcomponent.org/)                                                                                          | Few                                                                   | Few                                                                   | Many                                                                                         |
| [](https://developer.mozilla.org/en-US/docs/Web/JavaScript)[JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) (JS) | [jQuery](https://jquery.com/) / ES5                                   | [jQuery](https://jquery.com/) / ES5                                   | ES6 (Modern JavaScript) Published to [NPM](https://www.npmjs.com/)                           |
| JS Map Library                                                                                                                        | [Leaflet](https://leafletjs.com/)                                     | [Leaflet](https://leafletjs.com/)                                     | TBD                                                                                          |
| [Asset Management](https://guides.rubyonrails.org/asset_pipeline.html)                                                                | Sprockets                                                             | Sprockets                                                             | Import Maps + Bundling                                                                       |
| [Apache Solr](https://solr.apache.org/)                                                                                               | <= v8                                                                 | v8-v9+                                                                | v9+                                                                                          |
| Production RDBMS                                                                                                                      | N/A                                                                   | N/A                                                                   | [PostgreSQL](https://www.postgresql.org/)                                                    |
| [Background Queue](https://guides.rubyonrails.org/active_job_basics.html)                                                             | N/A                                                                   | N/A                                                                   | [Sidekiq](https://sidekiq.org/) + [Redis](https://redis.io/)                                 |
| [GeoServer](https://geoserver.org/)                                                                                                   | Optional                                                              | Optional                                                              | Optional                                                                                     |

## Recommendations

### Metadata
* __Aardvark (Recommended)__
* GBL 1.0 (Deprecated)

### Ruby
* __3.2 (Recommended)__
* 2.7 / Support Ends 31 Mar 2023

### Ruby on Rails
* __7.0+ (Recommended)__
* 6.1
* 6.0 / Support Ends June 1, 2023

### Blacklight
* __v7+ (Recommended)__
* v8 / Will be supported in GBL v5+

### Bootstrap
* __v4 (Recommended)__
* v5 / Will be supported in GBL v5+

### ViewComponents
* __GBL v5 (Required)__
* GBL v4 (Recommended)

### Javascript
* __GBL v5 - ES6 / Modern Javascript (Required)__
* GBL v4 / jQuery + ES5 (Recommended)

### Map Library
* __Leaflet (Recommended)__
* TBD / GBL v5+

### Apache Solr
* __v9+ (Recommended)__
* <8.11 versions are End Of Life (EOL)

### Production RDBMS
* __PostgreSQL (Recommended)__
    - For potential adopters of GEOMG

### Background Queue
* _Not Required_
* __Sidekiq + Redis (Recommended)__
    - For potential adopters of GEOMG
    - Potential future GBL enhancement: Background Downloads

### GeoServer
* _Not Required_
* Used by many GeoBlacklight adopters: Harvard, Princeton, Stanford

