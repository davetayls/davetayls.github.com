---
title: Glossary
layout: post
postimage: /content/glossary.jpg
---

F
---

### Functor

A `Functor` is an object with a map function which obeys a few rules

Links:

 - [You've been using Functors](https://egghead.io/lessons/javascript-you-ve-been-using-functors)

H
---

### Higher-kinded Types

 - Say `*` is the kind of every type. We can also help our brains by using the word `Type`
 - `Type -> Type` is a type constructor which takes one type as a parameter and returns another any type.
 - `Type -> Type -> Type` is also a type constructor but it takes two types and gives you another.
 - `Type -> Type -> Type -> Type` and so on ...
 
Type constructors are refered to as a kind of `* -> *` or higher. Because of this, they are called higher-kinded types. So often this term is used as a way of referring to languages that have first-class support for higher-kinded types.

You also have the ability to specify a type like so:

```haskell
type E a = Either Error a
```

K
---

### Kind

Think of a **Kind** as type of types.

> "In type theory, a kind is the type of a type constructor"

Like:

```typescript
type kind = Big<number>;
```

 - [Kind (Haskell)](https://wiki.haskell.org/Kind)
 - [Higher-kinded Types](#higher-kinded-types)

M
---

### Monad

A Monad is a generic type which is wrapped up. It can be created from any non-null type. It can be composed. There is some way of applying a function which takes the underlying type to a Monad of that type.

 - Constructors being given an existing Monad should wrap the original value rather than the Monad
 - Applying a function to the Monad should do the work on the value directly and return a Monad of the result
 - Monads should be able to be composed
 
 - [Eric Lippert talks about Monads](https://ericlippert.com/category/monads/)
 - [The Marvels of Monads by Wes Dyer](https://blogs.msdn.microsoft.com/wesdyer/2008/01/10/the-marvels-of-monads/)
 - [Monadster by Scott Wlaschin](https://fsharpforfunandprofit.com/monadster/)
 - [Fantas, Eel, and Specification 15: Monad](http://www.tomharding.me/2017/06/05/fantas-eel-and-specification-15/)

{% assign ListPostsList = site.categories.monad %}
{% include components__ListPosts.html %}

### Monoid

A Monoid is a [Semigroup](#semigroup) which also has a value which when concatenated to any value doesn't change it. For example with a addition concatenating a `0` will not change the number you started with or with multiplication concatenating a `1` will not change the original number.

 - [Failsafe combination using monoids](https://egghead.io/lessons/javascript-failsafe-combination-using-monoids)

R
---

### Reactive Programming

This idea brings together a few patterns including streams and data flows. They allow the system to react to changes within the data instantly, update the user interface to reflect them and do so in a performant and less complex way.

The code can therefor:

Base programming logic on what is known at the given moment.
Have a clear sense of who can change what data
Be told when data has changed and it is safe and performant to update

 - <https://en.wikipedia.org/wiki/Reactive_programming>
 - <http://reactivex.io>
 - <https://xgrommx.github.io/rx-book>
 - <https://en.wikipedia.org/wiki/Stream_processing>
 - <https://en.wikipedia.org/wiki/Dataflow>

{% assign ListPostsList = site.categories.reactive %}
{% include components__ListPosts.html %}

S
---

### Semigroup

A semi group is something which can be concatenated together. It is associative which means that it doesn't matter how you group the concatenation, it will always end up with the same result - like addition where 1 + 1 + 1 is the same as (1 + 1) + 1.

 - [Combining things with Semigroups video](https://egghead.io/lessons/javascript-combining-things-with-semigroups)
 - [Semigroup examples video](https://egghead.io/lessons/javascript-semigroup-examples)


