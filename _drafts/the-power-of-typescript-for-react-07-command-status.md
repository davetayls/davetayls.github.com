---
layout: post
title: Command Status Pattern
subtitle: Power of TypeScript for React
postimage: /content/2017-06-ts-react.jpg
series: power-of-typescript
related: power-of-typescript
categories:
 - power-of-typescript
 - typescript
 - javascript
---

With the patterns in use within a react / redux application there are many examples of when you want to keep track of the status of an api call or some other async operation.

In this post I'll look at a pattern I'd like to label the "Command Status Pattern". I've been using it for a while, it helps to reason about asynchronous status in a synchronous state.

{% include components__SeriesPosts.html %}

## Design Goals

When designing this pattern I had a few design goals which I wanted it to achieve.

1. It should be serializable, and so only use primitive types that you could use within JSON like `string`s, `number`s, `object`s or `Array`s.
2. It should be able to describe the current status of an asynchronous operation. Whether it was in progress, successful or failed.
3. It should give enough data to make good decisions about the history of the asynchronous command without bloating the state with unnecessary data.
4. It should keep track of the error derived from a failed command.

### Serializable

Making this pattern serializable makes it much more flexible, it would allow it to be passed between separate programs easily. For example:

 - Between APIs or an API and a client application
 - As post messages between threads in an application
 - As a pre-defined state rendered inside HTML to bootstrap a React client application
 
### Describe the Current Status

I need to be able to understand where we are at in the lifecycle of this asynchronous command. More specifically, I want to know whether it has started and if it has completed whether it was successful or failed.

### Data for Good Decisions

I want enough data inside this pattern to power a range of decisions in a wide variety of parts in a system.

 - User Interfaces
   - All sorts of loading indicators with understanding of how long the user has been waiting
   - Pre-fetching required data before rendering components or an error
 - Data Layers and Server Code
   - Queue job statuses
   - Parallel processes

### Keep track of Resulting Error

All asynchronous processes can error, and so I want this to describe any errors which arise from a failed command.

## Constants

## Properties

```typescript
export interface ICommandStatus {
  type: COMMAND_STATUS

  /**
   * Point in time when a fetch started
   */
  started?: DateNumber | null

  /**
   * Successful fetches
   * Usually limited to 3 entries
   */
  success: DateNumber[]

  /**
   * Failed fetches
   * Usually limited to 3 entries
   */
  fail: DateNumber[]

  /**
   * The error relating to any failed
   * attempts
   */
  error?: IError | null
}
```
