---
layout: post
author: davetayls
title: A Few Useful References
postimage: http://farm5.static.flickr.com/4144/5054436651_59c2ebe7c3_m.jpg
---

I have had a few conversations recently with people asking about tools and resources so I thought I would put a post together pooling a few things together.

HTML5
-----

I have come across a really useful video on the state of HTML 5 and what can be used now. This includes some great thoughts on how we can be using the new tags without depending on JavaScript for IE.

*   <http://developer.yahoo.com/yui/theater/video.php?v=yuiconf2010-tantek>

Also for those who haven't already come across HTML5 boilerplate, take some time to browse through the source.

*   <http://html5boilerplate.com/>


JavaScript
----------

Here's our solution for splitting out JavaScript in to separate files for development work. [Rivet](https://github.com/davetayls/rivet) includes a console app which will combine them for use in a live environment.

<http://the-taylors.org/blog/2010/12/15/rivet-advanced-js-combiner-v2-released/>

We run all our JavaScript through a validation process using jsLint. Go to <http://www.jslint.com> for more details on the validator itself. Here are a couple of useful articles on getting it integrated with Visual Studio and build scripts.

*   <http://the-taylors.org/blog/2010/05/25/including-jslint-in-your-validation-using-nant-batch-files-or-ajax/>
*   <http://the-taylors.org/blog/2010/07/09/add-jslint-checking-to-visual-studio/>

We use Google Closure compiler in our build scripts to minify the JavaScript:

*   <http://code.google.com/closure/compiler/>

### A great video series on the JavaScript Language
*   <http://developer.yahoo.com/yui/theater/video.php?v=crockonjs-1>
*   <http://developer.yahoo.com/yui/theater/video.php?v=crockonjs-2>
*   <http://developer.yahoo.com/yui/theater/video.php?v=crockonjs-3>
*   <http://developer.yahoo.com/yui/theater/video.php?v=crockonjs-4>
*   <http://developer.yahoo.com/yui/theater/video.php?v=crockonjs-5>

### JS for people who have done C#
*   <http://enterprisejquery.com/2010/10/how-good-c-habits-can-encourage-bad-javascript-habits-part-1/>
*   <http://enterprisejquery.com/2010/10/how-good-c-habits-can-encourage-bad-javascript-habits-part-2/>
*   <http://enterprisejquery.com/2010/10/how-good-c-habits-can-encourage-bad-javascript-habits-part-3/>


CSS
---

We use YUI Compressor in our build scripts to minify the CSS:

*   <http://developer.yahoo.com/yui/compressor/>

### IE hasLayout: 

*   <http://msdn.microsoft.com/en-us/library/bb250481(VS.85).aspx>
*   <http://www.satzansatz.de/cssd/onhavinglayout.html>


Build Tools
-----------

NAnt is a free .NET build tool. In theory it is kind of like make without make's wrinkles. In practice it's a lot like Ant.

*   <http://nant.sourceforge.net/>

