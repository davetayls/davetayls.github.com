---
layout: post
title: Working with Nullable Values - Exploring fp-ts (1) 
series: exploring-fp-ts
related: exploring-fp-ts
categories:
 - exploring-fp-ts
 - power-of-typescript
 - typescript
 - javascript
---

Welcome to this series looking at how we can use the [fp-ts](https://github.com/gcanti/fp-ts) library here at [Seccl](https://seccl.tech) to create functional javascript with the safety of types. In this post we will look at working with nullable values by using the `option` functions.

{% include components__SeriesPosts.html %}

```typescript
/**
 * Should run the first function passed to
 * fold when the value is null or undefined.
 *
 * This is the simplest way of using option
 */
it(
  'Should call the first argument of fold',
  function () {
    const myVal = null
    option.fromNullable(myVal)
      .fold(
        // the first argument (or left) is
        // run when the value is null or undefined
        () => {
          equal(myVal, null)
        },
        // The second argument (or right) is
        // run when the value exists
        () => {
          throw new Error('This should not run')
        }
      )
  }
)
```
    
