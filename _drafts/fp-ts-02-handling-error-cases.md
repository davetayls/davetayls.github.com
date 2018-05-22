---
layout: post
title: Handling Error Cases - Exploring fp-ts (2) 
series: exploring-fp-ts
related: exploring-fp-ts
categories:
 - exploring-fp-ts
 - functional
 - typescript
---

I like to hit the fail paths before making sure the happy ones work like I expect. In our
codebase there are several checks which can fail. Like I discovered with
[handling nullable values](http://localhost:4000/blog/2018/05/20/fp-ts-01-working-with-nullable-values)
I want to flow through the code and deal with errors at any step gracefully.

{% include components__SeriesPosts.html %}

To work with errors I use the [`Either`](https://github.com/gcanti/fp-ts/blob/master/docs/api/md/Either.md)
type. It represents a value which could be one of two possible types, either the type we
specify first (the one on the `Left`) or the type we specify second (the one on the `Right`).
Something like this:

```typescript
Either<Error, IPerson>
```
