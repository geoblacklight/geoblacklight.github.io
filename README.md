# geoblacklight.github.io
This repository consists of the Jekyll static site generator for the [GeoBlacklight web site](http://geoblacklight.org). The GeoBlacklight community welcomes contributions to the site, including additions to the project gallery, blog posts, news, and more. All questions about this repository and contributing to it or other elements of the GeoBlacklight project can be directed to [geoblacklight-working-group@googlegroups.com.](mailto:geoblacklight-working-group@googlegroups.com)

## Adding to the Project Gallery
If you have an instance of GeoBlacklight and would like to showcase it on the homepage of the GeoBlacklight project site, let us know or use the following steps.

- Fork the `geoblacklight.github.io` repository into your local GitHub profile
- Clone the repository onto your hard drive
```
git clone https://github.com/geoblacklight/geoblacklight.github.io.git
```
- Open and edit the `_data/showcase.yml` file and add your GeoBlacklight info in the template at the bottom of the file (also see others as an example)
- Create a screenshot of your GeoBlacklight homepage, save it as a `.png` or `.jpg` file and add it to the `images` folder
- Save your files and then commit your changes to your local branch
- Create a pull request in this repository based on your forked branch

If you aren't familiar with GitHub, see [this guide](https://help.github.com/en/enterprise/2.16/user/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request-from-a-fork) for help with the process. See the general guide to contributions below, and reach out to [geoblacklight-working-group@googlegroups.com](mailto:geoblacklight-working-group@googlegroups.com) with questions.

## How to make changes to the GeoBlacklight website

As you make changes to your local files, you will want to see what they'll look like on the site before making a pull request. Making changes to a Jekyll static site is relatively easy. See this [tutorial from the Programming Historian](https://programminghistorian.org/en/lessons/building-static-sites-with-jekyll-github-pages) for a comprehensive overview of working with Jekyll.

*Running Jekyll requires Ruby 2.4.0 or higher, but lower than Ruby 3.0.0.*

Here are a few more tips:

- Clone the repository
```
git clone https://github.com/geoblacklight/geoblacklight.github.io.git
cd geoblacklight.github.io
```
- Install OpenSSL
If you don't have openssl you can install it via Homebrew (Mac users):
```
brew install openssl@3
```

- Install other dependencies:
```
bundle install
```
Note: Some mac users will get an error about an `eventmachine` dependency and will have to use flags to point to their openssl directory: `gem install eventmachine -v '1.2.7' -- --with-cppflags=-I/usr/local/opt/openssl/include`

- To view the site locally, run
```
jekyll serve
```
Go to the indicated URL and navigate the site. Make sure to hit `ctrl-c` to stop the local server.

**Other Useful Jekyll Switches**

```
jekyll serve --watch
```
The current folder will be generated into ./_site, watched for changes, and regenerated automatically.

```
jekyll serve --drafts
```

Serve draft posts located in the `_drafts` directory
