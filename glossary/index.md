---
title: Ubiquitous Language
layout: post
postimage: /content/glossary.jpg
---

M
---

### Monad

A Monad is a generic type which is wrapped up. It can be created from any non-null type. It can be composed. There is some way of applying a function which takes the underlying type to a Monad of that type.

 - Constructors being given an existing Monad should wrap the original value rather than the Monad
 - Applying a function to the Monad should do the work on the value directly and return a Monad of the result
 - Monads should be able to be composed
 
Some further reading:

 - [Eric Lippert talks about Monads](https://ericlippert.com/category/monads/)
 - [The Marvels of Monads by Wes Dyer](https://blogs.msdn.microsoft.com/wesdyer/2008/01/10/the-marvels-of-monads/)
 - [Monadster by Scott Wlaschin](https://fsharpforfunandprofit.com/monadster/)
