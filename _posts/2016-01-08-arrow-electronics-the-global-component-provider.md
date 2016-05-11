---
layout: post
postimage: /content/2016-01-arrow.jpg
related: project
categories:
  - workwithme
  - releases
  - project
  - responsivedesign
---

Last year I had the pleasure to work as a UI Lead for [The BIO Agency](http://www.thebioagency.com/) and
[Arrow Electronics](https://www.arrow.com). I joined the project a few months in to help the existing 8 Frontend developers
and fair few other team members across their disciplines with FE code architecture and in turn support Arrow's growing team in Denver, Colorado.

We had a great relationship with the team at Arrow. I had never heard of them before, so it was interesting to hear that
many of the electronic products we use day to day have probably had parts supplied by them.

![Arrow homepage](/content/2016-01-arrow-home.jpg)

Here's a little about Arrow from their [About Arrow](https://www.arrow.com/en/about-arrow/overview) page:

> Arrow Electronics is a global provider of products, services and solutions to industrial and commercial users of electronic components and enterprise computing solutions, with 2014 sales of $22.8 billion. Arrow serves as a supply channel partner for over 100,000 original equipment manufacturers, contract manufacturers and commercial customers through a global network of more than 460 locations in 56 countries.

The main CMS was built on Sitecore connecting with numerous third party apis, bringing them under one centralised source
of truth for the products and services Arrow offers.

![Arrow stats](https://cdn-images-1.medium.com/max/1600/1*w8maFuPUaCUxU3ofAZ6W_g.jpeg)

## Responsive, with support for ie8

The current site showed a large proportion of engineers still using ie8 but we didn't want that to restrict the site from
appealing to what is an obvious trend towards access from smaller devices.

![Arrow homepage](/content/2016-01-arrow-responsive.jpg)

## Hidden gems

There were some hidden creative gems. One of which I was lucky enough to be able to program myself in the form of some "tron lines" to take the users through a tour of the key
pieces of functionality.

![Arrow tour](/content/2016-01-arrow-tour.gif)

## A trip to Arrow in Denver

It was great to meet the team in Denver and work with them for a couple of weeks last year. Colorado, is a really
beautify place but it was touch being away from my family for so long.

![Colorado](/content/2016-01-colorado.jpg)


## UI Tech Stack

The Frontend tech stack is getting a little ridiculous these days, the struggle was to keep it small but invariably
there was a fair few pieces to it. However as a general overview our tech stack included:

### Node.js

We built most of the ui using a standalone Express server with customisable mocks for API calls. This meant the
Frontend developers didn't have the dependency on Sitecore which is restricted to Windows and is VERY slow for UI
development.

### All the Grunts

Grunt was used for all the Frontend automation

### Browserify, Babel, SCSS etc

We ended up with 2 bundles for browserify and SCSS. One for a custom UiKit which could be used in arrow.com but also in external sites, 
and another for the custom arrow.com code.

Go take a look for yourself on <https://www.arrow.com>.
