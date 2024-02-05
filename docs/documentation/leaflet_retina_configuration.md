# Configure Leaflet for retina displays
GeoBlacklight allows implementers to configure the way in which basemaps and tile layers (WMS) are displayed on high pixel density 'retina' screens. When retina detection settings are enabled, Leaflet will request larger tiles to take advantage of the increased resolution.

## Tile layers

In your application's settings.yml, find `DETECT_RETINA` and set it to `true` or `false`.

```
...
LEAFLET:
  MAP:
  LAYERS:
    DETECT_RETINA: true
...

```

When set to `true`, Leaflet will load 512 pixel tiles on retina displays.

<img width="681" alt="retina-layer" src="https://cloud.githubusercontent.com/assets/784196/17187497/1966c73c-53ff-11e6-9b57-2d53ca1b1bc4.png">

## Basemaps

To configure the stock CartoDB basemaps for higher resolution display you will have to override the `GeoBlacklight.Basemaps` javascript module. In your application, create a `geoblacklight` directory in `app/assets/javascripts/` and then create a new file called `basemaps.js` in that directory.

<img width="195" alt="basemap" src="https://cloud.githubusercontent.com/assets/784196/17187370/9343a206-53fe-11e6-9239-0500564d831b.png">

Now copy the contents of the [Geoblacklight basemaps.js file](https://raw.githubusercontent.com/geoblacklight/geoblacklight/master/app/assets/javascripts/geoblacklight/basemaps.js) into your new file. On any basemaps that you want to enable retina, set `detectRetina` to `true`. Your file should look something like this:

```js
// basemaps

GeoBlacklight.Basemaps = {
  darkMatter: L.tileLayer(
    'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}{retina}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
      maxZoom: 18,
      worldCopyJump: true,
      retina: '@2x',
      detectRetina: true
    }
  ),
  positron: L.tileLayer(
    'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}{retina}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
      maxZoom: 18,
      worldCopyJump: true,
      retina: '@2x',
      detectRetina: true
    }
  )
};

```
