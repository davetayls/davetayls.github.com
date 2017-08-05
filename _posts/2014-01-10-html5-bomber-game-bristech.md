---
title: Building an HTML5 Bomber game - Bristech
layout: post
author: davetayls
postimage: https://davetayls.me/content/2014-01-bomber.png
related: gamedev
categories: 
  - presentation
  - creativejs
  - html5
  - gamedev
  - talks

---

It was great meeting everyone last night at the [Bristech](http://briste.ch) meetup. It was my first attempt at doing a live coding session. It was a steep learning curve but I was encouraged to chat to a few people who have been inspired to build a game themselves.

## The game and some code
So I did build the game beforehand and have put up the code to the game on Github under [http://github.com/davetayls/bomber](http://github.com/davetayls/bomber).

You can also play the game online at [https://davetayls.me/bomber](https://davetayls.me/bomber).

I've written a few posts previously which might help someone who want's to give this a go:

 - [Adventures in HTML5 Games](/blog/2013/03/25/adventures-in-html5-games-akqa-anoraks)
 - 2d games love sprites and I've written a post [looking closer at sprites on canvas](/blog/2013/02/11/drawing-sprites-with-canvas).

These posts cover a lot of the basic concepts so I won't cover those again, but instead let's look at this particular game and some updates I've made because of it.

## Canvas Preloading
I have added an image preloader step in to this game, which I'll need to incorporate in to my other games as Canvas throws a wobbly if you try and draw an image on to it which hasn't already been loaded.

It was pretty simple to write. In the images helper file I have two methods. The first is a `getImage` method which will return a cached `Image` object and also create it if it doesn't already exist for a particular url. It also can take a callback which gets fired once the image is ready.

    images: {},
    getImage: function (src, cb){
      var img = this.images[src];
      if (img && cb){
        cb.call(img);
        return img;
      } else {
        img = new Image();
        img.onload = cb;
        img.src = src;
        this.images[src] = img;
        return img;
      }
    }

The second is a wrapper around this which will go over an array of image urls and fire a callback once they are all ready. You would then call it and pass in the game's `init` function:

    images.preload(urls, init);
    function init(){
      // set up the game 
    }

## Animated `Sprite`
I have now updated my handy `Sprite` object to allow for sprites to be animated. You can find the `Sprite` code inside the `ui/helpers/images.js` file. The key difference is that you can specify the number of frames between sprite switching and it will just loop through the various positions on the sprite sheet you have specified.

    var spr = new Sprite(
      img, 100, 100,
      [[0,0], [50, 0], [100, 0]]
    );
    spr.animate = 8; // switch every 8 frames

{% include figure.html
   caption="The Police Cells at The Island (Bristol)"
   src="https://davetayls.me/content/2014-01-bristech.jpg"
   %}

## The Plane
Each of the objects in this game have pretty simple characteristics. The plane is a good place to start. I tend to create a constructor for each object so that I can potentially create multiple instances of it.

All the plane needs to do is move forward, and drop bombs so it will need properties to support that e.g.

    speed: 3, // pixels per frame
    x: 0, // starting location
    y: 0
    
### Step
I then have a `step` function and a `draw` function in each of the objects to handle their own characteristics. For the plane we just need to move it forward and also tell each bomb to `step()` as well.

    step: function(){
      this.x+=this.speed;
      this.bombs.forEach(stepObj);
    }

You'll notice that I've declared a global function called `stepObj`. In a small game like this I'm not too bothered about that but you'd probably want to encapsulate it better in a larger game. It simply will call an object's `step()` method.

    function stepObj(obj){
      obj.step();
    }

### Draw
The plane's `draw` function will use our `this.flying` [`Sprite` instance](/blog/2013/02/11/drawing-sprites-with-canvas) and also tell each of the bombs to draw.

    draw: function(){
      this.flying.draw(Math.floor(this.x), this.y);
      this.bombs.forEach(drawObj);
    }

Notice that I am flooring the `x` value to allow the `speed` property to be less than 1.

### Dropping a bomb
When we want to drop a bomb we need to tell the `Plane` to `dropBomb()`. This is simply a case of `push`ing a `new Bomb` instance on the the `this.bombs` array. Remember the `draw` method will happen after this and will tell each bomb to draw itself.

## Detecting a hit
Once we've created our `Bomb` and our `Battleship` objects much in the same way we need to be able to check whether any of the `Bomb`s have actually hit any of the `Battleship`s.

### isHit
I've decided to break this work up in to two jobs. The first is within the `Battleship` to tell whether a particular `x` and `y` coordinate makes a hit. To be able to do this we need to know a few things about the ship so I'll create the appropriate methods on the object: `left`, `top` and `right`. We can then do a couple of simple checks.

    isHit: function(x, y){
      if (y > this.top()){
        if (x > this.left() && x < this.right()){
          this.damage = true;
        }
      }
      return this.damage;
    }

### `map`, `reduce` and `checkHit`
Then within the main game loop I've added the functionality to pull out all the `Bomb`s from any `Player`'s `Plane` and pass each of their coordinates through to our `Battleship`'s `checkHit` function.

The map/reduce line look like this:

    players.map(getBombs).reduce(flatten).forEach(checkHit);

So map will take one array and pass in each item to a function and create a **new** array from what that function returns.

    function getBombs(player){
      return player.plane.bombs
    }

So now we should have an array... of an array of `Bomb`s because each `Player`s bombs property is an array.

We want just a single array so we `flatten` it using `Array`'s `reduce` method. The reduce method took me a while to get my head around. But once you do it's pretty useful. It will take an array and pass each item in to a function you specify. The `previous` property will be whatever came out of the previous time the function was run and the `current` property is the current item in the array.

The result will be whatever is returned from the function after calling it on the last item in the array.

    function flatten(previous, current, i, arr){
      if (typeof previous === 'undefined'){
        previous = [];
      }
      return previous.concat(current);
    }

We can then go through each `Bomb` and `checkHit`

    function checkHit(bomb){
      ships.forEach(function(ship){
        ship.isHit(bomb.x, bomb.y);
      });
    }

## Going further
There's obviously a lot more we could go in to but to stop this becoming too lengthy hopefully that should give an overview of the key parts of this game. Take a look through the code *(there's not much of it)* and fire me a tweet if you have any questions.

 - code: [http://github.com/davetayls/bomber](http://github.com/davetayls/bomber).
 - play the game online at [https://davetayls.me/bomber](https://davetayls.me/bomber).
 
Fixes and pull requests are always welcome :o)

## Thoughts for next time
Here are a few things I have taken away from the experience.

### 1. Start with a blank slate
I thought it would be easier to build something beforehand and then work from the same code but with key sections stripped out.

What I found was that I spent most of the time trying to remember what I had coded previously instead of just thinking about the task at hand.

### 2. Much simpler expectations
It was great to have built a complete version of the game beforehand. I would do that again, but for the actual presentation next time I'll just draw boxes on the screen and focus on the gameplay.

I felt there were too many little helpers in there to speed my coding up that probably just added confusion.

Also with a 30 minute talk you actually only get 20 minutes to code and I spent a lot of that talking about the existing concepts rather than coding.

