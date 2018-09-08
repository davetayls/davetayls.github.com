---
layout: post
title: Working with Nullable Values
subtitle: Exploring fp-ts (1)
postimage: /content/2018/05-fp-ts-01-nullable.jpg
series: exploring-fp-ts
related: exploring-fp-ts
categories:
 - exploring-fp-ts
 - functional
 - typescript
---

It's such a pain dealing with values which could be `null` or `undefined`. I like to get
rid of the potential for them as much as possible when designing interfaces but there is
no escaping it sometimes. I hate it even more when you have a set of them, which you need
to check before moving on.

{% include components__SeriesPosts.html %}

To help, the `fp-ts` library comes with the
[`Option` type](https://gcanti.github.io/fp-ts/Option.html). It represents a value which
might not be there, it is optional.

For a trivial example, what if we want the first name from a full name that might not
exist.

```typescript
import { fromNullable } from 'fp-ts/lib/Option'
const firstName =
  fromNullable(getPotentiallyNullFullName())
    .map((name) => name.split(' ')[0])
    .getOrElse('No name')
```

The nice thing about using this `Option` type is that once you have wrapped up the value the `map` function will only be called if it is there. Once I started going down this route, I found that I had functions which returned `Option`s instead of the result. The above code turned into something like this:

```typescript
import { fromNullable } from 'fp-ts/lib/Option'

const getFirstName = (name: string | null) =>
  fromNullable(name)
    .map((name) => name.split(' ')[0])

const firstName =
  getFirstName(getPotentiallyNullFullName())
    .getOrElse('No name')
```

## Chaining

The next hurdle I found was dealing with nested nullable values. Either if I needed to go deep into an object or working with the result of another function.

If I was returning a new nullable value, the `mapNullable` function did the job.

```typescript
const firstName =
  fromNullable(getPotentiallyNullPerson())
    .mapNullable((person) => person.name)
    .map((name) => name.split(' ')[0])
    .getOrElse('No name')
```

Here the person or the name could be null (or undefined) and the `mapNullable` function will keep the flow going.

When I wanted to use one of my helper functions which returned an `Option` then `chain` merges the resulting `Option` in to the current one.

```typescript
const getFirstName = (name: string | null) =>
  fromNullable(name)
    .map((name) => name.split(' ')[0])

const firstName =
  fromNullable(getPotentiallyNullPerson())
    .chain((person) => getFirstName(person.name)
    .getOrElse('No name')
```

## Lots of optional values

I then needed to deal with an array of optional values and work on the results. If I
loaded a set of nullable full names and wanted to pull out the first names then I would go
about it using `alt` and `traverse`.

The `alt` method on `Option` allows you to provide a default value without "unboxing" it.
The difference between `alt` and `getOrElse` is the output. If you have an `Option<string>` then
`alt` still returns an `Option<string>` whereas `getOrElse` will return a `string` (the
value inside).

An `Option` type can be in one of two forms. A `Some` type to represent there is a value
and a `None` for when you have a `null | undefined`. The `some` function is a shorthand
to returning an `Option` with a value you know is not nullable.

```typescript
const getFirstNameWithDefault =
  (name: string | null | undefined) =>
    getFirstName(name)
      .alt(some('No name'))
```

`traverse` is a functional pattern which will convert an array of values to an `Option`
(or another boxed type) with an array of values inside. I have to give it a function which
 maps each value to an `Option`.

If I wanted this to be all or nothing then I would use my `getFirstName` function. If any
of the names in the array are nullable then it would run the "or else" path.

If I use `getFirstNameWithDefault` then it will always return a list of names with the
default used for the nullable values. This is because of the `.alt` added on the `Option`.


So here is the code put together.

```typescript
import { option } from 'fp-ts/lib/Option'
import { traverse } from 'fp-ts/lib/Array'

// Here are my names
const names = [
  'Esther Pierce',
  'Charis Star',
  null,
  'Tobias Big',
  undefined
]
// We can use `alt` with the `getFirstName`
// function to provide a default
const getFirstNameWithDefault =
  (name: string | null | undefined) =>
    getFirstName(name)
      .alt(some('No name'))

// `traverse` over each and provide a default
const result =
  traverse(option)(names, getFirstNameWithDefault)
    .getOrElse([])

// result is
['Esther', 'Charis', 'No name', 'Tobias', 'No name']
```

## What I've learnt is to

 - Use `Option` when you're not sure if a value is defined or to set it to some default
 - Return `Option`s from functions and then connect them together so that you only need to deal with the `null | undefined` case at the end of your logic
 - Dealing with a list of potentially empty values then becomes pretty simple

Next up, follow me to the next article where I'm looking at [Handling Error Cases](/blog/2018/06/09/fp-ts-02-handling-error-cases).

## View some code examples

You can take a look at some example code in the companion [exploring-fp-ts-series](https://github.com/davetayls/exploring-fp-ts-series/tree/master/src/01-nullable-values) Github repo

---

Cover Photo by [Jason Ortego](https://unsplash.com/@jasonortego) on Unsplash



