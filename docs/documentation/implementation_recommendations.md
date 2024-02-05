# Implementation Recommendations

Adhering to local IT best practices will help your GeoBlacklight install get up and running with optimal support from your IT staff. Below are some discussion points worth discussing locally as you move your GBL application to production:

### Analytics

You will want to collect web analytics for your application. Some institutions have policies in place to protect the anonymity of web users. Be sure to discuss how analytics will be implemented and monitored.

### Sitemap and robots.txt

A sitemap and a robots.txt file will help you keep bots from crawling your application in ways that would cause significant performance issues.

For example, in the B1G Geoportal, we use the [sitemap_generator](https://rubygems.org/gems/sitemap_generator) rubygem and a cronjob to keep a sitemap up to date:

```ruby
# config/sitemap.rb
solr = RSolr.connect url: Blacklight.connection_config[:url]

# Select all the docs from Solr
response = sol.get('select', params: {q: '*:*', fl: 'id', rows: 9999999})

# Build a flat sorted array of all document slugs
slugs = response['response']['docs'].map { |doc| doc['id'] }.sort

# Set the host name for URL creation
SitemapGenerator::Sitemap.default_host = 'https://geo.btaa.org'
SitemapGenerator::Sitemap.create do
  # Put links creation logic here.
  #
  # The root path '/' and sitemap index file are added automatically for you.
  # Links are added to the Sitemap in the order they are specified.
  #
  # Usage: add(path, options={})
  #        (default options are used if you don't specify)
  #
  # Defaults: :priority => 0.5, :changefreq => 'weekly',
  #           :lastmod => Time.now, :host => default_host
  #

  slugs.each { |slug| add "/catalog/#{slug}" }
end
```

```ruby
# whenever gem
every :day, at: '12:30am', roles: [:app] do
  rake 'sitemap:refresh'
end
```

You'll likely want to disallow any code paths that hit Solr with a search query:

```txt
User-agent: *
Disallow: /?q=
Disallow: /*?q=*
Disallow: /?f
Disallow: /*?f*
Disallow: /?_
Disallow: /?bbox
Disallow: /?page=
Disallow: /bookmarks
Disallow: /catalog.html?f
Disallow: /catalog.html?_
Disallow: /catalog.atom
Disallow: /catalog.rss
Disallow: /catalog/*/relations
Disallow: /catalog/facet/*
Disallow: /catalog/*/web_services
Disallow: /catalog/email
Disallow: /catalog/opensearch
Disallow: /catalog/range_limit
Disallow: /catalog/sms
Disallow: /saved_searches
Disallow: /search_history
Disallow: /suggest
Disallow: /users
Disallow: /404
Disallow: /422
Disallow: /500
```

You might also want to disallow bots that aggressively index content as well:

```txt
User-agent: AhrefsBot
Disallow: /
User-agent: SemrushBot
Disallow: /
User-agent: PetalBot
Disallow: /
User-agent: BLEXBot
Disallow: /
User-agent: DotBot
Disallow: /
User-agent: DataForSeoBot
Disallow: /
```

### Uptime and Performance Monitoring

Your local IT staff should implement uptime and performance monitoring for your production GeoBlacklight application.

Systemd for process / uptime management and Nagios/Zabbix/CloudWatch for alerting are common tools. Third party options like AppSignal and UptimeRobot can help, too.

### Data Backups

Discuss options for automatically backing up your application data from Solr and your application's relational database. Having a backup of your data will help you restore service after an unplanned interruption or corrupted index.

See the Apache Solr Reference Guide's [Backup and Restore](https://solr.apache.org/guide/solr/latest/deployment-guide/backup-restore.html) chapter for more details.

### Log Rolling

You will need to schedule your application logs to periodically rotate to maintain the size of these files. The `logrotate` utility can be very helpful here.


### Useful Cron Tasks

A few cronjobs will help keep your database lean. These examples use the popular [whenever](https://github.com/javan/whenever) rubygem.

##### Delete Old Searches

```ruby
# Clean up recent anonymous search records
every :day, at: '2:30am', roles: [:app] do
  rake 'blacklight:delete_old_searches[7]'
end
```

##### Delete Old Guest Users

```ruby
# Cleans up anonymous user accounts created by search sessions
every :day, at: '1:30am', roles: [:app] do
  rake 'devise_guests:delete_old_guest_users[2]'
end
```
