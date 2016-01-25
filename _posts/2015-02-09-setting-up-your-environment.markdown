---
layout: tutorial-c4l
title:  "Setting up your environment - Part 2 - GeoBlacklight Workshop"
date:   2015-02-09 14:58:00
categories: tutorial
author: 'Jack Reed'
author_link: 'https://twitter.com/mejackreed'
snippet: 'Setting up your development environment for GeoBlacklight. Created as part of a tutorial series given in a GeoBlacklight Workshop'
---

## Setting up your environment
  - Development requirements
  - Local attendees setup VirtualBox/Vagrant

### Development requirements

GeoBlacklight has similar prerequisites to [Blacklight][blacklight]. It diverges from Blacklight requirements by using a customized Solr schema and configuration, [Geoblacklight-Schema][geoblacklightschema].

#### Software you should have installed on your development computer

  - [Ruby > 1.9.3][installruby]
  - [Rails > 4][installrails]
  - [Git][installgit]
  - Java (for local Solr server)

Local attendees of the workshop have the option of just using the pre-created environment on the provided thumb-drive. If you are not at the workshop, you can create the virtual machine for the workshop, by following [this guide]({% post_url 2016-01-23-using-packer-to-create-a-development-virtual-machine %}).

### Local attendees setup VirtualBox/Vagrant
  
Good news for local workshop participants, this is already done for you using VirtualBox and Vagrant. On the thumb-drive underneath a directory titled 'geoblacklight_workshop'. Thanks to Justin Coyne and [Data Curation Experts](http://curationexperts.com/) for this approach that is used at HydraCamps.

For those interested in what was installed on this machine and how it was created checkout [this gist](https://gist.github.com/mejackreed/727e9cd2e971ca3949a2).

 - [Vagrant for OS X and Linux](#vagrant-for-os-x-and-linux)
 - [Vagrant for Windows](#vagrant-for-windows)

#### Vagrant for OS X and Linux
  1. Install the Mac (.dmg) version of VirtualBox and Vagrant on your machine. If you are using Linux, please download and install appropriately. [VirtualBox Downloads](https://www.virtualbox.org/wiki/Downloads), [Vagrant Downloads](https://www.vagrantup.com/downloads.html)
  1. Make a new directory for your work

    ```sh
    $ mkdir ~/scratch
    ```

  1. Copy the `geoblacklight_workshop` directory to your `~/scratch` directory

  1. Move to your `~/scratch/geoblacklight_workshop` directory

    ```sh
    $ cd ~/scratch/geoblacklight_workshop
    ```

  1. Start vagrant

    ```sh
    $ vagrant up # This command creates and configures guest machines according to your Vagrantfile.
    ```

  1. SSH to the VM

    ```sh
    $ vagrant ssh # This will SSH into a running Vagrant machine and give you access to a shell.
    ```

#### Vagrant for Windows

Thanks to Zach Vowell who contributed this guide for Windows.

Note: this tutorial uses the [Cygwin](https://www.cygwin.com/) tool so please make sure that is installed first, but it should be applicable to users who don't use Cygwin but have a Windows ssh client installed [download PuTTY](http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html).

  1. Install the Windows (.exe) version of VirtualBox and Vagrant on your machine.

  1. Open a Cygwin terminal and cd to your home directory

    ```sh
    $ /cygdrive/c/Users/[username]/
    ```
  
    <div class='flash-alert'>
    [cygdrive/ being a Cygwin convention for getting to the root of your computer's file system.]
    </div>

  1. Make a new directory for your work

    ```sh
    $ mkdir scratch
    ```

  1. Copy the `geoblacklight_workshop` directory to your `~/scratch` directory

  1. Move to the `geoblacklight_workshop` directory

    ```sh
    $ cd scratch/geoblacklight_workshop
    ```

  1. Start Vagrant

    ```sh
    $ vagrant up # This command creates and configures guest machines according to your Vagrantfile.
    ```

  1. Minimize the Cygwin terminal, and then open up PuTTY

  1. SSH into the Vagrant box by entering the following parameters into the "Basic Options for Your PuTTY session" window:
    - Host Name (or IP address): 127.0.0.1
    - Port: 2222

  1. When PuTTY shell prompts for a username and password, enter "vagrant" for both. You should now see a command prompt.

<div class='flash-notice'>
  <a href="{% post_url 2015-02-09-create-your-application %}">Next → Part 3 - Create your application</a>
</div>

[geoblacklight]:        http://geoblacklight.org
[geoblacklightproject]: /projects/geoblacklight
[geoblacklightschema]:  https://github.com/geoblacklight/geoblacklight-schema
[installruby]:          https://gorails.com/setup#ruby
[installrails]:         https://gorails.com/setup#rails
[installgit]:           https://gorails.com/setup#git
[rubyonrails]:          http://rubyonrails.org/
[blacklight]:           http://projectblacklight.org/
