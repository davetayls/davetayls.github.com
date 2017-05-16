---
layout: post
related: power-of-typescript
categories:
 - power-of-typescript
 - typescript
 - javascript
---

Yo, I love using [TypeScript](https://www.typescriptlang.org/) to build JavaScript applications and it pains me to see a lot of negative sentiment to what is a very powerful tool. I thought I would put together some explorations on using it in different situations. Working with TypeScript can really enhance your productivity building applications in the React ecosystem. The React community is very focussed on small components, this architectural pattern is great for scaling and sharing code but it does mean we need to think about how these components fit together and keep the contracts between them so that we can rely on the stability of the system as a whole.

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

One of the first things you see people build with React are the components. Let's take a look at how TypeScript can enable us to create components which describe their usage.

### Pure or Presentational Components

Starting with pure components, we can declare what a component's props and state should equal. By doing this we can also describe whether a prop is optional or not. TypeScript will help you when using these props to make sure you have catered for the `undefined` state.

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
  
  // the question mark here tells the compiler that
  // the skills array is optional
  skills?: string[];
  
  // We can define a function to be called when an
  // even happens within the component.
  onSelecedSkill?: (skill: string) => any;
}

// We can also define what the component's state looks like
// this will add type checking to code inside the component that
// uses `this.state`
export interface IPersonState {
  highlightedSkill: string;
}

// Here we can define our component which extends from React.Component
// The Props and state are types are specified here.
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

I'd like to highlight an area where TypeScript will help you here that aren't immediately obvious.

Let's look at the `getSkills` logic. The first line does a check to see if we have any skills, and then also checks the length. We have specified that the `skills` prop is optional which means that it could be undefined. However it would be easy enough to forget this and miss out the check. The code would look like this,

```typescript
if (!this.props.skills.length) return;
```

TypeScript will give the error: 

```
Object is possibly 'undefined'.
(property) IPersonProps.skills: string[] | undefined
```

### Connected or Stateful Components

So let's move this component on to connecting it with a Redux store. There's a small chage to the way we declare the component's props to make the separation clearer for the way `react-redux` separates regular props and dispatch functions.

First we separate the props and dispatch.

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

Then we can easily combine the two interfaces when we use them to inform the component of the props.

```typescript
export class Person extends React.Component<IPersonProps & IPersonDispatch, IPersonState> {
}
```

Finally we can use each interface within `connect`.

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

Now TypeScript will make sure that we have included all the correct props and dispatch functions. This makes a big impact as things change because of refactoring or when new features are added to components. TypeScript will give you a list of all the places within your code which need to be updated.

## Actions

## Reducers

## Refactoring

## Using Type Aliases to Build a Rich Description of the Domain

