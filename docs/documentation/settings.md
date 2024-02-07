# Configure the Settings

A lot of configuration for your GeoBlacklight instance will be handled in the [settings.yml](https://github.com/geoblacklight/geoblacklight/blob/main/lib/generators/geoblacklight/templates/settings.yml) file.

Keep in mind, GeoBlacklight has reasonable defaults for all settings, so you do not need to change anything in order to get up and running. That said, you will *eventually* need to change *something*. Below is an annotated list of all variables in the settings file.

If you are developing a custom application, look for `config/settings.yml`. If you are working on the core GeoBlacklight codebase, the file is `lib/generators/geoblacklight/templates/settings.yml`.

!!! note
    Settings are implemented with the [config](https://github.com/rubyconfig/config) gem, and are available as properties of the `Settings` object throughout the application.

