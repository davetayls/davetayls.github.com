---
layout: post
title: Progressive Web Apps ⚡️ talk
postimage: /content/2017/07-pwa-talk-2.jpg
related: talks
categories:
 - talks
 - progressive-web-apps
 - javascript
 - service-workers
 - apps
 - html5
---

It was great to give a swift tour of Progressive Web Apps for the lovely people at BathCamp last thursday. Here are the slides and an outline of what we went through.

{% include slides.html src="https://davetayls.me/presentations/2017/progressive-web-apps/index.html" %}

## A few things have changed

### We now know ...

 1. Most people only install apps when they buy their phone
 2. Most people only use common apps and no other
 3. The web platform has now got APIs for previously native-only features


## Let's consider a few situations

### The train journey

 - Content doesn't know about network service
 - Speed
 - Intermittent
 - Offline

### I use this every day

Home screen visibility and easy access is important

 - Engagement
 - Visibility
 - Convenience

### Mobile Data is Expensive, Money and Time

Download on WiFi, experience offline

 - Other Countries, £££ Expensive Data
 - ⏰ 2G Connections still exist
 
## Secure

 - Progressive Web Apps can only be run and installed over a secure connection
 - Service workers work like a proxy and can completely change the response to any request
 - This makes sure that any service worker that gets installed hasn't been tampered with
 
## App Shell

 - The structural elements of the application
 - Doesn't include content
 
## Service Workers

 - Control how requests are routed. Sit between browser and server.
 - They don't rely on the website being open, you can define what events wake it up
 - Push messages can wake up a service worker
 - Limited to scope dictated by the folder the file is in
 - Can be added without affecting unsupported browsers

```javascript
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(function() {
      console.log('Service Worker Registered');
    });
}
```

```javascript
var cacheName = 'myApp-v1';
self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    });
  );
});
```

```javascript
var filesToCache = [
  '/',
  '/index.html',
  '/scripts/app.js'
];
```

```javascript
self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
```

## Manifest

 - Control how app appears to the user on the phone
 - Control how the app launches
 - Android will automatically detect a PWA and notify the user they can add it to their home screen

### Link to the manifest

```html
<link rel="manifest" href="/manifest.json" >
```

### An example manifest

```json
{
  "name": "Superhero",
  "start_url": ".",
  "display": "standalone",
  "background_color": "#fff",
  "description": "Wear a cape, change the world",
  "icons": [{
    "src": "images/homescreen48.png",
    "sizes": "48x48",
    "type": "image/png"
  }]
}
```

## Best of the Web, and best of apps

 - Reliability: Integral code installed on the device
 - Speed: Fast Startup, customisable cacheing and offline
 - User Engagement: Traditionally native app features like push notifications and GPS
 - Integrated: Shows on the home screen and loading as a full-screen app
 
## Support

Take a look at these resources to help you get going.

### Udacity Progressive Web Apps Course

![udacity](https://davetayls.me/presentations/2017/progressive-web-apps/udacity.png)

[Udacity Web Apps Course](https://www.udacity.com/course/intro-to-progressive-web-apps--ud811)
 
### npm `pw-precache` module
 
```bash
  npm i -g pw-precache
  ```
