---
layout: post
author: davetayls
title: Rivet Advanced JavaScript Combiner v2 Released
categories: javascript
postimage: /content/rivets.jpg
---

I have been continuing my work with [Arnold Zokas](http://twitter.com/arnoldzokas) on building a [scaleable JavaScript solution](https://github.com/davetayls/rivet) which combines with a simple console app. It was initially created for use with Juxtapo but as it has grown I felt it needed it's own identity and so have renamed it "Rivet".

It's not only had a name change, we have also been adding new features and test cases and have now got a rich and stable version 2 release.

## A few things we've added:

*	Relative paths to combiner's parent directories
*	Support for use with Rhino
*	Support for use with Microsoft CScript
*	Support for build variable replacement on combining
	eg: will turn @VARIABLE_NAME in your javascript to something specified on 
*	Nested combiners. So a combiner can include another combiner which will all end up in the same file in order.

One of the great features of Rivet is that it has no external dependencies. This means that you can very quickly and easily convert an existing application and reduce requests to the server. 

## All you would do is reduce your script references

	<script src="js/jsfile1.js"></script>
	<script src="js/folder/jsfile2.js"></script>
	<script src="js/jsfile3.js"></script>
	<script src="js/jsfile4.js"></script>

## To only one reference which is a [rivet combiner file](https://github.com/davetayls/rivet/raw/master/example-rivet.js)

	<script src="js/app.js"></script>

## Here is what the includes in the rivet file would look like.
	
	// UPDATE THE FOLLOWING
	var combinerFileName = "app.js"; 	// this is the name or regEx to match the current file
	var includes = [];							
	includes.push("jsfile1.js");					// specifies a file to be included
	includes.push("folder/jsfile2.js");
	includes.push("jsfile3.js");
	includes.push("jsfile4.js");

You can use this "as is" for your development and it will work as expected.

## And after run through the combiner

Once this has been run through the combiner you will end up with a single app.js file which includes all the references.

## Go to the [Rivet project page](https://github.com/davetayls/rivet) for the latest downloads and to find out more.