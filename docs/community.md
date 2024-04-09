Participants in the GeoBlacklight community come from a variety of professional and intellectual backgrounds (including librarians, software developers, metadata specialists, applied researchers, and others), but we share a common interest in making reliable and high-quality geospatial data easily accessible to members of the research community and the broader public. Many of us work in libraries and other cultural heritage institutions that deploy (or are planning to deploy) GeoBlacklight instances to disseminate and publicize their spatial data collections.

Discovery services and metadata are key challenges for organizations who provide geospatial data. GeoBlacklight connects expertise from the digital library and geospatial communities to provide a better experience for users to find geospatial data.

Anyone interested in spatial data infrastructures, libraries, GIS, maps, data curation, open source software, and related topics, is welcome to join us. Depending on their skills and interests, participants contribute to the community in any number of ways (for instance, by attending meetings, writing documentation, developing metadata best practices, engaging in outreach, and writing code). Participating in the community is especially beneficial to those who are implementing or maintaining GeoBlacklight as a spatial data discovery interface within their own home institutions.

## Our Development Practices

### 

- **Open source model**: GeoBlacklight is an open source software project licensed using the Apache License, version 2.0. Our development practices have been codified in a [contribution guide](https://github.com/geoblacklight/geoblacklight/blob/main/CONTRIBUTING.md) since December 2015 and we use [semantic versioning](https://semver.org/) to release the Ruby on Rails engine to RubyGems. Changes are made to the codebase using pull requests to the GitHub source code repository.

- **Connected frameworks**: Many of the development practices for the GeoBlacklight project have foundations in other open source software communities. A strategic design decision was made to build on existing pools of expertise in organizations with [Blacklight](https://projectblacklight.org/) and [Samvera](https://samvera.org/) rather than build a completely custom system. The project also relies heavily on configuration and extensibility as useful patterns for adopters making customizations.

- **Decision-making**: Much of the technical decision-making is driven from the original [GeoBlacklight Concept Design document](/pdfs/GeoBlacklight-Concept-Design.pdf) and has been further distilled into our [GeoBlacklight Technical Values](#geoblacklight-technical-values). Major and minor decisions are made using informal consensus.

- **Testing**: GeoBlacklight has Continuous Integration Testing, and tests are expected to be written with code contributions to the project. The project also implements both Ruby and JavaScript style guides to ensure a stylistically similar codebase.

- **Funding**: There is no funding model for GeoBlacklight, and most development comes through volunteered or assigned time from contributing organizations. Some projects have received grants or dedicated funds to build their GeoBlacklight applications. Our community also includes private vendors and independent freelancers that have contributed to the project through contracted work.

- **Events**:

      - **Every month:** [Zoom meetings](https://z.umn.edu/gbl-meetings) to share project updates and to discuss topical issues.
      
      - **2x per year:** Community Sprints are similar to a traditional code sprint but also incorporate activities around documentation, metadata, governance, and more.
      
      - **Annually:** [Geo4LibCamp](https://geo4libcamp.org/) is a hands-on meeting to bring together those building repository services for geospatial data. The main focus is to share best-practices, solve common problems, and address technical issues with integrating geospatial data into a repository and associated services.

## Roles

### Admin Roles

**Meeting Facilitators**: Karen Majewicz + ==1 vacancy==

* 2 people 
* Manage Google calendar
* set up and host monthly meetings 
* set up and host sprint standups
* prepare agendas

**Platform Management Team**: ==2 vacancies==

* 2-3 people
* Manage GitHub users and roles
* Manage Google group permissions, roles, etc.
* Manage Google Drive members
* Maintain Slack 

### Documentation Roles

**Public Content Manager**: ==1 vacancy==

* 1 person 
* Keep the public website(s) up to date ==vacancy==
* Write periodic blog posts, including sprint wrap-up posts

**Technical Writing Lead**: ==1 vacancy==

* 1 person 
* Keep track of what code, metadata, and tutorials need updating
* Manage GitHub issues related to documentation
* Coordinate volunteers to update documentation as necessary

### Technical Roles

**Designated Code Mergers**: [see GitHub Teams](https://github.com/orgs/geoblacklight/teams)

* many people
* Anyone on the GeoBlacklight Developers team in GitHub
* “Teams” allow tagging a whole group of people
* members can assign appropriate mergers based upon their related experience with the new code

**Release Coordinators**: ==2 vacancies==

* 1-2 people
* Cut tags and releases
* Write release notes for the GitHub repo
* Publish Ruby gem
* Publish Javascript to npm 

**Issue Triage Working Group**: Open membership

* many people
* Meets regularly to review and prioritize GitHub issues related to code
* Maintain [GitHub Ongoing Project Board](https://github.com/orgs/geoblacklight/projects/2)



## GeoBlacklight Contributors

GeoBlacklight has been collaboratively developed by affiliates of the following institutions:

* Auraria Library
* Big Ten Academic Alliance
* Cornell University
* MIT Libraries
* Harvard University Library
* Johns Hopkins University
* New York University Libraries
* Princeton University Library
* Stanford University Libraries
* University of California San Diego
* University of California Berkeley
* University of California Santa Barbara
* University of Illinois at Urbana-Champaign
* University of Massachusetts Amherst
* University of Minnesota Libraries
* University of Pennsylvania Libraries
* The University of Texas at Austin
* University of Wisconsin-Milwaukee

!!! tip "Feedback"

	Did we miss your institution? Have a suggestion for this website? Create an issue on the [GeoBlacklight Website Github page here](https://github.com/geoblacklight/geoblacklight.github.io/issues).

## How to Contribute
GeoBlacklight is a collaborative open source project and contributions are welcome. This contributing guide is borrowed in part from the [Samvera Contributing Guide](https://github.com/samvera/hydra/blob/master/CONTRIBUTING.md) and the [Blacklight Contributing Wiki](https://github.com/projectblacklight/blacklight/wiki/Contributing-to-Blacklight).

### Who can contribute?
**Anyone** is welcome to contribute to GeoBlacklight. We follow a set of contribution practices to maintain a technically sustainable and stable software project for everyone.

### Reporting issues
Did you find a bug in GeoBlacklight or interested in a new feature? Report it by creating an issue on our [GitHub Issue Tracker](https://github.com/geoblacklight/geoblacklight/issues).

 - You will need to have a [GitHub account](https://github.com/signup/free)
 - For bugs, please include the following information:
    - Provide a descriptive summary
    - Explain the expected behavior
    - Explain the actual behavior
    - Provide steps to reproduce the actual behavior

### GeoBlacklight Software Versioning
GeoBlacklight follows the practice of [Semantic Versioning](https://semver.org/) for software releases. The declared semantically versioned public API includes:
 
 - the [public GeoBlacklight Ruby codebase classes](https://www.rubydoc.info/gems/geoblacklight)
 - the GeoBlacklight JavaScript interface
 - the GeoBlacklight view interface

### Contributing Code or Documentation

If you would like to contribute to the code base, see [For Developers](./docs/developers.md) for information about setting up a development environment, and read our [contributing guidelines](https://github.com/geoblacklight/geoblacklight/blob/main/CONTRIBUTING.md).

To contribute to this documentation, go to [this website's repository on GitHub](https://github.com/geoblacklight/geoblacklight.github.io).

## How to Connect

<div class="grid cards" markdown>

- ### Join the Google Group
		
	Follow general project discussions and feature announcements.
		
	https://groups.google.com/forum/#!forum/geoblacklight-working-group
    
- ### Chat on Slack
		
	Chat with others in the community and to work through technical questions. 
		
	[Join GeoBlacklight Slack](https://geoblacklight.slack.com/join/shared_invite/zt-1p7dcay40-Ye_WTt5_iCqU8rDjzhkoWw#/shared-invite/email)

- ### Attend a Monthly Community Meeting
		    
	The GeoBlacklight Community Meeting takes place on the second Wednesday of every month. The meetings are open to anyone interested in hearing more about the status of the GeoBlacklight software and associated projects.
		
	https://z.umn.edu/gbl-meetings
  
- ### Participate in a Community Sprint
		   
	The GeoBlacklight Community collaborates on a 2-week sprint every Winter and Summer. Participation in the sprint is open to anyone interested in working on GeoBlacklight. While similar to a traditional code sprint, the GeoBlacklight Community Sprints also include tackling issues around documentation, metadata, community governance, and more. 
		
	[Read about our sprints](../blog/category/sprints/)

  
- ### Discuss on GitHub
		  
	Find a bug you want to report? Is documentation missing or unclear? Would you like to suggest a new feature? Anyone can create an issue on GeoBlacklight's GitHub issue tracker.
		
	https://github.com/geoblacklight/geoblacklight

- ### Share Metadata
	
	GeoBlacklight gets even better when organizations share metadata. Contribute your metadata to OpenGeoMetadata or use it to populate your own GeoBlacklight installation.
		
	https://opengeometadata.org


</div>


