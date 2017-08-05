---
layout: post
author: davetayls
title: Flight of the Audio Visualator - Bristol Skillswap
postimage: /content/2013-08-flightoftheaudiovisualator.png
related: creativejs
categories:
- html5
- javascript
- audio
- creativejs
- presentation
- talks
---

It was great to be able to present at [Bristol Skillswap](http://bristolskillswap.org/) last week. I'm new to the west and am really excited about getting involved in the community here.

I took a flight through my recent journey with [United Studios Live](http://unitedstudioslive.com) and the 3d Audio Visualizer built in to their new website.

## A whole new world of sound

The Web Audio API has given us loads of great new toys to play with inside the browser.

We can:

 - Analyse sound
 - Generate sound
 - Manipulate sound

So I really want to excite people to give it a go.

## The Stack

The `AudioContext` is much like a guitar effects
board where each "effect" on the board can connect to the next

![connect](https://davetayls.me/presentations/2013/flightoftheaudiovisualator/connect.png)

## Creating waves with Oscillators

First we need a context, then our Oscillator can be created out of the context.

We then just need to connect up the wires
to our end destination (speakers).

    var context = new AudioContext();
    var oscillator = context.createOscillator();
    oscillator.connect(context.destination);

Using the `type` property we have 4 options.

![oscillator types](https://davetayls.me/presentations/2013/flightoftheaudiovisualator/waves.jpg)

*[Learn more about this in Stuart Memo excellent article](http://stuartmemo.com/making-sine-square-sawtooth-and-triangle-waves/)*

    oscillator.type = 0; // Sine
    oscillator.type = 1; // Square
    oscillator.type = 2; // Triangle
    oscillator.type = 3; // Sawtooth

Ok, so you can then set the frequency of the wave.

    oscillator.frequency.value = 440; // A

[Hear these in action](https://davetayls.me/presentations/2013/flightoftheaudiovisualator/code-examples/oscillator.html)


## The Analyser

The core of our site was analysing the audio frequencies This is how we reacted to the frequenices

 - Listen for average and max volume over particular
   frequencies
 - If low frequency band is above a trigger level
   extra visual boost is applied
 - Size of the dots corresponds to levels at each
   band
 - State of last band saved to give history through
   the cube
 - We also use perlin noise function to gradually
   cycle through colours

## Getting the frequencies from the context

The analyser splits up the signal into frequency buckets

    analyser = context.createAnalyser();
    analyser.smoothingTimeConstant=0.3;
    analyser.fftSize=1024;

We can use a JavaScriptNode to process the audio after a number of frames have been sampled

    javascriptNode.onaudioprocess = function(){
      var frequencies
        = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(frequencies);
    }

Take a look at [this great article](http://www.smartjava.org/content/exploring-html5-web-audio-visualizing-sound) by Jos Dirksen taking you through the process of creating a spectogram step by step.

## The Playground

Building the [United Studios Live](http://unitedstudioslive.com) website was a great playground.

We started just mapping the audio spectrum to a row of dots and moving the row along a column each frame to get a sense of history and movement.

![United Live Spray](/content/2013-08-audiovis2.png)

We then wanted to find something a bit of dynamic from the audio and so incorporated a bass trigger which caused that frame's dots to dramatically gain in size and also change colour.

It kinda looked like a crazy tentacle type thing. It was pretty cool but was drifting away from the brand's cube.

![United Live Spray](/content/2013-08-spiderthing1.png)
![United Live Spray](/content/2013-08-spiderthing2.png)

We finally incorporated what we had found back in to a cube and found it quite mesmerizing zooming in and out, spinning the cube around.

So we took note of the camera position and angle at different places around the cube which were especially beautiful.

Using those x,y and z coordinates gradually flew the camera between them interpolating the values of each axis over time using a cubic spline function (illustrated below).

{% include iframeWithLink.html
   src="https://davetayls.me/teststation/creative-js/grapher/interpolation.html"
   caption="Interpolating the values of each axis over time using a cubic spline function" %}

There were some beautiful discoveries

![United Live Spray](/content/2013-08-unitedlivespray.png)
![United Live Spray](/content/2013-08-rain.png)
![United Live Spray](/content/2013-08-closeup.png)

We added some finishing touches. Drag and drop an mp3 to visualize it and random flights to allow it to continually move.

## What are people creating?

People are doing some great things with this. Here are a few things I have come across:

 - Synths
 - Drum machines
 - Games
 - Instruments
 - Songs

and more and more

We've got so many tools to be creative in the browser!

## Some great resources

So give this a go and send me some links of what you've done. Here are some links I found really useful.

- <http://stuartmemo.com>
- <http://stuartmemo.com/making-sine-square-sawtooth-and-triangle-waves/>
- <http://www.smartjava.org/content/exploring-html5-web-audio-visualizing-sound>
- <http://www.html5rocks.com/en/tutorials/webaudio/intro/>
- <http://www.html5rocks.com/en/tutorials/getusermedia/intro/>

## Slides


{% include slides.html
   src="https://davetayls.me/presentations/2013/flightoftheaudiovisualator/" %}
   
