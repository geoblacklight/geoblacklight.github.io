# Upgrading to GeoBlacklight 5

This guide is for anyone running a GeoBlacklight 4.x application who wants to move to
GeoBlacklight 5. You can do it, and this guide is here to help! Version 4 support ends
in 2026 (see the [Release Calendar](releases.md)), so this is worth planning, but you
can take it in stages rather than in one weekend.

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

Although GeoBlacklight 5 technically supports Vite, it is unsupported in v6, and
new installations using Vite are discouraged. If your application uses Vite, now
is a good time to migrate to using importmaps instead.

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

## 1. Upgrade to the latest GeoBlacklight 4 first

GeoBlacklight 4.6 and later include changes made specifically to help with this
upgrade: when your application starts, it inspects your own configuration files and prints a list
of exactly what needs to change. That list is far more useful than any generic guide, because it
describes _your_ application.

### Update the gem

`Gemfile`

```ruby
gem 'geoblacklight', '~> 4.7'
```

Then, from the top level of your application directory:

```bash
bundle install
```

### Boot the application and read the warnings

The warnings appear once each time the application starts. GeoBlacklight sends them through
Rails' normal deprecation system, so they go wherever your application sends deprecation
warnings — in a standard Rails 7.1 or newer application, that is `log/development.log`, not
your terminal. Make them print to the terminal while you work through this guide:

`config/environments/development.rb`

```diff
- config.active_support.deprecation = :log
+ config.active_support.deprecation = :stderr
```

You do not need to start a web server to see them. This command loads the application, prints
the warnings, prints your version, and exits without changing anything. It also saves everything
it prints to a file called `gbl5-warnings.txt`:

```bash
bin/rails runner 'puts Geoblacklight::VERSION' 2>&1 | tee gbl5-warnings.txt
```

You should see your GeoBlacklight version at the end, preceded by several lines that begin with
`DEPRECATION WARNING:`. A typical one looks like this:

```
DEPRECATION WARNING: Settings.TIMEOUT_DOWNLOAD is set to the GeoBlacklight 4 default 16, which is
deprecated; GeoBlacklight 5 uses 180 because 16 seconds is too short for many generated downloads
```

**Keep that file.** It is your personal to-do list for the rest of this upgrade, and you will
want to refer back to it. Run the command again whenever you want to see what is left.

!!! tip "If you see no warnings at all"

    Make sure you are running in development, and that nothing in your `config/` directory sets
    `config.active_support.report_deprecations = false`. That setting silences every deprecation
    warning, whatever the line above says. New Rails applications set it in
    `config/environments/production.rb`.

Once you are on GeoBlacklight 5, the same command lists what **GeoBlacklight 6** will change, in
the same way. Expect a new set of warnings after this upgrade — including some about settings this
guide asks you to add, which GeoBlacklight 6 no longer reads. They are not a sign that anything
went wrong. If you would rather not see them on every boot, you can silence GeoBlacklight's
warnings, but you will want them back when you plan the move to 6. The line has to go in an
initializer; in `config/application.rb` it runs too early, and Rails 7.1 and newer overwrite it
with your `config.active_support.deprecation` setting.

`config/initializers/geoblacklight.rb`

```ruby
Geoblacklight.deprecation.behavior = :silence
```

### What the warnings cover

How many lines you get depends on how much your application has been customized — anything from
a handful to several dozen. They fall into these groups.

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

**Translations you have customized** that GeoBlacklight 5 no longer looks up, and provider icon
names that were renamed. These are reported one line per key, so this group is often the largest.
An application with a copy of GeoBlacklight's whole `geoblacklight.en.yml` gets around twenty
lines from it alone — twelve for renamed icons and six for Harvard Geospatial Library downloads —
but most of them take moments to fix. See [below](#fix-these-now-while-still-on-4x).

**Methods on `SolrDocument`** that you override from an included module. GeoBlacklight 5 defines
these directly on the class, which silently wins over a module.

**Stale relationship keys**, if your settings file came from GeoBlacklight 4.0 and still uses the
single `MEMBER_OF` / `RELATION` / `REPLACES` / `REPLACED_BY` / `VERSION_OF` names.

**A jQuery line in your layout**, if the GeoBlacklight 4 installer's `$.fx.off` call is still
there. See [step 5](#clean-up-your-application-layout).

### Fix these now, while still on 4.x

Some items can be dealt with immediately. Your application keeps working on 4.7 afterwards, and
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
affected relationships simply stop being displayed. GeoBlacklight 4.7 warns about this. Compare
your file against
[the GeoBlacklight 5 template](https://github.com/geoblacklight/geoblacklight/blob/release-5.x/lib/generators/geoblacklight/templates/settings.yml)
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

If you were warned about translation keys, look at each one in your locale file. Some applications
copied GeoBlacklight's whole locale file at some point, so most of these keys usually still hold
GeoBlacklight's own wording. Delete every key whose wording you never changed — GeoBlacklight 4
ships the same text, so your site will look exactly the same. Only the keys you really did reword
need to wait for [step 7](#translations).

### Write these down for later

Everything else has to wait for the cutover, because the replacements do not exist yet in 4.x.
Setting `config.show.document_component = Geoblacklight::DocumentComponent` on GeoBlacklight 4.7,
for example, stops the application from starting at all — that class only ships in 5.x. The same
goes for the renamed icon translations, which depend on a `Settings.ICON_MAPPING` that 4.x does
not have, and for deleting overridden templates, which are still very much in use on 4.x.

So: keep the list, and work through it during step 5, 6 and 7 below.

!!! note "A good place to pause"

    You now have an updated GeoBlacklight 4 application. If all you wanted was the latest 4.x
    release, you can stop here and deploy. Everything from step 2 onward is the move to
    GeoBlacklight 5, and it can wait until you are ready.

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
    is a Rails 8 floor, where the GeoBlacklight 5 setup in this guide works on Rails 7.0 and later.

## 3. Ruby, Rails, and the Gemfile

`Gemfile`

Remove whichever of these gems your Gemfile has — most applications have only some of them,
depending on which versions of Rails and GeoBlacklight they started from — and add the new ones.
Bundler does not care about order, so you can edit the existing lines where they are and add the
new gems anywhere at the top level of the file, outside any `group` block. For a real example of
this change, see the `Gemfile` diff in UC Berkeley's
[upgrade pull request](https://github.com/BerkeleyLibrary/geodata/pull/76/files).

```diff
- gem 'blacklight', '~> 7.0'
- gem 'bootstrap', '~> 4.0'
- gem 'geoblacklight', '~> 4.7'
- gem 'jquery-rails'
- gem 'sass-rails', '>= 6'
- gem 'sassc-rails', '~> 2.1'
- gem 'sprockets', '< 4.0'
- gem 'sprockets-rails'
- gem 'vite_rails', '~> 3.0'
- gem 'webpacker', '~> 5.0'
+ gem 'bootstrap', '~> 5.3'
+ gem 'cssbundling-rails'
+ gem 'geoblacklight', '~> 5.4'
+ gem 'importmap-rails'
+ gem 'propshaft'
+ gem 'rsolr', '>= 1.0', '< 3'
+ gem 'stimulus-rails'
+ gem 'turbo-rails'
```

Notes on the less obvious lines:

- **Remove `blacklight` entirely.** GeoBlacklight 5 depends on Blacklight 8 and will resolve the
  right version for you. Leaving a `~> 7.0` pin in place is the most common reason
  `bundle install` fails with a confusing conflict.
- **Remove every Sprockets gem:** `sprockets`, `sprockets-rails`, `sass-rails` and `sassc-rails`.
  `sass-rails` is the easy one to miss, because its name does not mention Sprockets, but it
  depends on `sassc-rails`, which loads Sprockets alongside Propshaft. Propshaft's own
  [upgrade guide](https://github.com/rails/propshaft/blob/main/UPGRADING.md) asks you to remove
  all of them.
- **`rsolr` becomes explicit.** In 4.x it arrived indirectly through Blacklight 7.
- **`stimulus-rails` and `turbo-rails`** may already be there if your application was generated
  by Rails 7. If not, add them: GeoBlacklight 5's map viewers are Stimulus controllers, and
  without `stimulus-rails` they never load.
- **`webpacker` should go** whether or not you were really using it. It is unmaintained, and
  several 4.x applications carry it without noticing.
- **Remove `handlebars_assets`** if you have it. GeoBlacklight 5 no longer uses Handlebars
  templates.
- **You need Rails 7.0 or newer.** GeoBlacklight 5 itself accepts Rails 6.1, but Propshaft does
  not, so a Rails 6.1 application has to upgrade Rails as part of this step. On Rails 7.0 or
  newer, `rails` needs no change.

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

!!! tip "Sort out your own stylesheets first"

    Look through `app/assets/stylesheets/` before you delete anything. **Keep
    `_customizations.scss`**: the new stylesheet entry point below imports it, and the CSS build
    fails without it. For anything else you find there:

    - **Copies of GeoBlacklight 4's own stylesheets** can usually go. GeoBlacklight 4 kept its
      styles in a `modules/` directory, in files such as `_base.scss`, `_styles.scss`,
      `item.scss`, `results.scss` and `sidebar.scss`, and some applications copied that directory
      in to override it. GeoBlacklight 5 has its own styles, so check whether these files hold any
      changes of yours, and delete them once you have rescued those.
    - **Stylesheets of your own** can stay where they are. Import them at the end of the new
      entry point, as described [below](#the-new-stylesheet-entry-point).
    - **Stylesheets that are not ready to move yet** can go into an
      `app/assets/stylesheets/legacy_files/` directory, without being imported, rather than being
      deleted. That way the site builds and you can bring rules back one at a time.

These all belong to the old setup and have no equivalent in GeoBlacklight 5. Using `git rm` means
you can get any of them back later. Not every application has every file, and `git rm` removes
nothing at all if even one of the files it is given is missing, so `--ignore-unmatch` tells it to
carry on past those:

```bash
git rm --ignore-unmatch app/assets/config/manifest.js
git rm --ignore-unmatch app/assets/javascripts/application.js
git rm --ignore-unmatch app/assets/javascripts/geoblacklight.js
git rm --ignore-unmatch app/assets/stylesheets/application.scss
git rm --ignore-unmatch app/assets/stylesheets/_blacklight.scss
git rm --ignore-unmatch app/assets/stylesheets/_geoblacklight.scss
```

If your application uses Vite, these go too. The name of the Vite configuration file depends on
how Vite was set up, so this lists the common ones:

```bash
git rm --ignore-unmatch bin/vite config/vite.json vite.config.ts vite.config.mts vite.config.js
git rm -r --ignore-unmatch app/javascript/entrypoints
```

Be aware that GeoBlacklight 5 converted its own styles from Sass variables to CSS custom
properties. If your customizations worked by overriding a GeoBlacklight Sass variable such as
`$gbl-primary-color`, that override will no longer take effect, and it will fail quietly rather
than raising an error. Bootstrap and Blacklight variables, such as `$primary` or `$logo-image`,
still work when you set them in `_customizations.scss`. Check your rendered site rather than
assuming.

Your stylesheets are now compiled by plain Sass rather than through Sprockets, which has two
consequences. Sprockets directives such as `//= require` no longer do anything, so replace them
with `@import`. And Sprockets' helper functions, such as `image_url()` and `asset_path()`, no
longer exist; Propshaft looks for plain `url()` references instead, with a leading `/`, and fills
in the right path for you. The `_customizations.scss` that GeoBlacklight 4 installed uses one of
these for the logo, so check yours:

`app/assets/stylesheets/_customizations.scss`

```diff
- $logo-image: image_url('blacklight/logo.svg') !default;
+ $logo-image: url('/blacklight/logo.svg') !default;
```

### The new stylesheet entry point

`app/assets/stylesheets/application.bootstrap.scss`

```scss
/* GeoBlacklight dependencies CSS */
@import url("https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.css");
@import url("https://cdn.jsdelivr.net/npm/leaflet.fullscreen@5.3.0/dist/Control.FullScreen.css");
@import url("https://cdn.jsdelivr.net/npm/ol@8.1.0/ol.css");

@import "customizations";
@import "bootstrap/scss/bootstrap";
@import "bootstrap-icons/font/bootstrap-icons";
@import "blacklight-frontend/app/assets/stylesheets/blacklight/blacklight";
@import "@geoblacklight/frontend/app/assets/stylesheets/geoblacklight/geoblacklight";
```

This is the same order GeoBlacklight 4 used, and the one a new GeoBlacklight 5 application gets.
`_customizations.scss` comes first so that the Sass variables it sets — Bootstrap's colours,
Blacklight's `$logo-image` — are in place before Bootstrap and Blacklight read them. That also
means the CSS rules in it come _before_ GeoBlacklight's, just as they did in GeoBlacklight 4, so a
rule of yours can lose to one of GeoBlacklight's with the same selector. Put rules like that, and
any other stylesheets of your own, in separate files and import them at the very end:

```scss
@import "local_styles";
```

Compiled CSS is written to `app/assets/builds/`, which needs to exist and be committed:

```bash
mkdir -p app/assets/builds && touch app/assets/builds/.keep
```

Bootstrap Icons' font files are served straight from `node_modules`, so Propshaft needs to be told
where to find them. This is the same line that new applications get:

`config/initializers/assets.rb`

```ruby
Rails.application.config.assets.paths << Rails.root.join("node_modules/bootstrap-icons/font")
```

If the same file adds anything to `config.assets.precompile`, remove that line. Propshaft has no
precompile list, so the line stops your application from booting.

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

Each of these imports needs an entry in your import map. You do not need to pin GeoBlacklight's
own JavaScript, Blacklight's, Leaflet or OpenLayers: the GeoBlacklight and Blacklight gems add
those to your application automatically. Everything else is up to you. A new application gets
these lines from installers that only run on an application that boots, which yours will not do
until step 6, so add them by hand:

`config/importmap.rb`

```ruby
pin "application"
pin "@hotwired/turbo-rails", to: "turbo.min.js"
pin "@hotwired/stimulus", to: "stimulus.min.js"
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js"
pin_all_from "app/javascript/controllers", under: "controllers"

pin "@github/auto-complete-element", to: "https://cdn.jsdelivr.net/npm/@github/auto-complete-element@3.8.0/+esm"
pin "@popperjs/core", to: "https://ga.jspm.io/npm:@popperjs/core@2.11.6/dist/esm/popper.js"
pin "bootstrap", to: "https://ga.jspm.io/npm:bootstrap@5.3.8/dist/js/bootstrap.esm.js"
```

If you already have this file, add whichever of these lines it is missing.

GeoBlacklight's map viewers are Stimulus controllers, and they register themselves with the
Stimulus application that `import "controllers"` starts. If you do not already have these two
files, create them — without them, the maps silently never appear:

`app/javascript/controllers/application.js`

```javascript
import { Application } from "@hotwired/stimulus";

const application = Application.start();

// Configure Stimulus development experience
application.debug = false;
window.Stimulus = application;

export { application };
```

`app/javascript/controllers/index.js`

```javascript
// Import and register all your controllers from the importmap via controllers/**/*_controller
import { application } from "controllers/application";
import { eagerLoadControllersFrom } from "@hotwired/stimulus-loading";
eagerLoadControllersFrom("controllers", application);
```

### Building CSS

With import maps, `package.json` is only used to build your CSS. Replace its `dependencies` and
`scripts` with these, and delete the Vite packages from `devDependencies` — or the whole section,
if they were all it held:

`package.json`

```json
{
  "dependencies": {
    "@geoblacklight/frontend": "5.4.0",
    "@popperjs/core": "^2.11.8",
    "autoprefixer": "^10.5.0",
    "blacklight-frontend": "8.13.0",
    "bootstrap": "^5.3.8",
    "bootstrap-icons": "^1.13.1",
    "nodemon": "^3.1.14",
    "postcss": "^8.5.15",
    "postcss-cli": "^11.0.1",
    "sass": "^1.101.0"
  },
  "scripts": {
    "build:css:compile": "sass ./app/assets/stylesheets/application.bootstrap.scss:./app/assets/builds/application.css --no-source-map --load-path=node_modules --quiet-deps --silence-deprecation=import,color-functions,global-builtin,if-function",
    "build:css:prefix": "postcss ./app/assets/builds/application.css --use=autoprefixer --output=./app/assets/builds/application.css",
    "build:css": "yarn build:css:compile && yarn build:css:prefix",
    "watch:css": "nodemon --watch ./app/assets/stylesheets/ --ext scss --exec \"yarn build:css\""
  }
}
```

Match `@geoblacklight/frontend` and `blacklight-frontend` to the gem versions you actually
installed — check with `bundle list | grep -E 'geoblacklight|blacklight'`.

The `--quiet-deps` and `--silence-deprecation` options hide deprecation warnings about Bootstrap's
and Blacklight's Sass, and about the `@import` rules in your entry point. Recent versions of Sass
print several screens of these, and none of them affect the CSS you get.

If you added JavaScript packages of your own to `package.json` — `blacklight-range-limit` and
`chart.js`, say — they are not loaded from here any more. Pin them in `config/importmap.rb`
instead, following each package's own instructions for import maps, and keep them in
`package.json` only if your stylesheets import from them. `@hotwired/turbo-rails` does not belong
here either: the `turbo-rails` gem provides it.

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
    you at the time — which is exactly why GeoBlacklight 4.7 warns you at boot instead. Work from
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

### Clean up your application layout

`app/views/layouts/application.html.erb`

The GeoBlacklight 4 installer injected this line. jQuery is not part of GeoBlacklight 5, so it
raises `$ is not defined` when your tests run. GeoBlacklight 4.7 warns about it, naming whichever
layout it finds it in:

```diff
- <%= javascript_tag '$.fx.off = true;' if Rails.env.test? %>
```

While you are in this file, remove any tags that load assets through Vite or Sprockets, and load
the new stylesheet and import map instead, the same way Blacklight's own layout does:

```diff
- <%= vite_client_tag %>
- <%= vite_javascript_tag 'application' %>
- <%= javascript_include_tag 'application' %>
+ <%= stylesheet_link_tag "application", "data-turbo-track": "reload" %>
+ <%= javascript_importmap_tags %>
```

Your layout may not have all of these lines, and the Vite ones may name a different entry point
or include a `vite_stylesheet_tag` as well; remove them all. If you already have a
`stylesheet_link_tag "application"`, keep it rather than adding a second one.

### Your site header

`app/views/shared/_header_navbar.html.erb`

This is the single most commonly customised file in GeoBlacklight 4 applications, and it needs
attention. GeoBlacklight 5 no longer renders it — the header is a component now, and Blacklight
does not have a `shared/_header_navbar` template for you to fall back on either. If you leave your
copy in place it becomes dead code and your header branding vanishes.

Do not paste your old partial into a new component, though: the GeoBlacklight 5 header is built
differently. It renders Blacklight's top navigation bar, which holds the logo and your user
links, then the homepage headline, then the search bar. The GeoBlacklight 4 partial built all of
that by hand, in Bootstrap 4 markup.

Instead, start by finding out what you actually changed: compare your copy with
[GeoBlacklight 4's original](https://github.com/geoblacklight/geoblacklight/blob/release-4.x/app/views/shared/_header_navbar.html.erb).
Often the only real changes are a logo and a few links, and most changes like that have a simpler
home now than a component:

- **A logo:** set `$logo-image` in `_customizations.scss` (see [step 4](#files-to-delete)), along
  with `$logo-width` and `$logo-height` if your image is not 150 by 50 pixels.
- **Links or menus beside the logo:** `app/views/shared/_user_util_links.html.erb`, which
  Blacklight 8 still renders (see below).
- **The homepage headline:** the `geoblacklight.home.headline` and
  `geoblacklight.home.search_heading` translations.

Only if a change does not fit any of those do you need to replace the header with your own
component. To do that, create a subclass:

`app/components/my_header_component.rb`

```ruby
class MyHeaderComponent < Geoblacklight::HeaderComponent
end
```

Add a template beside it at `app/components/my_header_component.html.erb`. Copy
[GeoBlacklight's own](https://github.com/geoblacklight/geoblacklight/blob/release-5.x/app/components/geoblacklight/header_component.html.erb)
into it, and make your changes to that copy. Then point the configuration at it:

`app/controllers/catalog_controller.rb`

```ruby
config.header_component = MyHeaderComponent
```

Whichever route you took, once your header looks right, remove the old partial:

```bash
git rm app/views/shared/_header_navbar.html.erb
```

`app/views/shared/_footer.html.erb` and `app/views/shared/_user_util_links.html.erb` are also
commonly customised. These still exist in Blacklight 8, so your overrides continue to work, but
the surrounding Bootstrap 5 markup has changed and they may need visual adjustment.

### Partials that became components

This section is about template files in your application's `app/views/` directory. Your catalog
controller may list some of the same names in `config.show.partials`; that is a separate change,
covered in [step 6](#6-the-catalog-controller), and there you simply delete those lines.
`Geoblacklight::DocumentComponent` renders the display note, map viewer and attribute table
itself.

If GeoBlacklight 4.7 warned you about any of these templates, first decide whether you still need
the customization. Your copy was written against GeoBlacklight 4's markup, and GeoBlacklight 5's
default may already do what you wanted. If it does not, how you bring your change back depends on
the component.

These can be replaced directly. Subclass the component, make your changes in the subclass —
copying GeoBlacklight's template beside it if you are changing the markup — and point your
configuration at it, in the same way as the header above:

| GeoBlacklight 4 partial        | GeoBlacklight 5 replacement                            | Configure your subclass with                     |
| ------------------------------ | ------------------------------------------------------ | ------------------------------------------------ |
| `catalog/_index_split_default` | `Geoblacklight::SearchResultComponent`                 | `config.index.document_component`                |
| `catalog/_show_sidebar`        | `Geoblacklight::Document::SidebarComponent`            | `config.show.sidebar_component`                  |
| `catalog/_show_header_default` | the `title` slot of `Geoblacklight::DocumentComponent` | `config.show.document_component`                 |
| `catalog/_arcgis`              | `Geoblacklight::ArcgisComponent`                       | `component:` on the `:arcgis` show tool          |
| `catalog/_data_dictionary`     | `Geoblacklight::DataDictionaryDownloadComponent`       | `component:` on the `:data_dictionary` show tool |

The rest are rendered by name from inside another component or template, so a subclass of one of
them would never be used. To change one, customize whatever renders it, and have that render your
version instead. For example, to change the display note, subclass
`Geoblacklight::DocumentComponent`, copy
[its template](https://github.com/geoblacklight/geoblacklight/blob/release-5.x/app/components/geoblacklight/document_component.html.erb)
beside your subclass, and in that copy replace `Geoblacklight::DisplayNoteComponent` with your
own subclass of it. The last two in this table are rendered by ordinary view templates, which you
can override just as you would have in GeoBlacklight 4.

| GeoBlacklight 4 partial                  | GeoBlacklight 5 replacement                  | Rendered by                                                                   |
| ---------------------------------------- | -------------------------------------------- | ----------------------------------------------------------------------------- |
| `catalog/_show_downloads`                | `Geoblacklight::DownloadLinksComponent`      | `Geoblacklight::Document::SidebarComponent`                                   |
| `catalog/_downloads_collapse`            | `Geoblacklight::DownloadLinksComponent`      | `Geoblacklight::Document::SidebarComponent`                                   |
| `catalog/_show_sidebar_static_map`       | `Geoblacklight::StaticMapComponent`          | `Geoblacklight::Document::SidebarComponent`                                   |
| `catalog/_show_web_services`             | `Geoblacklight::WebServicesLinkComponent`    | `Geoblacklight::Document::SidebarComponent`                                   |
| `catalog/_show_default_display_note`     | `Geoblacklight::DisplayNoteComponent`        | `Geoblacklight::DocumentComponent`                                            |
| `catalog/_show_default_viewer_container` | `Geoblacklight::ItemMapViewerComponent`      | `Geoblacklight::DocumentComponent`                                            |
| `catalog/_show_default_attribute_table`  | `Geoblacklight::AttributeTableComponent`     | `Geoblacklight::DocumentComponent`                                            |
| `catalog/_header_icons`                  | `Geoblacklight::HeaderIconsComponent`        | `Geoblacklight::DocumentComponent` and `Geoblacklight::SearchResultComponent` |
| `catalog/_web_services_default`          | `Geoblacklight::WebServicesDefaultComponent` | `Geoblacklight::WebServicesComponent`                                         |
| `catalog/_web_services_wfs`              | `Geoblacklight::WebServicesWfsComponent`     | `Geoblacklight::WebServicesComponent`                                         |
| `catalog/_web_services_wms`              | `Geoblacklight::WebServicesWmsComponent`     | `Geoblacklight::WebServicesComponent`                                         |
| `catalog/_web_services`                  | `Geoblacklight::WebServicesComponent`        | the `catalog/web_services` view                                               |
| `relation/_relations`                    | `Geoblacklight::RelationsComponent`          | the `relation/index` view                                                     |

GeoBlacklight 6 reorganizes the record sidebar, so if you customize
`Geoblacklight::Document::SidebarComponent`, expect to revisit that when you move to 6.

Finally, a few templates have no component to move to:

| GeoBlacklight 4 partial                    | What to do                                                                   |
| ------------------------------------------ | ---------------------------------------------------------------------------- |
| `catalog/_results_pagination`              | GeoBlacklight no longer overrides it; base your copy on Blacklight's instead |
| `catalog/_show_default_viewer_information` | removed, with no replacement                                                 |
| `catalog/_carto`                           | removed, with no replacement                                                 |
| `download/hgl`                             | removed, with no replacement                                                 |

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
change. GeoBlacklight 4.7 prints the whole list as a single warning line.

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

If you made your own subclass of any of these components in
[step 5](#5-layouts-and-view-overrides) — the header, say, or the document component — use it
here instead of GeoBlacklight's.

You may also have a `require 'blacklight/catalog'` line at the top of the file, left over from an
older GeoBlacklight. It is unnecessary now and can be removed.

If your controller has drifted a long way from the default, comparing against
[the GeoBlacklight 5 template](https://github.com/geoblacklight/geoblacklight/blob/release-5.x/lib/generators/geoblacklight/templates/catalog_controller.rb)
is usually quicker than working line by line.

## 7. Application settings

`config/settings.yml`

Because this file is only written when GeoBlacklight is first installed, it never gets updated for
you. Do not copy your old file over a new one — work through the differences.

**Remove these**, all reported by GeoBlacklight 4.7:

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
[the GeoBlacklight 5 template](https://github.com/geoblacklight/geoblacklight/blob/release-5.x/lib/generators/geoblacklight/templates/settings.yml)
and adjust to taste.

### Translations

`config/locales/geoblacklight.en.yml`

If GeoBlacklight 4.7 warned you about translation keys, they are keys 5.x no longer looks up, so
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
[GeoBlacklight 5](https://github.com/geoblacklight/geoblacklight/tree/release-5.x/solr/conf) and
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
- [ ] You have dealt with **every line in `gbl5-warnings.txt`** from
      [step 1](#boot-the-application-and-read-the-warnings). GeoBlacklight 5 no longer runs those
      checks, so it cannot tell you this itself — its warnings are about GeoBlacklight 6.

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
