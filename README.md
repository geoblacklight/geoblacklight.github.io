# geoblacklight.github.io


## About

This site provides the public facing website for the GeoBlacklight community.

### Written in: [Markdown language](https://daringfireball.net/projects/markdown/)

[Markdown](https://daringfireball.net/projects/markdown/) is a lightweight and easy-to-use language for text documents.
Most text editors support it and translates easily to other formats, such as HTML or PDF or EPUB.

### Generated with: [MkDocs framework ](https://www.mkdocs.org)

[MkDocs](https://www.mkdocs.org) is a static site generator platform that allows users to create and maintain documentation websites. It takes Markdown files and uses the [Python-Markdown library](https://python-markdown.github.io) to convert the documents to HTML.

### Styled with: [Material for MkDocs theme](https://squidfunk.github.io/mkdocs-material/)

[Material](https://squidfunk.github.io/mkdocs-material/) is the most actively developed theme available for MkDocs (as of 2023) and features flexible navigation and many plugins to extend what we can do with Markdown. It is called "Material" because it is based on Google's Material Design guidelines, a web accessibility and screen responsiveness.


### Published with: [GitHub Pages](https://pages.github.com)

[GitHub Pages](https://pages.github.com) is a free static site hosting service offered by GitHub. It is often used to host documentation sites, personal portfolios, and project websites.


## GitHub Repository organization:

### Main branch

This is the working branch containing the content for the site using Markdown.

* **readme.md**: the file you are reading right now
* **mkdocs.yml**: the configuration file that identifies the theme, the extensions, and the navigation
* **mkdocs.insidersyml**: a configuration file for the blog
* **docs** folder
	*  Markdown documents: The content for the site. These can all live in the same directory and are organized in the public navigation menu in the nav section of **mkdocs.yml**.
	*  	`/blog`: 
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
		*   `neoteroi.css`: a CSS file just for the content displayed in grids (boxes)



### gh-pages branch

This is the published branch containing the HTML code for the site. (We do **not** edit this branch directly).

* `index.html`: an HTML file containing the information in the `index.md` file in your Main branch
* The rest of your markdown content pages with be in separate directories. The directory name is the name of the markdown file and it contains an HTML file called `index.html`
* `/images` and `/stylesheets` : same as the Main branch
* `/assets` : contains **subdirectories** for `/images`, `/javascripts`, and `/stylesheets`.  These subdirectories contain the favicon and compiled code.
* `.nojekyll` : The existence of this file tells GitHub that the site is not using Jekyll. [Related GitHub blog post](https://github.blog/2009-12-29-bypassing-jekyll-on-github-pages/).


## Updating the GeoBlacklight website

Since this site is written with Markdown files, the minimum requirement to contribute is to just edit or submit new Markdown files.  However, MkDocs is relatively simple to install and run locally. This allows you to preview changes locally before submitting them.  


To get started, follow the steps below.  It may also be helpful to visit the Material for[ MkDocs Getting Started page](https://squidfunk.github.io/mkdocs-material/getting-started/) and for reference.

### Install Material for MkDocs

1. Open the Terminal and type the following:

`pip install mkdocs-material`

This command will install all the necessary modules for the mkdocs platform and the Material theme together.


2. Next, install the Neoteroi Cards plugin:

`pip install neoteroi-mkdocs`

This plugin groups text and images into grids or boxes based on simplified input files. We use this plugin to create the Showcase page and to make it easy for community members to contribute new instances. [See the Submit page for more instructions on adding to the Showcase page.](https://geoblacklight.org/showcase/submit)

### Edit the website

1. Clone or fork the geoblacklight.github.io repository

2. Make a new branch

3. Change into the geoblacklight.github.io directory and type:

`mkdocs serve`

This will start a local server so you can preview the site as you build it. You will see text in the Terminal that looks something like this:

```
INFO     -  Documentation built in 4.15 seconds

INFO     -  [14:43:24] Watching paths for changes: 'docs', 'mkdocs.yml'

INFO     -  [14:43:24] Serving on http://127.0.0.1:8000/

INFO     -  [14:43:31] Browser connected: http://127.0.0.1:8000/
```
4. In a browser, open the locally hosted site at http://127.0.0.1:8000/ (or whatever your Terminal shows)

5. Edit the markdown files and preview them in your browser.

6. When you are ready to publish the changes, commit them locally using GitHub Desktop or a Terminal command.

7. Publish the branch and open a pull request to the Main branch.


### Workflow steps overview

Contributor:

1. Clone or update your local instance of the geoblacklight.github.io repository
2. Make a new branch and switch to it
3. Edit the Markdown files
4. Preview the site locally using `mkdocs serve`
5. Commit your changes
6. Publish your branch
7. Open a Pull Request to the main branch

Publisher:

1. Accept Pull Request and merge changes to the main branch
2. GitHub Actions will automatically push the changes to the gh-pages branch


### Differences from local server previews and public view

As of June 2023, the geoblacklight.github.io site is being published via the sponsored version of Material for MkDocs, known as "[Insiders](https://squidfunk.github.io/mkdocs-material/insiders/)." This enables us to use the [blog plugin](https://squidfunk.github.io/mkdocs-material/setup/setting-up-a-blog/).  

Users will not see the blog when previewing the site locally. However, the posts will show up online when they are published to GitHub.

We will reassess this in a few months to determine if it is a viable model going forward.  In the meantime, if you would like to contribute a blog post, please contact the Community Coordinator (@majew030) on Slack or make a new GitHub issue.

------

Questions about this repository or other elements of GeoBlacklight?

Submit application related issues here: https://github.com/geoblacklight/geoblacklight/issues

Report bugs and typos on the website itself here:  https://github.com/geoblacklight/geoblacklight.github.io/issues
