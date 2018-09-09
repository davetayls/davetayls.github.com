---
layout: post
title: Component Props and State Interfaces
subtitle: Power of TypeScript for React
postimage: /content/2017-06-ts-react.jpg
related: power-of-typescript
series: power-of-typescript
categories:
 - power-of-typescript
 - typescript
 - javascript
---

Here we go! One of the first things you often build with React are the components. Let's take a look at how TypeScript can enable us to create components which describe their usage.

{% include components__SeriesPosts.html %}
    
# Component Props and State Interfaces


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
  onSelectedSkill?: (skill: string) => any;
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
    if (this.props.skills && this.props.skills.length) {
      const skills = this.props.skills
        .map((skill: string, i: number) => (<li key={i}>{skill}</li>));
      return <ul>{skills}</ul>;
    }
  }
}
```

## Covering all bases

I'd like to highlight an area where TypeScript will help you here that isn't immediately obvious.

Let's look at the `getSkills` logic. The first line does a check to see if we have any skills, and then also checks the length. We have specified that the `skills` prop is optional which means that it could be `undefined`. However it would be easy enough to forget this and miss out the check. The code would look like this,

```typescript
if (this.props.skills.length) {
  // ...
};
```

TypeScript will give the error: 

```
Object is possibly 'undefined'.
(property) IPersonProps.skills: string[] | undefined
```

## Stateless functions

Another pattern we see for writing pure components is to define them as a stateless function. If we are to write our components in this way we would use the same props interface but write the component using the following arrow function syntax.

```typescript
const Person = (props: IPersonProps) => (
  <section>
    <h2>My name is {this.props.name}</h2>
    <h3>I am {this.props.age} years old</h3>
  </section>
);
```

So hopefully you are getting a sense of how these contracts can help you build more robust and scalable JavaScript. In this first installment we've looked at building [pure components](/blog/2016/06/21/pure-components) and how defining an `interface` for our props can give TypeScript the power to tell you when you've not catered for all the edge cases.

Next week I'll be looking a [Connected (or Stateful) Components](/blog/2017/06/17/the-power-of-typescript-for-react-02-connected-components) and how we can use `interface`s to make sure we are mapping our app's state to what the component needs in its props. See you then.


