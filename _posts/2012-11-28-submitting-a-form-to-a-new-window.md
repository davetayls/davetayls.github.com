---
layout: post
author: davetayls
title: Submitting a form to a new window
related: javascript
categories:
    - javascript
    - html
---


If you want to open the result of a form submission in to a new window you can without having to go via the server. This is how you would do it using Javascript.

Say we have a form like the following:

	<form class="windowForm" action="/your/post/page" method="post">
		<input  type="text" name="name"
				value="Dave Taylor" />
		<input type="submit" value="Send" />
	</form>

Ordinarily when submitted this will send the current page to the action location of the form. However there are times when you might want to post the form in to a new window are an `iframe` within the page (say inside a dialog).

### Dynamically open a new window and attach it as the forms target

The way you would do this is to set the `target` attribute of the form to match the name of the iframe or window. Here is [the MDN `window.open` specification](https://developer.mozilla.org/en-US/docs/DOM/window.open).

	$('.windowForm').submit(function(e){
		// specify a unique target name
		var target = 'windowFormTarget';

		// open a new window and name it
		window.open('', target, 'width=500,height=300');

		// set the target of the form to be
		// the window name
		this.setAttribute('target', target);

		// allow the form to be submitted normally
	});

And that's pretty much it. The target attribute of a form is a little less well known than the `target` attribute on a link.

Here's the [code on jsBin](http://jsbin.com/itubak/1/edit)