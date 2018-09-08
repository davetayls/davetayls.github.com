---
layout: post
title: Rich Domain - Power of TypeScript for React (6) 
postimage: /content/2017-06-ts-react.jpg
series: power-of-typescript
related: power-of-typescript
categories:
 - power-of-typescript
 - typescript
 - javascript
---

With the patterns in use within a react / redux application there are many examples of when you want to keep track of status of an api call, an async operation

{% include components__SeriesPosts.html %}

```typescript
export interface IFetchStatus {
  type: ConstantString<FETCH_STATUS>

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
