
# Upgrading
This guide provides steps to be followed when you upgrade your applications to a newer version of GeoBlacklight.

## Upgrading to GeoBlacklight 4.0

**Please note: GeoBlacklight v4.0.0 is currently a pre-production, release candidate.** The B1G/BTAA Geoportal has been running GBLv4 in production for many months, so the codebase is quite stable. A final v4.0.0 release will be released in the near future (~August/September 2022).

### Upgrade Steps

There are several steps to complete this major release upgrade. Detailed notes follow for each of the following upgrade steps:

1. Gemfile
2. Apache Solr
3. Data Migration
4. Application Configuration
5. Application Changes

#### 1. Gemfile
Update your `Gemfile` to GBL v4:

```ruby
  gem 'geoblacklight', '~> 4.0'
```

#### 2. Apache Solr

**GeoBlacklight now requires Solr 8.3 or higher.**

GBL's Solr configuration files are updated to reflect the Aardvark metadata element list and support new complex geometries features. See the default versions of schema.xml and solrconfig.xml and update your local files as necessary.

* solr/config/schema.xml
* solr/config/solrconfig.xml

#### 3. Data Migration

Migrate your Solr documents from the GBL v1.0 metadata standard to OGM Aardvark. GBL community documentation and migration tools are listed below:

* [OGM's Guide for Upgrading Metadata](https://opengeometadata.org/docs/upgrading)
* [Full GBL 1.0 to OGM Aardvark Crosswalk](https://opengeometadata.org/docs/upgrading#full-crosswalk-table)
* [Tools and Techniques for Upgrading](https://opengeometadata.org/docs/upgrading#tools-and-techniques-for-upgrading)
* [gbl2aardvark: convert GeoBlacklight 1.0 json files to Aardvark
](https://kgjenkins.github.io/gbl2aardvark/)

#### 4. Application Configuration
Review the configuration files for your GBL instance. You will need to update your `settings.yml` file and `catalog_controller.rb` file to use the new Aardvark field mappings. See the default versions of these files in GeoBlacklight v4 and alter your files as necessary:

You will also need to search your local application code for any old `Settings.FIELDS.(X)` mappings and update them as necessary.

##### Settings (config/settings.yml)
Many GBLv4 configuration changes take place in the `settings.yml` file.

List of GBLv4 [settings.yml](https://github.com/geoblacklight/geoblacklight/blob/main/lib/generators/geoblacklight/templates/settings.yml) changes:

* Solr field mappings: Settings.FIELDS
* GeoBlacklight Params: Settings.GBL_PARAMS
* Relationships to display: Settings.RELATIONSHIPS_SHOWN
* Parent/Child SVG Icon titles

###### Solr field mappings: Settings.FIELDS

With the adoption of the OGM Aardvark metadata schema, we need to update all the `Settings.FIELDS` values for Aardvark. Here are the default GBLv4 values. If you have additional local customizations here, you'll need carry those over, too.

```yaml
# Solr field mappings
FIELDS:
  :ACCESS_RIGHTS: 'dct_accessRights_s'
  :ALTERNATIVE_TITLE: 'dct_alternative_sm'
  :CENTROID: 'dcat_centroid'
  :CREATOR: 'dct_creator_sm'
  :DATE_ISSUED: 'dct_issued_s'
  :DATE_RANGE: 'gbl_dateRange_drsim'
  :DESCRIPTION: 'dct_description_sm'
  :FORMAT: 'dct_format_s'
  :FILE_SIZE: 'gbl_fileSize_s'
  :GEOREFERENCED: 'gbl_georeferenced_b'
  :ID: 'id'
  :IDENTIFIER: 'dct_identifier_sm'
  :INDEX_YEAR: 'gbl_indexYear_im'
  :IS_PART_OF: 'dct_isPartOf_sm'
  :IS_REPLACED_BY: 'dct_isReplacedBy_sm'
  :THEME: 'dcat_theme_sm'
  :KEYWORD: 'dcat_keyword_sm'
  :LANGUAGE: 'dct_language_sm'
  :LAYER_MODIFIED: 'gbl_mdModified_dt'
  :LICENSE: 'dct_license_sm'
  :MEMBER_OF: 'pcdm_memberOf_sm'
  :METADATA_VERSION: 'gbl_mdVersion_s'
  :MODIFIED: 'gbl_mdModified_dt'
  :OVERLAP_FIELD: 'solr_bboxtype'
  :PUBLISHER: 'dct_publisher_sm'
  :PROVIDER: 'schema_provider_s'
  :REFERENCES: 'dct_references_s'
  :RELATION: 'dct_relation_sm'
  :REPLACES: 'dct_replaces_sm'
  :RESOURCE_CLASS: 'gbl_resourceClass_sm'
  :RESOURCE_TYPE: 'gbl_resourceType_sm'
  :RIGHTS: 'dct_rights_sm'
  :RIGHTS_HOLDER: 'dct_rightsHolder_sm'
  :SOURCE: 'dct_source_sm'
  :SPATIAL_COVERAGE: 'dct_spatial_sm'
  :GEOMETRY: 'locn_geometry'
  :SUBJECT: 'dct_subject_sm'
  :SUPPRESSED: 'gbl_suppressed_b'
  :TEMPORAL_COVERAGE: 'dct_temporal_sm'
  :TITLE: 'dct_title_s'
  :VERSION: 'dct_isVersionOf_sm'
  :WXS_IDENTIFIER: 'gbl_wxsIdentifier_s'
```

###### GeoBlacklight Params: Settings.GBL_PARAMS

Add the **GBL_PARAMS** array to `settings.yml` to whitelist the GBL application params so they are appended to controller methods and search builder queries.

```yaml
# Non-search-field GeoBlacklight application permitted params
GBL_PARAMS:
  - :bbox
  - :email
  - :file
  - :format
  - :id
  - :logo
  - :provider
  - :type
  - :BBOX
  - :HEIGHT
  - :LAYERS
  - :QUERY_LAYERS
  - :URL
  - :WIDTH
  - :X
  - :Y
```

###### Relationships to display: Settings.RELATIONSHIPS_SHOWN

The number of item/parent/collection relationships supported within GBLv4 has grown considerably. Add these default values to support the new relationships. You can also add additional relationship keys, fields, and query_types to support local customizations.

```yaml
# Relationships to display
RELATIONSHIPS_SHOWN:
  MEMBER_OF:
    field: pcdm_memberOf_sm
    query_type: ancestors
    icon: nil
    label: geoblacklight.relations.member_of
  PART_OF_ANCESTORS:
    field: dct_isPartOf_sm
    query_type: ancestors
    icon: nil
    label: geoblacklight.relations.part_of_ancestors
  PART_OF_DESCENDANTS:
    field: dct_isPartOf_sm
    query_type: descendants
    icon: child-item
    label: geoblacklight.relations.part_of_descendants
  RELATION:
    field: dct_relation_sm
    query_type: ancestors
    icon: nil
    label: geoblacklight.relations.relation
  REPLACES:
    field: dct_replaces_sm
    query_type: ancestors
    icon: nil
    label: geoblacklight.relations.replaces
  REPLACED_BY:
    field: dct_isReplacedBy_sm
    query_type: descendants
    icon: nil
    label: geoblacklight.relations.replaced_by
  SOURCE_ANCESTORS:
    field: dct_source_sm
    query_type: ancestors
    icon: parent-item
    label: geoblacklight.relations.ancestor
  SOURCE_DESCENDANTS:
    field: dct_source_sm
    query_type: descendants
    icon: child-item
    label: geoblacklight.relations.descendant
  VERSION_OF:
    field: dct_isVersionOf_sm
    query_type: descendants
    icon: nil
    label: geoblacklight.relations.version_of
```

###### Parent/Child SVG Icon titles

Replace these relationship icon file names.

```diff
SOURCE_ANCESTORS:
  field: dct_source_sm
  query_type: ancestors
- icon: pagelines-brands
+ icon: parent-item
  label: geoblacklight.relations.ancestor
SOURCE_DESCENDANTS:
  field: dct_source_sm
  query_type: descendants
- icon: leaf
+ icon: child-item
  label: geoblacklight.relations.descendant
VERSION_OF:
  field: dct_isVersionOf_sm
```

###### Viewer Controls: Settings.LEAFLET.VIEWERS.*.CONTROLS
GBLv4 includes native support for the `Leaflet.fullscreen` plugin. Update your Leaflet configuration to include the `Fullscreen` viewer option.

```yaml
# Settings for leaflet
LEAFLET:
  ...
  VIEWERS:
    DYNAMICMAPLAYER:
      CONTROLS:
        - 'Opacity'
        - 'Fullscreen'
    FEATURELAYER:
      CONTROLS:
        - 'Opacity'
        - 'Fullscreen'
    IIIF:
      CONTROLS:
        - 'Fullscreen'
    IMAGEMAPLAYER:
      CONTROLS:
        - 'Opacity'
        - 'Fullscreen'
    INDEXMAP:
      CONTROLS:
        - 'Fullscreen'
    TILEDMAPLAYER:
      CONTROLS:
        - 'Opacity'
        - 'Fullscreen'
    WMS:
      CONTROLS:
        - 'Opacity'
        - 'Fullscreen'
```

##### CatalogController (app/controllers/catalog_controller.rb)

Besides the `settings.yml` configuration changes above, the `catalog_controller.rb` file holds a great deal of application configuration and it needs to be updated for the new `Settings.FIELD` values.

Here is a list of GBL v4 [catalog_controller.rb](https://github.com/geoblacklight/geoblacklight/blob/main/lib/generators/geoblacklight/templates/catalog_controller.rb) changes:

###### Default Solr Params / config.default_document_solr_params

This uses the Settings.FIELDS.ID field now.

```ruby
  ## Default parameters to send on single-document requests to Solr...
  config.default_document_solr_params = {
    :qt => 'document',
    :q => "{!raw f=#{Settings.FIELDS.ID} v=$id}"
  }
```

###### View Defaults / config.view defaults

Adds the "map" split view for catalog#index

```ruby
    # GeoBlacklight Defaults
    # * Adds the "map" split view for catalog#index
    config.view.split(partials: ['index'])
    config.view.delete_field('list')
```
###### Facet Fields / config.add_facet_field(s)

These are all now mapped to Aardvark fields. Note: 'icon_facet' partials are now replaced by the `item_component: Geoblacklight::IconFacetItemComponent` 

```ruby
    # FACETS

    # DEFAULT FACETS
    # to add additional facets, use the keys defined in the settings.yml file
    config.add_facet_field Settings.FIELDS.INDEX_YEAR, :label => 'Year', :limit => 10
    config.add_facet_field Settings.FIELDS.SPATIAL_COVERAGE, :label => 'Place', :limit => 8
    config.add_facet_field Settings.FIELDS.ACCESS_RIGHTS, label: 'Access', limit: 8, item_component: Geoblacklight::IconFacetItemComponent
    config.add_facet_field Settings.FIELDS.RESOURCE_CLASS, label: 'Resource Class', :limit => 8
    config.add_facet_field Settings.FIELDS.RESOURCE_TYPE, label: 'Resource Type', :limit => 8
    config.add_facet_field Settings.FIELDS.FORMAT, :label => 'Format', :limit => 8
    config.add_facet_field Settings.FIELDS.SUBJECT, :label => 'Subject', :limit => 8
    config.add_facet_field Settings.FIELDS.THEME, :label => 'Theme', :limit => 8
    config.add_facet_field Settings.FIELDS.CREATOR, :label => 'Creator', :limit => 8
    config.add_facet_field Settings.FIELDS.PUBLISHER, :label => 'Publisher', :limit => 8
    config.add_facet_field Settings.FIELDS.PROVIDER, label: 'Provider', limit: 8, item_component: Geoblacklight::IconFacetItemComponent
    config.add_facet_field Settings.FIELDS.GEOREFERENCED, :label => 'Georeferenced', :limit => 3
```

###### GBL Application Facets

Our map-based search feature is now run via a series of (Geo)Blacklight class extensions which require this configuration:

```ruby
    # GEOBLACKLIGHT APPLICATION FACETS

    # Map-Based "Search Here" Feature
    # item_presenter       - Defines how the facet appears in the GBL UI
    # filter_query_builder - Defines the query generated for Solr
    # filter_class         - Defines how to add/remove facet from query
    # label                - Defines the label used in contstraints container
    config.add_facet_field Settings.FIELDS.GEOMETRY, item_presenter: Geoblacklight::BboxItemPresenter, filter_class: Geoblacklight::BboxFilterField, filter_query_builder: Geoblacklight::BboxFilterQuery, within_boost: Settings.BBOX_WITHIN_BOOST, overlap_boost: Settings.OVERLAP_RATIO_BOOST, overlap_field: Settings.FIELDS.OVERLAP_FIELD, label: 'Bounding Box'
```

###### Index Fields / config.add_index_field(s)

The "Index Fields" are the values that appear on search results lists. These have been mapped to Aardvark fields.

```ruby
    config.add_index_field Settings.FIELDS.INDEX_YEAR
    config.add_index_field Settings.FIELDS.CREATOR
    config.add_index_field Settings.FIELDS.DESCRIPTION, helper_method: :snippit
    config.add_index_field Settings.FIELDS.PUBLISHER
```

###### Show Fields / config.add_show_field(s)

The "Show Fields" are the values that appear on an item detail page. These have been mapped to Aardvark fields, and many non-activated optional fields have been added to the default `catalog_controller.rb` file, too.

[View "Show Field" configuration online](https://github.com/geoblacklight/geoblacklight/blob/main/lib/generators/geoblacklight/templates/catalog_controller.rb#L153-L218)

###### Sort Fields / config.add_sort_field(s)

The GBLv4 default sort fields options have been expanded. Here is the new default value for sorting:

```ruby
    config.add_sort_field 'score desc, dct_title_sort asc', :label => 'Relevance'
    config.add_sort_field "#{Settings.FIELDS.INDEX_YEAR} desc, dct_title_sort asc", :label => 'Year (Newest first)'
    config.add_sort_field "#{Settings.FIELDS.INDEX_YEAR} asc, dct_title_sort asc", :label => 'Year (Oldest first)'
    config.add_sort_field 'dct_title_sort asc', :label => 'Title (A-Z)'
    config.add_sort_field 'dct_title_sort desc', :label => 'Title (Z-A)'
```

###### Web Services Changes

Our web_services method is no longer a show tool partial. Migrating from GBLv3 to GBLv4, you will need to remove your `config.add_show_tools_partial :web_services...` line and add the new `def web_services` method:

[View new method online](https://github.com/geoblacklight/geoblacklight/blob/main/lib/generators/geoblacklight/templates/catalog_controller.rb#L341-L350)

```diff
  # Custom tools for GeoBlacklight
- config.add_show_tools_partial :web_services, if: proc { |_context, _config, options| options[:document] && (Settings.WEBSERVICES_SHOWN & options[:document].references.refs.map(&:type).map(&:to_s)).any? }
```

```ruby
  def web_services
    @response, @documents = action_documents

    respond_to do |format|
      format.html do
        return render layout: false if request.xhr?
        # Otherwise draw the full page
      end
    end
  end
```

###### Locales (config/locales/geoblacklight.en.yml)

We have added additional relations entries for GBLv4 [config/locales/geoblacklight.en.yml](https://github.com/geoblacklight/geoblacklight/blob/main/config/locales/geoblacklight.en.yml).

If you have local overrides or customizations to this file, please include the new relations entries locally.

#### 5. Application Changes

##### ApplicationController (app/controllers/application_controller.rb)
GBL installer now includes a `before_action` method to permit GBL application params. You'll need to add this code to your application_controller.rb file:

```ruby
  before_action :allow_geoblacklight_params

  def allow_geoblacklight_params
    # Blacklight::Parameters will pass these to params.permit
    blacklight_config.search_state_fields.append(Settings.GBL_PARAMS)
  end
```

##### Stylesheets (app/assets/stylesheets/application.scss)

GBL v4 no longer vendorizes the `leaflet-label` stylesheet. Check your local stylesheet files and remove any `*= require leaflet-label` or `@import 'leaflet-label';` lines.

```diff
- /*
- *= require leaflet-label
- */
```

##### JavaScripts (app/assets/javascript/)

GBL v4 adds a new Leaflet control: [Leaflet.fullzoom](https://github.com/Leaflet/Leaflet.fullscreen). If you previously added this feature to your local GBL instance, you'll want to remove your custom implementation. This control can be added to your maps via the `settings.yml` file (see documentation above).

##### Homepage
The `_homepage_text.html.erb` view partial has been updated to use a view component for rendering the featured facets feature. You should update any local customizations to this file to use the components.

```text
    <div class='col-sm'>
      <%= content_tag :h3, t('geoblacklight.home.category_heading') %>
      <div class='row'>
        <%= render(Geoblacklight::HomepageFeatureFacetComponent.new(icon: 'home', label: 'geoblacklight.home.institution', facet_field: Settings.FIELDS.PROVIDER, response: @response)) %>

        <%= render(Geoblacklight::HomepageFeatureFacetComponent.new(icon: 'arrow-circle-down', label: 'geoblacklight.home.data_type', facet_field: Settings.FIELDS.RESOURCE_TYPE, response: @response)) %>
      </div>
      <div class='row'>
        <%= render(Geoblacklight::HomepageFeatureFacetComponent.new(icon: 'globe', label: 'geoblacklight.home.placename', facet_field: Settings.FIELDS.SPATIAL_COVERAGE, response: @response)) %>

        <%= render(Geoblacklight::HomepageFeatureFacetComponent.new(icon: 'tags', label: 'geoblacklight.home.subject', facet_field: Settings.FIELDS.SUBJECT, response: @response)) %>
      </div>
    </div>
```

---

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
  Release 2.0 provides the ability to request JSON representations of Solr Documents by using the  path `/catalog/:id/raw` In other words, append `/raw` to the end of a catalog URL stem. Note that this is different from previous versions of GeoBlacklight and is a result of Blacklight 7 incorporating a [JSON:API compliant](https://jsonapi.org) specification. Appending `.json` to the end of a catalog URL stem will now return a JSON:API compliant record, which is nested and not Solr compatible. For more information, see the [metadata documentation](https://opengeometadata.org/docs/publishing-in-solr#view-solr-metadata-within-geoblacklight).

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
