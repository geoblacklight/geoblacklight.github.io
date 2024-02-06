---
hide:
---
# Metadata Reference

GeoBlacklight uses a lightweight metadata schema designed for geospatial resource discovery. The schema enables keyword searches, faceted refinement, and spatial map searching.

Metadata schema features:

- based on Dublin Core, with custom elements added for spatial values
- designed for discovery - to help users find items
- _not_ designed for complete technical documentation, such as a GIS dataset's processing history
- includes elements for external links, such as downloads, web services, or supplemental metadata
- interoperable for the [OpenGeoMetadata](https://opengeometadata.org) federated metadata sharing community

!!! note

	Metadata for GeoBlacklight is documented on the [OpenGeoMetadata website :octicons-link-external-24:](https://opengeometadata.org). Key pages include:
    
    - [https://opengeometadata.org/ogm-aardvark](https://opengeometadata.org/ogm-aardvark) - OGM Aardvark Schema for GeoBlacklight versions 4.x
    - [https://opengeometadata.org/gbl-1.0](https://opengeometadata.org/gbl-1.0) - GBL 1.0 Metadata Schema for GeoBlacklight versions 2.x - 3.x
    - [https://opengeometadata.org/upgrade-metadata](https://opengeometadata.org/upgrade-metadata) - Upgrading Metadata from GBL 1.0 to OGM Aardvark

## Metadata functionality in GeoBlacklight 4.x

!!! inline Tip "Hover over the column headers for sorting options."
	

{{ read_csv('docs/documentation/metadata-functions.csv') }}
