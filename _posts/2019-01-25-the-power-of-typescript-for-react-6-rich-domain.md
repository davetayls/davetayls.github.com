---
layout: post
title: Rich Domain
subtitle: Power of TypeScript for React
postimage: /content/2017-06-ts-react.jpg
series: power-of-typescript
related: power-of-typescript
categories:
 - power-of-typescript
 - typescript
 - javascript
---


In this post I want to go beyond React and Redux and explore ways in which we can improve the readability of our code by creating a rich domain of types that describe the data better.

{% include components__SeriesPosts.html %}

## Using Type Aliases to Build a Rich Description of the Domain

The point of the rich domain is to enhance the underlying types in such a way that it adds further semantic meaning. Secondly to provide more certainty to what data is being passed around

In this post we'll be looking at a few kinds of data which are ambiguous when described as a primitive type. We'll then explore some examples of how we can add more semantic meaning along with some guidelines to help prevent some of the problems you might find.

## Dates

Let's start by looking at dates. Dates are a good example of a piece of data which can be described in many forms and stored in multiple ways.

A date could be passed around in memory as a JavaScript `Date` object, you often see dates saved using a library like `Moment` which enhance the date object. If it has been stored as a result of an api call it could be in a serialised format like a `string` or a `number`. If it was a `string` it is more than likely going to be in an ISO format.

Seeing a variable typed as a `Date` or a `Moment` is often sufficient. However, let's consider the serialized types of `string` and `number` which don't convey any "rich" meaning.

### Dates as Strings

Describing a `dateOfBirth` as a `string` is ok, but you gain a lot more meaning from describing it as a `ISODateString`.

Here are three examples of a string type, they will all compile if you interchange the values but the types communicate more about what kind of string is expected.

```typescript
type ISODateString = string
type ISODateTimeString = string

const birthName: string
const dateOfBirth: ISODateString = '2018-01-01'
const created: ISODateTimeString = '2018-01-01T10:00Z'
```

### Dates as Numbers

Describing a `dateOfBirth` as a `number` is also ok for the compiler, but you gain a lot more meaning for the developer by describing it as `MillisecondsDateNumber` or `SecondsDateNumber`. These are two real-world ways in which numbers are used to describe a date.

```typescript
type MillisecondsDateNumber = number
type SecondsDateNumber = number

const age: number = 39
// 01 Jan 1980
const dateOfBirth: SecondsDateNumber = 315532800
// 01 Jan 2019
const created: MillisecondsDateNumber = 1546300800000 
```

## Looking at IDs

IDs are another example of values that come in all shapes and sizes. Giving them more semantics really helps developers understand the data they are working with.

### IDs as Strings

Describing an `id` field as a string would be accurate for a whole range of identifiers but there is a very big difference between a user id of `davetayls`, a JIRA id of `PU-1234`, a UUID of `ab39ae77-c1cd-4490-a114-eb9776c2f321` or a MondoDb ObjectId of `507f1f77bcf86cd799439011`

```typescript
type UserIdString = string
type JiraIdString = string
type UUIDString = string
type ObjectIdString = string

const id: UserIdString = 'davetayls'
const id: JiraIdString = 'PU-1234'
const id: UUIDString = 'ab39ae77-c1cd-4490-a114-eb9776c2f321`'
const id: ObjectIdString = '507f1f77bcf86cd799439011'
```

## Guidelines for Naming Rich Types

There are some gotchas with these but following these good practices for naming rich types will help prevent them.

### Masked primitive type

It is easy to mask the underlying primitive type such that it actually loses semantic meaning and makes the type harder to understand.

To make sure this doesn't happen, always include the primitive name with the rich name. For example, you should append "String" or "Number" at the end of the name.

The type `UserId` is quite ambiguous but `UserIdString` is not.

## Roundup

I have found a rich domain of types to be a real boost to developer understanding of the data they are working with and I would whole-heartedly recommend you make use of them within your codebase.
