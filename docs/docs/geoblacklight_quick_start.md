# GeoBlacklight Quick Start

This guide covers the quickest way to get up and running with GeoBlacklight, including:

- How to create a new application.
- How to add and index geospatial content.

!!! warning "Required dependencies"
    Before getting started, make sure you have installed the [required dependencies listed on the Developers page](../developers#dependencies). You will also need the Ruby on Rails CLI installed for the `rails new` command:
    
    ```bash
    gem install rails
    ```

## Creating a new GeoBlacklight application

Bootstrap a new GeoBlacklight application using the template script, replacing `app-name` with the name of your new application:

```bash
rails new app-name -m https://raw.githubusercontent.com/geoblacklight/geoblacklight/main/template.rb -a propshaft --css bootstrap --js rollup
```

Then run the `geoblacklight:server` rake task to run the application:

```bash
cd app-name # replace with your app's name
bundle exec rake geoblacklight:server
```

- Visit your GeoBlacklight application at: [http://localhost:3000](http://localhost:3000)
- Visit the Solr admin panel at: [http://localhost:8983/solr/#/blacklight-core](http://localhost:8983/solr/#/blacklight-core)

!!! info "Using importmaps for JavaScript"

    The default GeoBlacklight template uses [Vite](https://vite-ruby.netlify.app/guide/rails.html) to bundle the application's JavaScript. If you would prefer to use Rails's default of [importmaps](https://github.com/rails/importmap-rails), you can set `--js importmap` when generating your application:

    ```bash
    rails new app-name -m https://raw.githubusercontent.com/geoblacklight/geoblacklight/main/template.rb -a propshaft --css bootstrap --js importmap
    ```

## Index Example Data

With your Solr server and Rails server already running (via the `geoblacklight:server` rake task above), open a new terminal window and index the GeoBlacklight project's test fixtures via:

```bash
bundle exec rake "geoblacklight:index:seed[:remote]"
```
