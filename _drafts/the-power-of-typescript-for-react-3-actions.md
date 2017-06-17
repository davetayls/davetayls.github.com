---
layout: post
title: Actions - Power of TypeScript for React (3) 
postimage: /content/2017-06-ts-react.jpg
series: power-of-typescript
related: power-of-typescript
categories:
 - power-of-typescript
 - typescript
 - javascript
---

I love using [TypeScript](https://www.typescriptlang.org/) to build JavaScript applications and it pains me to see a lot of negative sentiment to what is a very powerful tool. I thought I would put together some explorations, using it in different situations. 

Working with TypeScript can really enhance your productivity building applications in the React ecosystem. The React community is very focussed on small components, this architectural pattern is great for scaling and sharing code but it does mean we need to think about how these components fit together and keep the contracts between them so that we can rely on the stability of the system as a whole. TypeScript can be one way to help with this.

NB. Before we go any further I want to note that the power I show in this article relies on TypeScript to have all the strict options on. Here is a list of them at the time of writing this article.

```json
{
  "compilerOptions": {
    "noImplicitAny": true,
    "noImplicitThis": true,
    "noImplicitReturns": true,
    "strictNullChecks": true
  }
}
```

# Actions

Welcome back, we've been looking at how TypeScript can help us to build scalable React applications. We use TypeScript extensively at [Seccl](https://seccl.tech/) and are finding that it is making a big impact on our productivity and keeping our code robust.

Let's talk about actions, action creators and how reducers interact with them. Actions are a really helpful way to create separation between the different layers of an application, because they are not tightly coupled each layer can be built and tested in pieces. It does bring it's challenges however, whilst the code is loosely coupled, all areas of the code which interact with the action need to have the same expectation of it's structure.

At [Seccl](https://seccl.tech) all our actions follow the same basic structure and TypeScript allows us to define what that is by using an `interface`. Here is the `IGenericAction` interface that we use currently.

```typescript
// We have an action with customisable payload and meta
export interface IGenericAction<P, M> {

  // Our type is a const string
  type: string;
  
  // The payload can be anything but will be 
  // specified for a particular action within
  // the app
  payload?: P;
  
  // The meta property can be used to send
  // further information along with the action
  // often used by redux middleware
  meta?: M;
  
  // This is a flag to tell if the payload
  // is an error
  error?: boolean;
}
```

This generic action is usually needed in one of three flavours so we also define these to make the code more readable. We'll look at some concrete examples of each below but first let's quickly look at their interface definitions.

The first flavour is the most obvious. A regular action which holds some sort of data in it's payload.

```typescript
export interface IAction<P> extends IGenericAction<P, undefined> {}
```

The next is an error action. All our errors conform to the `IError` interface so in this case the payload will be an `IError` and the meta can be specified if needed.

```typescript
export interface IErrorAction<M> extends IGenericAction<IError, M> {}
```

The last flavour is the any flavour, to be used when we don't know what we got! Often seen in slice reducers where all actions get passed through.

```typescript
export interface IAnyAction extends IGenericAction<any, any> {}
```

So now that we know the flavours, let's look at an example of our action interface in the wild. Our application requires the user to log in with their username and password. What we will create is an interface which describes the `payload` called `IAuthenticateCredentials` and an action creator which builds the action.

```typescript
export interface IAuthenticateCredentials {
  username: string;
  password: string;
}
```

Our action creator takes `username` and `password` parameters and builds an action with them in the payload. Notice that the function signature specifies that the return type is `IAction<IAuthenticateCredentials>`. This means that the payload must match the definition of `IAuthenticateCredentials`. If it doesn't TypeScript will let you know so that you can fix it.

```typescript
export const authenticateCredentials =
  (username: string, password: string): IAction<IAuthenticateCredentials> => ({
    type: AUTHENTICATE_CREDENTIALS,
    payload: {
      username,
      password
    }
  });
```

So we have our action creator, we also need to corresponding reducer to do something with that action. Our `authenticateReducer` could be passed any type of action as the expectation is that all actions go through each top level reducer. Here we can use our `IAnyAction` as a shortcut for writing `IGenericAction<any, any>`.

You can see that we also have a case function which is only used when the action matches our `AUTHENTICATE_CREDENTIALS` constant. We know that the action type will be `IAction<IAuthenticateCredentials>` at this point and so we can specify that as the `action` parameter type.

```typescript
export interface IAuthenticationState {
  authenticating: boolean;
}
export function authenticateReducer(state: IAuthenticationState, action: IAnyAction) {
  switch (action.type) {
    case AUTHENTICATE_CREDENTIALS: return credentials(state, action);
    default: return state;
  }
}
export function credentials(state: IAuthenticationState, action: IAction<IAuthenticateCredentials>) {
  const {payload} = action;
  return {
    ...state,
    authenticating: payload.username
  };
}
```

Let's look closer at this line within `authenticateReducer`.

```typescript
case AUTHENTICATE_CREDENTIALS: return credentials(state, action);
```

TypeScript knows that `action` is an `IAnyAction` but it allows us to pass it to the `credentials` function which is expecting an `IAction<IAuthenticateCredentials>`. Let's compare these two interfaces as pure objects and hopefully we'll see why.

The `IAnyAction` definition looks like this:

```typescript
interface {
  type: string;
  payload: any;
  meta: any;
  error?: boolean;
}
```

And the `IAction<IAuthenticateCredentials>` definition looks like this:

```typescript
interface {
  type: string;
  payload: IAuthenticateCredentials;
  meta: undefined;
  error?: boolean;
}
```

As you can see both are compatible because the only differences are both compatible to an `any` type can be set to any other type.

We've covered quite a lot in this instalment, but hopefully you are getting the picture that all these contracts between pieces of code will allow TypeScript to keep builds robust and scale well. Join me next time when I'll be looking at reducers.


