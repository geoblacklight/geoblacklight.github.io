---
date:   2015-02-09
categories: 
- tutorials
authors: 
- Jack Reed
---

# A hands on introduction to GeoBlacklight - GeoBlacklight Workshop

Welcome to the workshop, "A hands on introduction to GeoBlacklight"!

<!-- more -->

!!! warning

	This tutorial was designed for GeoBlacklight versions before 4.0 and may be outdated. Please refer to the [Documentation pages](https://geoblacklight.org/docs) for up to date instructions.

Workshop Dates:

 - [Code4Lib 2015](http://wiki.code4lib.org/2015_Preconference_Proposals#A_hands-on_introduction_to_GeoBlacklight)  - February 9, 2015
 - [Open Repositories 2015](https://www.conftool.com/or2015/index.php?page=browseSessions&form_session=20&metadata=show&presentations=show) - June 8, 2015
 - [DLF Forum](https://dlfforum2015.sched.org/event/4ALf/a-hands-on-introduction-to-geoblacklight) - October 28, 2015
 - [Geo4Lib Camp](https://wiki.duraspace.org/display/hydra/Geo4LibCamp+2016) - January 25, 2016

Workshop facilitators:

**Stanford University**

 - Jack Reed
 - Darren Hardy

**Princeton University**

 - Eliot Jordan

<hr>

## Workshop Agenda
This workshop will focus primarily on getting a working development version of GeoBlacklight up and going for you. This will be broken down into the following sessions.

* Part 1: GeoBlacklight Overview (20 minutes)
* Part 2: Setting up your environment (45 minutes)
* Part 3: Create your GeoBlacklight application (45 minutes)
* Part 4: Index Solr Documents (20 minutes)
* Part 5: Customize your application (extra credit)

## Part 1: GeoBlacklight Overview
  - Why and what is GeoBlacklight?
  - Software projects overview and technology
  - GeoBlacklight feature set
  
### Why and what is GeoBlacklight?

GeoBlacklight is a [Ruby on Rails](http://rubyonrails.org) engine, based on the popular open-source project [Blacklight](http://projectblacklight.org/). The aim of the project is to provide a simple, effective open-source application for discovery of geospatial data. Many institutions are using GeoBlacklight to provide a search engine across a federated catalog of geospatial data.

Discovery services and metadata have been key challenges for many organizations who provide geospatial data. GeoBlacklight hopes to build on the successes of projects like [OpenGeoPortal](http://opengeoportal.org) and [Blacklight](http://projectblacklight.org/) by integrating with an ecosystem of plugins and an already active developer community. Bridging the gap between the digital library and geospatial communities, GeoBlacklight aims to bring expertise from both fields to provide a better experience for finding geospatial data.


#### What do you mean by geospatial data?

We primarily mean Geographic Information Systems (GIS) data which are structured data in specific file formats (Shapefiles, Rasters, etc.). That is, GIS data you would be serving through a spatial data infrastructure (SDI).

GeoBlacklight is flexible enough, however, to act as a discovery service for a variety of sources, but is designed for GIS data specifically.  Traditionally GIS and SDI software have not done great job at discovery and has always felt like an afterthought, thus the opportunity for GeoBlacklight to advance the state of GIS data discovery.

#### But I don't have a spatial data infrastructure?

That's ok. GIS data indexed into GeoBlacklight becomes progressively more useful based on the services that back them. For example, the minimum required metadata for GeoBlacklight is a bounding box, title, and description, and no references to services that will actually provide that data are required. GeoBlacklight can also help with serving static files available through a URL. Moreover, GeoBlacklight also natively supports [IIIF](http://iiif.io/) objects, so organizations who have IIIF servers for scanned maps can start using GeoBlacklight today.

[The GeoBlacklight Schema, Version 1.0](https://opengeometadata.org/gbl-1.0) uses a field `dct_references_s` to define external services and references. See the [Reference URIs](https://opengeometadata.org/reference-uris/) section for a list of possible key:value pairs and instructions on how to apply them.

### Software projects and communities

GeoBlacklight (the Ruby on Rails, Blacklight based application) is part of a larger effort to provide library services to geospatial data users. Several additional software augment GeoBlacklight and discovery capabilities.

- {--[GeoBlacklight-Schema](https://github.com/geoblacklight/geoblacklight/blob/master/schema/geoblacklight-schema.md)--} {++[OpenGeoMetadata](https://opengeometadata.org/reference)++} - the metadata schema used in GeoBlacklight
 - [GeoMonitor](https://github.com/geoblacklight/geo_monitor) - a WMS service monitor that provides atomic updates to Solr
 - [GeoBlacklight Sidecar Images](https://github.com/geoblacklight/geoblacklight_sidecar_images) -  Store local copies of remote imagery in GeoBlacklight
 - [OpenIndexMaps](https://openindexmaps.org/) - a community and format for sharing index maps
 

#### Metadata Sharing

Worth mentioning is a collaborative effort, [OpenGeoMetadata](https://opengeometadata.org/about-ogm-repositories), which aims to share geospatial metadata in an open way. Instead of focusing on building an application that must be deployed at multiple institutions, OpenGeoMetadata uses GitHub as a common, highly available repository. Using GitHub as a platform allows for software development to focus on conversion tools and harvesting tools.

OpenGeoMetadata builds on the groundwork laid by the [OpenGeoPortal Metadata Working group](http://opengeoportal.org/working-groups/metadata/).

### GeoBlacklight Feature Set

GeoBlacklight extends the functionality of Blacklight by providing the following:

 - spatial search with a spatial relevancy algorithm
 - download functionality for geospatial web services
 - map view of search results
 - easily customizable
 - extendable to new types of data and functionality
 - and more...

 
## Part 2. Setting up your environment

  - Development requirements
  - Local attendees setup VirtualBox/Vagrant

### Development requirements

GeoBlacklight has similar prerequisites to [Blacklight][bldependencies]. It diverges from Blacklight requirements by using a customized Solr schema and configuration, [Geoblacklight Schema, Version 1.0](https://opengeometadata.org/gbl-1.0).

#### Software you should have installed on your development computer

  - Ruby > 2.6.6
  - Rails > 6.0
  - Git
  - Java > 1.8] (Download JDK for local Solr server)
  - Node.js > 14.15 LTS
  - Yarn > 1.13
 
!!! tip

	It is recommended to install the latest versions of Ruby, Rails, and Node.js. We strive to keep GeoBlacklight updated with these versions. A great, almost always up-to-date, tutorial on getting a Ruby on Rails development environment is available here: [https://gorails.com/setup](https://gorails.com/setup). If you are not following this tutorial as part of an in person workshop, you can skip to the next section once you have these dependencies installed.

Local attendees of the workshop have the option of just using the pre-created environment on the provided thumb-drive. 

!!! note

	You can complete this tutorial without Vagrant as long as you already have the above mentioned software on your machine. If you do, you may skip ahead to <a href="{% post_url 2015-02-09-create-your-application %}">Part 3 - Create your application</a>

	Also, if you are not at the workshop (or perhaps if you want to prepare your own environment for a workshop you are facilitating), you can create the virtual machine for the workshop, by following [this guide](2016-01-23-using-packer-to-create-a-development-virtual-machine.md).

### In-person attendees setup VirtualBox/Vagrant
  
Good news for in-person workshop participants: the process of setting up your environment has already done for you using VirtualBox and Vagrant. On the thumb-drive underneath a directory titled 'geoblacklight_workshop'. Thanks to Justin Coyne and [Data Curation Experts](http://curationexperts.com/) for this approach that is used at HydraCamps.

For those interested in what was installed on this machine and how it was created checkout [this gist](https://gist.github.com/mejackreed/727e9cd2e971ca3949a2).

 - [Vagrant for OS X and Linux](#vagrant-for-os-x-and-linux)
 - [Vagrant for Windows](#vagrant-for-windows)

#### Vagrant Quick Tips
After you have your virtual machine up and going, you will want to stop it. Here are a few commands that will help out.

```sh
$ vagrant halt # stops the virtual machine
$ vagrant destroy # stops and deletes the virtual machine
```

#### Vagrant for OS X and Linux
  1. Install the Mac (.dmg) version of VirtualBox and Vagrant on your machine. If you are using Linux, please download and install appropriately. [VirtualBox Downloads](https://www.virtualbox.org/wiki/Downloads), [Vagrant Downloads](https://www.vagrantup.com/downloads.html)

  1. If not already on your Desktop, copy the `geoblacklight_workshop` directory to your `~/Desktop` directory

  1. Move to your `~/Desktop/geoblacklight_workshop` directory
 
     ```sh
     $ cd ~/Desktop/geoblacklight_workshop
     ```

  1. Start vagrant

     ```sh
     $ vagrant up # This command creates and configures guest machines according to your Vagrantfile.
     ```

  1. SSH to the VM

     ```sh
     $ vagrant ssh # This will SSH into a running Vagrant machine and give you access to a shell.
     ```

#### Vagrant for Windows

Thanks to Zach Vowell who contributed this guide for Windows.

Note: Please install a Windows ssh client installed such as [ PuTTY](http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html).

  1. Install the Windows (.exe) version of VirtualBox and Vagrant on your machine.

  1. If not already on your Desktop, copy the `geoblacklight_workshop` directory to your Desktop `C:\Users\[username]\Desktop` (for Windows 7)

  1. Open a [Windows Command Prompt (cmd)](http://www.digitalcitizen.life/7-ways-launch-command-prompt-windows-7-windows-8)

  1. Move to the `geoblacklight_workshop` directory on the Desktop

     ```
     C:\Users\[username]> cd Desktop\geoblacklight_workshop
     ```

  1. Start Vagrant

     ```
     C:\Users\[username]\Desktop\geoblacklight_workshop> vagrant up
     # This command creates and configures guest machines according to your Vagrantfile.
     ```

  1. Open up PuTTY

  1. SSH into the Vagrant box by entering the following parameters into the "Basic Options for Your PuTTY session" window:
    - Host Name (or IP address): 127.0.0.1
    - Port: 2222

  1. When PuTTY shell prompts for a username and password, enter "vagrant" for both. You should now see a command prompt.


## Part 3: Create your GeoBlacklight application

Before beginning this section, make sure your environment is setup (as shown in Part 2).

In this section of the tutorial, we will cover the following steps:

  1. [Generate your Rails application](#generating-your-rails-application)
  1. [Install GeoBlacklight](#install-geoblacklight)
  1. [Install RSpec](#install-rspec)

<hr>

### Generating your Rails application

For more information about generating a Rails application see the [Getting Started with Rails](http://guides.rubyonrails.org/getting_started.html) guide. Before, make sure you have Rails installed by running the following:
```sh
$ rails -v
```
If you get an error run:

```sh
$ gem install rails
```
Now you should have Rails installed on your machine and are ready to proceed.

  1. Create a new Rails application using the GeoBlacklight template, in which **"your_app_name"** can be anything you want to name your app.

     ```sh
     $ rails new your_app_name
     ## For example, you could also use `rails new mockup_geoblacklight`
     ```
  1. Switch to its folder

     ```sh
     $ cd your_app_name
     ```

  1. Run the rails server.

     ```sh
     $ rails s -b 0.0.0.0
     ```

     We are running the Rails server with the "-b" option which is binding the server to the 0.0.0.0 IP address. This is only necessary if your are running the application on your Vagrant virtual machine.
     {: .flash-alert}

     Now you can visit the Rails application at [http://127.0.0.1:3000](http://127.0.0.1:3000). You should see "Yay! You're on Rails" CTRL + c will stop server.

     ![rails_welcome](https://guides.rubyonrails.org/images/getting_started/rails_welcome.png "Welcome aboard!")

**Note** You will need to leave the Terminal window open while the Rails server is running.

  1. *Optional* Initialize your git repository and commit your changes

     ```sh
     $ git init
     $ git add .
     $ git commit -m 'initial commit of Rails application'
     ```

<hr>

### Install GeoBlacklight

Now that we have started our Rails application, we need to install GeoBlacklight.

  1. Add GeoBlacklight to your `Gemfile`. To do this, navigate to the Gemfile in your application, open it with a text editor, and paste the following in to add it to the list of gems:

     ```ruby
     # In ./Gemfile
     gem 'blacklight'
     gem 'geoblacklight'
     ```

  1. Install required gems and their dependencies

     ```sh
     $ bundle install
     ```

  1. Run Blacklight generator (with devise authentication)

     ```sh
     $ rails g blacklight:install --devise
     ```

  1. Run GeoBlacklight generator (overrides Blacklight default Solr config)

     ```sh
     $ rails g geoblacklight:install -f
     ```

     Depending on how your machine is setup you may need to prepend the rails or rake command with [bundle exec](http://bundler.io/man/bundle-exec.1.html).
     {: .flash-alert}

  1. Run database migrations

     ```sh
     $ rake db:migrate
     ```


     Quick tip: All of these tasks (1 - 5) are included as part of template to generate a new GeoBlacklight application.
     
     To run that generator just run:
     {: .flash-notice}

     ```sh
     $ DISABLE_SPRING=1 rails new your_app_name -m https://raw.githubusercontent.com/geoblacklight/geoblacklight/main/template.rb
     ```

     Remember to `cd your_app_name` into the directory before starting the server if you are using the template generator.
     {: .flash-notice}


  1. Start the Solr and Rails server.

     ```sh
     $ rake geoblacklight:server
     ```
  
     Running this command will download and start the [Solr server](http://127.0.0.1:8983/solr). Other commands available to control Solr include:
     {: .flash-notice}


     ```sh
     $ rake solr:clean # Useful when seeing a "core already exists" error.
     $ rake solr:start # Starts Solr independently of the Rails server in the background (without loading core)
     $ rake solr:stop # Stops Solr
     $ rake solr:restart # Stops and restarts an already running background Solr server
     ```

  1. Navigate to [http://127.0.0.1:3000](http://127.0.0.1:3000). You should see the GeoBlacklight homepage. CTRL + c will stop both the Solr and Rails server.


  1. *Optional* Commit your work

     ```sh
     $ git add .
     $ git commit -m 'installed Blacklight and GeoBlacklight'
     ```

    
     Great job for making it this far. You now have a working GeoBlacklight application!
     {: .flash-success}

### Install RSpec
[RSpec](http://rspec.info/) is a behavior-driven development framework for Ruby. It is the recommended way to test your application and is used by both the Blacklight and GeoBlacklight projects.

  1. Add `rspec-rails` to both the `:development` and `:test` groups in the `Gemfile`. Again, open the `Gemfile` with a text editor and paste the line below into the respective groups.

     ```sh
     # In ./Gemfile
     group :development, :test do
       gem 'rspec-rails', '~> 3.0'
     end
     ```

  1. Download and install RSpec

     ```sh
     $ bundle install
     ```

  1. Initialize the spec/ directory (where specs will reside) with

     ```sh
     $ rails generate rspec:install
     ```

  1. Run your tests (specs) by running

     ```sh
     $ bundle exec rspec
     ```

     Writing tests for your application is outside the scope of this guide, but there are plenty of great examples out there. Check out the <a href="http://robots.thoughtbot.com/how-we-test-rails-applications">Thoughtbot blog</a>.
     {: .flash-notice}

  1. *Optional* Commit your work

     ```sh
     $ git add .
     $ git commit -m 'Installed RSpec'
     ```

### Next Steps

So far you have a working GeoBlacklight application with a test framework installed. One thing missing is an index to have your application search against. The next section focuses on indexing Solr documents.



## Part 4: Index Solr documents
  1. [Overview](#overview)
  1. [Download fixture documents](#download-fixture-documents)
  1. [Index documents](#index-documents)

### Overview

GeoBlacklight uses the GeoBlacklight Schema, Version 1.0 as a template for metadata documents indexed by Solr.

GeoBlacklight provides a rake task to index documents as fixtures for tests. We will use this rake task to index several documents as an example.

### Download fixture metadata documents

  1. Assuming that you have already navigated to the directory of your GeoBlacklight app, create a directory for some Solr documents and then move to it:

     ```sh
     $ mkdir -p spec/fixtures/solr_documents && cd spec/fixtures/solr_documents
     ```

  1. Download some metadata documents (in JSON format) to the directory

     ```sh
     $ curl -O https://gist.githubusercontent.com/mejackreed/84abc598927c43af665b/raw/geoblacklight-documents.json
     ```

  1. Move back to app root directory

     ```sh
     $ cd - # Or cd ../../../
     ```

  1. Make sure your Solr server and Rails application are started.

     ```sh
     $ rake geoblacklight:server
     ```

  1. *Optional* Commit your work

     ```sh
     $ git add .
     $ git commit -m 'Adds in JSON fixtures'
     ```

The fixtures directory is useful for quickly indexing a small number documents in Solr (built specifically for populating Solr for testing). I would caution though in using this task for large scale indexing and committing, as we've developed other best practices for production-scale indexing.



Now you should see <a href="http://127.0.0.1:3000">facets listed</a> on the lower left hand part of the page. Try a search! You can <a href="http://127.0.0.1:3000/?q=*">search for *</a> to search for everything.


Want to index some more documents? Check out [this tutorial](2015-02-05-using-geocombine-to-harvest-and-index-opengeometadata.md) on how to easily index metadata from OpenGeoMetadata.

There are many ways to customize your GeoBlacklight application, and unfortunately we can't cover them all with this tutorial. GeoBlacklight tries to stick to similar patterns as Blacklight, so most of the Blacklight customization techniques should hold true.

[Blacklight Customization](https://github.com/projectblacklight/blacklight/wiki#blacklight-customization) - from the Project Blacklight Wiki


## Part 5: Customizing your GeoBlacklight Application
  1. [Basic principles](#basic-principles)
  1. [Customize metadata shown](#customize-metadata-shown)
  1. [Changing the style of your application](#changing-the-style-of-your-application)
  1. [Overriding a partial](#overriding-a-partial)

### Basic principles

When it comes to customizing your GeoBlacklight application there are some basic principles to keep in mind.

  1. The less you override the easier it is to upgrade.

     Blacklight and GeoBlacklight adhere to some basic principles which all adopters to override helper methods, view partials, and even classes. A lot of things are configurable out of the box. However, there are some best practices around what to override and where to do it to make sure your application can take advantage to improvements to both Blacklight and GeoBlacklight.  Both projects use [semantic versioning](http://semver.org/) to make this upgrade path easier for adopters.

     [Providing your own view templates](https://github.com/projectblacklight/blacklight/wiki/Providing-your-own-view-templates) - Blacklight Wiki (Customizing the User Interface)

  1. Reach out and ask for help on the [Blacklight Developers](https://groups.google.com/forum/#!forum/blacklight-development) or [GeoBlacklight](https://groups.google.com/forum/#!forum/geoblacklight-working-group) Google Groups

     Asking questions, reaching out to others, and getting feedback from experienced developers is a great practice in general. In this particular case its helps foster the community and start conversations that might help others.

### Customize metadata shown

In this example we are going to change the way the GeoBlacklight is configured to show certain metadata fields on an items page. This is the same way a Blacklight application would configure these fields.

  1. Make sure your Solr server and Rails application are started.

     ```sh
     $ rake geoblacklight:server
     ```

  1. Open the `app/controllers/catalog_controller.rb` file in your text editor.


     Hint: `catalog_controller.rb` is located at "app/controllers/catalog_controller.rb" in your application
     {: .flash-notice}

  1. Scroll down to lines 137 - 144

     ```ruby
     ...
     config.add_show_field Settings.FIELDS.CREATOR, label: 'Author(s)', itemprop: 'author'
     config.add_show_field Settings.FIELDS.DESCRIPTION, label: 'Description', itemprop: 'description', helper_method: :render_value_as_truncate_abstract
     config.add_show_field Settings.FIELDS.PUBLISHER, label: 'Publisher', itemprop: 'publisher'
     config.add_show_field Settings.FIELDS.PART_OF, label: 'Collection', itemprop: 'isPartOf'
     config.add_show_field Settings.FIELDS.SPATIAL_COVERAGE, label: 'Place(s)', itemprop: 'spatial', link_to_facet: true
     config.add_show_field Settings.FIELDS.SUBJECT, label: 'Subject(s)', itemprop: 'keywords', link_to_facet: true
     config.add_show_field Settings.FIELDS.TEMPORAL, label: 'Year', itemprop: 'temporal'
     config.add_show_field Settings.FIELDS.PROVENANCE, label: 'Held by', link_to_facet: true
     ...
     ```
     These configuration options relate to fields that are indexed in Solr. You can disable a metadata field being shown on an items show page. If you navigate to an [items page](http://127.0.0.1:3000/catalog/stanford-cg357zz0321), it will currently show field called publisher. Maybe you would like to rename that field to "Data publisher".

  1. Modify the label in line 139

     ```ruby
     # change this
     config.add_show_field Settings.FIELDS.PUBLISHER, label: 'Publisher', itemprop: 'publisher'
     # to this
     config.add_show_field Settings.FIELDS.PUBLISHER, label: 'Data publisher', itemprop: 'publisher'
     ```

     Save the file and reload the page. You should see the label change.

  1. Next we will remove the "Author(s)" metadata field from being shown. Comment out or remove the `Settings.FIELDS.CREATOR` line (137).

     ```ruby
     # config.add_show_field Settings.FIELDS.CREATOR, label: 'Author(s)', itemprop: 'author'
     ```
     Save the file and reload the page. You should no longer see the "Author(s)" field.

     You have now customized a layer's show page!
     

### Changing the style of your application

GeoBlacklight uses [Twitter Bootstrap](http://getbootstrap.com/) as a base for UI components and is implemented using the [bootstrap-sass](https://github.com/twbs/bootstrap) gem. This approach should make things easier for adopters wanting to customize the look and feel of their application. [Bootstrap variables](https://github.com/twbs/bootstrap/blob/v4.6.0/scss/_variables.scss) can easily be modified which will change how the application looks.

  1. You can update Bootstrap variables in your `_customizations.scss`!

     Change link color

     ```scss
     // in app/assets/stylesheets/_customizations.scss
     // Links
     $link-color: green;
     ```

     Change default border style

     ```scss
     // in app/assets/stylesheets/bootstrap-variables.scss
     // Borders
     $border-width: 2px;
     $border-radius: .4rem;
     ```


     Great job! You can configure a whole host of options using this Bootstrap customization technique. Once again, here is the list of Bootstrap variables you can customize https://github.com/twbs/bootstrap/blob/v4.6.0/scss/_variables.scss .
     {: .flash-success}

### Overriding a partial

Lets say you want to override the homepage that is shown in GeoBlacklight that can easily be done by just creating same-named a partial at the same path in your GeoBlacklight application.

  1. Check out home page partial on Github. [https://github.com/geoblacklight/geoblacklight/blob/main/app/views/catalog/_home_text.html.erb](https://github.com/geoblacklight/geoblacklight/blob/main/app/views/catalog/_home_text.html.erb)

  1. This same partial is being overriden from Blacklight [https://github.com/projectblacklight/blacklight/blob/master/app/views/catalog/_home_text.html.erb](https://github.com/projectblacklight/blacklight/blob/master/app/views/catalog/_home_text.html.erb)

  1. Create a file with the same name and path in your application.

     ```sh
     $ mkdir -p app/views/catalog
     $ touch app/views/catalog/_home_text.html.erb
     ```

  1. Edit this file and add some custom text

     ```erb
     This is the home page.

     Search bar:
     <%= render_search_bar %>
     ```

     See how easy that was? You even included another partial!
     {: .flash-success}

### Customize i18n keys

Blacklight and GeoBlacklight use [i18n](http://guides.rubyonrails.org/i18n.html) for internationalization support. These keys provide a quick way to customize your app without having to override partials.

  1. Open up file `config/locales/blacklight.en.yml`

     ```yaml
     en:
       blacklight:
         application_name: 'Blacklight'
     ```

  1. Edit the file, adding a customization to the search form label

     ```yaml
     en:
       blacklight:
         application_name: 'Your Geo App'
         search:
           form:
             submit: 'Search this'
     ```

     Refresh your home page and you should see the submit button text changed. If you inspect the html you will notice the HTML title attribute changed.
     {: .flash-success}

     More configurable keys are available, check out what you can customize using this approach:
      - <a href='https://github.com/projectblacklight/blacklight/blob/master/config/locales/blacklight.en.yml'>Blacklight Configurable Keys</a>
      - <a href='https://github.com/geoblacklight/geoblacklight/blob/main/config/locales/geoblacklight.en.yml'>GeoBlacklight Configurable Keys</a>
     {: .flash-notice}

## Wrapping Up

Thanks for attending this workshop. You can contribute feedback about this workshop by filling out a [quick survey](https://docs.google.com/a/stanford.edu/forms/d/1odzYIFFJjBL7-0Y1ZlWPS-pBzW1EbyFaStA9VD3r_Zg/viewform).

This workshop is open source, and you can [contribute back to it](https://github.com/geoblacklight/geoblacklight.github.io).

Don't forget to stop your virtual machine.

```sh
$ vagrant halt # stops the virtual machine
```


<div class='license-block'>
  <div>
    <a rel="license" href="http://creativecommons.org/licenses/by/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International License</a>.
  </div>
</p>


