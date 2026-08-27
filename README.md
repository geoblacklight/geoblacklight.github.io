# GeoBlacklight Website

This repository is the public website and documentation for the [GeoBlacklight](https://github.com/geoblacklight/geoblacklight) project.

It includes:

- The marketing site (home, about, community, showcase)
- The [blog](https://geoblacklight.org/blog/)
- [Technical documentation](https://geoblacklight.org/documentation/) for installing, configuring, and running GeoBlacklight

Content is written in Markdown and built into a static site with [Zensical](https://zensical.org/), the successor to MkDocs from the Material for MkDocs team.

## Local development

This project requires Python 3.11+ and the pinned version of [Zensical](https://zensical.org/) declared as a dependency group in [pyproject.toml](pyproject.toml). From the repository root, install it with whichever Python packaging tool you prefer, for example with `pip`:

```bash
pip install --group dev
```

Then, to build the site and serve it locally, rebuilding as you edit files in `docs/`:

```bash
zensical serve
```

This serves the site at http://localhost:8000 by default.

To produce a static build without serving it:

```bash
zensical build
```

The output goes to `site/`.

## Repository structure

- `zensical.toml` — site configuration: theme, navigation, Markdown extensions
- `docs/` — all site content
  - `index.md`, `about.md`, `community.md` — top-level pages
  - `documentation/` — GeoBlacklight technical documentation
  - `blog/` — blog posts (`posts/`) and the author list (`.authors.yml`)
  - `showcase/` — gallery of GeoBlacklight implementations
  - `images/`, `stylesheets/`, `pdfs/` — static assets
- `.github/workflows/docs.yml` — builds and deploys the site on every push to `main`

## Deployment

Pushing to `main` triggers a GitHub Actions workflow that builds the site with Zensical and publishes it directly to GitHub Pages.

## Contributing

Everyone is welcome to contribute. See [CONTRIBUTING.md](CONTRIBUTING.md) for how to propose changes, and the [community page](https://geoblacklight.org/community/) for how to get in touch.
