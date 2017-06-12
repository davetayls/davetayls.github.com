---
layout: post
title: Connected Components - Power of TypeScript for React (2) 
postimage: /content/2017-06-ts-react.jpg
series: power-of-typescript
related: power-of-typescript
categories:
 - power-of-typescript
 - typescript
 - javascript
---

Welcome back to our Power of TypeScript series. We're taking a journey through ways TypeScript can help create robust and scalable apps. At [Seccl](https://seccl.tech) we love using [TypeScript](https://www.typescriptlang.org/) and I've been using it for several years now. Adopting it has been one of the best decisions I have made.

{% include components__SeriesPosts.html %}

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

Extending from `React.Component` still needs a single interface type for it's props. Fortunately TypeScript allows us to easily combine the two interfaces using the `&` symbol. So let's do that to inform the component of it's props.

```typescript
export class Person
  extends React.Component<IPersonProps & IPersonDispatch, IPersonState> {
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


dd
