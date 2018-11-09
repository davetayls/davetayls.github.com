---
layout: post
title: Serverless Framework Talk
subtitle: Bath Digital Festival
postimage: /content/2017/10-react-talk.jpg
related: serverless
categories:
 - talks
 - serverless
 - typescript
 - javascript
---

Thanks to everyone who came to the Bath Digital Festival lunchtime events.
It was really nice to be given the opportunity to speak and then to be able
to talk with so many of you afterwards.

Here are the slides:

{% include slides.html src="https://davetayls.me/presentations/2018/serverless-framework/index.html#/" %}

## This is what I covered

  * What have we achieved at Seccl?
  * What are the pinch points?
  * Who is this for?
  
## What is Serverless Framework

 - Infrastructure as code
 - Simplified deployment of separate functions
 - Provider agnostic

## What have we achieved

Seccl is a startup in Bath pioneering a new breed
of digital services for wealth management

* Node.js, TypeScript, React, Express APIs
* Serverless Framework on AWS
* APIs, pubsub, queues, functions, static websites, cdn
* ## 90% of our infrastructure (and rising) is controlled by code!

## Here's the rub! There has been pain

 - Deployment is needed to fully test end-to-end and that can slow things down
 - Our workflow is heavily unit test focused so this helps but when
   it gets to testing the integration in our dev environments you do have
   to deploy.
 - The offline capabilities aren't a silver bullet, when you start to link
   functions together you could still have some functions running in the cloud
   and some locally

### What about lambda?

 - we use aws and so that means lambda
 - building compiled code to run in a different architecture
 - Cold start when you run lamda inside a VPC is really painful (up to 9 secs)
 - When it goes wrong, your head can explode as to where to start looking
 - Sometimes it's completely out of your ability to fix
 
# Who is this for

## 👍

  - For any application logic which can be easily spun up, and then powered down
  - It works really well for APIs which talk to a database or other APIs
  - It works great for a micro-service like architecture
  - For teams with little devops specialist skills
  
## 💩

 - You can't be afraid of a learning-curve
 - You can't work with a full framework like Rails
 - For someone who wants a silver bullet and a holiday in Hawaii
 
# Roundup

 - 💪 Infrastructure as Code
 - 💪 Replica environments
 - 😱 Everything is separated. It's different complexity
 - 😱 Slow cold starts
 - 💪 No maintaining hardware
 - 💪 Serverless plugins to fill the gaps
 - Tooling is improving at a rapid rate
