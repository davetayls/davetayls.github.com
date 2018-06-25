---
layout: post
title: Middleware Pipelines - Chain of Responsibility
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

## A simple but powerful function

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

## Next article, I look at using Promises

In the next post, I'll look at using the same code to build a Promise based pipeline. With promises we will be able to use the same pattern for asychronous tasks. I will then show how you can use it with `Either` and `TaskEither`.

You can find the full working code and tests in the [exploring-fp-ts github repo](https://github.com/davetayls/exploring-fp-ts-series/tree/master/src/middleware)

## ... A more involved example

If you can't wait for more on this, here is another example of a synchronous pipeline which has a bit more going on. It's probably closer to real-world usage.

Here we are running calculations with an object of data as the context. I'm delegating the responsibility of calculating the number of each size bank note for an atm.

```typescript
import { buildMiddleware, TMiddleware } from './middleware'

const env = {
  getBalance: () => 500
}

interface IChainOfResponsibility {
  name: string
  ones: number
  tens?: number
  twenties?: number
  hundreds?: number
  hasEnoughMoney?: string
}

const hasEnoughMoney: TMiddleware<typeof env, IChainOfResponsibility> =
  (env, next) => atm => {
    const result = {
      ...atm,
      hasEnoughMoney: atm.ones < env.getBalance() ? 'Yes!' : 'No'
    }
    return next(result)
  }

const hundreds: TMiddleware<typeof env, IChainOfResponsibility> =
  (env, next) => atm => {
    const ones = atm.ones % 100
    const result = {
      ...atm,
      hundreds: (atm.ones - ones) / 100,
      ones
    }
    return next(result)
  }

const twenties: TMiddleware<typeof env, IChainOfResponsibility> =
  (env, next) => atm => {
    const ones = atm.ones % 20
    const result = {
      ...atm,
      twenties: (atm.ones - ones) / 20,
      ones
    }
    return next(result)
  }

const tens: TMiddleware<typeof env, IChainOfResponsibility> =
  (env, next) => atm => {
    const ones = atm.ones % 10
    const result = {
      ...atm,
      tens: (atm.ones - ones) / 10,
      ones
    }
    return next(result)
  }

export const handleRequestPipeline =
  buildMiddleware(hasEnoughMoney, hundreds, twenties, tens)
export const chainOfResponsibility = handleRequestPipeline(env)

chainOfResponsibility({ name: 'Mary', ones: 1335 })

// => result is
// {
//  name: 'Mary',
//  hasEnoughMoney: 'No',
//  ones: 5,
//  tens: 1,
//  twenties: 1,
//  hundreds: 13
// }
```

---

Cover photo by [Gerrie van der Walt
](https://unsplash.com/@gitfo)

