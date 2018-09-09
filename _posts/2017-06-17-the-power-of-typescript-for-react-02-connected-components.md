---
layout: post
title: Connected Components
subtitle: Power of TypeScript for React
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

## Joining interface definitions for Props and Dispatch

So let's move on with our `Person` component and connect it to a Redux store. There's a small chage to the way we declare the component's props to make the separation clearer for the way `react-redux` separates regular props and dispatch functions.

We need to separate the props and dispatch definitions so that we can reference them separately elsewhere. Let's do that first and we can discuss how to use them afterwards.

```typescript
export interface IPersonProps {
  name: string;
  age: number;
  skills?: string[];
}

// Our event related functions are
// moved into this separate dispatch
// interface
export interface IPersonDispatch {
  onSelecedSkill?: (skill: string) => any;
}
```

Extending from `React.Component` still needs a single interface type for it's props. Fortunately TypeScript allows us to easily combine the two interfaces using the `&` symbol. This is called an [Intresection Type](https://www.typescriptlang.org/docs/handbook/advanced-types.html#intersection-types) so let's use that to inform the component of it's props.

```typescript
export class Person
  extends React.Component<IPersonProps & IPersonDispatch, IPersonState> {
}
```

## Tightening generic functions

We now have the interfaces we need to use `connect` from `react-redux` . The `connect` function takes two parameters. The first is a **function which is passed the current state** – this **expects an object of props back** to assign to the underlying component. It's type signature looks like this.

```typescript
type propsFn = (state: IAppState) => object;`
```

The second parameter takes a function which is passed the `dispatch` function needed to dispatch actions to the reducers at a later date. It also expects an **object to be returned** which will be added to the components props. It's type signature looks like this.

```typescript
type dispatchFn = (dispatch: (action: Action) => any) => object;`
```

We're missing some needed tightening of the screws here because **it's not just any object** that is needed for this **particular component**. But we've now got the necessary parts to be able to let TypeScript help us out with this.

So let's connect our `Person` component and tighten those type signatures to not only expect an `object` but to expect an object that conforms to our interfaces.

```typescript
import {connect} from 'react-redux';
import {
  IPersonProps,
  IPersonDispatch,
  Person
} from './components/Person';

// type definition is:
// MapStateToProps<Props, OwnProps, AppState>
const mapStateToProps: MapStateToProps<IPersonProps, {}, IAppState> =
  (state) => ({,
    age: state.currentPerson.age,
    skills: state.currentPerson.skills
  })

// type definition is:
// MapStateToDispatch<Dispatch, OwnProps>
const mapDispatchToProps: MapDispatchToProps<IPersonDispatch, {}> =
  (dispatch) => ({
    onSelecedSkill: (skill) => {
      dispatch(selectedSkill(skill))
    }
  })

export const PersonWithState = connect(
  mapStateToProps,
  mapDispatchToProps
)(Person);
```

Now TypeScript will make sure that we have included all the correct props and dispatch functions. Now when you need to refactor or add new features this connect usage will need to be changed as well. TypeScript will give you a list of all the places within your code which need to be updated.

## Foundations of a rich domain are emerging

Another nice side-effect which is starting to emerge is that of a detailed domain. Because we are explicitly having to declare what the props, dispatch events and state objects look like – our code is becoming a lot easier to understand, follow and read. This practice is a form of documentation which will serve you and your team well as you scale your codebase or return to old features in a few months.


## Props, Dispatch and Intersection Types

So, a bit of a roundup of this week's dive into connected components. We've looked at separating interfaces for our component props and dispatch functions. This has enabled us to build these up separately as part of the redux `connect` functionality but stitch them back together using Intersection Types and the `&`.

We'll continue next Monday [looking at *Actions*](/blog/2017/06/26/the-power-of-typescript-for-react-03-actions). I hope this has been useful, I look forward to seeing you then!


