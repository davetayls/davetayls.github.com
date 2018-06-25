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

The context for each middleware function is going to be an object with a request and a response. This means that the middleware can work with either during each step.

```typescript
interface IContext {
  req: IRequest
  res: IResponse
}
```

The request for my example is a simple get by id.

```typescript
// Data needed for the request
interface IRequest {
  data: { id: string }
}
```

Then the response can contain the data from the server or an error.

```typescript
// The format of the api response
interface IResponse {
  data?: IData
  error?: Error
}

// The Person data
interface IData {
  id: string
  name: string
  age: number
}
```

## The middleware

Now let's write some middleware. The first middleware makes the request to the api based on the data inside the `IRequest` object. I have mocked the data for my example code where 'helen' is 20 years old and 'bob' is 16.

The second piece of middleware will check the response for the person's age. If they are under 18 it add an error to the response.

Notice that in each example we are immediately passing the result of `promise.then` to the `next(...)` in the pipeline. This is because we don't have access to the asynchronous value during synchronous running of this middleware function. Each step is still clean and focused building up a set of reusable middleware for different purposes.

```typescript
const fetchFromServer: TMiddleware<{}, Promise<IContext>> =
  (env, next) => promise =>
    next(
      promise.then((ctx) => {
        return env.get(`/person/${ctx.req.data.id}`)
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

The fetch environment here would likely have methods for getting the base url of the api or even a generic `get()`, `post()` etc implementation. I've applied the environment to a new variable here but it could be passed in at each `fetchPerson` call.

```typescript
const fetchEnvironment = {
  get: (url) => apiPromise
  post: (url, data) => apiPromise
}
const fetchPersonWithEnvironment =
  buildPersonDataFetcher(fetchEnvironment)
```

This is where things become a bit different. I want my `fetchPerson` function to just take the request. I also want it to throw any response error so that it get's fed through to the `.catch` of the resulting promise.

```typescript
export const fetchPerson = (req: IRequest) => {
  const context = Promise.resolve({ req, res: {} })
  return fetchPersonWithEnvironment(context)
    .then((ctx) => {
      if (ctx.res.error) {
        throw ctx.res.error
      } else {
        return ctx.res
      }
    })
}
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

The only thing I am now questioning is why this might be better than just using functions which are designed to be given to a `promise.then` function. If they all expected the same `IContext` type I could achieve the same results.

I'm thinking that middleware is specifically useful when you are building a library which needs the ability to be extended and customised for different contexts. It would be useful when the consumer of the library was able to inject their own middleware for debugging, logging or custom data manipulation.

I still want to expand on this with functional types, `Either` and `TaskEither`.
