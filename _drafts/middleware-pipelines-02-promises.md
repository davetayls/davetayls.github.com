---
layout: post
title: Middleware Pipelines - Promises
postimage: /content/2018/06-middleware-pipelines.jpg
related: middleware-pipelines
series: middleware-pipelines
categories:
 - middleware-pipelines
 - typescript
 - javascript
 - functional
---

I've been looking at the possibilities of a simple middleware pipeline script. So far I've implemented a version of the Chain of Responsibility pattern. I've also been looking at using the same builder to work with promises. Here is what I've found.

{% include components__SeriesPosts.html %}

## Fetching some data from an API

So for this example I will define a few interfaces defining the data I am working with.

```typescript
// Data needed for the request
interface IRequest {
  data: { id: string }
}

// The Person data
interface IData {
  id: string
  name: string
  age: number
}

// The format of the api response
interface IResponse {
  data?: IData
  error?: Error
}

// The full pipeline context
interface IContext {
  req: IRequest
  res: IResponse
}
```

## The middleware

Now let's write some middleware. The first middleware makes the request to the api based on the data inside the `IRequest` object. I have mocked the data for my example code where 'helen' is 20 years old and 'bob' is 16.

The second piece of middleware will check the response for the person's age. If they are under 18 it add an error to the response.

Notice that in each example we are immediately passing the result of `promise.then` to the `next(...)` in the pipeline. This keeps each step clean and focused and means that you can build up a set of reusable middleware for different purposes.

```typescript
const fetchFromServer: TMiddleware<{}, Promise<IContext>> =
  (env, next) => promise =>
    next(
      promise.then((ctx) => {
        // Just mock an api call
        return new Promise<IContext>((resolve) => {
          setTimeout(() => {
            ctx.res = {
              data: data[ctx.req.data.id]
            }
            resolve(ctx)
          }, 500)
        })
      })
    )

const mustBeAdult: TMiddleware<any, Promise<IContext>> =
  (env, next) => promise =>
    next(
      promise.then((ctx) => {
        if (ctx.res && ctx.res.data && ctx.res.data.age < 18) {
          return {
            ...ctx,
            res: {
              error: new Error('Must be an adult')
            }
          }
        } else {
          return ctx
        }
      })
    )
```

## The pipeline

I then need to create the person fetcher pipeline builder which looks the same as my previous example.

```typescript
const buildPersonDataFetcher = buildMiddleware(
  fetchFromServer,
  mustBeAdult
)
```

## Customised fetchPerson

This is where things become a bit different. I want my `fetchPerson` function to just take the request. I also want it to throw any response error so that it get's fed through to the `.catch` of the resulting promise.

```typescript
export const fetchPerson = (req: IRequest) =>
  buildPersonDataFetcher({})(Promise.resolve({ req, res: {} }))
    .then((ctx) => {
      if (ctx.res.error) {
        throw ctx.res.error
      } else {
        return ctx.res
      }
    })
```

## Using the new promise based pipeline

Here is the result of our promise based middleware. The request for Helen succeeds because she is over 18 and the request for Bob errors.

```typescript
it('should successfully fetch helen', function () {
  return fetchPerson({ data: { id: 'helen' } })
    .then((res) => {
      equal(res.data!.name, 'Helen')
      equal(res.data!.age, 20)
    })
})

it('should fail with bob', function () {
  return fetchPerson({ data: { id: 'bob' } })
    .then(() => {
      throw new Error('should not run')
    })
    .catch((err) => {
      equal(err.message, 'Must be an adult')
    })
})
```
