---
layout: post
author: davetayls
related: javascript
categories: 
  - javascript
  
---



I've been using Promises and Deferreds pretty extensively for a while now and I thought I would put down some of my thoughts on when they work better than events and when they don't.

## Promises are good for a seemingly sequential set of tasks

If the task I am coding has an obvious beginning and end with a set of tasks to complete along the way then the code looks so much cleaner with promises.

Here is an example of an event based approach

    var user = new User();
    var comments = new CommentCollection();
    user.on('sync', function(){
        comments.userId = user.id;
        comments.fetch()
    });
    comments.on('sync', function(){
        // => do something
    });
    function errorHappened(){
        console.log('Could not get comments');
    }
    user.on('error', errorHappened);
    comments.on('error', errorHappened);
    user.fetch()

For something that is quite sequential the code is very confusing because it jumps around a lot.

Your other option of course is callbacks.

    var user = new User();
    var comments = new CommentCollection();
    function errorHappened(){
      console.log('Could not get comments');
    }
    user.fetch({
      error: errorHappened,
      success: function(){
        comments.userId = user.id;
        comments.fetch({
          error: errorHappened,
          success: function(){
            // => do something
          }
        });
      }
    });
    
Whilst this looks a bit more sequential, it can very quickly lead you into callback hell with nesting several levels deep.

Using promises in this example makes the code more readable and more concise.

    var user = new User();
    var comments = new CommentCollection();
    user.fetch()
    .then(function(){
      comments.userId = user.id;
      return comments.fetch()
    })
    .then(function(){
      // => do something
    })
    .fail(function(){
      console.log('Could not get comments');
    })
    .done();
    
Now if anything in the chain fails we can catch the error in a single place. **If you bind your functions to each instance** this can look really concise.

    var user = new User();
    var comments = new CommentCollection();
    user.fetch()
    .then(function(){
      comments.userId = user.id;
      return comments.fetch()
    })
    .then(comments.sortByDate)
    .then(comments.findLinks)
    .then(function(){
      // => do something
    })
    .fail(function(){
      console.log('Could not get comments');
    })
    .done();
    

## Events are good when there are multiple outcomes

When there could be several multiple outcomes it can get quite messy with promises. Branching off inside `.then` statements depending on the result of the last async operation can start to become as nested as the callbacks before.

Also, if an event can happen even after the initial sequence has completed you can't go back.

    var comment = new Comment();
    comment.like()
    .then(function(result){
        if (result === 'not allowed'){
          // => show not allowed
          return false
        } else if (result === 'checking'){
          // => show we need to check
          return waitForChecking()
        } else if (result === 'liked'){
          // => you liked it
          return true
        }
    })
    .then(function(isLiked){
      if (isLiked){
        // => definitely liked
      } else {
        // => definitely not liked
      }
    })
    .done();

As you can see from the code above if the result comes back that further checks have to be made before we know if a comment is liked then we are stuck in the promise sequence.

Alternatively it might be cleaner with events.

    var comment = new Comment();
    comment.on('not_allowed', function(){
      // => you're not allowed
    });
    comment.on('checking', function(){
      // => we're still checking
    });
    comment.on('liked', function(){
      // => definitely liked
    });
    comment.like()
    
The benefit of this is that if something should happen later to cause the outcome to change. The event would trigger and we already have the code in place to alter ui or do something about it.

## They don't have to be used exclusively

It's great when you can use them together. In fact I've found they live quite nicely side-by-side. A function can run an async task and return a promise.

The async task could fire events with progress or various results and the promise could resolve when the whole task is completed.

