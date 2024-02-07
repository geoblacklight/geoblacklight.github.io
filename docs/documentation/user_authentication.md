# User Authentication

GeoBlacklight facilitates the creation of user accounts and stores these in the database configured in `config/database.yml`. User accounts allow users to "bookmark" records for easy retrieval in the future. (Anonymous users can also bookmark records, though the the bookmarks will be lost at the end of a browser session.) In some implementations, user authentication is linked with institutional identities, which can drive access to certain privileged datsets (more on this below).

These capabilities are all inherited directly from Blacklight, which uses the [devise](https://github.com/heartcombo/devise) and [devise-guests](https://github.com/cbeer/devise-guests) gems to handle user accounts. For more about customizing this aspect of GeoBlacklight, see the relevant [Blacklight documentation](https://github.com/projectblacklight/blacklight/wiki/User-Authentication).

!!! tip "Cleaning up guests"
    By default, the [devise-guests](https://github.com/cbeer/devise-guests) gem will automatically create user records every time an anonymous user visits GeoBlacklight, so it is advisable to schedule a regular cleanup task. See "Useful Cron Tasks" in [Implementation Recommendations](/documentation/implementation_recommendations) for more information.

### Using Institutional Authentication Backends

Typically, institutions will configure GeoBlacklight to use an existing user authentication backend instead of using the default configuration. This type of integration also allows for data access permissions to be linked to authenticated users.

Devise can be set up to use [OmniAuth](https://github.com/omniauth/omniauth), which in turn can be extended to use various authentication providers, for example:

- **SAML**: [omniauth/omniauth-saml](https://github.com/omniauth/omniauth-saml)
- **LDAP**: [omniauth/omniauth-ldap](https://github.com/omniauth/omniauth-ldap)
- **CAS**: [dlindahl/omniauth-cas](https://github.com/dlindahl/omniauth-cas)
