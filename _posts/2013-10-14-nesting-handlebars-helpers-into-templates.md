---
layout: post
author: davetayls
title: Nesting Handlebars helpers into templates.
categories:
- javascript
- backbone
- marionette
- templating
- handlebars
---

If you are building a lot of html templates using [Handlebars](http://handlebarsjs.com/) then here is a walk through of slimming them down using [Require.js](http://requirejs.org), [require handlebars plugin](https://github.com/SlexAxton/require-handlebars-plugin) and Handlebars helper system.

A really good use case for this is building forms. Say you wanted to keep a common className and structure across all your app. You might start with a simple form like this one:

    <form role="form">
      <fieldset>
        <div class="form-group">
          <label for="name" class="control-label">Name</label>
          <input class="form-control" type="text" id="name" />
        </div>
        <div class="form-group form-group--email">
          <label for="email" class="control-label">Email</label>
          <input class="form-control" type="email" id="email" />
        </div>
        <input type="submit" />
      </fieldset>
    </form>
    
The first thing we could do would be to create reusable helpers which will build the `label` and `input` elements.

## Cheeky little helpers
It's great starting small as it allows you to be quite granular when using helpers within your templates. You can always build helpers which utilise other helpers.

Let's build a simple `label` helper:

      define(function(require){
      
        // register our dependencies
        var Handlebars = require('handlebars');
        
        // create a label helper
        Handlebars.registerHelper(
          'input_label',
          // we'll make context be the text
          function(context, options){
            // we'll send in the id as an attribute
            id = options.hash.id;
            return '<label for="'+ id +'" class="control-label">'+ context +'</label>';
          }
        );
        
      });

Now after this simple helper and maybe a similar one for the input we can change the template to:

<pre><code>&lt;form role=&quot;form&quot;&gt;<br/>  &lt;fieldset&gt;<br/>    &lt;div class=&quot;form-group&quot;&gt;<br/>      &#123;&#123;{input_label 'Name' id='name'}}}<br/>      &#123;&#123;{input_text my_var id='name'}}}<br/>    &lt;/div&gt;<br/>    &lt;div class=&quot;form-group form-group--email&quot;&gt;<br/>      &#123;&#123;{input_label 'Email' id='email'}}}<br/>      &#123;&#123;{input_email my_date id='email'}}}<br/>    &lt;/div&gt;<br/>    &lt;input type=&quot;submit&quot; /&gt;<br/>  &lt;/fieldset&gt;<br/>&lt;/form&gt;<br/></code></pre>

Already it's looking better and we've saved ourselves a lot of refactoring should we need to change class names or add another attribute to the `input` element across all email inputs.

## Helping helpers
Now we could take this one step further by encapsulating both label and input in a helper saving us the need to repeat the id. Also it's not too pretty having html embedded in the JavaScript so lets also use the power of Require.js and the Handlebars plugin to *really* simply use another template inside.

      define(function(require){
      
        // register our dependencies
        var Handlebars = require('handlebars');
        
        // template helpers
        var group_text = require('hbs!templates/group_text');
        
        // create previous helpers
        // ...
        
        // create a group helper
        Handlebars.registerHelper(
          'group_text',
          function(context, options){
            // create a simple link to the value
            // so we can just pass the options
            // as data
            options.value = context;
            return group_text(options);
          }
        );
        
        // create other group helpers
        // ...
        
      });

Then within our `group_text.hbs` file we can not only place the surrounding markup but we can also use the helpers we've created previously.

<pre><code>&lt;div class=&quot;form-group&quot;&gt;<br/>  &#123;&#123;{input_label hash.label id=hash.id}}}<br/>  &#123;&#123;{input_text value id=hash.id}}}<br/>&lt;/div&gt;</code></pre>

And let's look at our resulting form template.

<pre><code>&lt;form role=&quot;form&quot;&gt;<br/>  &lt;fieldset&gt;<br/>    &#123;&#123;{group_text my_var label='Name' id='name'}}}<br/>    &#123;&#123;{group_email my_date label='Email' id='email}}}<br/>    &lt;input type=&quot;submit&quot; /&gt;<br/>  &lt;/fieldset&gt;<br/>&lt;/form&gt;<br/></code></pre>

Soooo much neater!! Much easier to maintain across all the forms within your app.


