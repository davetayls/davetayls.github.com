---
layout: post
related: power-of-typescript
categories:
 - power-of-typescript
 - typescript
 - javascript
---

Yo, I love using [TypeScript](https://www.typescriptlang.org/) to build JavaScript applications and it pains me to see a lot of negative sentiment to what is a very powerful tool. I thought I would put together some explorations on using it in different situations. Working with TypeScript can really enhance your productivity building applications in the React ecosystem. The React community is very focussed on small components, this architectural pattern is great for scaling and sharing code but it does mean we need to think about how these components fit together and keep the contracts between them so that we can rely on the stability of the system as a whole.

## Component Prop and State Interafaces

One of the first things you see people build with React are the components. Let's take a look at how TypeScript can enable us to create components which describe their usage.

### Pure or Presentational Components

Starting with pure components, we can declare what a component's props and state should equal. By doing this we can also describe whether a prop is optional or not. TypeScript will help you when using these props to make sure you have catered for the `undefined` state.

Let's start with a person component.

```typescript
// Person.tsx

import React from 'react';

export interface IPersonProps {
  name: string;
  age: number;
  skills: string[];
  onSelecedSkill: (skill: string) => any;
}

export interface IPersonState {
  highlightedSkill: string;
}

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
    if (!this.props.skills.length) return;
    const skills = this.props.skills
      .map((skill: string, i: number) => (<li key={i}>{skill}</li>));
    return <ul>{skills}</ul>;
  }
}
```

### Connected or Stateful Components


## Actions

## Reducers

## Using Type Aliases to Build a Rich Description of the Domain

