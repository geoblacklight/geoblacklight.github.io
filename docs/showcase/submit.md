---
hide:
  - toc
  - navigation
---

# How to submit to the Showcase:

!!! info

	To add your instance of GeoBlacklight to the Showcase, you will need the following:
	
	* 	title
	* 	thumbnail image
	* 	description
	* 	site link

## Option A: Ask a GeoBlacklight community member to edit this site

1. [Create a new issue on GitHub here.](https://github.com/geoblacklight/geoblacklight.github.io/issues)
1. Include the title, description and GeoBlacklight site link in the body of the issue
1. Upload an image to the issue that show your homepage 
1. Include the label "showcase" 
1. Someone from the community will pick up the issue and add your instance to this site. It may be helpful to make a comment in Slack to make sure we are aware of the request.

## Option B: Update files and create a pull request in GitHub ("DIY" option)

1. Follow the instructions in the GitHub readme file on how to install mkdocs and clone this site to your desktop: [https://github.com/geoblacklight/geoblacklight.github.io](https://github.com/geoblacklight/geoblacklight.github.io).
1. Make a new branch.
1. Navigate to this folder: `docs/showcase/`.
1. Add your image to the showcase folder (jpg or png).
1. Open `docs/showcase/index.md`.
1. Create a new entry by copying and pasting the following template into the index.md file:

    === "template"

    ```yaml

    - title: 
      image: 
      content: 
      url:
      
    ```
    
  1. Enter your information and image filename.
  1. Alphabetize your entry by title so that it appears on the Showcase page in a predicatable location.
  1. Preview your changes locally with the `mkdocs serve` command ([see the readme for instructions)](https://github.com/geoblacklight/geoblacklight.github.io/).
  1. Commit your changes to the GitHub branch.
  1. Publish your branch.
  1. Open a pull request to the Main branch.
  1. Someone from the community will review and/or merge your submission.