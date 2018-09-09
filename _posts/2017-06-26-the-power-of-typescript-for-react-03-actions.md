---
layout: post
title: Actions
subtitle: Power of TypeScript for React
postimage: /content/2017-06-ts-react.jpg
series: power-of-typescript
related: power-of-typescript
categories:
 - power-of-typescript
 - typescript
 - javascript
---

Hello again, another monday another chance to explore the Power of TypeScript. We're taking a journey through ways TypeScript can help create robust and scalable apps. At [Seccl](https://seccl.tech) we love using [TypeScript](https://www.typescriptlang.org/) and I've been using it for several years now. Adopting it has been one of the best decisions I have made.

{% include components__SeriesPosts.html %}

# Actions

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

## A positive action

The first flavour is the most obvious. A regular action which holds some sort of data in it's payload.

```typescript
export interface IAction<P> extends IGenericAction<P, undefined> {}
```

Here we are creating a shorthand to defining an action where the payload is unknown and the meta is undefined. You will see the angled brackets a lot in TypeScript. In this format it is called [Generics](http://www.typescriptlang.org/docs/handbook/generics.html) where we are able to define what we know of an object and allow the rest to be defined elsewhere. Here the payload is generic and could be anything.

## An Error

The next is an error action. All our errors conform to the `IError` interface so in this case the payload will be an `IError` and the meta can be specified if needed.

```typescript
export interface IErrorAction<M> extends IGenericAction<IError, M> {}
```

All the errors in our app are passed around in a common structure. This allows us to let them flow through many layers of our application and be used for different purposes or be displayed in different ways depending on what is most appropriate.

## An unknown action

The last flavour is the any flavour, to be used when we don't know what we got! Often seen in slice reducers where all actions get passed through.

```typescript
export interface IAnyAction extends IGenericAction<any, any> {}
```

Sometimes, the action we are passed could be any of the above so we've defined this action as having `any` payload and `any` meta (`<any, any>`). We'll see these any actions used in the next section.

## In the wild

So now that we know the flavours, let's look at an example of our action interface in the wild. Our application requires the user to log in with their username and password. What we will create is an interface which describes the `payload` called `IAuthenticateCredentials` and an action creator which builds the action.

```typescript
export interface IAuthenticateCredentials {
  username: string;
  password: string;
}
```

Our action creator takes `username` and `password` parameters and builds an action with them in the payload. The resulting action type should be `IAction<IAuthenticateCredentials>`.
 
 This means that **the payload must match the definition of `IAuthenticateCredentials`**. If it doesn't TypeScript will let you know so that you can fix it.

We'll tighten this up a little further by using a `type` which can be shared between the action creator and the reducer.

```typescript
type AuthenticateCredentialsAction = IAction<IAuthenticateCredentials>;
```

And then here is what the action creator will look like.

```typescript
export const authenticateCredentials =
  (username: string, password: string): AuthenticateCredentialsAction => ({
    type: AUTHENTICATE_CREDENTIALS,
    payload: {
      username,
      password
    }
  });
```

So we have our action creator, we also need to corresponding reducer to do something with that action. Our top level `authenticateReducer` could be passed any type of action. Our expectation is that **all actions** will go through each top level reducer. Here we can use our `IAnyAction` as a shortcut for writing `IGenericAction<any, any>`.

You can see that we also have a case function which **is only used** when the **action matches** our `AUTHENTICATE_CREDENTIALS` constant. We know that the action type will be `AuthenticateCredentialsAction` at this point and so we can specify that as the `action` parameter type.

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
export function credentials(state: IAuthenticationState, action: AuthenticateCredentialsAction) {
  const {payload} = action;
  return {
    ...state,
    authenticating: payload.username
  };
}
```

Almost there! Let's just dig a little deeper to finish off today.

## Following the flow of types

Let's look closer at this line within `authenticateReducer`.

```typescript
case AUTHENTICATE_CREDENTIALS: return credentials(state, action);
```

TypeScript knows that `action` is an `IAnyAction` but it allows us to pass it to the `credentials` function which is expecting an `AuthenticateCredentialsAction`. Let's compare these two interfaces as pure objects and hopefully we'll see why.

1. The `IAnyAction` definition looks like this:

    ```typescript
    interface {
      type: string;
      payload: any;
      meta: any;
      error?: boolean;
    }
    ```

2. `AuthenticateCredentialsAction` is a `type` alias of `IAction<IAuthenticateCredentials>`.

3. `IAction<IAuthenticateCredentials>` definition looks like this:

    ```typescript
    interface {
      type: string;
      payload: IAuthenticateCredentials;
      meta: undefined;
      error?: boolean;
    }
    ```

Follow these steps and you'll see how these are compatible:

- the only differences are the `payload` and the `meta` properties.
- `any` type is compatible with *any* type
- so `any -> undefined` is compatible
- so `any -> IAuthenticateCredentials` is compatible

This is a simplified way of how TypeScript looks at these two definitions.

## We've looked through Generics and Type Aliases

We've covered quite a lot in this instalment. We've looked at Generics – a way to allow customisation on top of known properties – and Type Aliases – allowing us to define a type to be shared between areas of our code. Hopefully you are getting the picture that all these contracts between pieces of code will allow TypeScript to keep builds robust and scale well. Join me next Monday when I'll be [looking at reducers](/blog/2017/07/03/the-power-of-typescript-for-react-04-reducers).


