## Rendering line breaks or HTML from the Description field

Blacklight includes a helper_method argument for catalog_controller.rb field configuration. You can use that helpful technique to output whatever you need from the solr field value.

An example for adding line breaks and even HTML to a dc_description_s field would work like this:

1) Add a custom helper for presenting the data, using Rails' [simple_format](https://api.rubyonrails.org/v6.0.3.2/classes/ActionView/Helpers/TextHelper.html#method-i-simple_format) helper

```ruby
# ApplicationHelper / application_helper.rb

def render_html_description(args)
  simple_format(Array(args[:value]).flatten.join(' '))
end
```

2) Point the show field at your new helper_method

```ruby
# CatalogController / catalog_controller.rb

config.add_show_field Settings.FIELDS.DESCRIPTION, label: 'Description', itemprop: 'description', helper_method: :render_html_description
```

3) Example description value with line breaks ("\n\n") and some HTML markup, too:

```text
  "dc_description_s": "This table shows all 911 police emergency response and officer-initiated calls for service in the City of Detroit since September 20, 2016. Emergency response calls are the result of people calling 911 to request police services.\n\n Officer-initiated calls include traffic stops, street investigations and other policing activities (such as observing crimes in progress) where police officers initiate the response. The table includes all calls taken, dispatch, travel, and total response times for those calls serviced by a police agency. The data also include the responding agency, unit, call type and category of each call. Should you have questions about this dataset, you may contact the Commanding Officer of the Detroit Police Department's Crime Intelligence Unit at 313-596-2250 or <a href=\"mailto:CrimeIntelligenceBureau@detroitmi.gov\">CrimeIntelligenceBureau@detroitmi.gov</a>. ",
```

4) Now the show page will render like this

<img width="866" alt="Screen Shot 2020-08-06 at 3 30 38 PM" src="https://user-images.githubusercontent.com/69827/89579682-d47cd200-d7f9-11ea-8032-f77b3cc55a3f.png">
