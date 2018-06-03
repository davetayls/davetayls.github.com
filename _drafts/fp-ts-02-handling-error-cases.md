---
layout: post
title: Handling Error Cases - Exploring fp-ts (2)
postimage: /content/2018/06-fp-ts-02-errors.jpg
series: exploring-fp-ts
related: exploring-fp-ts
categories:
 - exploring-fp-ts
 - functional
 - typescript
---

I like to hit the fail paths before making sure the happy ones work like I expect. In our codebase there are several checks which can fail. Like I discovered with [handling nullable values](/blog/2018/05/20/fp-ts-01-working-with-nullable-values) I want to flow through the code and deal with errors at any step gracefully.

{% include components__SeriesPosts.html %}

To work with errors I use the [`Either`](https://gcanti.github.io/fp-ts/Either.html) type. It represents a value which could be one of two possible types, either the type we specify first (the one on the `Left`) or the type we specify second (the one on the `Right`). Something like this:

```typescript
Either<Error, IPerson>
```

I found that if a function creates an error directly then it should return an `Either`. It reduces a lot of complexity–and therefor good practice–to standardise a common error structure early, then every error passed around our system conforms to a known structure.

Here is an example of how I might display some information based on a number of steps. Any of these steps could error but I can handle any of the error cases within the `fold`. Folding is a functional pattern which provides a way of taking the current value out of the type it is in. An `Either` could have two possible states and so we provide it a function to handle each of them.

```typescript
import { fromNullable } from 'fp-ts/lib/Either'
getRecurringPayment(person)
  .chain((payment) => calculateAmount(payment))
  .chain((amount) => affordability(person))
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

## Try / Catch

There are many times when I really don't want to make a simple function more complex by returning an `Either`. Our code also needs to integrate with outside libraries which don't use `fp-ts`. In both of these cases I need some way of gracefully catching any resulting error and converting any result to an `Either`.

I'll consider a simple `head` function which returns the first item from an array. It's nice and simple but there are still potential errors lurking.

```typescript
const head = <T>(arr: T[]): T => arr[0]
```

It would be really ugly to wrap these functions in a try/catch block. Here I need to use the helper functions provided by `fp-ts` to return the `Left` result (the error) or `Right` result.

```typescript
import { left, right, Either } from 'fp-ts/lib/Either'
const head = <T>(arr: T[]): Either<IError, T> => {
  try {
    return right(arr[0])
  } catch (err) {
    return left(err)
  }
}
```

I'm also very aware that JavaScript can throw pretty much anything as an error. So the `err` caught in my function adds unnecessary complexity unless I resolve it to the common error structure previously designed. With this in mind I have a `resolveCommonError` function which can be given anything but will always return an `IError` which is my TypeScript interface for common errors.

The right solution to these problems is to use the `tryCatch` function from `fp-ts`. It enables us to run any function within a try / catch and deal with errors. Here is how I get the first item from an array.

```typescript
import { tryCatch } from 'fp-ts/lib/Either'
getListOfPeople()
  .chain((people) =>
    // Get first person in list
    tryCatch(() => head(people), resolveCommonError)
  )
  .map((person) => person.favouriteNumbers)
  .chain((favouriteNumbers) =>
    // Get first number
    tryCatch(() => head(favouriteNumbers), resolveCommonError)
  )
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



---

Cover Photo by [Johannes Plenio](https://unsplash.com/@jplenio) on Unsplash
