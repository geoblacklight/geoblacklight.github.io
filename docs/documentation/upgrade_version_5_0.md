# Upgrading to GeoBlacklight 5

This guide is for anyone running a GeoBlacklight 4.x application who wants to move to
GeoBlacklight 5. You can do it, and this guide is here to help!

**You are not behind schedule.** GeoBlacklight 4.x is still maintained: v4.5.1 was released in
June 2026, _after_ v5.3.0. Version 4 support ends in 2026 (see the
[Release Calendar](releases.md)), so this is worth planning, but you can take it in stages rather
than in one weekend.

**There is no metadata migration.** Unlike the [4.0 upgrade](older-versions/upgrade_version_4_0.md),
GeoBlacklight 5 uses the same OpenGeoMetadata Aardvark schema and the same `Settings.FIELDS`
mappings. Your existing metadata records do not need to change at all.

**What does change is mostly the front end.** Going from 4 to 5 means four upgrades happening at
once:

|               | GeoBlacklight 4.x                      | GeoBlacklight 5.x                           |
| ------------- | -------------------------------------- | ------------------------------------------- |
| GeoBlacklight | 4.x                                    | 5.x                                         |
| Blacklight    | 7.x                                    | 8.x                                         |
| Bootstrap     | 4.6                                    | 5.3                                         |
| Assets        | Sprockets, usually with Vite alongside | Propshaft with import maps and CSS bundling |

GeoBlacklight 4.5.1 requires
`rails >= 7`; GeoBlacklight 5 requires `rails >= 6.1`. The floor actually went down, and several
institutions already run Rails 8 on GeoBlacklight 4.5. The real requirements are Ruby 3.2 or newer
and the jump from Blacklight 7 to Blacklight 8.

## Before you begin

**GeoBlacklight 5 requires Ruby 3.2 or newer.** Check what you have:

```bash
ruby --version
```

**Docker is now required to run Solr locally.** GeoBlacklight 4 used a gem called `solr_wrapper`
that downloaded and ran Solr for you. GeoBlacklight 5 removed it, and
`rake geoblacklight:server` now runs `docker compose up -d solr` instead. If Docker is not
installed on the machine where you do development, install
[Docker Desktop](https://www.docker.com/products/docker-desktop/) before you start. This has
nothing to do with how you run Solr in production — it only affects local development.

**Node.js and Yarn are required**, even though GeoBlacklight 5's default JavaScript setup is
import maps rather than a bundler. The installer runs `yarn add @geoblacklight/frontend` to fetch
GeoBlacklight's stylesheets, and your CSS is compiled by Sass through Yarn.

```bash
node --version
yarn --version
```

!!! warning "Plan for a reindex"

    GeoBlacklight 5 adds new Solr `copyField` entries, and Solr only applies those when a document
    is indexed. Your existing records will keep working and keep being findable, but search
    relevance will not be fully correct until you reindex everything. Depending on how many records
    you have, this process could take a long time. See [step 8](#8-apache-solr-and-reindexing).

Finally, some ordinary but important housekeeping:

- **Work on a git branch**, not on `main`. Every deletion in this guide is recoverable if you do.
- **Do this on a test or staging server first** if you have one.
- **Do not delete your old application** until the new one has been running in production for a
  while.

## 1. Upgrade to GeoBlacklight 4.6 first

Do not jump straight from 4.5 to 5. GeoBlacklight **4.6** exists almost entirely to help with this
upgrade: when your application starts, it inspects your own configuration files and prints a list
of exactly what needs to change. That list is far more useful than any generic guide, because it
describes _your_ application.

Going through 4.6 also picks up changes that happened inside the 4.x series, which you would
otherwise have to sort out at the same time as everything else.

### Update the gem

`Gemfile`

```ruby
gem 'geoblacklight', '~> 4.6'
```

Then, from the top level of your application directory:

```bash
bundle install
```

### Boot the application and read the warnings

The warnings appear once each time the application starts. You do not need to start a web server
to see them — this command loads the application, prints the warnings, prints your version, and
exits without changing anything:

```bash
bin/rails runner "puts Geoblacklight::VERSION"
```

You should see `4.6.0` at the end, preceded by several lines that begin with
`DEPRECATION WARNING:`. A typical one looks like this:

```
DEPRECATION WARNING: Settings.TIMEOUT_DOWNLOAD is set to the GeoBlacklight 4 default 16, which is
deprecated; GeoBlacklight 5 uses 180 because 16 seconds is too short for many generated downloads
```

**Copy all of these lines into a text file.** They are your personal to-do list for the rest of
this upgrade, and you will want to refer back to them.

!!! tip "If you see no warnings at all"

    Your application may be configured to hide them. GeoBlacklight's warnings go through Rails'
    normal deprecation system, so this makes them print to your terminal:

    ```bash
    RAILS_ENV=development bin/rails runner "Geoblacklight.deprecation.behavior = :stderr; Geoblacklight::DeprecatedConfiguration.warn!"
    ```

Once you have upgraded to 5 and finished the work, you can silence GeoBlacklight's warnings with
this line, but there is no reason to do it before then:

`config/application.rb`

```ruby
Geoblacklight.deprecation.behavior = :silence
```

### What the warnings cover

A typical GeoBlacklight 4.5 application sees about eight lines. They fall into these groups.

**Settings that GeoBlacklight 5 removes** — `Settings.APPLICATION_LOGO_URL`,
`Settings.CARTO_ONECLICK_LINK`, and `Settings.LEAFLET.VIEWERS`. See [step 7](#7-application-settings).

**Settings whose default changed** — `Settings.ARCGIS_BASE_URL`, `Settings.TIMEOUT_DOWNLOAD`, and
`Settings.WMS_PARAMS.INFO_FORMAT`. These only warn if you never changed them from the
GeoBlacklight 4 default, so if you made a deliberate choice you will not be nagged about it.

**A setting GeoBlacklight 5 requires** — `Settings.DOWNLOAD_FORMATS.VECTOR`. This one matters more
than it looks: the setting was added in 5.x, but `config/settings.yml` is only written once when
you first install GeoBlacklight, so an upgrading application will not have it, and vector
downloads raise an error without it.

**A single line about your catalog controller** listing every change needed there. It is
deliberately one long line so it does not fill your terminal. See [step 6](#6-the-catalog-controller).

**Templates you have overridden** that GeoBlacklight 5 removes. If your application has, say,
`app/views/catalog/_show_downloads.html.erb`, you will be told which component replaces it.
See [step 5](#5-layouts-and-view-overrides).

**Translations you have customised** that GeoBlacklight 5 no longer looks up, and provider icon
names that were renamed.

**Methods on `SolrDocument`** that you override from an included module. GeoBlacklight 5 defines
these directly on the class, which silently wins over a module.

**Stale relationship keys**, if your settings file came from GeoBlacklight 4.0 and still uses the
single `MEMBER_OF` / `RELATION` / `REPLACES` / `REPLACED_BY` / `VERSION_OF` names.

**A jQuery line in your layout**, if the GeoBlacklight 4 installer's `$.fx.off` call is still
there. See [step 5](#remove-the-jquery-line-from-your-application-layout).

### Fix these now, while still on 4.x

Some items can be dealt with immediately. Your application keeps working on 4.6 afterwards, and
that is several things off the list before the harder work starts.

`config/settings.yml`

```diff
- TIMEOUT_DOWNLOAD: 16
+ TIMEOUT_DOWNLOAD: 180

- ARCGIS_BASE_URL: 'https://www.arcgis.com/home/webmap/viewer.html'
+ ARCGIS_BASE_URL: 'https://www.arcgis.com/apps/mapviewer/index.html'
```

Add the required download formats setting:

```yaml
DOWNLOAD_FORMATS:
  VECTOR:
    - "Shapefile"
    - "KMZ"
    - "GeoJSON"
    - "CSV"
```

If either of these lists contains the value `map`, remove that entry. In GeoBlacklight 5 the
viewer protocol is empty rather than `map` when a record has no viewer, so `map` will never match
again:

```yaml
SIDEBAR_STATIC_MAP:
HELP_TEXT:
  viewer_protocol:
```

**If your settings file was generated by GeoBlacklight 4.0, update `RELATIONSHIPS_SHOWN`.** This
block was restructured in 4.1.0 — each relationship split into an `_ANCESTORS` and a
`_DESCENDANTS` entry, so `MEMBER_OF` became `MEMBER_OF_ANCESTORS` and `MEMBER_OF_DESCENDANTS`, and
`REPLACED_BY` folded into `REPLACES_DESCENDANTS`. Because `config/settings.yml` is only written
when GeoBlacklight is first installed, an application generated by 4.0 still has the old shape
unless somebody reconciled it by hand, and GeoBlacklight 5 does not read the old names — the
affected relationships simply stop being displayed. GeoBlacklight 4.6 warns about this. Compare
your file against
[the current template](https://github.com/geoblacklight/geoblacklight/blob/main/lib/generators/geoblacklight/templates/settings.yml)
and copy the whole `RELATIONSHIPS_SHOWN` block across.

Finally, if you were warned about a `SolrDocument` method being overridden in a module, move that
method into the class body now. It works the same way on 4.x and will keep working on 5.x:

`app/models/solr_document.rb`

```ruby
class SolrDocument
  include Blacklight::Solr::Document
  include Geoblacklight::SolrDocument

  # Move the method here, after the include above.
  def provider
    # your version
  end
end
```

### Write these down for later

Everything else has to wait for the cutover, because the replacements do not exist yet in 4.x.
Setting `config.show.document_component = Geoblacklight::DocumentComponent` on GeoBlacklight 4.6,
for example, stops the application from starting at all — that class only ships in 5.x. The same
goes for the renamed icon translations, which depend on a `Settings.ICON_MAPPING` that 4.x does
not have, and for deleting overridden templates, which are still very much in use on 4.x.

So: keep the list, and work through it during step 5, 6 and 7 below.

## 2. Upgrade your existing application in place

Work through steps 3 to 8 in order, in your existing application. Do it on a git branch: the
application will not boot successfully until you have finished step 6, so do not be alarmed
partway through. Expect to see, in roughly this order, bundler resolution errors, then missing
stylesheet or JavaScript errors, then `NoMethodError` from your layout, then errors from your
catalog controller.

The one thing that makes this manageable is being willing to **give up overrides you inherited
rather than inherited on purpose**. The GeoBlacklight 4 installer copied a number of files into
your application, and porting all of them forward is where this upgrade tends to stall. UC
Berkeley's migration deleted every one of them and fell back to GeoBlacklight's defaults, then
re-applied only the customizations that were genuinely theirs. Step 5 says which files those are.

!!! tip "Do not start over on GeoBlacklight 5"

    You may be tempted to generate a brand new GeoBlacklight 5 application and copy your
    customizations into it, leaving your current site running while you work. That was reasonable
    advice for most of 5.x's life, and one institution upgraded that way successfully.

    It is not the right choice now. GeoBlacklight 6 is close — see the
    [Release Calendar](releases.md) for its current status — and a from-scratch rebuild is a big
    enough piece of work that you do not want to do it twice. If you genuinely want to rebuild
    rather than upgrade, wait and build on 6.

    Upgrading in place is not wasted effort in the meantime. Almost everything in this guide —
    Bootstrap 5, Propshaft, import maps, Blacklight 8 — is what GeoBlacklight 6 wants too. It
    accepts Blacklight 8, so the hardest part of this upgrade is not redone. The main thing it adds
    is a Rails 8 floor, where GeoBlacklight 5 still accepts Rails 6.1 and later.

## 3. Ruby, Rails, and the Gemfile

`Gemfile`

```diff
- gem 'blacklight', '~> 7.0'
- gem 'bootstrap', '~> 4.0'
- gem 'geoblacklight', '~> 4.6'
- gem 'jquery-rails'
- gem 'sassc-rails', '~> 2.1'
- gem 'sprockets', '< 4.0'
- gem 'sprockets-rails'
- gem 'vite_rails', '~> 3.0'
- gem 'webpacker', '~> 5.0'
+ gem 'bootstrap', '~> 5.3'
+ gem 'cssbundling-rails'
+ gem 'geoblacklight', '~> 5.3'
+ gem 'importmap-rails'
+ gem 'propshaft'
+ gem 'rsolr', '>= 1.0', '< 3'
```

Notes on the less obvious lines:

- **Remove `blacklight` entirely.** GeoBlacklight 5 depends on Blacklight 8 and will resolve the
  right version for you. Leaving a `~> 7.0` pin in place is the most common reason
  `bundle install` fails with a confusing conflict.
- **`rsolr` becomes explicit.** In 4.x it arrived indirectly through Blacklight 7.
- **`webpacker` should go** whether or not you were really using it. It is unmaintained, and
  several 4.x applications carry it without noticing.
- **Remove `handlebars_assets`** if you have it. GeoBlacklight 5 no longer uses Handlebars
  templates.
- `rails` needs no change unless you are below 6.1.

Set your Ruby version if it is below 3.2:

`.ruby-version`

```
3.4.10
```

Then:

```bash
bundle install
```

For the Blacklight side of this, Blacklight publishes its own
[release notes and upgrade guidance](https://github.com/projectblacklight/blacklight/releases) —
worth skimming, particularly if you have customised Blacklight itself rather than only
GeoBlacklight.

## 4. Stylesheets and JavaScript

This is the largest part of the upgrade. GeoBlacklight 4 used Sprockets for the core stylesheets
and JavaScript, usually with Vite bolted on to build just the OpenLayers and IIIF viewers.
GeoBlacklight 5 uses Propshaft, with import maps for JavaScript and Sass compiled through Yarn for
CSS.

### Files to delete

These all belong to the old setup and have no equivalent in GeoBlacklight 5. Using `git rm` means
you can get any of them back later:

```bash
git rm app/assets/config/manifest.js
git rm app/assets/javascripts/application.js
git rm app/assets/javascripts/geoblacklight.js
git rm app/assets/stylesheets/application.scss
git rm app/assets/stylesheets/_blacklight.scss
git rm app/assets/stylesheets/_geoblacklight.scss
```

If your application uses Vite, these go too:

```bash
git rm bin/vite config/vite.json vite.config.ts
git rm -r app/javascript/entrypoints
```

!!! tip "Keep your own stylesheets somewhere safe"

    `app/assets/stylesheets/_customizations.scss` is yours — keep it. If you have other local
    stylesheets that are not ready to move yet, one practical trick is to move them into a
    `app/assets/stylesheets/legacy_files/` directory and stop importing them, rather than deleting
    them. That way the site builds and you can bring rules back one at a time.

Be aware that GeoBlacklight 5 converted its own styles from Sass variables to CSS custom
properties. If your customizations worked by overriding a Sass variable such as
`$gbl-primary-color`, that override will no longer take effect, and it will fail quietly rather
than raising an error. Check your rendered site rather than assuming.

### The new stylesheet entry point

`app/assets/stylesheets/application.bootstrap.scss`

```scss
/* GeoBlacklight dependencies CSS */
@import url("https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.css");
@import url("https://cdn.jsdelivr.net/npm/leaflet.fullscreen@5.3.0/dist/Control.FullScreen.css");
@import url("https://cdn.jsdelivr.net/npm/ol@8.1.0/ol.css");

@import "bootstrap/scss/bootstrap";
@import "bootstrap-icons/font/bootstrap-icons";
@import "blacklight-frontend/app/assets/stylesheets/blacklight/blacklight";
@import "@geoblacklight/frontend/app/assets/stylesheets/geoblacklight/geoblacklight";
@import "customizations";
```

Compiled CSS is written to `app/assets/builds/`, which needs to exist and be committed:

```bash
mkdir -p app/assets/builds && touch app/assets/builds/.keep
```

### The new JavaScript entry point

`app/javascript/application.js`

```javascript
import "@hotwired/turbo-rails";
import "controllers";
import * as bootstrap from "bootstrap";
import githubAutoCompleteElement from "@github/auto-complete-element";
import Blacklight from "blacklight";
import Geoblacklight from "geoblacklight";
```

You do not need to pin GeoBlacklight's own JavaScript, or Leaflet, or OpenLayers, in
`config/importmap.rb`. The gem adds its own import map to your application automatically.

### Building CSS

`package.json`

```json
{
  "dependencies": {
    "@geoblacklight/frontend": "5.3.0",
    "@popperjs/core": "^2.11.8",
    "autoprefixer": "^10.5.0",
    "blacklight-frontend": "8.12.3",
    "bootstrap": "^5.3.8",
    "bootstrap-icons": "^1.13.1",
    "nodemon": "^3.1.14",
    "postcss": "^8.5.15",
    "postcss-cli": "^11.0.1",
    "sass": "^1.101.0"
  },
  "scripts": {
    "build:css:compile": "sass ./app/assets/stylesheets/application.bootstrap.scss:./app/assets/builds/application.css --no-source-map --load-path=node_modules",
    "build:css:prefix": "postcss ./app/assets/builds/application.css --use=autoprefixer --output=./app/assets/builds/application.css",
    "build:css": "yarn build:css:compile && yarn build:css:prefix",
    "watch:css": "nodemon --watch ./app/assets/stylesheets/ --ext scss --exec \"yarn build:css\""
  }
}
```

Match `@geoblacklight/frontend` and `blacklight-frontend` to the gem versions you actually
installed — check with `bundle list | grep -E 'geoblacklight|blacklight'`.

If you have a `Procfile.dev`, replace the Vite line with the CSS watcher:

`Procfile.dev`

```diff
- vite: bin/vite dev
- web: bin/rails s
+ web: bin/rails server
+ css: yarn watch:css
```

Then install and build once:

```bash
yarn install
yarn build:css
```

**`yarn build:css` must be part of your deployment**, before `assets:precompile`. If your
production CSS is missing after you deploy, this is almost always why.

### A note about Vite

GeoBlacklight 5 does still support Vite, using `ASSET_PIPELINE=vite` instead of
`ASSET_PIPELINE=importmap`. If you have a heavily customised Vite setup you may want that as a
stepping stone.

!!! warning "Vite is deprecated"

    The Vite asset pipeline will be removed in GeoBlacklight 6. Choosing it now means doing this
    part of the work twice. Unless you have a specific reason, move to import maps while you are
    already in here.

### If you wrote custom JavaScript

GeoBlacklight 5 rewrote its front end completely: the old `GeoBlacklight.Viewer` and
`GeoBlacklight.Modules` objects are gone, replaced by Stimulus controllers, and jQuery, Handlebars,
React and Clover IIIF are no longer dependencies. Local JavaScript that hooked into the old
objects will need rewriting. If your custom JavaScript is only analytics or similar, it will
probably be fine.

## 5. Layouts and view overrides

Read this section even if you think you have not customised any views. The GeoBlacklight 4
installer copied several files into your application, so you almost certainly have overrides you
did not choose.

!!! warning "Overridden templates fail silently"

    This is the most important thing to understand about this upgrade. If GeoBlacklight 5 removed
    a template that you had overridden, your copy does not cause an error. It is simply never
    rendered again, and your customisation disappears with no message anywhere. Nothing will tell
    you at the time — which is exactly why GeoBlacklight 4.6 warns you at boot instead. Work from
    that list.

### Delete the Blacklight base layout

`app/views/layouts/blacklight/base.html.erb`

The GeoBlacklight 4 installer put this file in almost every application. It calls
`openlayers_container?` and `iiif_manifest_container?`, both of which GeoBlacklight 5 deletes, so
on 5.x it raises `NoMethodError` on **every page**. It also references Vite entry points named
`ol` and `clover` that no longer exist.

On the import map path, GeoBlacklight 5 does not install a layout at all — Blacklight's own layout
is used. So the fix is to **delete your copy**:

```bash
git rm app/views/layouts/blacklight/base.html.erb
```

Deleting one of your own files feels wrong, but it is correct here. If you had local edits in that
file — a Google Analytics snippet, extra `<meta>` tags, a consortium banner — copy them out first.
Most of them belong in `app/views/layouts/application.html.erb` or in a `content_for :head` block.

### Remove the jQuery line from your application layout

`app/views/layouts/application.html.erb`

The GeoBlacklight 4 installer injected this line. jQuery is not part of GeoBlacklight 5, so it
raises `$ is not defined` when your tests run. GeoBlacklight 4.6 warns about it, naming whichever
layout it finds it in:

```diff
- <%= javascript_tag '$.fx.off = true;' if Rails.env.test? %>
```

### Your site header

`app/views/shared/_header_navbar.html.erb`

This is the single most commonly customised file in GeoBlacklight 4 applications, and it needs
attention. GeoBlacklight 5 no longer renders it — the header is a component now, and Blacklight
does not have a `shared/_header_navbar` template for you to fall back on either. If you leave your
copy in place it becomes dead code and your header branding vanishes.

Replace it with your own component. Create a subclass:

`app/components/my_header_component.rb`

```ruby
class MyHeaderComponent < Geoblacklight::HeaderComponent
end
```

Add a template beside it at `app/components/my_header_component.html.erb`, starting from
[GeoBlacklight's own](https://github.com/geoblacklight/geoblacklight/blob/main/app/components/geoblacklight/header_component.html.erb)
and re-applying your changes. Then point the configuration at it:

`app/controllers/catalog_controller.rb`

```ruby
config.header_component = MyHeaderComponent
```

Once it works, remove the old partial:

```bash
git rm app/views/shared/_header_navbar.html.erb
```

`app/views/shared/_footer.html.erb` and `app/views/shared/_user_util_links.html.erb` are also
commonly customised. These still exist in Blacklight 8, so your overrides continue to work, but
the surrounding Bootstrap 5 markup has changed and they may need visual adjustment.

### Partials that became components

If GeoBlacklight 4.6 warned you about any of these, replace your override with a subclass of the
listed component, in the same way as the header above.

| GeoBlacklight 4 partial                    | GeoBlacklight 5 replacement                            |
| ------------------------------------------ | ------------------------------------------------------ |
| `catalog/_show_downloads`                  | `Geoblacklight::DownloadLinksComponent`                |
| `catalog/_downloads_collapse`              | `Geoblacklight::DownloadLinksComponent`                |
| `catalog/_show_sidebar`                    | `Geoblacklight::Document::SidebarComponent`            |
| `catalog/_show_sidebar_static_map`         | `Geoblacklight::StaticMapComponent`                    |
| `catalog/_header_icons`                    | `Geoblacklight::HeaderIconsComponent`                  |
| `catalog/_index_split_default`             | `Geoblacklight::SearchResultComponent`                 |
| `catalog/_show_default_attribute_table`    | `Geoblacklight::AttributeTableComponent`               |
| `catalog/_show_default_display_note`       | `Geoblacklight::DisplayNoteComponent`                  |
| `catalog/_show_default_viewer_container`   | `Geoblacklight::ItemMapViewerComponent`                |
| `catalog/_show_web_services`               | `Geoblacklight::WebServicesLinkComponent`              |
| `catalog/_web_services`                    | `Geoblacklight::WebServicesComponent`                  |
| `catalog/_web_services_default`            | `Geoblacklight::WebServicesDefaultComponent`           |
| `catalog/_web_services_wfs`                | `Geoblacklight::WebServicesWfsComponent`               |
| `catalog/_web_services_wms`                | `Geoblacklight::WebServicesWmsComponent`               |
| `catalog/_arcgis`                          | `Geoblacklight::ArcgisComponent`                       |
| `catalog/_data_dictionary`                 | `Geoblacklight::DataDictionaryDownloadComponent`       |
| `relation/_relations`                      | `Geoblacklight::RelationsComponent`                    |
| `catalog/_show_header_default`             | the `title` slot of `Geoblacklight::DocumentComponent` |
| `catalog/_show_default_viewer_information` | removed, with no replacement                           |
| `catalog/_carto`                           | removed, with no replacement                           |
| `download/hgl`                             | removed, with no replacement                           |

`app/views/catalog/_home_text.html.erb` still exists in GeoBlacklight 5, so overrides of it keep
working — but its contents were rewritten to use a component for the homepage map, and Bootstrap 5
renamed classes such as `text-right` to `text-end`. Compare yours against the new version.

### SolrDocument methods

GeoBlacklight 5 defines fourteen `SolrDocument` readers directly on the class using Blacklight 8's
`attribute` mechanism: `display_note`, `geom_field`, `wxs_identifier`, `file_format`,
`rights_field_data`, `provider`, `resource_type`, `resource_class`, `title`, `creator`,
`publisher`, `identifiers`, `issued` and `format`.

Two consequences:

**Overrides in an included module stop working.** A definition on the class always wins over one
in a module. If you override any of the above from a concern, move it into the `SolrDocument` class
body, after `include Geoblacklight::SolrDocument`.

**They return nothing instead of an empty string** when the Solr field is missing. On 4.x
`document.geom_field` gave you `""`; on 5.x it gives you `nil`. So any local code doing
`document.geom_field.empty?` or `.split(...)` will now raise. Search your application for these
method names and check for that pattern. Two related changes in the same vein: a record whose
access rights field is present but blank is no longer treated as restricted, and `publisher` is
now single-valued, so citations for a record with several publishers will only show the first.

## 6. The catalog controller

`app/controllers/catalog_controller.rb`

This file lives in your repository, so it is manual work — but it is a short and well-defined
change. GeoBlacklight 4.6 prints the whole list as a single warning line.

**The good news first: your field configuration does not change at all.** Every
`config.add_facet_field`, `add_index_field`, `add_show_field`, `add_search_field` and
`add_sort_field` line stays exactly as it is, along with `Settings.FIELDS`, `GBL_PARAMS` and your
search builder. If most of your controller is field configuration — and for most institutions it
is — you can leave nearly all of it alone.

Replace the presenter and partial configuration with components:

```diff
- config.show.partials.delete(:show)
- config.show.partials << "show_default_display_note"
- config.show.partials << "show_default_viewer_container"
- config.show.partials << "show_default_attribute_table"
- config.show.partials << "show_default_viewer_information"
- config.show.partials << :show
-
- ##
- # Configure the index document presenter.
- config.index.document_presenter_class = Geoblacklight::DocumentPresenter
+ config.show.document_component = Geoblacklight::DocumentComponent
+ config.show.sidebar_component = Geoblacklight::Document::SidebarComponent
+ config.header_component = Geoblacklight::HeaderComponent
```

Add the search result component, just above the title field:

```diff
+ config.index.document_component = Geoblacklight::SearchResultComponent
  config.index.title_field = Settings.FIELDS.TITLE
```

Show tools take a `component:` rather than a `partial:`, and the Carto tool goes away:

```diff
- config.add_show_tools_partial :carto, partial: "carto", if: proc { |_context, _config, options| options[:document] && options[:document].carto_reference.present? }
- config.add_show_tools_partial :arcgis, partial: "arcgis", if: proc { |_context, _config, options| options[:document] && options[:document].arcgis_urls.present? }
- config.add_show_tools_partial :data_dictionary, partial: "data_dictionary", if: proc { |_context, _config, options| options[:document] && options[:document].data_dictionary_download.present? }
+ config.add_show_tools_partial :arcgis, component: Geoblacklight::ArcgisComponent, if: proc { |_context, _config, options| options[:document] && options[:document].arcgis_urls.present? }
+ config.add_show_tools_partial :data_dictionary, component: Geoblacklight::DataDictionaryDownloadComponent, if: proc { |_context, _config, options| options[:document] && options[:document].data_dictionary_download.present? }
```

The `:metadata` show tool is unchanged.

Finally, in the `web_services` method, Blacklight 8 changed what `action_documents` returns:

```diff
  def web_services
-   @response, @documents = action_documents
+   @docs = action_documents
```

If you set `config.header_component` to your own subclass in
[step 5](#your-site-header), use that class here instead of `Geoblacklight::HeaderComponent`.

You may also have a `require 'blacklight/catalog'` line at the top of the file, left over from an
older GeoBlacklight. It is unnecessary now and can be removed.

If your controller has drifted a long way from the default, comparing against
[the current template](https://github.com/geoblacklight/geoblacklight/blob/main/lib/generators/geoblacklight/templates/catalog_controller.rb)
is usually quicker than working line by line.

## 7. Application settings

`config/settings.yml`

Because this file is only written when GeoBlacklight is first installed, it never gets updated for
you. Do not copy your old file over a new one — work through the differences.

**Remove these**, all reported by GeoBlacklight 4.6:

```diff
- # Configurable Logo Used for CartoDB export
- APPLICATION_LOGO_URL: 'http://geoblacklight.org/images/geoblacklight-logo.png'
-
- # Carto OneClick Service https://carto.com/engine/open-in-carto/
- CARTO_ONECLICK_LINK: 'http://oneclick.carto.com/'
```

Also remove the whole `VIEWERS:` block nested under `LEAFLET:`. Viewer controls such as opacity
and fullscreen are no longer configurable per protocol.

**Change these defaults:**

```diff
- ARCGIS_BASE_URL: 'https://www.arcgis.com/home/webmap/viewer.html'
+ ARCGIS_BASE_URL: 'https://www.arcgis.com/apps/mapviewer/index.html'

- TIMEOUT_DOWNLOAD: 16
+ TIMEOUT_DOWNLOAD: 180

  WMS_PARAMS:
-   :INFO_FORMAT: 'text/html'
+   :INFO_FORMAT: 'application/json'
```

`INFO_FORMAT` is worth doing properly rather than leaving alone. GeoBlacklight 5 asks WMS servers
for JSON. It can still build an attribute table from an HTML response, but it cannot then highlight
the feature you clicked on the map, and it cannot tell an empty result from a real one.

**Add these**, which are new in 5.x. `DOWNLOAD_FORMATS` is required — vector downloads raise an
error without it:

```yaml
DOWNLOAD_FORMATS:
  VECTOR:
    - "Shapefile"
    - "KMZ"
    - "GeoJSON"
    - "CSV"

ICON_MAPPING:
  chicago: university-of-chicago
  illinois: university-of-illinois-urbana-champaign
  iowa: university-of-iowa
  maryland: university-of-maryland
  michigan-state: michigan-state-university
  michigan: university-of-michigan
  minnesota: university-of-minnesota
  nebraska: university-of-nebraska-lincoln
  ohio-state: the-ohio-state-university
  penn-state: pennsylvania-state-university
  purdue: purdue-university
  wisconsin: university-of-wisconsin-madison
```

There are also new `LEAFLET` options in 5.x worth knowing about, none of them required: a
`SELECTED_COLOR`, per-view `BOUNDSOVERLAY` colours, a `SIDEBAR` option that moves the attribute
table beside the map, and a `SLEEP` group that stops the map from capturing your scroll wheel
until you click it. Copy the defaults from
[the template](https://github.com/geoblacklight/geoblacklight/blob/main/lib/generators/geoblacklight/templates/settings.yml)
and adjust to taste.

### Translations

`config/locales/geoblacklight.en.yml`

If GeoBlacklight 4.6 warned you about translation keys, they are keys 5.x no longer looks up, so
your wording would quietly revert to the default. `geoblacklight.references.services_close` became
`blacklight.modal.close`; `geoblacklight.citation.retrieved_from` is gone because citations now end
with the record's URL; and the `geoblacklight.tools.open_carto` and `geoblacklight.download.hgl_*`
keys are gone with the features they described.

Provider icons are the fiddly one. Twelve short names were replaced by longer ones, and GeoBlacklight
5 routes them through the `ICON_MAPPING` setting above. If you had translated
`blacklight.icon.wisconsin`, rename it to `blacklight.icon.university-of-wisconsin-madison`. If you
added your own icons for institutions not in that list, they are unaffected.

## 8. Apache Solr and reindexing

**GeoBlacklight 5 recommends Solr 9.** The version pinned for development is 9.6.1.

### Update the configuration files

`solr/conf/schema.xml`

GeoBlacklight 5 adds three `copyField` entries and removes one:

```diff
- <copyField source="id"                   dest="layer_slug_ti"         maxChars="100"/>
+ <copyField source="gbl_resourceClass_sm" dest="gbl_resourceClass_tmi" maxChars="100"/>
+ <copyField source="gbl_resourceType_sm"  dest="gbl_resourceType_tmi"  maxChars="1000"/>
+ <copyField source="id"                   dest="id_ti"                 maxChars="100"/>
```

`solr/conf/solrconfig.xml`

The search field boosts are re-pointed to match, and remote streaming is switched off, which is
the Solr 9 default and closes a known security hole:

```diff
- <requestParsers enableRemoteStreaming="true" multipartUploadLimitInKB="2048000" formdataUploadLimitInKB="2048"/>
+ <requestParsers multipartUploadLimitInKB="2048000" formdataUploadLimitInKB="2048"/>
```

Rather than editing by hand, take both files from
[the current release](https://github.com/geoblacklight/geoblacklight/tree/main/solr/conf) and
re-apply any local changes — for example an extra field, or a different boost. Then upload the
configuration set to your Solr server and reload the core.

### Reindex

**A full reindex is required.** Solr applies `copyField` rules when a document is indexed, not when
it is searched, so records indexed under the old configuration will have those new fields empty.
Your site will keep working and records will still be findable through the general text index, but
relevance ranking will not be right until every record has been reindexed.

Your existing metadata does not need to change — the Aardvark records you already have are what you
reindex.

### Local Solr now uses Docker

GeoBlacklight 4 shipped a `.solr_wrapper` file and could start Solr by itself. GeoBlacklight 5
uses Docker instead:

```bash
git rm .solr_wrapper
```

```bash
bundle exec rake geoblacklight:server
```

That command now starts Solr in Docker along with your Rails server. It affects development only;
how you run Solr in production is unchanged.

## 9. Features that go away

Check this list against what your users actually use. All of these are removed with no replacement,
and none of them will announce their absence.

**Carto OneClick.** The "Open in Carto" export is gone entirely, along with
`Settings.CARTO_ONECLICK_LINK` and `Settings.APPLICATION_LOGO_URL`, which existed only to serve
it. Note that `CARTO_ONECLICK_LINK` is present as an untouched default in nearly every 4.x
application, so its presence in your settings file does not mean anyone was using it — check your
live site before assuming you have lost something.

**Harvard Geospatial Library downloads.** The HGL download integration is removed. If your records
have references with a download type of `harvard-hgl`, those download buttons will stop working.
This one is easy to overlook because it looks like dead legacy code and is not: at least one
institution serves HGL downloads in production today.

**Email and SMS delivery of records.** These moved out of GeoBlacklight core. If you want to keep
them you can re-enable Blacklight's own versions; if not, comment out the extensions in
`app/models/solr_document.rb` and remove the tools from your catalog controller.

**Per-protocol viewer controls.** `Settings.LEAFLET.VIEWERS` let you configure opacity and
fullscreen controls separately for each viewer protocol. There is no equivalent.

**jQuery, Handlebars, React and Clover IIIF** are no longer dependencies. IIIF viewing still works,
through a different viewer.

## 10. Check your work

Start the application and look at the actual pages. Automated tests will not catch a template that
silently stopped rendering.

```bash
bundle exec rake geoblacklight:server
```

Then walk through this list:

- [ ] The **homepage** loads, and the map on it works.
- [ ] Your **institutional branding** is present in the header. This is the one most likely to
      have quietly disappeared — see [step 5](#your-site-header).
- [ ] A **search** returns results, and the results map shows bounding boxes.
- [ ] Every **facet** appears, with the right labels, and filtering works.
- [ ] A **record page** loads, showing the map viewer and the metadata table.
- [ ] The **provider icons** are right — these depend on the `ICON_MAPPING` setting.
- [ ] **Download buttons** work, for both direct file downloads and generated formats such as
      Shapefile and GeoJSON. This exercises `DOWNLOAD_FORMATS`.
- [ ] The **web services** panel opens and the copy-to-clipboard buttons work.
- [ ] **Clicking a feature** on a WMS layer shows its attributes. This exercises `INFO_FORMAT`.
- [ ] **Related records** appear on records that have relationships.
- [ ] **Login** works, if your application has authentication.
- [ ] Your **footer** and any local pages look right under Bootstrap 5.
- [ ] The **deprecation warnings are gone** from your boot output.

Then reindex, and check relevance ranking on a few searches you know well.

## If you get stuck

The GeoBlacklight community is the best resource here, and questions from people doing this
upgrade are useful to everyone. See the [Community page](../community.md) for the Slack channel and
the community meeting schedule.

Two institutions have done this upgrade in public, and their commits are worth reading when a
step does not go as described:

- **UC Berkeley** upgraded in place, in
  [BerkeleyLibrary/geodata#76](https://github.com/BerkeleyLibrary/geodata/pull/76) — one merged pull
  request covering 53 files. This is the closest thing to a complete worked example of the path
  described here, and it is where the advice about deleting inherited overrides comes from.
- **Columbia** rebuilt instead, on the
  [`geoblacklight5` branch of cul/lito-geodata](https://github.com/cul/lito-geodata/tree/geoblacklight5)
  — one commit per customisation, starting from generator output. Not the route to take today, for
  the reasons in [step 2](#2-upgrade-your-existing-application-in-place), but a useful inventory of
  what an institution actually has to carry across.

Neither is a template to copy exactly. Both bundled other work — Berkeley upgraded Ruby and Rails
in the same pull request — so read them as evidence of what the real work looked like, not as
instructions.
