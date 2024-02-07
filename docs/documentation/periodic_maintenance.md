# Periodic Maintenance

Once your GBL application is running in production, you'll need to schedule some periodic maintenance sprints to keep things up to date and running happily.

### Test Suite Maintenance

The best way to future-proof your GBL install is to write and maintain a local test suite that provides coverage for basic application functionality.

As you upgrade versions of GeoBlacklight, Blacklight, Ruby on Rails, or Ruby, this test suite is your insurance that the application is running as expected after these upgrades are implemented. If upon upgrading GeoBlacklight or another core component, you test suite begins to fail, you'll know you have some development work to complete to successfully finish the upgrade.

### GeoBlacklight Releases

GBL usually releases new versions of the software after the Winter and Summer community sprints. Schedule some time for your local development team to review the latest GBL release and upgrade notes on a biannual timeframe.

### Blacklight Releases

Upstream releases of Blacklight can have a significant impact on GeoBlacklight installations. The Blacklight community is very good at leaving deprecation warnings in blacklight releases to help the GeoBlacklight community and local adopters keep their code maintained.

### Ruby and Ruby on Rails Releases

Blacklight and GeoBlacklight will adjust their test matrices for new releases of Ruby and Ruby on Rails to ensure proper support.

Commonly, there is no need to rush to upgrade to a new Ruby or Ruby on Rails release, unless there is a significant security issue to resolve.
