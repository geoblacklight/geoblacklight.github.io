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

To create a new application, you can use the `template.rb` file. The options provided at the time you invoke `rails new` depend on your asset management choices.

!!! warning "Choosing an asset pipeline"
    It's not trivial to switch your app from one asset strategy to another after creation, so choose based on your needs. For more information on using a bundler vs. importmaps, check out the [Rails docs on choosing an asset pipeline](https://guides.rubyonrails.org/working_with_javascript_in_rails.html#choosing-between-import-maps-and-a-javascript-bundler).

### Using Vite for assets

This approach uses [vite-rails](https://vite-ruby.netlify.app/guide/rails.html) to bundle all of the app's javascript and styles. Presuming you want your app to be in a directory `app-name`, you initialize a new app with:

```
ASSET_PIPELINE=vite rails new app-name -m https://raw.githubusercontent.com/geoblacklight/geoblacklight/refs/heads/release-4.x/template.rb -a propshaft --css bootstrap --js rollup
```

### Using importmaps and dartsass-rails for assets

This approach uses Rails's default of [import maps](https://guides.rubyonrails.org/working_with_javascript_in_rails.html#import-maps) for javascript and dart sass for compiling SCSS.

Presuming you want your app to be in a directory `app-name`, you initialize a new app with:

```bash
ASSET_PIPELINE=importmap rails new app-name -m https://raw.githubusercontent.com/geoblacklight/geoblacklight/refs/heads/release-4.x/template.rb -a propshaft --css bootstrap --js importmap
```

## Running the application

You can run the `geoblacklight:server` rake task to run the application:

```bash
cd app-name # replace with your app's name
bundle exec rake geoblacklight:server
```

This will also spin up a solr instance for you via Docker and seed it with example fixture data.

- Visit your GeoBlacklight application at: [http://localhost:3000](http://localhost:3000)
- Visit the Solr admin panel at: [http://localhost:8983/solr/#/blacklight-core](http://localhost:8983/solr/#/blacklight-core)

## Index Example Data

With your Solr server and Rails server already running (via the `geoblacklight:server` rake task above), open a new terminal window and index the GeoBlacklight project's test fixtures via:

```bash
bundle exec rake "geoblacklight:index:seed[:remote]"
```
