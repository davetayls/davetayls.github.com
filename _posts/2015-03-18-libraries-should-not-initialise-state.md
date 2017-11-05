---
layout: post
postimage: /content/2015/03-libraries.jpg
related: nodejs
categories:
  - javascript
  - nodejs
---

I have been doing a lot of refactoring recently on some common libraries used across multiple projects. One of the big things I’ve been finding is that these libraries should not create or initialise state. A good example of this is common configuration.

At first it seemed fine to create singleton objects within the library but as the library was used across more varied projects it become clear that these singleton objects needed to be extended to fit the needs of the application.

Also if you are working with [Node.js](https://davetayls.me/blog/category/nodejs/) then these singleton objects can quickly make managing nested dependencies complicated. This is especially apparent when multiple modules depend on the same library.

I now expose a `configure` method on the library which is used to pass in all the needed state from the application. It is proving to be a much cleaner approach.

