---
layout: post
title: Middleware Pipelines Part 1
postimage: /content/2018/06-middleware-pipelines.jpg
related: middleware-pipelines
series: middleware-pipelines
categories:
 - middleware-pipelines
 - typescript
 - javascript
 - functional
---

Out of curiosity, I've been experimenting with what you can do with a simple and generic middleware builder. I've been surprised at how powerful it can be with such a small amount of code.

{% include components__SeriesPosts.html %}

I did a lot of reading, and gained a fair amount of inspiration from researching various implementations of the [Chain of Responsibility](https://sourcemaking.com/design_patterns/chain_of_responsibility) pattern along with diving into the [express.js](https://github.com/expressjs) and [redux](https://github.com/reduxjs) codebases.

It has essentially boiled down to using `reduceRight` on an array of functions. The following code has simplified types to make it easier to read but shows the concept.

```typescript
const buildMiddleware =
  <Env, Context>(...middlewares: Array<TMiddleware<Env, Context>>) =>
    (env: Env) =>
      (req: Context): Context => {
        const runFinal = (context: any) => context
        const chain = middlewares
          .reduceRight(
            (next: any, middleware) => middleware(env, next),
            runFinal
          )
        return chain(req)
      }
```

With this simple function I can build a wide range of middleware handlers.

## Chain of Responsibility Pipeline

The first one I tried was a simple synchronous, chain of responsibility pipeline. Here's a few examples of middleware which keep adding to a string.

```typescript
// First middleware
const sweets = (env, next) => context => {
  context += ` ate ${env.numberOfSweets()} sweets`
  return next(context)
}

// Second middleware
const enjoyed = (env, next) => context => {
  if (env.didEnjoy()) {
    context += ' and enjoyed it.'
  } else {
    context += ' and stuck tongue out.'
  }
  return next(context)
}

// We can stop the middleware chain
// and return early if needed
const early = (env, next) => context => {
  if (env.isTakingPart()) {
    return next(context)
  } else {
    return context + ' did not want to take part'
  }
}
```

To use them you build the pipeline, then you can apply a shared environment, and finally pass a context through it.

```typescript
// Add the middleware to form the pipeline
const buildSweetsSentenceWith = buildMiddleware(
  early,
  sweets,
  enjoyed
)

// Apply the environment to the pipeline
const getSweetsSentence = buildSweetsSentenceWith({
  isTakingPart: () => true,
  didEnjoy: () => true,
  numberOfSweets: () => 20
})

//
console.log(getSweetsSentence('Barney'))
// => 'Barney ate 20 sweets and enjoyed it.'
```

I'd expect the environment would tend to be more dynamic to the context, and I'd also expect the context to be an object with most of the data needed for the middleware. This as an experiment shows a lot of potential for such a simple script.

In the next post, I'll look at using the same code to build a Promise based pipeline. With promises we will be able to use the same pattern for asychronous tasks. I will then show how you can use it with `Either` and `TaskEither`.
