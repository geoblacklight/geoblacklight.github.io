# GeoBlacklight Website Contribution Guide
GeoBlacklight is a collaborative open-source project that :sparkles:welcomes:sparkles: community contributions. To contribute to the GeoBlacklight software codebase, see the [GeoBlacklight Contribution Guide](https://github.com/geoblacklight/geoblacklight/blob/main/CONTRIBUTING.md).

### Who can contribute?
**Anyone** is welcome to contribute to the GeoBlacklight website and documentation. We follow a set of contribution practices to maintain a technically sustainable and stable software project for everyone.

## Reporting an issue
Did you find an error on the GeoBlacklight website or documentation pages? You can add an issue for it in the [issue tracker](https://github.com/geoblacklight/geoblacklight.github.io/issues).

 - Make sure you have a [GitHub account](https://github.com/signup/free)
 - Submit a [GitHub issue](./issues) by:
    - Clearly describing the issue
    - Provide a descriptive summary
    - Explain the expected behavior
    - Explain the actual behavior
    - Provide steps to reproduce the actual behavior

## Contributing to the website or documentation
We welcome contributions that improve the website and documentation pages. You do *not* need to be a "GeoBlacklight Committer" to contribute code or documentation. We follow the [pull request](https://help.github.com/articles/using-pull-requests/) model for contributing on GitHub.

Since this website is edited with Markdown, the easiest way to contribute is to edit or submit new Markdown files.  You can also preview changes locally before submitting them with MkDocs, which is relatively simple to install and run locally.

### Pull Request workflow

**Contributors:**

1. Clone or fork the geoblacklight.github.io repository.
1. Create a new branch and publish it.
1. Make changes to the website files.
1. Optionally, preview the site with MkDocs.
1. Commit your changes.
1. Push to the new branch.
1. Open a Pull Request to the Main branch.
1. Add Geoblacklight-Developers as a requested reviewer.

**Reviewers:**

1. Review the Pull Request and merge changes to the main branch.
1. GitHub Actions will automatically push the changes to the gh-pages branch.


### Previewing changes in Material for MkDocs

If you want to preview changes before committing them, follow the steps below. It may also be helpful to visit the [Material for MkDocs Getting Started page](https://squidfunk.github.io/mkdocs-material/getting-started/) for more information.

1. Open the Terminal and type the following command to install the MkDocs modules and Material theme.

  ```
  pip install mkdocs-material
  ```

1. Install the required plugins:

  ```
  pip install mkdocs-table-reader-plugin
  pip install mkdocs-git-revision-date-localized-plugin
  ```


1. Clone or fork the geoblacklight.github.io repository.
1. Create a new branch and publish it.
1. Change into the geoblacklight.github.io directory and type:

  ```
  mkdocs serve
  ```
  
  This will start a local server so you can preview the site as you build it. You will see text in the Terminal that looks something like this:

	```
	INFO     -  Documentation built in 4.15 seconds
	INFO     -  [14:43:24] Watching paths for changes: 'docs', 'mkdocs.yml'
	INFO     -  [14:43:24] Serving on http://127.0.0.1:8000/
	INFO     -  [14:43:31] Browser connected: http://127.0.0.1:8000/
	```

1. In a browser, open the locally hosted site at http://127.0.0.1:8000/ (or whatever address your Terminal shows).
1. Edit the website files and preview them in your browser.
1. When you are ready to publish the changes, commit them locally using GitHub Desktop or a Terminal command.
1. Push to the new branch.
1. Open a Pull Request to the Main branch.
1. Add Geoblacklight-Developers as a requested reviewer.

### Updating d2 diagrams

For any diagrams created with [terrastruct/d2](https://github.com/terrastruct/d2), you can edit the appropriate .d2 file and then generate the diagram image with the following command:

```
d2 geoblacklight-structure.d2 geoblacklight-structure.png --sketch --pad=50
```

Add the `-w` flag to open a preview and automatically re-generate the diagram as you workon the .d2 file. For more info, see the [d2 documentation](https://d2lang.com/tour/intro/).

## Merging a Pull Request

- Please do not merge your own Pull Request - this is considered "poor form."
- If you are uncertain about an element of your Pull Request, you can bring other contributors into the conversation by creating a comment that includes their @username.
- If you like the Pull Request, but want others to chime in, create a +1 comment and tag a user.

If you have questions or want to get more involved, join [GeoBlacklight Slack](https://geoblacklight.slack.com/join/shared_invite/zt-1p7dcay40-Ye_WTt5_iCqU8rDjzhkoWw#/shared-invite/email) or email the [GeoBlacklight Community](https://groups.google.com/g/geoblacklight-community) at geoblacklight-community@googlegroups.com.