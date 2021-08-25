---
layout: tutorial-c4l
title:  Customize your application - Part 5 - GeoBlacklight Workshop"
date:   2015-02-09 14:55:00
categories: tutorial
author: 'Jack Reed'
author_link: 'https://twitter.com/mejackreed'
snippet: Customize your GeoBlacklight application. Created as part of a tutorial series given in a GeoBlacklight Workshop'
---

There are many ways to customize your GeoBlacklight application, and unfortunately we can't cover them all with this tutorial. GeoBlacklight tries to stick to similar patterns as Blacklight, so most of the Blacklight customization techniques should hold true.

[Blacklight Customization](https://github.com/projectblacklight/blacklight/wiki#blacklight-customization) - from the Project Blacklight Wiki



## Customizing your GeoBlacklight Application
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
     {: .flash-success}

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
