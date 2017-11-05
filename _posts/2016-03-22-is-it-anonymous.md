---
layout: post
postimage: /content/2016/03-anonymous.jpg
related: thoughts
categories:
  - javascript
  - thoughts
---

[Read this article on medium](https://medium.com/@davetayls/is-it-anonymous-65646d61304a)

ES6 or ES2015 … has been changing the way we write JavaScript as it slowly becomes more and more popular and easier to integrate in to our existing workflows. It has brought some much needed improvements to enable us to write better code and make use of long-standing conventions.

We’ve made strides in the past to encourage the naming of functions in our code so that should they appear in the stack trace of an error you are given help to understand it. I was therefor worried when I started seeing this convention used a lot:

    const mapStateToProps = (state) => {
      return {
        todos: getVisibleTodos(state.todos, state.visibilityFilter)
      }
    }

This has been lifted directly from the Redux docs (which are really thorough and well written). Coming from CoffeeScript, my understanding of this is that it would create the following anonymous JavaScript function.

    var mapStateToProps = function(state) {
      return {
        todos: getVisibleTodos(state.todos, state.visibilityFilter)
      }
    }

In this example should an error occur inside mapStateToProps you will get a very unhelpful stack trace because the JavaScript engine hasn’t got the information it needs to help you out.

However my fears were quashed when on close inspection of the output that Babel gives you, it has noticed that this variable has been assigned a function and names it accordingly.

    var mapStateToProps = function mapStateToProps(state) {
     return {
       todos: getVisibleTodos(state.todos, state.visibilityFilter)
     };
    };

Panic over, nice one guys.

Now lets look at what TypeScript gives you for the same piece of code:

    var mapStateToProps = function (state) {
     return {
       todos: getVisibleTodos(state.todos, state.visibilityFilter)
     };
    };

Nooooooooooo!! I ❤ you TypeScript but my heart is broken seeing this, it just makes sense to pass the name over to aid our debugging sanity.

This shows that it’s worth understanding the implications of the way we use the tools at our disposal. These tools give us amazing power but a strong understanding of what they generate is important.
