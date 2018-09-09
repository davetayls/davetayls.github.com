---
layout: post
title: Reducers
subtitle: Power of TypeScript for React
postimage: /content/2017-06-ts-react.jpg
series: power-of-typescript
related: power-of-typescript
categories:
 - power-of-typescript
 - typescript
 - javascript
---

Hello again, I hope you're finding this series helpful. We're taking the time to look at different facets of working with React where TypeScript can make a real impact. At [Seccl](https://seccl.tech) we love using [TypeScript](https://www.typescriptlang.org/) and I've been using it for several years now. Adopting it has been one of the best decisions I have made.

We've covered a fair amount so far so feel free to catch up with each post below.

{% include components__SeriesPosts.html %}

# Reducers and the State Tree

Where do we start with this one. I've been excited to get to this article because this is one of the areas where TypeScript kicks ass in many ways. We can use it not only to improve the stability of our code through type helpers but I find it is also useful when planning our application and then a form of self documentation as well.

To keep this useful and concise I'll go through an example of planning the application state tree, then we'll look at using [Mapped Types](https://www.typescriptlang.org/docs/handbook/advanced-types.html#mapped-types) to use the same state interfaces when writing reducers.

## Entities

Even with a small amount of relational data, it it useful to hold it in a **normalised state** within the state tree. This is discussed in the [Redux docs](http://redux.js.org/docs/recipes/reducers/NormalizingStateShape.html) where a structure is suggested which we will build on top of. 

We'll call this area of our state tree `entities` as described in this documentation *and* because this is what normalised items are commonly referred to. Before we go any further, lets consider what the **very top level** of our state interface might look like.

```typescript
interface IAppState {
  authentication: IAuthenticationState;
  entities: IEntitiesState;
}
```

And now we can start planning our `IEntitiesState`. This will be a key-value object where the key is the *name* of the entity and the value is an object holding various pieces of information about each. 

Let's define the next level then.

```typescript
interface IEntitiesState {
  [entityName:string]: IEntityState;
  
  // You can define specific entities
  // if you know of them
  posts: IEntityState;
  comments: IEntityState;
  authors: IEntityState;
}
```

Nice one 🚀, we're starting to be able to picture how our data will be held within the app. We have planned to hold posts, comments and authors at the moment.

Now it's time to define exactly **how each entity will hold the data**. We'll make it inline with the docs but there is **one piece of information we don't have** at this point. See if you can work out what it is from the interface definition below.

```typescript
interface IEntityState<E> {
  byId: { [id: string]: E };
  all: string[];
}
```

You've probably worked it out 😎 – our interface cannot know the properties of the entity itself. We've added a generic `<E>` so that **it can be defined at the point it is known**. Let's update our `IEntitiesState` to cater for this.

```typescript
interface IEntitiesState {
  // If the entity is unknown then it's
  // properties could be anything!
  [entityName:string]: IEntityState<any>;
  
  // For our known entity we can define that the
  // properties will be those defined in the
  // `IPost` interface
  posts: IEntityState<IPost>;
  comments: IEntityState<IComment>;
  authors: IEntityState<IAuthor>;
}
```

Let's unpack what we are gaining here from all this. With these definitions TypeScript is able to give us a lot of help and stability. Let's think over the following code. 

```typescript
let posts = state.entities.posts;
```

 - TypeScript knows you will have the ability to drill down into the specific post properties. Properties like `title` (specified on `IPost`).
 - TypeScript knows that you can access the title of a specific post using `posts.byId[id].title`.
 - Our `IEntitiesState` will give us a form of documentation so that other developers can see that we might be dealing with entities for `posts`, `comments` and `authors`.
 - It doesn't stop there though, any reducers which should return data related to the posts entity are now part of this well defined contract. Should our properties for `IPost` change, TypeScript will tell us all the places which will need to be updated. 

## Mapping related Types

🙈 We've come to a problem! As we start to build our reducers we very quickly realise this could lead to a lot of duplication. We now have our lovely `IAppState` but we need to pass an object of **reducers** to `combineReducers`. These reducers **return the value** of each state rather than being the state itself.

Ok, that's a lot to wrap your head around so let's compare the two type signatures.

Here the state object itself holds the data.

```typescript
interface IAppState {
  authentication: IAuthenticationState;
  // ...
}
```

Whilst our object passed to combine reducers is a function which

 1. takes that same state (and an action)
 2. returns a state of the same shape
 
The type signature looks something like this.

```typescript
interface ICombineReducers {
  authentication: (state: IAuthenticationState, action: IAnyAction) => IAuthenticationState;
  // ...
}
```

Surely, we don't have to define a whole new interface for something which is so clearly linked. Err, no we don't, thankfully!

TypeScript has a powerful feature called [Mapped Types](https://www.typescriptlang.org/docs/handbook/advanced-types.html#mapped-types). It will enable us to do this. Here's how you can use your existing `IAppState` interface with a few lines of code.

```typescript
type ReducersOn<T> = {
  // For each property P in the object T
  // convert the type to a function where
  // the first parameter takes state of the same type T[P]
  // and returns the same type T[P]
  [P in keyof T]: (state: T[P], action: IAnyAction) => T[P];
};

// And then we can declare our root state object
const rootState: ReducersOn<IAppState> = {
  authentication: authenticationReducer,
  // ...
}
```

This is such a powerful technique and can be used in a few places. Other common usages are already built into the TypeScript definitions. `Partial<T>` is a good example which makes all properties optional and would be used for things like `this.setState({ notAllProps: 'abc' })`.

## The Pieces of State Shape and Mapped Types
So today we're continuing to discover more about planning and defining our state as an interface. How this will lead to code which will enable you to scale and trust that you have not leaked breaking changes.

We have also seen that with [Mapped Types](https://www.typescriptlang.org/docs/handbook/advanced-types.html#mapped-types), it doesn't necessarily mean we have to write lots and lots of type definitions for different circumstances.

Next Monday we'll explore [refactoring](/blog/2017/07/18/the-power-of-typescript-for-react-05-refactoring) and how TypeScript takes away a lot of the fear JavaScript can bring around improving code organisation.

