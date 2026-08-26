# Data Relations Widget

!!! warning

	This documentation is for GeoBlacklight versions 1.3 to versions 3.x only. Beginning with version 4.0, GeoBlacklight performs this function by default.

Beginning with v1.3.0, GeoBlacklight supports simple visualization of parent/children relations between records in a catalog. When records that were derived from a parent record point back to that parent, it enables a toolbar widget that displays the relation.

To make use of this, we have introduced support for a "source" field in GeoBlacklight metadata records. The actual key of this field is arbitrary –– just make sure that `Settings.FIELDS.SOURCE` properly reflects what you want to use –– but the GeoBlacklight schema allocates the Dublin Core field `dc_source_sm` for this purpose.

The responsibility of this field is to point to a parent document (a document from which the current one is derived). The value should be the `layer_slug_s` of that parent (or parents), which also resides in your catalog. No modifications need to be made to the parent record in order to point back towards the derived records.

Here is an example use of the `dc_source_sm` field, from a GeoBlacklight schema record:
```json
  "dc_source_sm": [
    "nyu_2451_34635",
    "nyu_2451_34636"
  ],
```
In the above case, the record being described is derived from two different records in the catalog (namely, `nyu_2451_34635` and `nyu_2451_34636`).

Now, when navigating to the show page for either the current record, or one of the two parent records, a user will see something like this:

<img src="https://cloud.githubusercontent.com/assets/10469527/20073023/98a54434-a4f8-11e6-9976-41910875be73.png" alt="Child's view" width="325">
<img src="https://cloud.githubusercontent.com/assets/10469527/20073029/9c71482e-a4f8-11e6-9a5e-f0a364eb382c.png" alt="Parent's view" width="325">


This functionality also provides a HTML and JSON API for viewing all parent/child datasets for a record. The route used is:
`localhost:3000/catalog/fake-record-001/relations`

A sample JSON response for a record with two parents and no children might look like this:
```json
{
  "ancestors": {
    "numFound": 2,
    "start": 0,
    "docs": [
      {
        "dc_title_s": "2016 NYC Geodatabase, ArcGIS Version (jan2016)",
        "layer_slug_s": "nyu_2451_34636"
      },
      {
        "dc_title_s": "2016 NYC Geodatabase, Open Source Version (jan2016)",
        "layer_slug_s": "nyu_2451_34635"
      }
    ]
  },
  "descendants": {
    "numFound": 0,
    "start": 0,
    "docs": []
  },
  "current_doc": "nyu_2451_34513"
}
```
