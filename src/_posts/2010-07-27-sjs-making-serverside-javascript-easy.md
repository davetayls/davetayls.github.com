---
layout: post
author: davetayls
title: sjs, making server-side JavaScript easy
categories: [javascript]
---

I have been working on a new server-side JavaScript framework insired by [jQuery](http://jquery.com) called [sjs](http://github.com/davetayls/sjs). I wanted to give a developer the ability to distribute a JavaScript program which could be run on various platforms. I have initially chosen two to support: Mozilla Rhino and Microsoft CScript. This means that the scripts you have written would work cross platform on Windows, Linux, Mac.

Here is an example of what you can do:

Mozilla rhino
-------------
A common Java based JavaScript implementation. A copy of the js.jar file has been included in the lib folder of the distribution.

	$ java -jar js.jar project.js arg1::var arg2::"foo bar"

Microsoft cscript
-----------------
This comes built in to many Windows and Microsoft Server distributions and so can be utilised without any external dependencies.

	c:\project>cscript project.js arg1::var arg2::"foo bar"

Simple File Operations
--------------------------

	var file = 
	sjs
	  .file('test.txt')             // open text file
	  .append('end of the doc\n')   // append string to end
	  .prepend('new doc header\n')  // insert string at the beginning
	  .append(3,'new line')         // insert string as new line at line 3
	  .save()                       // save changes to disk
	  .save('test2.txt')            // save to new file
	  .prepend('test 2 header\n')
	  .save()
	  .clear()
	  .text('clear and set content of text file');
	
	sjs.print(file.readText());     // return cached file contents
	sjs.print(file.readText(true)); // read in saved file contents and return

Simple Argument Access
----------------------

	sjs
	  .arguments()						// get arguments object
	  .each(function(){					// run function for each
		sjs.print(
		  this.key+'-'+this.values.join(',')
		);
	  });


I hope you can see how powerful this can be and how easy it can be to get a cross platform commandline tool developed. I will blog about how to get a project set up using sjs soon.

In the mean time take a look at the [sjs project page on github](http://github.com/davetayls/sjs)