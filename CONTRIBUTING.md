# GeoBlacklight Website Contribution Guide

GeoBlacklight is a collaborative open-source project that :sparkles:welcomes:sparkles: community contributions. To contribute to the GeoBlacklight software codebase, see the [GeoBlacklight Contribution Guide](https://github.com/geoblacklight/geoblacklight/blob/main/CONTRIBUTING.md).

## Who can contribute?

**Anyone** is welcome to contribute to the GeoBlacklight website and documentation. We follow a set of contribution practices to maintain a technically sustainable and stable software project for everyone.

## How to contact us

See the [community page](https://geoblacklight.org/community/) on our website for information about our community calendar, volunteer opportunities, and more. This page links to our Slack and Google Group so you can reach us if you have questions or want to get more involved.

## Reporting an issue

Did you find an error on the GeoBlacklight website or documentation pages? You can add an issue for it in the [issue tracker](https://github.com/geoblacklight/geoblacklight.github.io/issues).

- Make sure you have a [GitHub account](https://github.com/)
- Submit a [GitHub issue](./issues) by:
  - Clearly describing the issue
  - Provide a descriptive summary
  - Explain the expected behavior
  - Explain the actual behavior
  - Provide steps to reproduce the actual behavior

## Contributing to the website or documentation

We welcome contributions that improve the website and documentation pages. You do _not_ need to be a "GeoBlacklight Committer" to contribute code or documentation. We follow the [pull request](https://help.github.com/articles/using-pull-requests/) model for contributing on GitHub.

Since this website is edited with Markdown, the easiest way to contribute is to edit or submit new Markdown files. You can also preview changes locally before submitting them with Zensical, which is relatively simple to install and run locally.

### Pull Request overview

**Contributors:**

1. Clone or fork the geoblacklight.github.io repository
1. Create a new branch and publish it
1. Make changes to the website files
1. Optionally, preview the site with Zensical
1. Commit your changes
1. Push to the new branch
1. Open a Pull Request to the **main** branch
1. Add Geoblacklight-Developers as a requested reviewer

**Reviewers:**

1. Review the Pull Request and merge changes to the **main** branch
1. GitHub Actions will automatically build the site and publish it to GitHub Pages

### Previewing changes with Zensical

If you want to preview changes before committing them, follow the steps below. It may also be helpful to visit the [Zensical documentation](https://zensical.org/docs/) for more information.

1. Clone or fork the geoblacklight.github.io repository.
2. Install Python 3.11+ and the pinned `zensical` version declared in `pyproject.toml`, using whichever Python packaging tool you prefer (for example, `pip install --group dev`, which requires pip 25.1+).
3. Open a terminal in the geoblacklight.github.io directory.
4. Start a local server with the following command:

   ```
   zensical serve
   ```

   This will allow you to preview the site as you edit it. You will see text in the Terminal that looks something like this:

   ```
   Serving /path/to/geoblacklight.github.io/site on http://localhost:8000
   Build started
   No issues found
   ```

5. In a browser, open the locally hosted site at http://localhost:8000/ (or whatever address your Terminal shows).
6. Create a new branch to track your changes.
7. Edit the website files and preview them in your browser.
8. When you are ready to publish the changes, commit them locally using GitHub Desktop or a Terminal command.
9. Push to the new branch.
10. Open a Pull Request to the Main branch.
11. Add Geoblacklight-Developers as a requested reviewer.

### Updating d2 diagrams

For any diagrams created with [terrastruct/d2](https://github.com/terrastruct/d2), you can edit the appropriate .d2 file and then generate the diagram image with the following command:

```
d2 geoblacklight-structure.d2 geoblacklight-structure.png --sketch --pad=50
```

Add the `-w` flag to open a preview and automatically re-generate the diagram as you work on the .d2 file. For more info, see the [d2 documentation](https://d2lang.com/tour/intro/).

## Merging a Pull Request

- Please do not merge your own Pull Request - this is considered "poor form."
- If you are uncertain about an element of your Pull Request, you can bring other contributors into the conversation by creating a comment that includes their @username.
- If you like the Pull Request but want others to chime in, create a +1 comment and tag a user.
