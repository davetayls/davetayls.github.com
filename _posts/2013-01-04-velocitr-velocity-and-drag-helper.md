---
layout: post
author: davetayls
title: Velocitr, velocity and drag helper
categories:
  - javascript
  - releases
---

I needed a way of applying velocity and drag to a new UI I am putting together, much like the one I built in to [jQuery.kinetic](https://davetayls.me/jquery.kinetic).
So I have pulled it out in to a simple reusable object.

I have called it [Velocitr](https://github.com/davetayls/velocitr#readme) and it's [source is on Github](https://github.com/davetayls/velocitr).

Usage
--

    // create an instance
    var v = new Velocitr();
    // set starting point
    v.move(30, true);
    // move
    v.move(50);
    // get velocity
    assert(v.velocity).equals(20);
    // apply drag
    v.drag = 0.9 // => default
    v.decelerate()
    assert(v.velocity).equals(18);

### Chaining

    var v = new Velocitr();
    v.move(30, true)
     .move(60)
     .decelerate();
    assert(v.velocity).equals(27);

Tests
--
It comes with a suite of tests which are written with the help of [QUnit](http://qunitjs.com) and [Pavlov](https://github.com/mmonteleone/pavlov) and can be found in the `test/` folder.

I have written a few QUnit tests but this is the first time I used [Pavlov](https://github.com/mmonteleone/pavlov) and I much prefer the syntax.

Here's a little taster.

    pavlov.specify('Velocitr', function(){

      describe('velocitr', function(){

        it('should cap the velocity', function(){
          var v = new Velocitr();
          v.set(30);
          assert(v.velocity).equals(30);
          v.set(100);
          assert(v.velocity).equals(40);
          v.set(-100);
          assert(v.velocity).equals(-40);
        });
        it('should create positive velocity when moved forward', function(){
          var v = new Velocitr();
          v.move(30);
          assert(v.velocity).equals(30);
          v.move(-30, true);
          v.move(-10);
          assert(v.velocity).equals(20);
        });
        it('should be able to chain', function(){
          var v = new Velocitr();
          v.move(30, true)
              .move(60)
              .decelerate();
          assert(v.velocity).equals(27);
        });

      });

    });

## Enjoy
I thought this might be useful for others wanting a similar functionality.
