---
layout: post
author: davetayls
title: Measuring performance between high resolution timers
postimage: /content/2013-09-perf.png
categories:
- html5
- javascript
---

Here's a quick tip for doing some simple performance measuring in Javascript. If you want to see how long a particular job takes you can use the new performance api like so:

## Mark a starting point

    window.performance.mark('custom_name')

## End and measure

Once the job has completed you can tell the performance api to create a measurement between the current time and the mark you ceated earlier.

    window.performance.measure('custom_measure', 'custom_name')

## Grab the details

You can then get all the measurement information.

    window.performance.getEntriesByName('custom_measure')

here is an example of the output

![perf output](/content/2013-09-perf-output.png)


