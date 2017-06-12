---
title: Models Everywhere
layout: post
postimage: /content/2016-09-models.jpg
related: javascript
categories:
  - javascript
  - thoughts
  - architecture
---

You will see the term "model" used a lot when looking at JavaScript applications that deal with data. But what is a model and how do they help us architect (or structure) code to be more predictable and scaleable.

A model is a set of properties that together hold the information we need to understand a single item. An example of one of these items might be a person or an address. We could model a person by holding details of the properties: *name*, *age* and *date of birth*. We could model an address by holding details of the properties: *street*, *city*, *country*, *postal code*. The properties we choose will be dependent on what information our application needs. 

Once we have a structure it helps us to refer to particular pieces of data. We could talk about a `Person` and know we are referring to an item with a name, age and a date of birth. In the same way they help us talk about the data that gets passed around our system.

## A look at two types of model

Modelling is used in various forms but when dealing with web applications you will tend to see it two specific areas: data models and view models.

### Data Models

Data Models here are properties for data stored in a database and tend to be retrieved from a [Web API](https://en.wikipedia.org/wiki/Application_programming_interface#Web_APIs). A `Person` or an `Address` model would be an entitity model.

Our `Person` model properties might be:

    name: string
    age: number
    avatarUrl: string
    dateOfBirth: Date
    
Our `Address` model properties might be:

    street: string
    city: string
    country: string
    postalCode: string
    
You can see that there could be other pieces of information attached to either of these models, but these will be all we need to satisfy the requirements of our application.

### View Models

View Models are properties which are specifically put together to provide the information in the correct format for the user interface. The properties in a View Model are often taken from various Data Models.

![Contact Card](https://docs.google.com/drawings/d/13cMk_ZHjdjNHxC1-2ZcAlCCzi_MtvC75PuqyFTumMQ4/pub?w=200&h=200)

We might show a person's details in a card which would need the following information:

    personName: string
    personAge: number
    personAvatarUrl: string
    addressCity: string
    addressCountry: string
    
You can see here that we can build this View Model by taking properties from a `Person` and an `Address` model. This is likely where they will come from in our code. We could also build this View Model by manually setting each property to a value. This gives us ways in which we can test our user interface without having data like a person or an address coming from elsewhere.
 
##  Encouraging separation

When models are used in this way we form a loose tie between what we need to show on screen and what we are holding in the database. This is important because of a number or reasons.

### It allows us to adapt to changing requirements

If we are building our View Model from data coming from a Web API we can adapt where the data comes from if the Web API needs to send us data in a different format. If the `country` property was renamed to `countryCode` then we would just need to update the code to set the `addressCountry` from `countryCode`. The contact card code wouldn't need to change. This becomes important if the contact card has been used in many places within our application based on different Data Models.

### It allows us to swap out new features based on the same underlying information

Alternatively if we wanted to test a new contact card for a few of our users to see if they found it more useful then you can base both contact cards on the same underlying View Model and the Data Models don't have to change.

### It allows us to test the pieces of our application without being dependent on the other parts being finished or even present

Having this separation allows us to create multiple contact cards with specific properties and ensure our application can handle these scenarios. Here are a few examples:

Would the user interface break if:

 - the name was longer than 50 characters?
 - the age was 1 digit instead of 2

We can create and visualise these scenarios without depending on the server to have them in a database.

##  Defining data requirements

Here are a few thoughts to consider when planning out these models:

 - Don't include properties just because you might use them in the future
 - Keep models as simple as possible
 - Try and keep View Models as flat as possible. What I mean by this is instead of having: `Person.address.city` and `Person.address.country` flatten it to separate properties on the View Model like `Person.addressCity` and `Person.addressCountry` this helps prevent complex data structures which can make using these models harder to picture in your head

## Conclusion

A model is a way of us defining the properties we need to sufficiently describe data within our applications.

Planning exactly what data is needed in the form of models is an important skill to master. Deciding effectively on what information is needed, in what format and where to place the separation will be important to maintaining a complex web application.

Models can be quite a broad concept and the more you build web applications the more you will see this practice of defining a set of properties to be used within parts of your application. Creating loosly coupled "gates" between areas of your application (like the data from a Web API and the data needed for a piece of the interface) is a powerful way of allowing web applications to scale and be adapted easily as new features are added or requirements change.

## References

 - <https://en.wikipedia.org/wiki/Problem_domain>
 - <https://blog.codinghorror.com/understanding-model-view-controller/>
 - <https://en.wikipedia.org/wiki/Data_modeling>
 - <https://en.wikipedia.org/wiki/Application_programming_interface#Web_API>
