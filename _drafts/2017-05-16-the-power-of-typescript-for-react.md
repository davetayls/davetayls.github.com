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

## Component Prop and State Interafaces

Here we go! One of the first things you often build with React are the components. Let's take a look at how TypeScript can enable us to create components which describe their usage.

### Pure or Presentational Components

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





### Connected or Stateful Components

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

## Actions

## Reducers

## Refactoring

## Using Type Aliases to Build a Rich Description of the Domain

## References and Further Reading

 - [Pure Components, Creating stable, testable UI we can rely on](/blog/2016/06/21/pure-components)
 - [Presentational and Container Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)

