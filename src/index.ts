const fastclick = require('fastclick')
const debounce = require('lodash.debounce')
import $ = require('jquery');
const tocbot = require('tocbot')

require('waypoints/lib/noframework.waypoints')
require('waypoints/lib/shortcuts/sticky')
require('./index.css')

fastclick.attach(document.body);
(<any>window).jQuery = $

const Waypoint = (<any>window).Waypoint

const $pageHeader = $('.PageHeader')
const PAGE_HEADER_COLLAPSED_CLASS = 'PageHeader--collapsed'

const $aboutMeAside = $('.AboutMeAside')
const ABOUT_ME_ASIDE_STICKY = 'AboutMeAside--sticky'
const ABOUT_ME_ASIDE_BOTTOM_CLASS = 'AboutMeAside--bottom'

const $workWithMeFooter = $('.WorkWithMeFooter')

$('pre>code').each(function (i, block) {
  (window as any).hljs.highlightBlock(block)
})

$(window).on('resize', debounce(function () {
  Waypoint.refreshAll()
}, 40))

const $pageHeaderBurger = $pageHeader.find('.Burger')
const PAGE_HEADER_OPEN = 'PageHeader--open'
const BURGER_X = 'Burger--x'

$pageHeaderBurger.on('click', function () {
  console.log('clicked')
  $pageHeader.toggleClass(PAGE_HEADER_OPEN)
  $pageHeaderBurger.toggleClass(BURGER_X)
})

new Waypoint({
  element: document.getElementById('content'),
  offset: 90,
  handler: function (direction: any) {
    switch (direction) {
      case 'up':
        $pageHeader.removeClass(PAGE_HEADER_COLLAPSED_CLASS)
        break
      case 'down':
        $pageHeader.addClass(PAGE_HEADER_COLLAPSED_CLASS)
        break
    }
  }
})

if ($aboutMeAside.length) {
  new Waypoint({
    element: $aboutMeAside[0],
    offset: 110,
    handler: function (direction: any) {
      switch (direction) {
        case 'up':
          $aboutMeAside.removeClass(ABOUT_ME_ASIDE_STICKY)
          break
        case 'down':
          $aboutMeAside.addClass(ABOUT_ME_ASIDE_STICKY)
          break
      }
    }
  })
}


if ($workWithMeFooter.length) {
  new Waypoint({
    element: $workWithMeFooter[0],
    offset: '100%',
    handler: function (direction: any) {
      switch (direction) {
        case 'up':
          $aboutMeAside.removeClass(ABOUT_ME_ASIDE_BOTTOM_CLASS)
          break
        case 'down':
          $aboutMeAside.addClass(ABOUT_ME_ASIDE_BOTTOM_CLASS)
          break
      }
    }
  })
}

tocbot.init({
  // Where to render the table of contents.
  tocSelector: '.js-toc',
  // Where to grab the headings to build the table of contents.
  contentSelector: '.js-toc-content',
  // Which headings to grab inside of the contentSelector element.
  headingSelector: 'h2, h3',
});
