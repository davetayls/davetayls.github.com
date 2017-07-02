---
title: GigStamp the checkin app for music fans
layout: post
author: davetayls
postimage: /content/2014-02-gigstamp.png
related: gigstamp
categories: 
  - gigstamp
  - nodejs
  - html5
  - apps
  - project
---

I feel like I've been in my little hole for months now ... oh yeah it has been, since October! I've been beavering away in my evenings building a simple idea: 

> I'm a music fan, how can I collect and remember the gigs I've been to?

Together with [Gordon Duncan](http://www.apb-pr.co.uk/) who came up with the original idea I have been building [GigStamp](http://gigstamp.com).

## The check-in app for music fans

The app is really very simple on the surface. It finds you at a gig, you choose some stamp artwork, add a message and boom ... you have your stamp.

![share](/content/2014-02-gigstamp-stamp.png)

## Collection

I wanted this to feel like the digital equivalent of collecting your gig tickets. Seeing the collection screen I hope will be a place to bring back memories of going out and seeing a great band.

![screens](/content/2014-02-gigstamp-screens.png)

Maybe in the future we'll be able to create posters of people's GigStamps for a festival or a particular year.

## Artwork

We've teamed up with a few designers and photographers to create an initial few sets of generic stamps. It's been great to work with [David Hampshire](https://www.behance.net/DavidHampshire), [Ben Powell](http://www.rootcreations.co.uk/) and [Nik Jones](http://www.helloimnik.co.uk/).

## Sharing

Each time you collect a GigStamp it is automatically saved either in to a Facebook photo album or posted to a twitter account. Here is an example of one of stamps created from a Fun Lovin' Criminals gig in London.

![share](/content/2014-02-gigstamp-facebook.png)

Even through our testing period, it's been really exciting to see how these simple images can create conversation and become something which sparks a memory.

## Tech

I built the app with a [Node.js](http://nodejs.org) server and an HTML5 wrapper app using [Cordova](http://cordova.apache.org/). I'll blog a bit more some other time about some of my experiences trying to get a complete HTML5 based stack working.

## Where is it going

We have based the gig results from the API at [Songkick](http://www.songkick.com/) which will mean that we will instantly be able to allow GigStamps to be created internationally. We're now working with some regular giggers on the final tweaks before I submit the app initially to the Apple app store, and then hopefully soon after to the Google Play store.

You can sign up to the [GigStamp mailing list](http://gigstamp.com) to be notified when the app is available.
