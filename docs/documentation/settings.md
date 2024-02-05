## Guide to Settings

A lot of configuration for your GeoBlacklight instance will be handled in the [settings.yml](https://github.com/geoblacklight/geoblacklight/blob/main/lib/generators/geoblacklight/templates/settings.yml) file.

Keep in mind, GeoBlacklight has reasonable defaults for all settings, so you do not need to change anything in order to get up and running. That said, you will *eventually* need to change *something*. Below is an annotated list of all variables in the settings file.

If you are developing a custom application, look for `config/settings.yml`. If you are working on the core GeoBlacklight codebase, the file is `lib/generators/geoblacklight/templates/settings.yml`.

!!! note
    Settings are implemented with the [config](https://github.com/rubyconfig/config) gem, and are available as properties of the `Settings` object throughout the application.

### `APPLICATION_LOGO_URL`

URL for logo image to be used in generated Carto OneClick links.

### `CARTO_ONECLICK_LINK`

Optional integration with [Carto OneClick Service](https://carto.com/engine/open-in-carto/).

### `ARCGIS_BASE_URL`

Used to view layers directly in ArcGIS online. More information in the [ArcGIS Online documentation](https://doc.arcgis.com/en/arcgis-online/reference/use-url-parameters.htm).

### `DOWNLOAD_PATH`

Local path used for temporary storage of generated download files.

### `BBOX_WITHIN_BOOST`

The SOLR [Boost Query](https://solr.apache.org/guide/6_6/the-dismax-query-parser.html) value for spatial search matches within a bounding box.

### `OVERLAP_RATIO_BOOST`

The SOLR [Boost Functions](https://solr.apache.org/guide/6_6/the-dismax-query-parser.html#TheDisMaxQueryParser-Thebf_BoostFunctions_Parameter) value for overlap ratio.

### `HOMEPAGE_MAP_GEOM`

Leave `null` to default to entire world, or add a stringified GeoJSON object to scope initial render of the map on the homepage of the application.

### `GBL_PARAMS`

Explicit list of whitelisted URL params that can be used within the application, enforced via Rails [StrongParameters](https://api.rubyonrails.org/classes/ActionController/StrongParameters.html).

!!! note
    If you are trying to use a new URL param within your app, you will need to register it here. You may see "unpermitted parameters" errors until you update this setting.

### `FIELDS`

All metadata fields are linked with their respective identifiers in the SOLR index in this hash. To learn more about the default GeoBlacklight metadata schema, Aardvark, view the [OGM Aardvark specification](https://opengeometadata.org/ogm-aardvark/).

### `INSTITUTION`

This setting should hold the name of your institution, and can be used to help determine access to restricted records. In some GeoBlacklight implementations, for example, when a restricted record's `schema_provider_s` field matches `Settings.INSTITUTION`, authenticated users will be granted full access.

### `METADATA_SHOWN`

Enables links for various metadata formats in the tool panel for a record if the corresponding URI key is present in that record's `dct_references_s` field.

### `TIMEOUT_DOWNLOAD`

(For external Download) `timeout` and `open_timeout` parameters for Faraday.

### `TIMEOUT_WMS`

(For WMS inspection) `timeout` and `open_timeout` parameters for Faraday.

### `USE_GEOM_FOR_RELATIONS_ICON`

Use the Geometry Type value from a record to determine what icon to use for its data relations.

!!! warning
    This setting is only applicable for GBL 1.0 metadata and is not compatible with OGM Aardvark.

### `WEBSERVICES_SHOWN`

A list of web services that will be available for a record, if that record has a corresponding URI key in its `dct_references_s` field.

For example, if a record's references include a `wms` entry, and `WEBSERVICES_SHOWN` includes `wms` (as it does by default), a preview map will appear in the tool panel showing the WMS layer.

Supported web services:

```
  - 'wms'
  - 'tms'
  - 'wfs'
  - 'xyz'
  - 'wmts'
  - 'tilejson'
  - 'iiif'
  - 'feature_layer'
  - 'tiled_map_layer'
  - 'dynamic_map_layer'
  - 'image_map_layer'
```

### `DISPLAY_NOTES_SHOWN`

Configuration for special rendering of `gbl_displayNote_sm` field values. Default note types are `danger`, `info`, `tip`, and `warning`.

You can add your own display note configuration as well. Each entry must have the follow properties:

bootstrap_alert_class
: Name of Bootstrap alert class to use for the note's container

icon
: Name of GeoBlacklight SVG icon to display with note

note_prefix
: String that will be used at the beginning of a `gbl_displayNote_sm` entry to trigger this particular rendering.

For example, the "info" note is configured like this:

```
DISPLAY_NOTES_SHOWN
  info:
    bootstrap_alert_class: alert-info
    icon: circle-info-solid
    note_prefix: "Info: "
```

!!! info
    Display Notes will appear in GeoBlacklight in a similar manner to this admonition box.


### `RELATIONSHIPS_SHOWN`

GeoBlacklight supports many different types of relations between records. Configuration for how these are displayed is stored here. Each relationship defined must have the following properties:

field
: The SOLR field that the query is performed against

query_type
: The type of query sent to SOLR

icon
: GeoBlacklight icon to use for matched records

label
: Label from the locale string translations file

inverse
: The inverse relationship to this one, used to generate bidirectional linkages

For example, the `MEMBER_OF_ANCESTORS` relationship would be defined like so (note that the `MEMBER_OF_DESCENDANTS` relationship would also need to be defined as it is referenced in the `inverse` property):

```
RELATIONSHIPS_SHOWN:
  MEMBER_OF_ANCESTORS:
    field: pcdm_memberOf_sm
    icon: parent-item
    inverse: :MEMBER_OF_DESCENDANTS
    label: geoblacklight.relations.member_of_ancestors
    query_type: ancestors
```

### `WMS_PARAMS`

These parameters are appended to all WMS endpoints that your records contain. If you always want to be requesting `VERSION=1.3.0` services, for example, you would update that here.

Default values:

```
  :SERVICE: 'WMS'
  :VERSION: '1.1.1'
  :REQUEST: 'GetFeatureInfo'
  :STYLES: ''
  :SRS: 'EPSG:4326'
  :EXCEPTIONS: 'application/json'
  :INFO_FORMAT: 'text/html'
```

### `LEAFLET`

GeoBlacklight uses Leaflet to power its web map interfaces. This setting contains many default configuration values for how these maps appear and behave.

A few common customizations of GeoBlacklight involve updates to this setting:

- [Adding Leaflet Controls](adding_leaflet_controls.md)
- [Configuring Leaflet for Retina Displays](leaflet_retina_configuration.md)

### `HELP_TEXT`

Labels shown in the popover for various viewer protocols, to provide more context for users. The values here must reference entries in the locale translation string file.

### `SIDEBAR_STATIC_MAP`

Show a sidebar static map for items with the listed viewer protocols.

Default values:

```
  - 'iiif'
  - 'iiif_manifest'
```