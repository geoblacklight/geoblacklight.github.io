# Configuring Search Relevancy in Solr for GeoBlacklight

In GeoBlacklight, search relevancy determins how search results are ranked based on the importance of various metadata fields. You can adjust the relevancy by modifying the [`solrconfig.xml` file](https://github.com/geoblacklight/geoblacklight/blob/main/solr/conf/solrconfig.xml), which allows you to control which fields have more influence on the search results. The configuration uses the `edismax` query parser, which provides advanced relevancy tuning options.

## Basic steps to configure search relevancy

1. Identify important fields: Determine which metadata fields are most relevant for your application's search results. 
2. Set boost values: Adjust the boost values in the qf and pf parameters to prioritize those fields.
3. Test and iterate: After making changes, test the search results to ensure they meet expectations. You may need to tweak the boost values or add/remove fields based on the results.

## Key sections of solrconfig.xml

### Query parameters

* `defType`: specifies the query parser (`edismax`)
* `qf`: The query fields with boosting values that control how much weight each field has in the search relevancy.
* `pf`: phrase boosting fields, used to boost exact phrase matches within the results. 

### Relevancy fields and boosting

* The `qf` and `pf` parameters list the fields to be searched and their associated boost values. The higher the boost value, the more weight that field has in determining the relevance of the search result.

Example:

```xml
	<str name="qf">
		  text^1
		  dct_description_ti^2
		  dct_creator_tmi^3
		  dct_publisher_ti^3
		  dct_isPartOf_tmi^4
		  dct_subject_tmi^5
		  dct_spatial_tmi^5
		  dct_temporal_tmi^5
		  dct_title_ti^6
		  dct_accessRights_ti^7
		  dct_provider_ti^8
		  dct_identifier_ti^10
	</str>
```

* `dct_description_ti^2`: The Description field has a boost value of 2
* `dct_creator_tmi`: The Creator field has a boost value of 3, making it more relevant than the Description field
* The most relevant field is `dct_identifier_ti`
* Higher boost values indicate greater importance in the search results.

### Sorting results

* The sort parameter controls how the search results are orderd.

Example:

```xml
	<str name="sort">score desc, dct_title_sort asc</str>
```

* This sorts results first by score in descending order, then by `dct_title_sort` in ascending order.


