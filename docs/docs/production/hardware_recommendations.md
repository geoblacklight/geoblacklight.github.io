# Hardware Recommendations

Running GeoBlacklight in production has modest hardware requirements. Your local IT system administrators and DevOps personnel will be critial in shaping your deployment environment.

## Example Production Environments

#### B1G/BTAA Geoportal

Currently (9/2022) the B1G/BTAA Geoportal is running on AWS web services in production with these hardware specs:

#### Solr server
* 4GB RAM
* 2 CPU cores
* Java Xmx configured for 3GB memory
* OS base disk: small, at least 8GB for Linux but not much more needed
* Solr data partition: 40GB (in practice, <10GB in use for BTAA)

#### Web/Rails server
* 8GB RAM
* 2 CPU cores
* OS base disk: at least 20GB for Linux
* Data partition: 60GB for ample thumbnail caching space
* Puma Rails server: Recommend 2 workers, 8 threads per worker in this configuration. More threads will necessitate more system memory
