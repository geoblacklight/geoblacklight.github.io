# Using an External Solr Instance

In some cases you may need to install Solr through a different method than described above, or link your GeoBlacklight installation to an existing Solr installation. You can learn more about installing Solr in the [Apache documentation](https://solr.apache.org/guide/solr/latest/deployment-guide/installing-solr.html).

## Configure the Solr Core

Once you have Solr installed, you will need to create a new core and configure it for GeoBlacklight. How you create the core may depend on your installation method, but will likely be something like

```bash
$ bin/solr -c blacklight-core
```

Now rename/remove the core's `conf` directory and replace it with the `solr/conf` directory from GeoBlacklight: [github.com/geoblacklight/geoblacklight/tree/main/solr/conf](https://github.com/geoblacklight/geoblacklight/tree/main/solr/conf.

You can alter the core's configuration here as well, generally in the `schema.xml` file.

You can find the installation location of your Solr instance through the web admin interface: http://yourdomain.com:8983/solr/

## Set `SOLR_URL` Environment Variable

GeoBlacklight will use the `SOLR_URL` environment variable (if present) to look for Solr. For example, assuming your core is named `blacklight-core`:

```bash
$ export SOLR_URL=http://yourdomain.com:8983/solr/blacklight-core
```

Now run the rails server and your external Solr will be used

```bash
$ rake engine_cart:server
```
