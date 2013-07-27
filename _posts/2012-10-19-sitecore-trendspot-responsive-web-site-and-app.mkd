---
layout: post
author: davetayls
title: Sitecore Trendspot Responsive Web Site and App
postimage: https://lh6.googleusercontent.com/-CmjEookI6Q8/UH-yUx3L-dI/AAAAAAAArr8/4ugKk_xTurM/s800/sitecoretrendspot.png
categories:
    - responsive
    - css
    - showreel
    - project
---

<a href="http://www.w3.org/html/logo/">
<img src="http://www.w3.org/html/logo/badge/html5-badge-h-css3-device-semantics.png" width="197" height="64" alt="HTML5 Powered with CSS3 / Styling, Device Access, and Semantics" title="HTML5 Powered with CSS3 / Styling, Device Access, and Semantics">
</a>

One of the last projects I completed before going away to [Toronto](http://www.toronto.ca) in March 2012 I was a [responsive web site and app](/blog/category/responsivedesign/) for an annual [Sitecore](http://www.sitecore.net) event called [Digital Trendspot](http://www.sitecore.net/events/TrendspotUK/). This was a great project to be involved with as it used some features like *Geo Location* and *CSS Media Queries* to create a web site which could also be used as an app for the event's attendees on the day.

Showcase
--

Here is a short showcase video to give you an idea of how the app looked and responded to it's surroundings.

<iframe src="http://player.vimeo.com/video/51468900" width="500" height="281" frameborder="0" webkitAllowFullScreen="true" mozallowfullscreen="true" allowFullScreen="true">vimeo</iframe>

You can [Watch it on Vimeo](http://vimeo.com/51468900)

Geo Location: Take me to the venue
--

As with all these new features I needed to consider how that feature would be used in the case that it didn't exist in the user's browser and then enhance the experience for the browsers that did.

For the Geo Location functionality the markup started as a simple link to the correct details of the venue on Google maps. The JavaScript then used the same location and updated the link with the users current lat-long so that it would also give directions.

I opted to use a very simple "as the crow flies" distance calculation which just takes two lat-long coordinates and calculates the distance between them. If I had a little more time I would have liked to query the Google directions api and see if I could get a more precise distance from that.

Web App
--

I built this site so that it could be embedded in to a web app framework like [Phone Gap](http://phonegap.com). It also allowed the ability to be run full screen from the home screen on Apple devices.

Improvements and Conclusion
--

Other improvements I would have liked to build in would have been to allow most of the features to be available offline as the attendees were travelling to the venue (ie via the underground). This would have been relatively straight forward with HTML5's offline manifest.

I am excited as the browsers in mobile and tablet devices become faster but as for now I personally notice the performance boost by using a native app. Having said that I was quite surprised at how responsive this app was. For something not very complex an HTML5 web app seems to be pretty viable.

I'd love to hear your thoughts, I'm always looking to improve. Leave a message below or I'm [@davetayls on twitter](https://twitter.com/intent/tweet?url=/blog/2012/10/19/sitecore-trendspot-responsive-web-site-and-app/&via=davetayls)
