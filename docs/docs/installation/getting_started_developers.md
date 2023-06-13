
# Getting Started for Developers

After reading this guide, you will know:  
<ul>
    <li> How to install a local instance of GeoBlacklight for Development purposes.  
    <li> How to make small changes to the application.  
    <li> How to see how those changes look in a browser.  
</ul>

For a more in-depth guide to development, see the [tutorials](https://geoblacklight.org/tutorials.html).

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

<div class="note" markdown="1">
<h6>Troubleshooting</h6>
If you run into issues running this rake task, try removing your `Gemfile.lock` file and removing the test app with `rm -R .internal_test_app`. Then run `bundle install` before running the above command again.
</div>

Refer to the Customization pages of this website for instructions on making look and feel changes. Refer to the [Metadata](http://localhost:8000/docs/overview/metadata/) section for instructions on testing new records.

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
