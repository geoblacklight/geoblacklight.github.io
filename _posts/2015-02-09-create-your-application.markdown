---
layout: tutorial-c4l
title:  Create your application - Part 3 - GeoBlacklight Workshop"
date:   2015-02-09 14:57:00
categories: tutorial
author: 'Jack Reed'
author_link: 'https://twitter.com/mejackreed'
snippet: 'Create your GeoBlacklight application. Created as part of a tutorial series given in a GeoBlacklight Workshop'
---

## Create your application

Before beginning this section, make sure your [environment is setup]({% post_url 2015-02-09-setting-up-your-environment %}).

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

<div class='flash-notice'>
  <a href="{% post_url 2015-02-09-index-solr-documents %}">Next → Part 4 - Index Solr documents</a>
</div>
