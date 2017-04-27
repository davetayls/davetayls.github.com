---
title: Reactive Programming
layout: post
postimage: /content/2016-08-reactive-programming.jpg
related: javascript
categories:
  - javascript
  - thoughts
  - architecture
  - reactive
---

## What is Reactive Programming and Why is it helpful

One of the hardest problems to solve in programming is handling changes over time. This is because changes can come from multiple places, are unknown and will not always come in the same sequence. Even so, we still need to base logic on what is currently known and so we often find that managing these changes result in a very complex system.

We're going to look at how Reactive programming is one solution to this problem. We're going to focus on how it might be useful for user interfaces even though these concepts can–and are–applied to other situations. 

This idea brings together a few patterns (which we will look closer at) including streams and data flows. They allow the system to react to changes within the data instantly, update the user interface to reflect them and do so in a performant and less complex way.

The code can therefor:

1. Base programming logic on what is known at the given moment.
2. Have a clear sense of who can change what data
3. Be told when data has changed and it is safe and performant to update

We're going to base our examples on a common illustration of this which can be seen in modern spreadsheets where the value of a cell is the result of the values in other cells. 

For example:

Cell `A2`'s value might be `=B2 + C2`

Now whenever the value in `B2` or `C2` changes we will see the result automatically updated in `A2`.

## Streams

Following the spreadsheet example let's consider a scenario where someone needs to alter a simple calculation and send someone the result. 

The values in the cells begin with: `B2` = 1 and `C2` = 1.  The cell in `B2` is changed to 5 and after a few more seconds `C2` changes to 2. Finally the value in `A2` is copied and the spreadsheet is deleted because it is no longer needed.

We can picture the changes with a diagram like this. Here the `---` line shows time passing, the cell name signifies a change at that point in time and the `|` the point at which the spreadsheet is deleted. Notice that cell `A2` will change twice, once for each of the other cell changes.

```
-------B2--------|->
-------------C2--|->
-------A2----A2--|->
```

Imagine if the values were changed several times. The diagram could look more like this:

```
-------B2----------B2------|->
-----------C2--C2------C2--|->
-------A2--A2--A2--A2--A2--|->
```

Each of these lines are called streams. The streams here are an **ongoing sequence of changes or data over time**. Streams will send new data to anything listening for it whenever it has data to send. In this example the data that is sent signifies a change to the value of the cell and so a replacement of existing data, but when programming with streams new data can also be added to old data.

## Flows

Let's look again at our last example of the three streams and consider our original logic within cell `A2`.

```
-------B2----------B2------|->
-----------C2--C2------C2--|->
-------A2--A2--A2--A2--A2--|->
```

The value of `A2` was the result of adding the values of `B2` and `C2`. We can see that A2 changes whenever either of the other cells change but how? At the moment we haven't shown the connection between the changes within one stream and the resulting change to `A2`.

Whenever we get notified of new data from the `B2` stream, we need to do pass that data through a series of steps to reach `A2`'s new value. These steps are called a data flow.

Let's presume the value of 'C2' is always `5` and just look at the `B2` changes and picture this flow.

```
-------B2----------B2------|->
       |           |
    (data=1)    (data=5)
       |           |
    [1+5=5]     [5+5=10]
       |           |
-------A2----------A2------|->
```

The data flow above includes a couple of simple steps:

1. Add the new value of `B2` to the value of `C2`
2. Set the result as the value of `A2`

So a Data Flow **takes a piece of data as an input at the beginning, transforms it through a series of steps to produce and output a new result**.

## Data Manipulating and Customising through Data Flows

Data flows become more useful when you either need to change the input or only include part of it. With the next examples I want to briefly consider a couple things we can do with an Array of values.

In each example below data will flow through the steps only when it has changed. This means that we don't have to add more logic to check this.

### Changing each value in a list with `map`

Imagine the value of each cell was the number of packs of a product we had in stock and we wanted to know total number of products instead. We could multiply the number of packs (`value`) by our standard number of items in a pack.

    var itemsInAPack = 20;
    allCellsValues()
      .map((cell) => cell.value * itemsInAPack)
      .subscribe((cellTotalProductsList) => {
        // update the user interface from this list of totals
      });

### Only dealing with some items with `filter`

Following on from the `map` example, imagine you only want cells where there is no stock. For this we can use `filter`.

    allCellsValues()
      .filter((cell) => cell.value === 0)
      .subscribe((cellsWithNoStock) => {
        // We will now have a list of cells with no stock.
        // We can update the user interface to show which
        // products are out of stock.
      });

### Combining steps to create a flow

You would often combine these steps.

    var itemsInAPack = 20;
    var overStockedAmount = 20;
    allCellsValues()
      .filter((cell) => cell.value > overStockedAmount)
      .map((cell) => cell.value * itemsInAPack)
      .subscribe((overStockNumberOfProducts) => {
        // Update the user interface to show a list of product totals for
        // products with too much stock
      });

## Recap

We've shown here how the system reacts to changes within the data instantly, sending details of how it has changed so that we can update the user interface and do so in a performant and less complex way.

The user interface can display what is known at the given moment and doesn't have to worry about how data has changed. It'll be told when data has changed and it is safe and performant to update.

## JavaScript and RxJs

For programming with JavaScript (whether you are using it in the browser or with Node.js) the [RxJs](http://reactivex.io) library has a powerful set of utilities to enable you to implement Reactive Programming as part of your application architecture.

The JavaScript examples above follow this library's implementation of the design pattern and they have comprehensive documentation.

## Resources

If you want to read further here are some other resources.

 - <https://en.wikipedia.org/wiki/Reactive_programming>
 - <http://reactivex.io>
 - <https://xgrommx.github.io/rx-book>
 - <https://en.wikipedia.org/wiki/Stream_processing>
 - <https://en.wikipedia.org/wiki/Dataflow>




