---
title: Building Stats in to GigStamp
layout: post
postimage: /content/2014-06-stats.jpg
author: davetayls
related: nodejs
categories: 
  - mongodb
  - nodejs
  - javascript
  - gigstamp
  
---

We have just got back from an amazing weekend at [Camden Crawl](http://thecamdencrawl.com/), an amazing urban festival with lots of great up-and-coming new artists gigging in pubs and clubs around Camden, London. Urban festivals are where I think [GigStamp](http://gigstamp.com) really shines, we created some bespoke artwork for festival's gigs which came with a great ticket-like share post to user's twitter and facebook streams.

![CC14 GigGtamp share](/content/2014-06-cc14-share.jpg)

With awareness and activity starting to build inside the app I’ve started the process of building stats and charts in to GigStamp. I'm excited as we start to imagine what the user, artist and venue pages might have on them and also what tools we can give people to be able to promote themselves and see how well they are doing.

Here is a quick brain dump of the sort of information I would like to get out of the data at the moment:

 - GigStamps count by day
 - Venue GigStamps count by day
 - Artist GigStamps count by day

It would then be nice to start making this personal and be able to slice the data based on a user to give me:

 - A user’s GigStamps count by day
 - A user’s tally of GigStamps at all the different Venues they have been at
 - A user’s count of GigStamps for all the different Artists they have seen

To be able to get this data out of GigStamp’s [MongoDB](http://mongodb.org) database I will need to use it’s [aggregation framework](http://docs.mongodb.org/manual/aggregation/).

## The first goal - GigStamps count by day

The goal is to produce an api end point which will give the following structure.

    {
      date_from: "2014-06-01T00:00:00.000Z",
      date_to: "2014-06-23T23:59:59.999Z",	
      results: [
        {
          day: "2014-06-21",
          total: 1234
        },
        {
          day: "2014-06-20",
          total: 1234
        },
        ...
      ]
    }


### Dates to days

The first task is to convert a `GigStamp`’s `eventDate` which includes the start time of the gig in to a day so that it can be grouped. I stumbled across a [StackOverflow answer](http://stackoverflow.com/a/15940554/138733) and an [article of tricks](http://www.kamsky.org/stupid-tricks-with-mongodb/stupid-date-tricks-with-aggregation-framework) which have helped me.

We would need to create a match so that we restrict the results to a particular time frame. First I check to see if any dates have been passed in via the query string and then create a `Date` object for `dateFrom` and `dateTo`.

    {
      $match: {
        eventDate: {
          $gt: dateFrom,
          $lt: dateTo
        }
      }
    }

Then we need extract the `$dayOfMonth`, `$month` and `$year`

    { 
      $project: {
        year: {
          $year: "$eventDate"
        }, 
        month: {
          $month: "$eventDate" 
        }, 
        day: {
          $dayOfMonth: "$eventDate"
        }
      } 
    }


Then group the result, keeping a count of the matches.

    {
      $group: {
        _id: {
          year: "$year",
          month: "$month", 
          day: "$day"
        },
        count: { $sum: 1 } 
      } 
    }

And finally sort it so that we see the most recent first. What we are saying here is sort by `year` descending (`-1`, ie: 2014, 2013, 2012), then sort by `month` then finally by `day`. 

    {
      $sort: {
        "_id.year": -1,
        "_id.month": -1,
        "_id.day": -1
      }
    }
    
This will return a dataset that looks close to the goal.

    [{
      _id: {
        year: 2014,
        month: 6,
        day: 21 
      },
      count: 1234
    }]

So I just do a map of the data in JavaScript to concatenate the `Number` year, month and day fields.

    results.map(function(result){
      return {
        day: [
          result._id.year,
          result._id.month,
          result._id.day
        ].join('-'),
        count: result.count
      };
    });
    
## Next

So now that we have the basic concept of working with the `GigStamp` data it'll be pretty simple to apply the same thinking to produce the other endpoints.

## If you're an artist, what would you like to see?

Are you an artist or managing one? I'd love to get your thoughts on what sort of information you would find interesting.