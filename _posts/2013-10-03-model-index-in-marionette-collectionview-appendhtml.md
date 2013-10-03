---
layout: post
author: davetayls
title: Inserting a model at correct index in Marionette.CollectionView appendHtml
categories:
- html5
- javascript
- marionette
---

I've been working a lot with [Backbone Marionette](http://marionettejs.com/) recently. It's a really powerful framework for [Backbone.js](http://backbonejs.org).

Today I have been working on displaying a table of model values with the ability to add new items to the collection they are in. It made sense to use [Marionette's CollectionView](https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.collectionview.md) to manage the individual views for each model. It also conveniently will watch the collection for any add events and append a new view in to the DOM.

This is all good but it took me a while checking the sorting of the collection to realise: whilst Backbone was inserting the new model at the *correct* point in the collection; CollectionView's `appendHtml` method only ever appended to the end of the parent DOM element.

After a bit of a think and a search I have come up with the following code to implement the full functionality:

    Marionette.CollectionView.extend({
        appendHtml: function(collectionView, itemView, index) {
          var childAtIndex;
          
          // could just quickly
          // use prepend
          if (index === 0) {
            return collectionView.$el
              .prepend(itemView.el);
            
          } else {
          
            // see if there is already
            // a child at the index
            childAtIndex = collectionView.$el
              .children().eq(index);
            if (childAtIndex.length) {
                return childAtIndex
                  .before(itemView.el);
            } else {
                return collectionView.$el
                  .append(itemView.el);
            }
          }
        }
    });

They've obviously kept the default implementation very simple for a reason but if you need this sort of functionality for a particular type of CollectionView then hope this helps.