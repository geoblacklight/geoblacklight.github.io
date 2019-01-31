---
layout: tutorial
title:  "Using Packer to create a development virtual machine for GeoBlacklight"
date:   2016-01-23 11:00:00
categories: tutorial
author: 'Jack Reed'
author_link: 'https://twitter.com/mejackreed'
snippet: 'A tutorial on how we use Packer to create a working virtual machine for the GeoBlacklight workshop'
---

When we run the GeoBlacklight workshop, we provide attendees with a VirtualBox virtual machine (vm) so that they can participate without having download software. Having attendees connect to the internet to download large files doesn't always work in conference environments. To keep up to date with software dependencies we have rebuilt this virtual machine several times. Recently, the process for creating and updating the virtual machine has been automated using [Packer](https://www.packer.io/downloads.html). From Packer's website:

> Packer is a tool for creating machine and container images for multiple platforms from a single source configuration.

This tutorial outlines how we create the GeoBlacklight workshop vm, so that others can create this virtual machine from scratch. This tutorial could also be adapted to [create an image](https://www.packer.io/intro/platforms.html) for Amazon EC2, Digital Ocean, Docker, and others.

### Getting started

To get started, you will need to install several pieces of software that our Packer template will use. Go ahead and install this software for your system.

Required software:

 - Packer [installation](https://www.packer.io/downloads.html)
 - VirtualBox [download](https://www.virtualbox.org/wiki/Downloads)
 - Vagrant [download](https://www.vagrantup.com/downloads.html)
 
Once you have installed all of the software, make sure that you have Packer available on your path.

```sh
$ packer -v
0.8.6
```

### Using the GeoBlacklight Packer template

Next, you will need to clone down the [Packer template](https://github.com/mejackreed/packer-templates) that was created for the GeoBlacklight Workshop from [https://github.com/mejackreed/packer-templates](https://github.com/mejackreed/packer-templates).

```sh
$ git clone https://github.com/mejackreed/packer-templates.git
```

Next change directory (`cd`) into the git repository you just cloned.

```sh
$ cd packer-templates
```

And checkout the `geoblacklight` branch.

```sh
$ git checkout geoblacklight
```

Finally, change directory (`cd`) into the `ubuntu-16.04.3` directory. This is the image I based the GeoBlacklight Workshop image on.

```sh
$ cd ubuntu-16.04.3
```

<div class='flash-alert'>
  It should be noted that I opted for the 32-bit version of this release of Ubuntu for maximum compatibility. You may want to change the <a href="https://github.com/mejackreed/packer-templates/blob/geoblacklight/ubuntu-16.04.3/template.json#L84">version of Ubuntu</a> used and thus you must also update <a href="https://github.com/mejackreed/packer-templates/blob/geoblacklight/ubuntu-16.04.3/template.json#L82">the checksum</a>.
</div>

### Exploring the Packer template

The [`template.json`](https://github.com/mejackreed/packer-templates/blob/geoblacklight/ubuntu-16.04.3/template.json) file is where Packer takes its directions from. I won't go through everything in this file, but I will point out some of the customizations I made for the GeoBlacklight workshop.

The major customizations added, were the addition of four scripts that run during creation.

#### [`ruby.sh`](https://github.com/mejackreed/packer-templates/blob/geoblacklight/ubuntu-16.04.3/scripts/ruby.sh)
Installs rbenv, Ruby, bundler, and specifies no rdoc documentation.

#### [`rails.sh`](https://github.com/mejackreed/packer-templates/blob/geoblacklight/ubuntu-16.04.3/scripts/rails.sh)
Installs nodejs and Ruby on Rails.

#### [`geoblacklight.sh`](https://github.com/mejackreed/packer-templates/blob/geoblacklight/ubuntu-16.04.3/scripts/geoblacklight.sh)
Creates a GeoBlacklight application and downloads and configures jetty/solr.

#### [`opengeosuite.sh`](https://github.com/mejackreed/packer-templates/blob/geoblacklight/ubuntu-16.04.3/scripts/opengeosuite.sh)
Installs OpenGeoSuite.

### Creating the Vagrant box

You can modify any of these scripts to meet your customization needs. After doing so, you will want to create your VirtualBox vm. To do so run the following command from the `ubuntu-16.04.3` directory:

```sh
$ packer build template.json
```

This command will take a while so it might be best to go get a coffee. What the command is doing:

 - Downloading a fresh copy of Ubuntu
 - Creating a VirtualBox image with that copy of Ubuntu
 - Updating the vm's packages
 - Installing our custom software

After the command finishes you should have your virtual machine box waiting for you in the same directory.

To create a `Vagrantfile` to use with this box:

```sh
$ vagrant init ubuntu-14-04-3-x32-virtualbox.box
```

Now you can start up your fresh box using:

```sh
$ vagrant up
```

And to ssh in

```sh
$ vagrant ssh
```

### Conclusion

I hope this tutorial is useful to others who run technical workshops. It can sometimes be painful in trying to support workshops on multiple platforms with limited network connectivity. This workflow of using Packer, Vagrant, and VirtualBox has been successful for us.
