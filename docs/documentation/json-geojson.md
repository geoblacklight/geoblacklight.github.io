# JSONs and GeoJSONs

!!! tip "Summary"
 
	* GeoBlacklight metadata files are JSONs
	* OpenIndexMaps are GeoJSONs

## JSON

==JSON is a general-purpose data format.==

JSON (JavaScript Object Notation) is a lightweight data-interchange format that is easy for machines to parse and generate. JSON is built on two structures:

* A collection of name/value pairs (often realized as an object, record, structure, dictionary, hash table, keyed list, or associative arrays)
* An ordered list of values (often realized as an array, vector, list, or sequence)

JSON is used to represent a wide variety of data structures, including GeoBlacklight metadata files. These files contain a mix of text, numbers, booleans, and arrays, organizing the metadata in a structured way for the Solr index. Although the metadata files contain geospatial coordinates, they are not in the GeoJSONs format.

Example

```JSON
[
  {
    "gbl_mdVersion_s": "Aardvark",
    "dct_title_s": "Sample Record",
    "gbl_resourceClass_sm": [
      "Other"
    ],
    "gbl_resourceType_sm": [
      "Aerial photographs"
    ],
    "gbl_indexYear_im": [
      "1900"
    ],
    "gbl_dateRange_drsim": [
      "[1900 TO 1910]"
    ],
    "dct_accessRights_s": "Public",
    "dct_format_s": "JPEG",
    "id": "2b22c800-a9fe-4fe1-aee6-f8784f4e987f",
  }
]
```

## GeoJSON

==GeoJSON is a specialized format for representing geographic information.==

GeoJSON is a specific JSON format for encoding geographic data. It extends JSON by adding geographical features, geometries, and properties. GeoJSON supports the following geometry types: 

* Point
* LineString
* Polygon
* MultiPoint
* MultiLineString
* MultiPolygon
* GeometryCollection

Example

```JSON
{
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [-123.365556, 48.428611]
  },
  "properties": {
    "name": "Victoria, BC",
    "population": 85792
  }
}
```
