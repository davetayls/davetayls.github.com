---
layout: post
postimage: /content/2014-10-coffee-debug.jpg
related: nodejs
categories:
  - nodejs
  - javascript
  - coffee-script
  - debugging
---

We use [CoffeeScript](http://coffeescript.org/) extensively in the [GigStamp](http://www.gigstamp.com) codebase at the moment. Initially we used watchers to compile the coffee-script in to JavaScript and then the app would run on the compiled code. But as the code has grown in to several node modules it became awkward to be watching and compiling the various separate parts so we started running it directly.

This however has brought up a few complexities as we are running transpiled code. Debugging the code has been one of those complexities.

To be able to do step by step debugging we need to do two things.

## Debugger process in node

First turn on the nodejs debugger through the `coffee` executable.

    $ coffee --nodejs --debug ./server/app.coffee
    debugger listening on port 5858

This will fire up the debugger process on port 5858.

## Node Inspector

Next you can use [node-inspector](https://github.com/node-inspector/node-inspector) to connect to that debugger port to allow you to step through the **transpiled JavaScript** code.

If you're already familiar with general node.js practice this is a pretty simple process.

    $ npm install -g node-inspector

Then we can use the `node-debug` command to fire up the dev tools. Because we have already started the CoffeeScript process previously we can just run it without any arguments.

    $ node-debug

## Source Maps

The final piece of the puzzle is a nice to have. The ability to use source maps so that you can debug the original. This current setup doesn't give you that even if you pass the `--map` arg to the `coffee` command so that's something I'd be interested if anyone could find out.

## With grunt-nodemon

We use this setup within our [Grunt](http://gruntjs.com/) workflow using the [grunt-nodemon](https://github.com/ChrisWren/grunt-nodemon) plugin.

It's not immediately obvious how to send this config through but here is what worked in the end.

    nodemon:
      dev:
        script: './coffee/app.coffee'
        options:
          nodeArgs: ['--nodejs', '--debug']
          ignore: [
            'node_modules/**'
            'public/**'
          ]
          ext: 'js,coffee'
          watch: ['./coffee']
