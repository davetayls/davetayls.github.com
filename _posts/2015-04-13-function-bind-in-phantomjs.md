---
layout: post
related: nodejs
postimage: /content/2015-04-require-phantomjs.jpg
categories:
  - javascript
  - nodejs
  - phantomjs
---

I've hit this issue a few times while running Require JS tests using [Karma](http://karma-runner.github.io/0.12/index.html)
through PhantomJs.

PhantomJs doesn't currently support the `Function.prototype.bind` method natively like many current browsers do. This is
fine in itself, it's a simple case of adding the following polyfill to add support:

```javascript
if (!Function.prototype.bind) {
  Function.prototype.bind = function(oThis) {
    if (typeof this !== 'function') {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }

    var aArgs   = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP    = function() {},
        fBound  = function() {
          return fToBind.apply(this instanceof fNOP
                 ? this
                 : oThis,
                 aArgs.concat(Array.prototype.slice.call(arguments)));
        };

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();

    return fBound;
  };
}
```
[MDN Function.prototype.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

However, it's often really hard to tell that this is the root cause of some errors, especially those arising from url
resolving in [Require.js](http://requirejs.org/).

If you are using plugins like the [json plugin](https://github.com/millermedeiros/requirejs-plugins/blob/master/src/json.js)
or this [hbs plugin](https://github.com/epeli/requirejs-hbs) and you use a relative path. You may see PhantomJs request
urls that include several repeated sections.

Here you can see from the logs below the url which is requested has multiple concatenated paths:

    Error: /base/amd/../amd/components/amd/components/amd/components/amd/components/amd/components/alert/alert.hbs HTTP status: 404
    at http://localhost:9876/base/node_modules/requirejs/require.js?bb053e41b1df0fe25058666f5055154860df9bae:141
    
    Error: /base/amd/../amd/components/amd/components/amd/components/amd/components/amd/components/NoticeView/notice.hbs HTTP status: 404
    at http://localhost:9876/base/node_modules/requirejs/require.js?bb053e41b1df0fe25058666f5055154860df9bae:141
    
    Error: /base/amd/../amd/components/amd/components/amd/components/amd/components/amd/components/Button/Button.hbs HTTP status: 404
    at http://localhost:9876/base/node_modules/requirejs/require.js?bb053e41b1df0fe25058666f5055154860df9bae:141
    '/base/test-client/components/Button-spec.js', '../test-client/components/Button-spec'
    '/base/test-client/config/marionette/Region-spec.js', '../test-client/config/marionette/Region-spec'
    '/base/test-client/controllers/RouterController-spec.js', '../test-client/controllers/RouterController-spec'
    '/base/test-client/routers/App-spec.js', '../test-client/routers/App-spec'
    '/base/test-client/utilities/DebouncedDocContainer-spec.js', '../test-client/utilities/DebouncedDocContainer-spec'
    Process finished with exit code 0

So I thought I would make a note of this in case it helps someone else hitting the same issue.
