---
layout: post
author: davetayls
title: Testing Front-End to Content Based Sites
categories: front-end
postimage: http://farm2.static.flickr.com/1394/1142842336_23ae612f93.jpg
---

I am trying to put together some thoughts on testing the various aspects of the Front-End to content based web sites (ie not web apps). I thought I would document the journey.

This is something I have been thinking about for some time. There are various aspects to the front-end architecture which I'd like to break down and think about individually.

Areas of Web Testing
---------------------

Here are the areas which I think I'll look at more closely.

*    Front-End Code Validation
     This is making sure that the code being created adheres to a decided set of standards.

*    Html Validation (Html Validator)
     Use a custom DTD so that you can specify decided upon exceptions to the rules:
     https://github.com/NeilCrosby/frontend-test-suite/tree/master/dtd
*    CSS Validation (CSS Validator)
*    JavaScript Validation (jsLint)
*    Check for broken links

*   Functional Testing

    *    User journeys

*   Link Checking
*   Unit testing
*   Test Coverage

Current Reading List
--------------------

Here are a few sites on an initial search which I'm going to glean some thoughts from.

*   [Automated Frontend Testing - YDN - Neil Crosby](http://www.vimeo.com/4093731), [Slides](http://www.slideshare.net/neilcrosby/automated-frontend-testing)
*     <http://dojotoolkit.org/reference-guide/util/doh.html>
*     <http://dojotoolkit.org/reference-guide/util/dohrobot.html>
*     <http://blog.medryx.org/2008/06/08/dojo-doh-unit-testing/>
*     <http://tddjs.com/>
*     <http://code.google.com/p/js-test-driver/>
*     <https://github.com/jeresig/testswarm>
*     <http://html-src.com/web-dev/88/test-driven-development-tdd-using-javascript-with-qunit/>
*     <http://html-src.com/web-dev/88/test-driven-development-tdd-using-javascript-with-qunit/>
*     <http://slmoloch.blogspot.com/2009/08/how-to-run-jstestdriver-with-visual_02.html>
*     <http://code.google.com/p/js-test-driver/wiki/QUnitAdapter>

Here we go!
