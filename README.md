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

* **readme.md**: the file you are reading right now
* **mkdocs.yml**: the configuration file that identifies the theme, the extensions, and the navigation
* **docs** folder
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

     * `/docs`: technical documentation pages. **Note that this has the same name as the root folder for all the pages!** We use this name so that the documentation pages will appear in a subdirectory in the public site, i.e. geoblacklight.org/docs/metadata


### gh-pages branch

This is the published branch containing the HTML code for the site. (We do **not** edit this branch directly).

Note that as of [this pull request](https://github.com/geoblacklight/geoblacklight.github.io/pull/294) the docs are separated by GeoBlacklight version. The `mike` library is used to manage the deployment of docs for each version, instead of `mkdocs`. The [`mkdocs` documentation](https://squidfunk.github.io/mkdocs-material/setup/setting-up-versioning/) is useful for understanding how to integrate with `mike`, as well as [this blog post](https://blog.lx862.com/blog/2025-06-10-versioning-with-material-mkdocs/).

Each version is kept in a separate directory named after the version number, e.g. `4.x`, `5.x`, etc. Versions also have "aliases", which are names that point to specific versions. These are implemented as symlinks that point to a particular version directory. Currently, we only use the `latest` alias.

To publish a new version of the docs for version 5, on the `main` branch, you would run:

```sh
mike deploy --push 5.x
```

If a new version is being created and it should become the new `latest`, on the `main` branch, you would instead run:

```sh
mike deploy --push <new_version> --update-aliases latest
```

To update the docs for a previous version, you need to be on the branch corresponding to that version (e.g. `4.x` branch for version `4.x`), and then run:

```sh
mike deploy --push <old_version>
```

Each version directory contains an entirely separate copy of the following:

* `index.html`: an HTML file containing the information in the `index.md` file at the time the version was published
* The rest of your markdown content pages with be in separate directories. The directory name is the name of the markdown file and it contains an HTML file called `index.html`
* `/images` and `/stylesheets` : same as the Main branch
* `/assets` : contains **subdirectories** for `/images`, `/javascripts`, and `/stylesheets`.  These subdirectories contain the favicon and compiled code.
* `.nojekyll` : The existence of this file tells GitHub that the site is not using Jekyll. [Related GitHub blog post](https://github.blog/2009-12-29-bypassing-jekyll-on-github-pages/).


## Updating the GeoBlacklight website

Everyone is welcome to contribute to the GeoBlacklight website and our documentation pages. See our [Contribution Guide](https://github.com/geoblacklight/geoblacklight.github.io/blob/main/CONTRIBUTING.md) for detailed information about how to contribute.
