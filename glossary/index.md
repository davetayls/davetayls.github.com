---
title: Glossary
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

Related Posts:

{% assign ListPostsList = site.categories.monad %}
{% include components__ListPosts.html %}

R
---

### Reactive Programming

This idea brings together a few patterns including streams and data flows. They allow the system to react to changes within the data instantly, update the user interface to reflect them and do so in a performant and less complex way.

The code can therefor:

Base programming logic on what is known at the given moment.
Have a clear sense of who can change what data
Be told when data has changed and it is safe and performant to update

Some further reading:

 - <https://en.wikipedia.org/wiki/Reactive_programming>
 - <http://reactivex.io>
 - <https://xgrommx.github.io/rx-book>
 - <https://en.wikipedia.org/wiki/Stream_processing>
 - <https://en.wikipedia.org/wiki/Dataflow>

Related Posts:

{% assign ListPostsList = site.categories.reactive %}
{% include components__ListPosts.html %}
