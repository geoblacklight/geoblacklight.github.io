# geoblacklight.github.io


## About

This site provides the public-facing website for the GeoBlacklight community.

### Written in: [Markdown language](https://daringfireball.net/projects/markdown/)

[Markdown](https://daringfireball.net/projects/markdown/) is a lightweight and easy-to-use language for text documents.

### Generated with: [MkDocs framework ](https://www.mkdocs.org)

[MkDocs](https://www.mkdocs.org) is a static site generator platform that allows users to create and maintain documentation websites. It takes Markdown files and uses the [Python-Markdown library](https://python-markdown.github.io) to convert the documents to HTML.

### Styled with: [Material for MkDocs theme](https://squidfunk.github.io/mkdocs-material/)

[Material](https://squidfunk.github.io/mkdocs-material/) is the most actively developed theme available for MkDocs (as of 2023) and features flexible navigation and many plugins to extend what we can do with Markdown. It is called "Material" because it is based on Google's Material Design guidelines.


### Published with: [GitHub Pages](https://pages.github.com)

[GitHub Pages](https://pages.github.com) is a free static site hosting service offered by GitHub. 


## Repository organization

### Main branch

This is the working branch containing the content for the site using Markdown.

The site is built from **two separate MkDocs configs** that share common settings (theme, markdown extensions, etc.) via MkDocs's `INHERIT` key:

* **mkdocs-base.yml**: shared settings inherited by both configs below. Never built directly.
* **mkdocs.yml**: builds the unversioned main site (Home, About, Community, Showcase, Blog, Release Calendar) from the `docs/` folder. Deployed straight to the root of `gh-pages` on every push to `main`.
* **mkdocs-docs.yml**: builds the versioned technical documentation from the `documentation/` folder. Deployed with `mike` under a `/docs/` prefix on `gh-pages`, so each GeoBlacklight version gets its own copy of just the docs, not the whole site.

* **readme.md**: the file you are reading right now
* **docs** folder (the unversioned main site, built by `mkdocs.yml`)
	*  various markdown (*.md) documents: The content for the site. These are organized for the public navigation menu in the nav section of **mkdocs.yml**.
	*  	`/blog`
          *  `.authors.yml`: a list of blog authors and their GitHub usernames
          *  `index.md`: a mostly blank page used by the blog plugin
          *  `/posts/`: collection of blog posts in markdown  
	*  	`/images` : image files for general pages
	*   `/pdfs`: PDF files
	*   `/showcase`
	      *    image files (generally screenshots of GeoBlacklight instances) just for the showcase page
	      *    `index.md`: all the GeoBlacklight instances listed on the showpage
	*   `/stylesheets`
		*   `extra.css` : a CSS file that can define colors, fonts, and other customizations for the site
	*   `releases.md`: the Release Calendar, a cross-version compatibility matrix (not specific to one GeoBlacklight version, so it lives on the unversioned site)

* **documentation** folder: technical documentation pages, versioned per GeoBlacklight release, built by `mkdocs-docs.yml`. Published under a `/docs/` prefix in the public site, i.e. geoblacklight.org/docs/latest/metadata


### gh-pages branch

This is the published branch containing the HTML code for the site. (We do **not** edit this branch directly).

Only the technical documentation (built from `documentation/` via `mkdocs-docs.yml`) is versioned by GeoBlacklight release; the rest of the site (built from `docs/` via `mkdocs.yml`) is not versioned and always reflects `main`. The [`mkdocs` documentation](https://squidfunk.github.io/mkdocs-material/setup/setting-up-versioning/) is useful for understanding how to integrate with `mike`, as well as [this blog post](https://blog.lx862.com/blog/2025-06-10-versioning-with-material-mkdocs/).

The `mike` library manages the deployment of the docs for each version, publishing them under a `/docs/` prefix on `gh-pages` (configured via the `deploy_prefix` setting in `mkdocs-docs.yml`) so they coexist with the unversioned pages at the root of the branch. Each version is kept in a separate directory named after the version number, e.g. `docs/4.x`, `docs/5.x`, etc. Versions also have "aliases", which are names that point to specific versions. These are implemented as symlinks that point to a particular version directory. Currently, we only use the `latest` alias.

CI automatically runs `mike deploy --config-file mkdocs-docs.yml --push <version>` on every push to `main` (as version `5.x`) and on every push to a version branch matching `*.x` (e.g. `4.x`), so old-version docs no longer need a manual deploy step. CI also builds and deploys the unversioned main site (from `mkdocs.yml`) to the root of `gh-pages` on every push to `main`, using `peaceiris/actions-gh-pages` with `keep_files: true` so it never clobbers the `docs/` directory that `mike` manages.

To manually publish a new version of the docs for version 5, on the `main` branch, you would run:

```sh
mike deploy --config-file mkdocs-docs.yml --push 5.x
```

If a new version is being created and it should become the new `latest`, on the `main` branch, you would instead run:

```sh
mike deploy --config-file mkdocs-docs.yml --push <new_version> --update-aliases latest
```

To update the docs for a previous version, you need to be on the branch corresponding to that version (e.g. `4.x` branch for version `4.x`), and then run:

```sh
mike deploy --config-file mkdocs-docs.yml --push <old_version>
```

Each version directory (under `docs/` on `gh-pages`) contains an entirely separate copy of the following:

* `index.html`: an HTML file containing the information in the `documentation/index.md` file at the time the version was published
* The rest of your markdown content pages with be in separate directories. The directory name is the name of the markdown file and it contains an HTML file called `index.html`
* `/images` and `/stylesheets` : same as the Main branch
* `/assets` : contains **subdirectories** for `/images`, `/javascripts`, and `/stylesheets`.  These subdirectories contain the favicon and compiled code.
* `.nojekyll` : The existence of this file tells GitHub that the site is not using Jekyll. [Related GitHub blog post](https://github.blog/2009-12-29-bypassing-jekyll-on-github-pages/).


## Previewing the site locally

Because the site is now built from two separate, independent MkDocs configs (see "Main branch" above), you preview each one with its own `mkdocs serve` command rather than a single command for the whole site. First install the Python dependencies (from `pyproject.toml`):

```sh
pip install .
```

To preview the **unversioned main site** (Home, About, Community, Showcase, Blog, Release Calendar):

```sh
mkdocs serve --config-file mkdocs.yml
```

This serves at http://127.0.0.1:8000 by default.

To preview the **versioned technical documentation**, in a separate terminal:

```sh
mkdocs serve --config-file mkdocs-docs.yml --dev-addr localhost:8001
```

The `--dev-addr` flag puts this on a different port, since both configs default to `127.0.0.1:8000` and you may want to run them side by side. If you specifically want to preview the version-switcher dropdown (rather than just the documentation content), run `mike serve --config-file mkdocs-docs.yml` instead.

**Note on the "Documentation" link:** the main site's nav includes a "Documentation" link, but it points to the published `https://geoblacklight.org/docs/latest/` URL, not to a local address. The two sites are only combined into one domain at deploy time (via `mike`'s `deploy_prefix` setting, which publishes the docs under a `/docs/` path alongside the unversioned pages on the `gh-pages` branch); locally, each config's `mkdocs serve` is its own standalone server with no knowledge of the other. So clicking "Documentation" while previewing `mkdocs.yml` locally will load the live production docs, not whatever you're editing in `mkdocs-docs.yml` — to see local documentation changes, open the `mkdocs-docs.yml` server's own URL directly.

## Updating the GeoBlacklight website

Everyone is welcome to contribute to the GeoBlacklight website and our documentation pages. See our [Contribution Guide](https://github.com/geoblacklight/geoblacklight.github.io/blob/main/CONTRIBUTING.md) for detailed information about how to contribute.
