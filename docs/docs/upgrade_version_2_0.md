
## Upgrading to GeoBlacklight 2.0

  While we suggest using the latest version of GeoBlacklight to take advantage of its modern features, sometimes you need to upgrade to an older release. GeoBlacklight 2.0 adds support for [Blacklight 7.0](https://github.com/projectblacklight/blacklight/releases/tag/v7.0.0), which itself includes several significant component upgrades:

  * [Bootstrap 4](https://getbootstrap.com/docs/4.0/getting-started/introduction/)
  * [Rails 5.2](https://guides.rubyonrails.org/5_2_release_notes.html) support
  * Webpacker support (see below)
  * JSON-API support
  * Solr 7.2+ support

  The Bootstrap 3 to Bootstrap 4 migration will require existing GeoBlacklight installations to update any local view or layout customizations they have created. See the [Blacklight guide on updating Bootstrap](https://github.com/projectblacklight/blacklight/wiki/Bootstrap-3-to-4-Migration-Guide) for additional assistance.

### Blacklight 7 upgrades

#### Update User Model
  With the release of Blacklight 7, the `Blacklight::Utils` Module has been deprecated.  `User` Models must have the following removed:
  
  ```ruby
  class User < ApplicationRecord
    ## Please remove or comment this code:
    ##
    # if Blacklight::Utils.needs_attr_accessible?
    #   attr_accessible :email, :password, :password_confirmation
    # end

    # Connects this user object to Blacklights Bookmarks.
    include Blacklight::User
    # Include default devise modules. Others available are:
    # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
    devise :database_authenticatable, :registerable,
           :recoverable, :rememberable, :validatable

    # Method added by Blacklight; Blacklight uses #to_s on your
    # user class to get a user-displayable login/identifier for
    # the account.
    def to_s
      email
    end
  end
  ```

#### Update CatalogController
  Release 2.0 provides the ability to request JSON representations of Solr Documents by using the  path `/catalog/:id/raw` In other words, append `/raw` to the end of a catalog URL stem. Note that this is different from previous versions of GeoBlacklight and is a result of Blacklight 7 incorporating a [JSON:API compliant](https://jsonapi.org) specification. Appending `.json` to the end of a catalog URL stem will now return a JSON:API compliant record, which is nested and not Solr compatible. For more information, see the [metadata documentation](https://opengeometadata.org/view-solr-metadata/).

  The JSON record return is enabled within the `CatalogController` by setting `config.raw_endpoint.enabled` to `true`:
  ```ruby
    configure_blacklight do |config|

      # Ensures that JSON representations of Solr Documents can be retrieved using
      # the path /catalog/:id/raw
      # Please see https://github.com/projectblacklight/blacklight/pull/2006/
      config.raw_endpoint.enabled = true

      ## Default parameters to send to solr for all search-like requests. See also SolrHelper#solr_search_params
      ## @see https://lucene.apache.org/solr/guide/6_6/common-query-parameters.html
      ## @see https://lucene.apache.org/solr/guide/6_6/the-dismax-query-parser.html#TheDisMaxQueryParser-Theq.altParameter
      config.default_solr_params = {
  ```

#### Webpacker
  Rails currently offers the ability for one to manage JavaScript source files and package dependencies using the [Webpacker Gem](https://github.com/rails/webpacker).  By default, this is available for usage in GeoBlacklight, but not enabled.

#### Requirements
  Webpacker requires that either [Yarn](https://yarnpkg.com/) or the [Node Package Manager](https://www.npmjs.com/) be installed in the environment where the GeoBlacklight implementation is deployed.

#### Installing Webpacker
  From within the root directory path of the GeoBlacklight application, please execute the following:
  ```
  bundle exec rails generate geoblacklight:webpacker --force
  ```

  This will create a number of directories and files, most notably:
  - `package.json`
  - `app/javascript/packs/application.js`

  Running `yarn install` or `npm install`, followed by `yarn upgrade`/`npm update` would be best in order to install and update any JavaScript dependencies.

##### Adding packs
  In order to add JavaScript packs to a GeoBlacklight application, one should override the view template `app/views/layouts/blacklight/base.html.erb` (provided in https://github.com/projectblacklight/blacklight/blob/v7.0.1/app/views/layouts/blacklight/base.html.erb) with the following line:
  ```ruby
      <%= javascript_include_tag "application" %>
      <%= javascript_pack_tag 'application' %>
      <%= csrf_meta_tags %>
      <%= content_for(:head) %>
    </head>
  ```

  For any new JS file added to `app/javascript/packs`, this will need to be added with a different name.  For example, `app/javascript/packs/my_new_script.js` would be added with:
  ```ruby
      <%= javascript_include_tag "application" %>
      <%= javascript_pack_tag 'application' %>
      <%= javascript_pack_tag 'my_new_script' %>
      <%= csrf_meta_tags %>
      <%= content_for(:head) %>
    </head>
  ```

##### Running the Webpack server
  Release 2.0 uses the [Foreman Gem](https://rubygems.org/gems/foreman/) in order to run both the Rails server and Webpack development server in parallel.  This is useful for development environments where the Webpack dev. server listens for source file changes, and automatically recompiles packs.  A file (named `Procfile`) within the root path of the application should be created with the following content:
  ```
  rails: bin/rails server --port=3000
  webpack: bin/webpack-dev-server
  ```

  This can then be executed using `bundle exec foreman start`.

  For deployments to testing, staging, or production environments, it is perhaps preferred to simply precompile the Webpack builds.  This can be achieved with the task `bundle exec rails webpacker:compile`

### GeoBlacklight updates

#### Dropped leaflet-rails; Vendorized a rails-savvy leaflet.js file

  To fix a Leaflet FeatureLayer asset path issue, we decided to remove leaflet-rails as a gem dependency. Instead of the gem, we're now using a slightly modified leaflet.js file in vendor/javascripts.

  For existing GBL installations, you will need to [remove the require leaflet-rails statement](https://github.com/geoblacklight/geoblacklight/commit/c65dab54a8b59f7a4a4c7c964fb2f21fd32657bb#diff-75f2c11ee17f1317e0fe69daff3dddb7) from lib/geoblacklight/engine.rb to avoid an error upon application restart.

#### Added Spatial Search BBox overlapRatio Relevancy Option

  A new Settings constant was added to provide optional support for [Solr's BBoxField overlapRatio](https://lucene.apache.org/solr/guide/7_6/spatial-search.html#bboxfield) relevancy boosting within spatial searches.

  For existing GBL installations, you will need to [add the Settings.OVERLAP_RATIO_BOOST](https://github.com/geoblacklight/geoblacklight/blob/master/lib/generators/geoblacklight/templates/settings.yml#L16-L17) setting to your settings.yml file.

  ```yml
      # The bf boost value for overlap ratio
      OVERLAP_RATIO_BOOST: '2'
  ```

  If this option has a value, the boost will be [appended to the spatial search](https://github.com/geoblacklight/geoblacklight/blob/master/app/models/concerns/geoblacklight/spatial_search_behavior.rb#L22-L26) like so:

  ```ruby
      if Settings.OVERLAP_RATIO_BOOST
        solr_params[:overlap] =
          "{!field uf=* defType=lucene f=solr_bboxtype score=overlapRatio}Intersects(#{envelope_bounds})"
        solr_params[:bf] = "$overlap^#{Settings.OVERLAP_RATIO_BOOST}"
      end
  ```

#### Relevancy is Best Tuned Locally

  Everyone's idea of relevancy is different. The default boost value here ("2") might not be the best for your collection or user needs. Please adjust this relevancy boost as necessary to ensure best results for your GBL install.



#### Homepage
  The `_homepage_text.html.erb` view partial has been updated to use a view component for rendering the featured facets feature. You should update any local customizations to this file to use the components.

---
