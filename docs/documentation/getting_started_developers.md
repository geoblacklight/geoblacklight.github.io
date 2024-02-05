
# Getting Started for Developers
This guide covers: 

1. How to install a local instance of GeoBlacklight for Development purposes.  
2. How to make small changes to the application.  
3. How to see how those changes look in a browser.  


---------

## Dependencies

Software you should have installed on your development computer  
<ul>
    <li>Ruby > 3.0.0</li>
    <li>Git > 2 </li>
    <li>Java > JRE version 11 or higher</li>
</ul>
---------

## Installation for Development

To set up a working space, navigate to where you'd like to put your test GeoBlacklight app and then clone the repository:
```
$ git clone git@github.com:geoblacklight/geoblacklight.git
```
Once the files are downloaded, run
```
$ cd geoblacklight
$ bundle exec rake geoblacklight:server
```

This command executes everything needed to run a local version of GeoBlacklight. In order to see the version you have running, open a web browser and go to [http://localhost:3000/](http://localhost:3000/). You should be able to navigate around the site. Remember that your Rails server is running locally, so to stop it, run ^C (ctrl + c).

!!! tip "Troubleshooting"

    If you run into issues running this rake task, try removing your `Gemfile.lock` file and removing the test app with `rm -R .internal_test_app`. Then run `bundle install` before running the above command again.


### Running Solr and Rails server separately

You may decide to run either the Solr server or Rails server separately. With Solr, for instance, run
```
$ rake geoblacklight:solr
```
Then, open another Terminal window, navigate to the place where your app is located, and run:
```
$ rake engine_cart:server
```
Once the server is running, you can open a web browser and visit the URL it prompts, usually [http://localhost:8983/solr/#/blacklight-core](http://localhost:8983/solr/#/blacklight-core) to see the admin interface of your test instance of Solr. As before, remember that ^C (ctrl + c) stops the server.

### Using an External SOLR Instance

In some cases you may need to install SOLR through a different method than described above, or link your GeoBlacklight installation to an existing SOLR installation. You can learn more about installing SOLR in the [Apache documentation](https://solr.apache.org/guide/solr/latest/deployment-guide/installing-solr.html).

#### Configure the SOLR Core

Once you have SOLR installed, you will need to create a new core and configure it for GeoBlacklight. How you create the core may depend on your installation method, but will likely be something like

```bash
$ bin/solr -c blacklight-core
```

Now rename/remove the core's `conf` directory and replace it with the `solr/conf` directory from GeoBlacklight: [github.com/geoblacklight/geoblacklight/tree/main/solr/conf](https://github.com/geoblacklight/geoblacklight/tree/main/solr/conf.

You can alter the core's configuration here as well, generally in the `schema.xml` file.

You can find the installation location of your SOLR instance through the web admin interface: http://yourdomain.com:8983/solr/

#### Set `SOLR_URL` Environment Variable

GeoBlacklight will use the `SOLR_URL` environment variable (if present) to look for SOLR. For example, assuming your core is named `blacklight-core`:

```bash
$ export SOLR_URL=http://yourdomain.com:8983/solr/blacklight-core
```

Now run the rails server and your external SOLR will be used

```bash
$ rake engine_cart:server
```

## Unit Testing

### Running all the tests
As you develop and make changes, you may want to run tests on parts of the app to see if any warning occur. You can run the following to test the app
```
$ rake ci
```
Note that a test like this could take up to 5-6 minutes to complete, or longer. Warnings, deprecations, and other messages will be printed on your Terminal screen.

### Running the tests separately
```
$ rake geoblacklight:solr
```
Then, in another terminal window:
```
$ rspec spec/
```
*Note:* It is not necessary to run tests after every change you make. You can, for instance, change the name of a facet field, save your file, and then refresh your browser to see the change. However, if you add a new fixture metadata record, you will have to stop the servers and then restart them so the new file will be indexed.

## Browser Testing

Cross-browser testing provided by:

<a href="https://www.browserstack.com/"><img src="https://user-images.githubusercontent.com/784196/43614155-d65e3f98-9677-11e8-8ecf-89f0746f91e0.png" width="150"></a>

## Helpful Development Tools

### Version Managers
Using version management tools for compatible versions of Ruby ([rvm](https://rvm.io/), [rbenv](https://github.com/rbenv/rbenv/), [asdf](https://asdf-vm.com/)) and Node ([nvm](https://github.com/nvm-sh/nvm/blob/master/README.md), [asdf](https://asdf-vm.com/)) can make development easier.

#### asdf
Many developers like asdf because you can manage versions for Ruby and Node in a single utility. For developers who use asdf, it is helpful to add a `.tool-versions` file for each app.

Example:
```
ruby 2.7.5
nodejs 17.4.0
java openjdk-11.0.2
```

---
