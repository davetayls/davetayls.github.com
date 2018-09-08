---
layout: post
title: Rich Domain
subtitle: Power of TypeScript for React (6)
postimage: /content/2017-06-ts-react.jpg
series: power-of-typescript
related: power-of-typescript
categories:
 - power-of-typescript
 - typescript
 - javascript
---

# Using Type Aliases to Build a Rich Description of the Domain

In this post I want to go beyond React and Redux and explore ways in which we can improve the readability of our code by creating a rich domain of types that describe the data better.

{% include components__SeriesPosts.html %}

The point of the rich domain is to enhance the underlying types in such a way that it adds further semantic meaning. Secondly to provide more certainty to what data is being passed around

Let's take the example of a date of birth.

A date could be stored in multiple ways, if it has been stored as a result of an api call it will be in a serialised format like a string or a number. If it was a string it is more than likely going to be in an ISO format.

So to describe the `dateOfBirth` as a `string` is ok, but you gain a lot more meaning from describing it as a `ISODateString`.

Here are three examples of a string type, they will all compile if you interchange the values but the types communicate more about what kind of string is expected.

```typescript
type ISODateString = string
type ISODateTimeString = string

const birthName: string
const dateOfBirth: ISODateString = '2018-01-01'
const created: ISODateTimeString = '2018-01-01T10:00Z'
```



