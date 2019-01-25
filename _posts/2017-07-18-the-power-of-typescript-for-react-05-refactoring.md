---
layout: post
title: Refactoring
subtitle: Power of TypeScript for React
postimage: /content/2017-06-ts-react.jpg
series: power-of-typescript
related: power-of-typescript
categories:
 - power-of-typescript
 - typescript
 - javascript
---

We're on the home-straight with this series. Today we'll have a brief look over the help you get when refactoring TypeScript code, then we'll finish off another week with using type aliases to build a rich domain for your application.

{% include components__SeriesPosts.html %}

One of the big gains of using a strongly typed language comes when you want to refactor your code. Refactoring should be one of those things which developers do regularly as a codebase matures and grows. Working with TypeScript in the way in which I've been describing means that we have enough information for it to let you know all the places in your codebase will need to be updated as a result of a change. In fact if it is within the same codebase, it is often possible the tools can do it for you.

## The Language Service

Let's start with a little background. TypeScript ships with the Language Service, this is a long-running api which any code editor can use to enhance it's coding experience. It holds information on the current project based on settings in your `tsconfig.json` file. This means it understands all the connections between files and types within your code.

Your editor has the ability to use features like **statement completion**, **type signature information** on a particular function, class or variable.

Most useful to what we are looking at today, it also provides **details of errors** across your codebase and basic refactoring help for **renaming**.

## Notes on Editors and IDEs

TypeScript is very well supported across the current common editors and IDEs. An overview of the support can be found on the [TypeScript Editor Support Wiki](https://github.com/Microsoft/TypeScript/wiki/TypeScript-Editor-Support). Instead of going into detail on each editor, I wanted to highlight that your path to using TypeScript with what you already know and love is more than likely a non-issue.

I use and ❤️ WebStorm which includes the TypeScript services out of the box. All of the screenshots used in this article are taken from that. I have seen very similar tool windows in other editors.

## Breaking changes within your project

In the next section we'll take a look at what happens in a small project. I've created a simple project which includes a single reducer. This reducer is used to change the current player we're checking stats for within an imaginary game.

We've got the necessary components talked about in previous articles like:

```typescript
// Our Application State Tree
interface IAppState {
  playerTurn: number;
  stats: IStats;
  totalsMessage: string;
}

// Our positive action
type ChangePlayerAction = IAction<number>;

// Some Current Stats
interface IStats {
  roomA: number;
  roomB: number;
}

// Players for us to show stats for
interface IPlayer {
  name: string;
}
```

And we have a couple of simple reducer functions which:

1. Updates the `playerTurn`.
2. Updates the totals message to tell us an overview of the stats

```typescript
export function changePlayerReducer(
  state: IAppState,
  action: ChangePlayerAction
): IAppState {
  return {
    ...state,
    playerTurn: action.payload
  }
}

export function calculateTotalsReducer(
  state: IAppState,
  action: ChangePlayerAction
): IAppState {
  const { playerTurn, stats } = state;
  const player = getPlayer(playerTurn);
  return {
    ...state,
    totalsMessage: `Player ${player.name} has ${stats.roomA + stats.roomB} score across all rooms`
  };
}
```

We have the data for a couple of players in the memory. We'll need this to display the player's name.

```typescript
const PLAYERS: { [key:number]: IPlayer } = {
  1: { name: 'Fred' },
  2: { name: 'Bob' }
};
```

We now realise that it would be better to refactor this code. Instead of just holding the player number in the state, we need to hold an object with the player's id.

When we convert our playerTurn from a simple number to an object, we get an error when we call `getPlayer` with the `playerTurn` from the state.

![Refactor our playerTurn to include id](/content/2017/07-react-refactoring-player-turn.gif)

We also get an error for our reducer because our action is supplying a number.

![Refactor our playerTurn to include id](/content/2017/07-react-refactoring-player-turn-state.png)

Let's take a moment to break this error stack down into it's lines.

There's an error because the object type in quotes does not match `IAppState`.

```bash
index.ts(51,3): error TS2322: Type '{ playerTurn: number | undefined; stats: IStats; totalsMessage: string; }' is not assignable to type 'IAppState'.
```

The object does not match `IAppState` because of the `playerTurn` property.

```bash
  Types of property 'playerTurn' are incompatible.
```

The `playerTurn` property doesn't match because you're trying to set it to `number | undefined` when `IAppState` wants an `IPlayerTurnState`.

```bash
    Type 'number | undefined' is not assignable to type 'IPlayerTurnState'.
      Type 'undefined' is not assignable to type 'IPlayerTurnState'.
```

We fix the reducer ...

```typescript
export function changePlayerReducer(
  state: IAppState,
  action: ChangePlayerAction
): IAppState {
  return {
    ...state,
    playerTurn: { id: action.payload || 0 }
  }
}
```

And we fix the `getPlayer` call ...

![Refactor our playerTurn to include id](/content/2017/07-react-refactoring-player-turn-fix.gif)

And all is well with the world 🌅

## Packages and Dependencies

In a similar way, when you update node_modules and there are breaking changes defined within the dependency's types you will get errors like we saw with the reducer. This can be painful, especially if something has been changed at a lower level and you need to track down the actual property which needs to be fixed. But at least you have an idea of what to update in your code.

## TypeScript understands the connections

So to round off this article, we've looked at what happens when you make changes within your project. We've gone through an error example and broken down how to track down the needed fix. Being able to understand these errors will make working with TypeScript a lot less painful. You can take a look at the [simple project used in this article](https://github.com/davetayls/power-of-typescript-react) if you want to see a basic TypeScript project setup.

Next I'll be exploring how you can use types and aliases to build a [rich application domain](/blog/2019/01/25/the-power-of-typescript-for-react-6-rich-domain). A simple set of ideas which can make a big impact on understanding and sharing code within a team.

