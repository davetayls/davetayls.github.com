---
layout: post
title: Handling Error Cases
subtitle: Exploring fp-ts (2)
postimage: /content/2018/06-fp-ts-02-errors.jpg
series: exploring-fp-ts
related: exploring-fp-ts
categories:
 - exploring-fp-ts
 - functional
 - typescript
---

In any codebase there are several paths which can fail. Like I discovered with [handling nullable values](/blog/2018/05/20/fp-ts-01-working-with-nullable-values) I want to flow through the code and deal with errors gracefully and in a logical manor. Too many times have I found I've written a tangle of if statements and try / catch blocks which make reading a logical set of instructions hard.

{% include components__SeriesPosts.html %}

To work with errors I found a good place to start was to use the [`Either` type](https://gcanti.github.io/fp-ts/Either.html). It represents a value which could be one of two possible types, either the type we specify first (the one on the `Left`) or the type we specify second (the one on the `Right`). Something like this:

```typescript
Either<Error, IPerson>
```

I found that if a function creates an error directly then it should return an `Either`. Here is an example of how I might display some information based on a number of steps. Any of these steps could error but I can handle any of the error cases within the `fold` at the end.

```typescript
import { fromNullable } from 'fp-ts/lib/Either'
getRecurringPayment(person)
  .chain((payment) => calculateAmount(payment))
  .chain((amount) => affordability(amount))
  .fold(
    (err) => {
      console.log(
        'Something went wrong',
        err
      )
    },
    (affordability) => {
      console.log(
        'Affordability rating',
        affordability
      )
    }
  )
```

The `fold` here provides a way of taking the current value out of the type it is in. An `Either` could have two possible states and so we provide it a function to handle each of them.

## Common Error Structure

I've found that it reduces a lot of complexity–and therefore good practice–to standardise a common error structure early. Once you have this in place every error passed around our system conforms to a known structure.

I call this error structure `IError` and use a simple method for extending the built in JavaScript `Error` to conform to it.

I'm also very aware that JavaScript can throw pretty much anything as an error. So any error that is caught will need to be checked, unless I resolve it to the common error structure previously designed.

With this in mind I have a `resolveCommonError` function which can be given anything but will always return an `IError`. The type signature would look like this:

```typescript
resolveCommonError: (err: any) => IError
```

For the remainder of this article I will refer to errors as `IError` because of this.

## Try / Catch

I found that I often don't want to return an `Either`. Our code also needs to integrate with outside libraries which don't use `fp-ts`. In both of these cases I need some way of gracefully catching any resulting error and converting it to an `Either`.

In these cases I use the `tryCatch` function. It will catch any errors and allow you to resolve them.

```typescript
import { tryCatch } from 'fp-ts/lib/Either'
getListOfPeople()
  .chain((people) =>
    // Get first person in list
    tryCatch(() => head(people), resolveCommonError)
  )
  .map((person) => person.favouriteNumbers)
  .chain((favouriteNumbers) => {
    // Get first number
    return tryCatch(() => head(favouriteNumbers), resolveCommonError)
  })
  .fold(
    (err) => {
      console.log(
        'An error I can rely on',
        err
      )
    },
    (first) => {
      console.log(
        'The first item is',
        first
      )
    }
  )
```

## Working with lots of potential errors

I want to transform each value within an array of which any could produce an error. We looked at a similar thing with the `Option` type and you can do the same things when working with `Either`.

I'll take a similar idea, I want to pass every name in an array through my nice name converter. There is a potential for errors to happen during this conversion so I'll wrap the function which converts each name with `tryCatch`.

I'll need to use `traverse`, remember it does two things:

1. You give it a function to process each item and return an `Either`
2. It converts this new array of `Either`s to an `Either` holding an array of values.

```typescript
// We start with an array of strings
[string, string, string]

// 1. We then have an array of Either
=> [Either, Either, Either]

// 2. We end up with our resulting array of
// strings inside an Either
=> Either<IError, [string, string, string]>
```

When an error occurs I want to stop processing the names and fallback to a default which for simplicity I've chosen `['Not all names were nice']`. Here is what that would look like.

```typescript
const niceNameCheck = (name: string) => {
  if (/dude/i.test(name)) {
    return 'Nice name'
  } else {
    throw new Error('Bad name')
  }
}

const names = [
  'Bob Smith',
  'Andy Hedge'
]

const niceNameDude = (name: string) =>
  tryCatch(() => niceNameCheck(name), resolveCommonError)

const result = traverse(either)(names, niceNameDude)
  .getOrElse(['Not all names were nice'])

deepEqual(result, ['Not all names were nice'])
```

Sometimes, I'm not concerned about the error and just want to provide a default if an error occurs. To solve this I used the same `.alt()` pattern I used for `Option` in the previous article.

```typescript
const names = [
  'Dude Smith',
  'Andy Hedge'
]

const niceNameDude = (name: string) =>
  tryCatch(() => niceNameCheck(name), resolveCommonError)
    .alt(right('Be a dude'))

const result = traverse(either)(names, niceNameDude)
  .getOrElse([])

deepEqual(result, ['Nice name', 'Be a dude'])
```

I have found that it is a lot easier to visualise working with lots of data in this way. It allows me to reason about a single item and then apply that reasoning to all in a very similar fashion.

## View some code examples

I'm continuing to experiment with different patterns for functional–and in this case Monadic–error handling. You can take a look at some example code in the companion [exploring-fp-ts-series](https://github.com/davetayls/exploring-fp-ts-series/tree/master/src/02-handling-errors) Github repo

There are a few things I've not looked into as part of this article but they can wait for another day.

---

Cover Photo by [Johannes Plenio](https://unsplash.com/@jplenio) on Unsplash
