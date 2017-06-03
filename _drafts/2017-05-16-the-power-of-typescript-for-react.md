---
layout: post
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

---

# Component Prop and State Interafaces

Here we go! One of the first things you often build with React are the components. Let's take a look at how TypeScript can enable us to create components which describe their usage.

## Pure or Presentational Components

Starting with [pure components](/blog/2016/06/21/pure-components), we can declare what a component's props and state should equal. By doing this we can also describe whether a prop is optional or not. TypeScript will help you when using these props to make sure you have catered for the `undefined` state.

Let's start with a person component. I've added comments through this file to explain what is happening.

```typescript
// Person.tsx

import React from 'react';

// We define what our components props are
// in an interface. This means that whenever
// We use this component in another file TypeScript
// will verify that all the required props are given.
export interface IPersonProps {
  
  // these first props are required
  name: string;
  age: number;
  
  // the question mark here tells
  // the compiler that the skills
  // array is optional
  skills?: string[];
  
  // We can define a function to be
  // called when an event happens
  // within the component.
  onSelecedSkill?: (skill: string) => any;
}

// We can also define what the component's state looks like.
// This will add type checking to code inside the component that
// uses `this.state`
export interface IPersonState {
  highlightedSkill: string;
}

// Here we can define our component which extends from React.Component.
// The Props and state types are specified here.
export class Person extends React.Component<IPersonProps, IPersonState> {
  render() {
    return (
      <section>
        <h2>My name is {this.props.name}</h2>
        <h3>I am {this.props.age} years old</h3>
        <h4>My Skills are:</h4>
        {this.getSkills()}
      </section>
    );
  }
  getSkills() {
    if (this.props.skills && !this.props.skills.length) return;
    const skills = this.props.skills
      .map((skill: string, i: number) => (<li key={i}>{skill}</li>));
    return <ul>{skills}</ul>;
  }
}
```

I'd like to highlight an area where TypeScript will help you here that isn't immediately obvious.

Let's look at the `getSkills` logic. The first line does a check to see if we have any skills, and then also checks the length. We have specified that the `skills` prop is optional which means that it could be undefined. However it would be easy enough to forget this and miss out the check. The code would look like this,

```typescript
if (!this.props.skills.length) return;
```

TypeScript will give the error: 

```
Object is possibly 'undefined'.
(property) IPersonProps.skills: string[] | undefined
```

So hopefully you are getting a sense of how these contracts can help you build more robust and scalable JavaScript.


---


# Connected or Stateful Components

We looked at how adding some simple TypeScript interfaces can help you build and refactor Pure React Components. Today we'll look at the common usage of Redux with React. We'll see how we can help keep the code robust and I'll highlight another nice side-effect of adding these types.

So let's move our `Person` component on to connecting it with a Redux store. There's a small chage to the way we declare the component's props to make the separation clearer for the way `react-redux` separates regular props and dispatch functions.

First we separate the props and dispatch so that we can reference them separately elsewhere.

```typescript
export interface IPersonProps {
  name: string;
  age: number;
  skills?: string[];
}

export interface IPersonDispatch {
  onSelecedSkill?: (skill: string) => any;
}
```

Extending from `React.Component` still needs a single interface type for it's props. Fortunately TypeScript allows us to easily combine the two interfaces using the `&`. So let's do that to inform the component of it's props.

```typescript
export class Person extends React.Component<IPersonProps & IPersonDispatch, IPersonState> {
}
```

Now when we use `connect` from `react-redux` we have the interfaces we need. The `connect` function takes two parameters. The first is a function which is passed the current state and expects and object of props back to assign to the underlying component. It's type signature looks like this.

```typescript
type propsFn = (state: IAppState) => object;`
```

The second parameter takes a function which is passed the `dispatch` function needed to dispatch actions to the reducers at a later date. It also expects an object to be returned which will be added to the components props. It's type signature looks like this.

```typescript
type dispatchFn = (dispatch: (action: Action) => object;`
```

So let's connect our `Person` component and tighten those type signatures to not only expect an `object` but to expect an object that conforms to our interfaces.

```typescript
import {connect} from 'react-redux';
import {
  IPersonProps,
  IPersonDispatch,
  Person
} from './components/Person';

export const PersonWithState = connect(
  (state: IAppState): IPersonProps => ({
    name: state.currentPerson.name,
    age: state.currentPerson.age,
    skills: state.currentPerson.skills
  }),
  (dispatch): IPersonDispatch => ({
    onSelecedSkill: (skill) => {
      dispatch(selectedSkill(skill))
    }
  })
)(Person);
```

Now TypeScript will make sure that we have included all the correct props and dispatch functions. Now when you need to refactor or add new features this connect usage will need to be changed as well. TypeScript will give you a list of all the places within your code which need to be updated.

Another nice side-effect which is starting to emerge is that because we are explicitly having to declare what the props, dispatch events and state objects look like, our code is becoming a lot easier to understand and read. This practice is a form of documentation which will serve you and your team well as you scale your codebase or return to old features in a few months.


---


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

---

# Reducers and the State Tree

Where do we start with this one. I've been excited to get to this article because this is one of the areas where TypeScript kicks ass in many ways and we can use it to not only improve the stability of our code through type helpers but I find it is also useful when planning our application and then a form of self documentation as well.

To keep this useful and concise I'll go through some examples of planning the application state tree, then we'll look at using [Mapped Types](https://www.typescriptlang.org/docs/handbook/advanced-types.html#mapped-types) to use the same state interfaces when writing reducers.

## Entities

A useful practice with an app that deals with even a small amount of relational data is to hold it within the state tree in a normalised state. This is discussed in the [Redux docs](http://redux.js.org/docs/recipes/reducers/NormalizingStateShape.html) where there is a suggested structure which we will build on top of. We will call this area of our state tree `entities` as described in this documentation and because this is commonly what this kind of normalised data is referred to. Before we go any further lets consider what the very top level of our state interface will need for this.

```typescript
interface IAppState {
  entities: IEntitiesState;
}
```

As described in the docs, our `IEntitiesState` will be a key-value object where the key is the *name* of the entity and the value is an object holding various pieces of information about each. Let's define the next level then.

```typescript
interface IEntitiesState {
  [entityName:string]: IEntityState;
  
  // You can define specific entities if you know of them
  posts: IEntityState;
}
```

Nice one travellers, we're starting to be able to picture how our data will be held within the app. Now it's time to define exactly how each entity will hold the data, we'll make it inline with the docs. Now, there is one piece of information we don't have at this point, see if you can work out what it is from the interface definition below.

```typescript
interface IEntityState<E> {
  byId: { [id: string]: E };
  all: string[];
}
```

You've probably worked it out 😎 you're a clever bunch. Our interface cannot know the properties of the entity itself. We've added a generic `<E>` so that it can be defined at the point it *is* known, let's update our `IEntitiesState` to cater for this.

```typescript
interface IEntitiesState {
  // If the entity is unknown then it's
  // properties could be anything!
  [entityName:string]: IEntityState<any>;
  
  // For our known entity we can define that the
  // properties will be those defined on `IPost`
  posts: IEntityState<IPost>;
}
```

Let's unpack what we are gaining here from all this ...

## Elements of state

fetchStatus, view state

---

# Refactoring

One of the big gains of using a strongly typed language comes when you want to refactor your code. Refactoring should be one of those things which developers do regularly as a codebase matures and grows. Working with TypeScript in the way in which I've been describing means that we have given it enough information for it to let you know all the places in your codebase which will need to be updated as a result of a change. In fact if it is within the same codebase, it is often possible the tools can do it for you.

---

# Using Type Aliases to Build a Rich Description of the Domain

In this post I want to go beyond React and Redux and explore ways in which we can improve the readability of our code by creating a rich domain of types that describe the data better.

---

# References and Further Reading

 - [Pure Components, Creating stable, testable UI we can rely on](/blog/2016/06/21/pure-components)
 - [Presentational and Container Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)
 - [Mapped Types](https://www.typescriptlang.org/docs/handbook/advanced-types.html#mapped-types)
 - [Normalizing State Shape - Redux docs](http://redux.js.org/docs/recipes/reducers/NormalizingStateShape.html)

