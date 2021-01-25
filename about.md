---
layout: page
title: About GeoBlacklight
permalink: /about/
---

GeoBlacklight is a world-class discovery platform for geospatial content, including GIS data and maps. It is an open, multi-institutional collaborative project aiming to build off of the successes of the [Blacklight](https://projectblacklight.org/) discovery interface and the [OpenGeoMetadata](https://github.com/OpenGeoMetadata) federated metadata sharing communities.

GeoBlacklight began in 2014 as a collaboration by MIT, Princeton, and Stanford. As of 2020, over 25 academic libraries and cultural heritage institutions have adopted GeoBlacklight.

- [Our Community](#our-community)
- [Our Development Practices](#our-development-practices)
- [Application Features](#application-features)
- [GeoBlacklight Technical Values](#geoblacklight-technical-values)


Our Community
-------------

The GeoBlacklight Community is open to anyone interested in spatial infrastructures, libraries, GIS, maps, open source software, and related topics. Participants can contribute to the community in various ways, such as by attending meetings, writing documentation, developing metadata best practices, engaging in outreach, and writing code. Visit our [Connect page](https://geoblacklight.org/connect.html) to join our online community.

#### Events

- **Every month:** [Zoom meetings](https://z.umn.edu/gbl-meetings) to share project updates and to discuss topical issues.

- **2x per year:** [Community Sprints](https://github.com/geoblacklight/geoblacklight/projects?query=). These are similar to a traditional code sprint but also incorporates activities around documentation, metadata, governance, and more.

- **Annually:** [Geo4LibCamp](https://geo4libcamp.org/) is a hands-on meeting to bring together those building repository services for geospatial data. The main focus is to share best-practices, solve common problems, and address technical issues with integrating geospatial data into a repository and associated services.

#### Roles

- **Community Coordinator** (Karen Majewicz)

	- Facilitates community monthly meetings and sets agendas
	- Stages project boards for community sprints and coordinates stand-up meetings


- **Code of Conduct team**

	- responsible for responding to [Code of Conduct](https://github.com/geoblacklight/geoblacklight/blob/main/CODE_OF_CONDUCT.md) reports.

**************************

Our Development Practices
-------------------------

- **Open-source model**: GeoBlacklight is an open-source software project licensed using the Apache License, version 2.0. Our development practices have been codified in a [contribution guide](https://github.com/geoblacklight/geoblacklight/blob/main/CONTRIBUTING.md) since December 2015 and we use [semantic versioning](https://semver.org/) to release the Ruby on Rails engine to RubyGems. Changes are made to the codebase using pull requests to the GitHub source code repository.

- **Connected frameworks**: Many of the development practices for the GeoBlacklight project have foundations in other open source software communities. A strategic design decision was made to build on existing pools of expertise in organizations with Blacklight and Samvera rather than build a completely custom system. The project also relies heavily on configuration and extensibility as useful patterns for adopters making customizations.

- **Decision-making**: Much of the technical decision making is driven from the original [GeoBlacklight Concept Design document](https://geoblacklight.org/documents/GeoBlacklight%20Concept%20Design%20v0.3.3.pdf) and has been further distilled into our [GeoBlacklight Technical Values](#geoblacklight-technical-values). Major and minor decisions are made using informal consensus.

- **Testing**: GeoBlacklight has continuous integration testing integrated within the project, and tests are expected to be written with code contributions to the project. The project also implements both Ruby and JavaScript style guides to ensure a stylistically similar codebase.

- **Funding**: There is no funding model for GeoBlacklight, and most development comes through volunteered or assigned time from contributing organizations. Some organizations receive grants or funding to build their GeoBlacklight applications or contribute to the community, and there are several vendors and independent contractors that have contributed through contracted work.

- **Documentation**: The technical documentation for the project resides in the [project wiki](https://github.com/geoblacklight/geoblacklight/wiki) and within our [tutorials](https://geoblacklight.org/tutorials.html).

**************************

Application Features
--------------------

- **Technical Stack**: GeoBlacklight is a Ruby on Rails engine designed as a plugin for the popular open source discovery framework, Blacklight. GeoBlacklight has direct software dependencies to Blacklight and Ruby on Rails. It also requires searchable metadata through the Apache Solr project. For production uses, GeoBlacklight installations often require a SQL database such as MySQL, MariaDB, or PostgreSQL. 

- **External service integration**: GeoBlacklight provides a discovery layer for content that is oftentimes hosted elsewhere. Rather than try to provide a repository to the data itself and navigate the complexities of different adopters existing systems, GeoBlacklight relies on providing integration for existing datastores and web services. GeoBlacklight does this through providing useful preview, download, and exports of open standards-based services, including Web Mapping Services (WMS), Web Feature Services (WFS), ArcGIS Rest API, and International Image Interoperability Framework (IIIF). There is also support for externally referenced metadata viewing and file download support.

- **Metadata**: The GeoBlacklight Metadata Schema has been designed to privilege discovery use cases. Text search, faceted search & refinement, and spatial search & relevancy are among the primary features that the schema enables. [Visit the Metadata Wiki for more information and full documentation.](https://github.com/geoblacklight/geoblacklight/wiki/GeoBlacklight-Metadata)

	- based on Dublin Core, with custom elements added for spatial values

	- designed for discovery - to help users find items

	- _not_ designed for complete technical documentation, such as a GIS dataset's processing history

	- includes elements for external links, such as downloads, web services, or supplemental metadata

	- records are formatted as JSON files

**************************

GeoBlacklight Technical Values
------------------------------

- Our core focus is **geospatial discovery**. This focus initially was limited to discretely catalogued data objects, but has expanded over time to include a wider range of information sources.

- We emphasize **end-user experience**, including inclusivity and accessibility in design features whenever possible.

- We prioritize **stability** by semantically versioning our application releases and metadata schemas.

- We aim for GeoBlacklight to be **simple to adopt** and **easy to maintain**. We recognize that many adopters are in the cultural heritage space where metadata and software development resources can be limited.

- We make GeoBlacklight **customizable** for common use cases, and **extensible** to a plugin for a less-common use case.

- We leverage **existing communities**. Building on established standards gives us more bandwidth to focus on discovery and developing plugins.

- Excellent geospatial analysis and mapping tools already exist. Rather than build new ones in GeoBlacklight, we focus on **integration with these existing tools**.

**************************

*This is a living document that is frequently updated. Have a suggestion? Create an issue on the [GeoBlacklight Website Github page here](https://github.com/geoblacklight/geoblacklight.github.io/issues).*