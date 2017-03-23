/// <reference path="browser/ambient/jquery/index.d.ts" />

declare var require:any;

declare module 'lodash.debounce' {
  var debounce:any;
  export = debounce;
}

declare module 'fastclick' {
  var fastclick:any;
  export = fastclick;
}

interface JQuery {
  typed:any;
}
