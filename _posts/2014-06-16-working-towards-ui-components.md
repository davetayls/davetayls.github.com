---
layout: post
author: davetayls
related: components
categories: 
  - components
  - nodejs
  
---

There is a lot of talk about components in the UI space. I’m currently working with [Econsultancy](http://econsultancy) on building a library of components for use in their website. Just to be clear, I’m not talking about the [WebComponents](http://webcomponents.org/) spec here.

## A bit of history
I first started experimenting with the concept of components when I built the [Lloyd’s of London](http://lloyds.com) website back in 2009. I designed the concept of `modules`, `components` and `layouts` which could specify nested __elements__ and could have slight variations which I called types.

The tough part to building components on the web has always been a way of managing modular blocks of code and their dependencies. In recent years a few advancements have become widely used to make this much easier.

### AMD
The Asynchronous Module Definition spearheaded by [Require.js](http://requirejs.org/) has enabled us to build JavaScript modules and focus on their specific functionality and their dependencies.

### BEM
Then the [BEM](http://bem.info/method/definitions/) definition became widely popular defining blocks, elements and modifiers and allowing a syntax which was commonly known to help keep CSS modular.

## The Last Stronghold
With these becoming standard ways of working with JavaScript and CSS the last stronghold which proves to be a very hard one to crack is working with markup, or more precisely templating. Don’t get me wrong we have some amazing options for templating frameworks in different languages, it’s pulling it all together on the server, and in the browser that’s the problem. I’ve worked with Java, .Net and Ruby teams in the past and we always hit this same problem, our chosen templating engines don’t work both on the server and in JavaScript. After some research actually our options for cross platform templates are extremely limited.

### But why is this important?
There are a couple of key reasons I’m battling with this. 

Firstly I don’t want to see websites becoming JavaScript apps but increasingly the expectation is for them to feel dynamic. With this in mind we often need to write markup templates while rendering components on the server and then rendering them dynamically on the client. This isn’t particularly DRY and is so easily prone to templates getting out of sync. I can see it so clearly when the front-end developers work on a separate component library and the server side devs integrate markup for use in the initial rendering of pages.

Secondly, to be able to properly separate concerns of a component (being HTML/CSS/JS) and it’s inclusion in to a website we need to be able to build them in isolation. This often means that the front-end developers are using [Node.js](http://nodejs.org) to maintain a catalog of these components. 

I’m coming to the conclusion that ideally these catalog sites should just use the same server side language as the main website. It feels like a defeat to my ideal. I’m a firm believer that if you want the best out of someone, you allow them to use the tools which they are comfortable with. Then the tools don’t get in the way. However there seems to be so many hoops to jump through, created when different server technologies are in play. This doesn’t change the fact that we still need to be able to maintain templates that work for dynamic components in the browser … aghhh this feels like a total mess and I’ve almost resigned myself to maintaining 2 markup templates for each component. At least we can keep them in the same place and be maintained by the front-end developer not passed on to someone who isn’t specialised.

## Full Stack
I’ve been working with a few projects where the whole stack is based around JavaScript with [Node.js](http://nodejs.org) on the server and HTML5 in the browser. It’s exciting seeing the interest in building websites this way. Having that continuity does remove many of the barriers I’ve battled with over the last 10 years and there are some really great frameworks arising in to this space (often built on top of [Express.js](http://expressjs.com/)) like [Kracken](http://krakenjs.com/), [Sails](http://sailsjs.org), [Meteor](https://www.meteor.com/). It doesn’t mean you can suddenly put a UI dev in a Node.js cap and tell him to get on with it because it’s still a very different skill but there are a lot more transferrable skills when your team works like this and thinking with JavaScript comes naturally.

## At least there’s a plan
Ok, so this leave’s me kind’a satisfied, that even if I can’t always have the ideal I would like to see these important things:

 - The front-end developers are the ones who do the markup, everywhere
 - We work with a set of components which can have moving parts (i.e. modifiers)
 - We work through the restrictions for a long-term gain of good maintainability and valuable documentation

