/// <reference path="browser/ambient/fastclick/index.d.ts" />
/// <reference path="browser/ambient/jquery/index.d.ts" />

declare var require:any;

declare module 'lodash.debounce' {
  var debounce:any;
  export = debounce;
}

interface JQuery {
  typed:any;
}
