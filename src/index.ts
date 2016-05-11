
import debounce = require('lodash.debounce');
import $ = require('jquery');
(<any>window).jQuery = $;

require('waypoints/lib/noframework.waypoints');
require('waypoints/lib/shortcuts/sticky');

var css = require('./index.css');

const Waypoint = (<any>window).Waypoint;

const $pageHeader = $('.PageHeader');
const PAGE_HEADER_COLLAPSED_CLASS = 'PageHeader--collapsed';

const $aboutMeAside = $('.AboutMeAside');
const ABOUT_ME_ASIDE_STICKY = 'AboutMeAside--sticky';
const ABOUT_ME_ASIDE_BOTTOM_CLASS = 'AboutMeAside--bottom';

const $workWithMeFooter = $('.WorkWithMeFooter');

$('pre>code').parent().addClass('prettyprint');

(<any>window).prettyPrint();

$(window).resize(debounce(function() {
  console.log('resize');
  Waypoint.refreshAll();
}, 40));


const contentWaypoint = new Waypoint({
  element: document.getElementById('content'),
  offset: 90,
  handler: function(direction:any) {
    switch (direction) {
      case 'up':
        $pageHeader.removeClass(PAGE_HEADER_COLLAPSED_CLASS);
        break;
      case 'down':
        $pageHeader.addClass(PAGE_HEADER_COLLAPSED_CLASS);
        break;
    }
  }
});

const aboutSticky = new Waypoint({
  element: $aboutMeAside[0],
  offset: 110,
  handler: function(direction:any) {
    switch (direction) {
      case 'up':
        $aboutMeAside.removeClass(ABOUT_ME_ASIDE_STICKY);
        break;
      case 'down':
        $aboutMeAside.addClass(ABOUT_ME_ASIDE_STICKY);
        break;
    }
  }
});

const workWithMeFooter = new Waypoint({
  element: $workWithMeFooter[0],
  offset: '100%',
  handler: function(direction:any) {
    switch (direction) {
      case 'up':
        $aboutMeAside.removeClass(ABOUT_ME_ASIDE_BOTTOM_CLASS);
        break;
      case 'down':
        $aboutMeAside.addClass(ABOUT_ME_ASIDE_BOTTOM_CLASS);
        break;
    }
  }
});
