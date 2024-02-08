# Upgrading to GeoBlacklight 4.0

There are several steps to complete this major release upgrade. Detailed notes follow for each of the following upgrade steps:

1. Gemfile
2. Apache Solr
3. Data Migration
4. Application Configuration
5. Application Changes

## 1. Gemfile
Update your `Gemfile` to GBL v4:

```ruby
  gem 'geoblacklight', '~> 4.0'
```

## 2. Apache Solr

**GeoBlacklight now requires Solr 8.3 or higher.**

GBL's Solr configuration files are updated to reflect the Aardvark metadata element list and support new complex geometries features. See the default versions of schema.xml and solrconfig.xml and update your local files as necessary.

* solr/config/schema.xml
* solr/config/solrconfig.xml

## 3. Data Migration

Migrate your Solr documents from the GBL v1.0 metadata standard to OGM Aardvark. GBL community documentation and migration tools are listed below:

* [OGM's Guide for Upgrading Metadata](https://opengeometadata.org/upgrade-metadata/)
* [Full GBL 1.0 to OGM Aardvark Crosswalk](https://opengeometadata.org/aardvark-gbl-1-crosswalk/)
* [Tools and Techniques for Upgrading](https://opengeometadata.org/scripts/)
* [gbl2aardvark: convert GeoBlacklight 1.0 json files to Aardvark
](https://kgjenkins.github.io/gbl2aardvark/)

## 4. Application Configuration
Review the configuration files for your GBL instance. You will need to update your `settings.yml` file and `catalog_controller.rb` file to use the new Aardvark field mappings. See the default versions of these files in GeoBlacklight v4 and alter your files as necessary:

You will also need to search your local application code for any old `Settings.FIELDS.(X)` mappings and update them as necessary.

### Settings

`config/settings.yml`

Many GBLv4 configuration changes take place in the `settings.yml` file.

List of GBLv4 [settings.yml](https://github.com/geoblacklight/geoblacklight/blob/main/lib/generators/geoblacklight/templates/settings.yml) changes:

* Solr field mappings: Settings.FIELDS
* GeoBlacklight Params: Settings.GBL_PARAMS
* Relationships to display: Settings.RELATIONSHIPS_SHOWN
* Parent/Child SVG Icon titles

#### Solr field mappings: Settings.FIELDS

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

#### GeoBlacklight Params

`Settings.GBL_PARAMS`

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

#### Relationships to display

`Settings.RELATIONSHIPS_SHOWN`

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

#### Parent/Child SVG Icon titles

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

#### Viewer Controls

`Settings.LEAFLET.VIEWERS.*.CONTROLS`

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

### CatalogController

`app/controllers/catalog_controller.rb`

Besides the `settings.yml` configuration changes above, the `catalog_controller.rb` file holds a great deal of application configuration and it needs to be updated for the new `Settings.FIELD` values.

It may be helpful to review the diff of changes to catalog_controller.rb from [v3.8.0 to v4.0.0](https://github.com/geoblacklight/geoblacklight/compare/v3.8.0...v4.0.0#diff-9e99abd5b848670740a1015f4d03aeaa747a747f0ae3cc3177d152975c017e81)

Here is a list of GBL v4 [catalog_controller.rb](https://github.com/geoblacklight/geoblacklight/blob/main/lib/generators/geoblacklight/templates/catalog_controller.rb) changes:

#### Default Solr Params

`config.default_document_solr_params`

This uses the Settings.FIELDS.ID field now.

```ruby
  ## Default parameters to send on single-document requests to Solr...
  config.default_document_solr_params = {
    :qt => 'document',
    :q => "{!raw f=#{Settings.FIELDS.ID} v=$id}"
  }
```

#### View Defaults

`config.view` defaults

Adds the "map" split view for catalog#index

```ruby
    # GeoBlacklight Defaults
    # * Adds the "map" split view for catalog#index
    config.view.split(partials: ['index'])
    config.view.delete_field('list')
```
#### Facet Fields 

`config.add_facet_field(s)`

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

#### GBL Application Facets

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

#### Item Relationship Facets

To display item-to-item relationships, add this block below:

```ruby
    # Item Relationship Facets
    # * Not displayed to end user (show: false)
    # * Must be present for relationship "Browse all 4 records" links to work
    # * Label value becomes the search contraint filter name
    config.add_facet_field Settings.FIELDS.MEMBER_OF, label: "Member Of", show: false
    config.add_facet_field Settings.FIELDS.IS_PART_OF, label: "Is Part Of", show: false
    config.add_facet_field Settings.FIELDS.RELATION, label: "Related", show: false
    config.add_facet_field Settings.FIELDS.REPLACES, label: "Replaces", show: false
    config.add_facet_field Settings.FIELDS.IS_REPLACED_BY, label: "Is Replaced By", show: false
    config.add_facet_field Settings.FIELDS.SOURCE, label: "Source", show: false
    config.add_facet_field Settings.FIELDS.VERSION, label: "Is Version Of", show: false
```

#### Index Fields 

`config.add_index_field(s)`

The "Index Fields" are the values that appear on search results lists. These have been mapped to Aardvark fields.

```ruby
    config.add_index_field Settings.FIELDS.INDEX_YEAR
    config.add_index_field Settings.FIELDS.CREATOR
    config.add_index_field Settings.FIELDS.DESCRIPTION, helper_method: :snippit
    config.add_index_field Settings.FIELDS.PUBLISHER
```

#### Show Fields 

`config.add_show_field(s)`

The "Show Fields" are the values that appear on an item detail page. These have been mapped to Aardvark fields, and many non-activated optional fields have been added to the default `catalog_controller.rb` file, too.

[View "Show Field" configuration online](https://github.com/geoblacklight/geoblacklight/blob/main/lib/generators/geoblacklight/templates/catalog_controller.rb#L153-L218)

#### Sort Fields 

`config.add_sort_field(s)`

The GBLv4 default sort fields options have been expanded. Here is the new default value for sorting:

```ruby
    config.add_sort_field 'score desc, dct_title_sort asc', :label => 'Relevance'
    config.add_sort_field "#{Settings.FIELDS.INDEX_YEAR} desc, dct_title_sort asc", :label => 'Year (Newest first)'
    config.add_sort_field "#{Settings.FIELDS.INDEX_YEAR} asc, dct_title_sort asc", :label => 'Year (Oldest first)'
    config.add_sort_field 'dct_title_sort asc', :label => 'Title (A-Z)'
    config.add_sort_field 'dct_title_sort desc', :label => 'Title (Z-A)'
```

#### Web Services Changes

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

#### Locales 

`config/locales/geoblacklight.en.yml`

We have added additional relations entries for GBLv4 [config/locales/geoblacklight.en.yml](https://github.com/geoblacklight/geoblacklight/blob/main/config/locales/geoblacklight.en.yml).

If you have local overrides or customizations to this file, please include the new relations entries locally.

## 5. Application Changes

### ApplicationController

`app/controllers/application_controller.rb`

GBL installer now includes a `before_action` method to permit GBL application params. You'll need to add this code to your application_controller.rb file:

```ruby
  before_action :allow_geoblacklight_params

  def allow_geoblacklight_params
    # Blacklight::Parameters will pass these to params.permit
    blacklight_config.search_state_fields.append(Settings.GBL_PARAMS)
  end
```

### Stylesheets 

`app/assets/stylesheets/application.scss`

GBL v4 no longer vendorizes the `leaflet-label` stylesheet. Check your local stylesheet files and remove any `*= require leaflet-label` or `@import 'leaflet-label';` lines.

```diff
- /*
- *= require leaflet-label
- */
```

### JavaScripts 

`app/assets/javascript/`

GBL v4 adds a new Leaflet control: [Leaflet.fullzoom](https://github.com/Leaflet/Leaflet.fullscreen). If you previously added this feature to your local GBL instance, you'll want to remove your custom implementation. This control can be added to your maps via the `settings.yml` file (see documentation above).

### Homepage
The `_homepage_text.html.erb` view partial has been updated to use a view component for rendering the featured facets feature. You should update any local customizations to this file to use the components.

```html
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
