
import $ = require('jquery');
var css = require('./index.css');


$('pre>code').parent().addClass('prettyprint');

(<any>window).prettyPrint();
