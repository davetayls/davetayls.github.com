---
layout: post
postimage: /content/2014-10-nested-components.jpg
related: css
categories:
  - css
---

As we are building modular components there will inevitably come a time when
relationships between components will become needed. Specifically changing the
style of a child component when it is inside a parent component.

Traditionally we would be forced to write CSS code similar to this:

    .Team {
      border: 1px solid #ccc;
    }

    .Person {
      background: #ccc;
      margin: 10px;
    }

    .Team .Person {
      margin: 5px;
    }

Here we are reducing margin on the `Person` component when it is inside the `Team`
component.

The problem comes as this scales and you start building hard relationships
between components where a component's style is actually dictated inside another
component's CSS files.

To solve this you can maintain each state of the component as
modifiers and then use extending within a pre-processor. Let's do this for the
simple example above.

First let's create a new `Person` state called `Person--small`.

    .Person {
      background: #ccc;
      margin: 10px;
    }

    .Person--small {
      margin: 5px;
    }

Then we need to trigger this modifier when it is inside the `Team` component.
This example is using the [reworkcss](http://github.com/reworkcss) framework.

    .Team .Person {
      extend: .Person--small;
    }

Now we have loosely coupled the two components and have kept control of each
state the `Person` component can be in within the `Person` CSS itself.
