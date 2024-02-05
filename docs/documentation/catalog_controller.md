## Updating the Catalog Controller

A number of other configurations you may need to update are handled in your `app/controllers/catalog_controller.rb` file. This file has plenty of code comments to help you out with the details, so the following is just a brief summary of the main configurations you can make within it.

Configurations you can alter include:

- Search Facet Management
    - Determine which fields are exposed to users in the search facet panel, and how they are labeled.
- Search Results Fields
    - Determine which fields will be displayed for each item in the search results list.
- Item View Fields
    - Show/hide fields from the catalog view for each item. Note that a number of default fields are not displayed directly in the catalog view because they are used to power different aspects of the presentation.
- Default Search Behavior
    - Alter search ranking, sorting, and filtering.
- Basemap Style
    - See [Switching the default basemap](default_basemap.md)
