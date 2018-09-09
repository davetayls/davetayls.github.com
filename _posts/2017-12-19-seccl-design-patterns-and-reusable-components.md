---
layout: post
title: Seccl Design Patterns and Reusable Components
postimage: /content/2017/12-seccl-patterns.jpg
related: seccl
categories:
  - project
  - seccl
  - components
  - thoughts
  - architecture
---

Planning out a large application can be a very daunting prospect, especially when it comes to considering all the ways in which it will be used. At [Seccl](https://seccl.tech), we break down our user interfaces and applications so that we are not just considering the pages.

We look at the ways people will journey through our applications; we then break it down to the ways someone might interact with a part of each journey; finally we look further into the individual pieces that you see on the screen.

I always come back to something which has confirmed itself to me continuously over the years. Big things are always made up of lots of small interconnecting pieces. So to realise a big idea like we have at [Seccl](https://seccl.tech), we must start with these small things. We’ve got to ground ourselves in the real life of our products — our end customers are trying to achieve something! Whether it is saving for your future, making the most of new investment opportunities around globe or using your financial experience to provide these services for others. We are dedicated to taking away the technical complexity of providing financial services.

So what does this look like on the ground? Day-to-day we are thinking of common ways of interacting with our service. We then name these and define them as a pattern.

Examples of patterns might be:

 - Entering an amount to invest
 - Viewing the growth on an account

These patterns combine stand-alone pieces of the screen with interactions over time.

{% include figure.html
   caption="[Seccl](https://seccl.tech) Investment Order List Component"
   src="/content/2017/12-seccl-patterns-order-list.png"
   %}


We think of common pieces within the screen as components. Examples of components might be a Button, Heading, Account Summary Box or an Investments Summary Table.

These components will range in their complexity. Some will be very simple while others will glue together many other components to form something new. This structure was named [Atomic Design](http://bradfrost.com/blog/post/atomic-web-design/) by Brad Frost. He describes in great detail how we are bringing together an art and a science. We are developing “thoughtful design systems, rather than creating simple collections of pages”.

Approaching our products in this way enables us to place patterns around the site where they make most sense to the person using it. It is easier to keep fresh, easier to maintain and easier to ensure the best experience for those who use our services day-to-day.

As an industry, our approach to building these experiences is maturing. At [Seccl](https://seccl.tech), applying strong foundations to our code will mean that scale doesn't bring the same level of complexities I have often seen in my experience working with enterprises around the world.
