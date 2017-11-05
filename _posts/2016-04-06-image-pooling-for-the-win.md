---
title: Image Pooling for the Win
layout: post
postimage: /content/2016/04-image-pooling.jpg
related: creativejs
categories:
  - creativejs
  - javascript
  - html5
  - apps
---

[Read this article on medium](https://medium.com/@davetayls/image-pooling-for-the-win-49d47c40e572#.kv3d11jsr)

I’ve recently been working with a luxury car brand on some HTML5 goodness and it’s reminded me to write about a very useful technique used a lot in game programming but often forgotten about when building creative websites and apps.

When you have a number of large images which need to be rapidly switched between or drawn you will very quickly see memory usage going through the roof. We were seeing around 900MiB of memory being eaten up in a second. The first optimisation is to make sure the images are of an appropriate size. In our case the images within the content were being displayed at 394px wide but were originally 1536px wide.

To do this work without eating up all the memory you’ll need create an image pool. This is a fixed pool of image instances which can be re-used.

## Resource throttling

This technique throttles the resource needs by preventing to many images being loaded in to the memory at one time

## Why not just throttle with no pool?

Pooling provides a more optimal usage of the resources. Circumventing the create/cleanup process of your image resources means that you are not hit by the garbage cleanup freeze.

## ---

What might this caching and pooling look like in code? Well, it’s pretty simple, here is an example (TypeScript).

    export class ImagePool {
        constructor(poolSize = 10) {
            this.available = [];
            this.queue = [];
            for (let i=0;i<poolSize;i+=1) {
                this.available.push(new Image());
            }
        }
    
        available:HTMLImageElement[];
        queue:((img:HTMLImageElement) => void)[];
    
        pop(callback:(img:HTMLImageElement) => void):void {
            this.queue.push(callback);
            this.next();
        }
    
        push(img:HTMLImageElement):void {
            if (!img) return;
            img.src = '';
            this.available.push(img);
            this.next();
        }
    
        remove():void {
            this.available = null;
            this.queue = null;
        }
    
        private next():void {
            if (this.available.length && this.queue.length) {
                let callback = this.queue.shift();
                callback(this.available.pop());
                this.next();
            }
        }
    }

To use this code it’s a simple case of requesting an image from the stack pop, then pushing it back once you’re finished with it.

    // We create a new instance
    const imagePool = new ImagePool();
    // Request an image
    imagePool.pop((img) => {
        // Load the image
        img.addEventListener('load', loaded);
        img.src = 'mysrc.jpg';
        function loaded():void {
            // do some work then release the image
            img.removeEventListener('load', loaded);
            imagePool.push(img);
        }
    });

After implementing this technique and managing the pool size we brought down the memory usage from ~900MiB to ~90MiB #WIN
