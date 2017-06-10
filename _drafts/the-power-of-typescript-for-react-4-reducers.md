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

# Reducers and the State Tree

Where do we start with this one. I've been excited to get to this article because this is one of the areas where TypeScript kicks ass in many ways and we can use it to not only improve the stability of our code through type helpers but I find it is also useful when planning our application and then a form of self documentation as well.

To keep this useful and concise I'll go through some examples of planning the application state tree, then we'll look at using [Mapped Types](https://www.typescriptlang.org/docs/handbook/advanced-types.html#mapped-types) to use the same state interfaces when writing reducers.

## Entities

A useful practice with an app that deals with even a small amount of relational data is to hold it within the state tree in a normalised state. This is discussed in the [Redux docs](http://redux.js.org/docs/recipes/reducers/NormalizingStateShape.html) where there is a suggested structure which we will build on top of. We will call this area of our state tree `entities` as described in this documentation and because this is commonly what this kind of normalised data is referred to. Before we go any further lets consider what the very top level of our state interface will need for this.

```typescript
interface IAppState {
  authentication: IAuthenticationState;
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

Let's unpack what we are gaining here from all this. With these definitions TypeScript is able to give us a lot of help and stability when working with entities. It now knows that when you are dealing with `let posts = state.entities.posts;` you will have the ability to drill down into the specific post properties like `title` (which would have been specified on `IPost`) `posts.byId[id].title`. You can also imagine how our `IEntitiesState` will give us a form of documentation so that other developers can see that we might be dealing with entities for `posts` and maybe `authors`, `comments` etc etc.

It doesn't stop there though, any reducers which should return data related to the posts entity are now part of this well defined contract so that should our properties for `IPost` change we will be made aware of all the places which will need to be updated. 

We've come to the problem now though! As we start to build our reducers we very quickly realise that whilst we now have our lovely `IAppState` our object of reducers which we want to pass to `combineReducers` are functions which return the value of each state rather than being the state itself. Let's compare the two type signatures.

Here the state object itself holds the data.

```typescript
interface IAppState {
  authentication: IAuthenticationState;
  // ...
}
```

Whilst our object passed to combine reducers is a function which takes that same state (and an action) and returns it.

```typescript
interface ICombineReducers {
  authentication: (state: IAuthenticationState, action: IGenericAction<any, any>) => IAuthenticationState;
  // ...
}
```

Surely, we don't have to define a whole new interface for something which is so clearly linked I hear you say. Err, no we don't, thankfully because of TypeScript's mapped types. Here's how you can use your existing `IAppState` interface with a few lines of code.

```typescript
type ReducersOn<T> = {
  // For each property P in the object T
  // convert the type to a function where
  // the first parameter takes state of the same type T[P]
  // and returns the same type T[P]
  [P in keyof T]: (state: T[P], action: IGenericAction<any, any>) => T[P];
};

// And then we can declare our root state object
const rootState: ReducersOn<IAppState> = {
  authentication: authenticationReducer,
  // ...
}
```

This is such a powerful technique and can be used in a few places. Other common usages are already built into the TypeScript definitions like `Partial<T>` which makes all the properties optional so would be used for things like `this.setState({ notAllProps: 'abc' })`.

