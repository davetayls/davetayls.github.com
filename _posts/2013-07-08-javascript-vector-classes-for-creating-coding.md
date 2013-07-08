---
layout: post
author: davetayls
title: JavaScript Vector Classes for Creative Coding
postimage: /content/2013-07-08-js-vector-classes.png
related: releases
categories:
  - releases
  - javascript
---


I have started a small [collection of JavaScript Euclidean Vector
classes](https://github.com/davetayls/js-vector-classes). These are
commonly used in creative programming. I wanted a quick way of adding
Vectors in to any project that may need them so they're installable
from [bower](http://bower.io) and have a basic set of methods available.

## Set up

Currently there is 2 dimensional and 3 dimensional Vectors available.
Add references to the files to your project.

### Bower
You can install these as a bower dependency

    $ bower install js-vector-classes --save

### RequireJs

This can be used as a [RequireJs](http://requirejs.org) dependency.
The Vector files will return the JavaScript constructor class. You
will just need to point the module name to the corrent location of
each file.

    require(['Vec2'], function(Vec2){
        var velocity = new Vec2(10, 5);
    });

## Usage

You can start using this vector by creating a new instance:

    var v        = new Vec2(1, 5),
        velocity = new Vec2(10, 5),
        location = new Vec2(250, 100)
    ;

You can set the properties again using

    v.set(x, y)

### Maths

You have the following methods available to you.

    // Maths
    v.plus(Vec2)
    v.minus(Vec2)
    v.mult(Vec2) // multiply
    v.div(Vec2)  // divide
    v.mod(Vec2)  // modulus

    // helpers
    v.inv()      // invert

#### New Instances
Each of these also have a version which returns a new instance just
change the first letter to be uppercase.

    v.Plus(Vec2)
    v.Minus(Vec2)
    // => etc

### Helpers

You also have a few helper functions

#### copy(Vec2)
This copies the properties of another vector in to the current
vector.

#### clone()
This returns a new instance of the current vector with cloned values

#### equals(Vec2)
This will return true if the properties of the two vectors are equal

#### distance(Vec2)
This will return the distance between two vectors.

## Contributing
Feel free to send pull requests and I'll review them as soon as I can.

