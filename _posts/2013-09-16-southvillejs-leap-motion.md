---
layout: post
author: davetayls
title: Leap Motion workshop at Southville JS Bristol
postimage: /content/2013-09-southvillejs-leap.png
related: creativejs
categories:
- html5
- javascript
- creativejs
- leapmotion
- presentation
- talks
---

What do you get when you mix a few [Leap Motion](http://leapmotion.com) devices, a few eager developers and space invaders? 

We found out at the recent [Southville JS Workshop](http://www.meetup.com/SouthvilleJS/events/130960852/) in Bristol. I have been excited about getting involved and I think we had a great workshop to finish the weekend off with some light-hearted fun.

Here are some of the key aspects we went through to program a simple Space Invaders controller using the Leap Motion.

## Leap with JS

Leap Motion JavaScript support has two main components.

1. WebSocket server (JSON-formatted messages)
2. JavaScript client library, Leap.js

## Coordinate System

The Leap's coordinate system provides X,Y,Z axis which is known as a [Cartesian coordinate system](http://en.wikipedia.org/wiki/Cartesian_coordinate_system).

![axes](/content/2013-09-leap_axes.png)

The units that are given to you through the api are in real-world millimetres.

## Frame Loop

In a minute we'll go through some of the information you get from the leap when you hook in to it's api. To give you a little context lets first look at what code you might write to access the data.

First you will need the [leap.js](http://js.leapmotion.com/) script in your page.

    <script src="//js.leapmotion.com/0.2.0/leap.min.js"></script>
    
You can use it directly from the Leap Motion site or include it in your own project. The library hides a lot of the complexity of connecting to the web socket server and provides you with a frame loop you can hook in to. The frame loop will run up to 60 frames per second but can vary depending on the machine.

Here is an example of providing a callback function which gets the frame data.

    Leap.loop(function(frame){
        // frame.hands
        // frame.fingers
        // frame.tools
    });

The frame data provides arrays of object types which could be present during that frame.

## Gestures and Taps

The Leap also provides helpful gesture recognition which you need to turn on. For each gesture observed, the Leap adds a Gesture object to the frame. You can get these Gesture objects from the Frame `gestures` list.

    Leap.loop({ enableGestures: true }, function(frame){
        // frame.gestures
    });

 - Circle — A single finger tracing a circle.
 - Swipe — A linear movement of the hand.
 - Key Tap — A tapping movement by a finger as if tapping a keyboard key.
 - Screen Tap — A tapping movement by the finger as if tapping a vertical computer screen.
 
## Hand Sphere

The leap data provides some hidden gems. One of those details an the size of an invisible ball should it fit in the palm of the hand. It's worth having a dig through the documentation and the `frame` object the comes back in dev-tools.

![hand sphere](/content/2013-09-leap_hand_ball.png)

 - `sphereCenter` — The center of a sphere fit to the curvature of the hand (as if it were holding a ball).
 - `sphereRadius` — The radius of a sphere fit to the curvature of the hand. The radius changes with the shape of the hand.

## A Simple Controller

We built a very simple controller for my [multiplayer Space Invaders game](https://github.com/davetayls/space-invaders). The rules were simple:

 - If the hand is more than 40mm to the left we move the ship left
 - If the hand is more than 40mm to the right we move the ship right
 - If there is 2 or more fingers in view then we tell the ship to shoot

Let's first look at the function which would output that logic given the right parameters. The game's web-socket server is expecting a space separated string like `"left space"` or `"right"`. So our `getCurrentKeys` function could look like this.

    function getCurrentKeys(xPos, fingers){
        var k = [];

        // if our hand is over 40mm to the left
        if (xPos < -40){
            k.push('left');
        }

        // if our hand is over 40mm to the right
        if (xPos > 40){
            k.push('right');
        }

        // if our hand has more than 1 finger visible
        if (fingers > 1){
            k.push('space');
        }

        // return space separated current keys
        return k.join(' ');
    }

OK, so how do we get the `xPos` to pass in to this function?

The Leap's coordinate system gives us an `Array` with values for `[X,Y,Z]` and once we know there is a hand in view we can get it's `palmPosition`.

        Leap.loop(function(frame){

            // ... other game functionality
        
            // check if there are any hands in view
            if (frame.hands.length){
                // save the current xPos now that we know
                // we have a hand in view
                xPos = frame.hands[0].palmPosition[0];
            }        
            
            // ... other game functionality
            
        });

And how might we get the number of fingers?

        Leap.loop(function(frame){

            // ... other game functionality
        
            // our dummy controller tells the game to
            // shoot if there is more than 1 finger visible
            var fingers = frame.fingers.length;
                        
            // ... other game functionality
            
        });

You can take a look at the [full controller code](https://github.com/davetayls/space-invaders/blob/gh-pages/multiplayer/public/controller-leap-motion.js).

## Resources

Here are some helpful links to get you going:

### Leap Motion
 - Website <https://www.leapmotion.com/>
 - SDK <https://developer.leapmotion.com/downloads>
 - Developers area <https://developer.leapmotion.com/>
 - Leap JS <https://github.com/leapmotion/leapjs>
 
### Simple Space Invaders Game

I have set up a simple space invaders game which includes a multiplayer version and a simple leap controller using leap.js

[https://github.com/davetayls/space-invaders](https://github.com/davetayls/space-invaders)

## Enjoy!

ps. thanks [Katja Durrani](http://blog.kdurrani.co.uk/2013/09/11/SouthvilleJS-JavaScript-workshop/) for letting me use the space invaders pic




