## Adding SVG Icons

### Adding SVGs

Adding new SVGs to GeoBlacklight or your local GBL application:

1. Add your new or replacement SVG icon into the app/assets/images/blacklight directory
1. Write the :en I18n translation entry for the SVG aria label via:

```yaml
    ...
      blacklight:
        icon:
          arrow-circle-down: Arrow within a circle, pointing down (icon)
          baruch-cuny: Baruch College (logo)
          new-icon-filename: New icon descriptive text
```

Render your new SVG icon using the blacklight_icon helper like so:

```erb
<%= blacklight_icon('icon-filename') %>
```


### Accessibility

Each SVG in GeoBlacklight has an aria-labelledby value, example:

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 32" aria-label="University of California, Berkeley">
  <title>
    University of California, Berkeley
  </title>
...
```

### SVG Icon Maintenance

The stock GeoBlacklight SVG icons come from institutional partners and Font Awesome. The [IcoMoon App](https://icomoon.io/app/#/select) was used to generate a working project board of icons.

To view the IcoMoon project board:

1. Visit https://icomoon.io/app/#/select
1. Drag and drop the geoblacklight-icons.json file onto the page

Now you'll see all icons in the project. You can add additional icons, change the default color value, or export to other formats here, ex. PNGs.

<img width="1032" alt="Screen Shot 2019-08-09 at 11 02 51 AM" src="https://user-images.githubusercontent.com/69827/62792672-6641ea00-ba95-11e9-9b02-155d962527b3.png">
