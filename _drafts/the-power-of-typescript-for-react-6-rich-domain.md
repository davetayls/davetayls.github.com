---
layout: post
related: power-of-typescript
categories:
 - power-of-typescript
 - typescript
 - javascript
---

I love using [TypeScript](https://www.typescriptlang.org/) to build JavaScript applications and it pains me to see a lot of negative sentiment to what is a very powerful tool. I thought I would put together some explorations, using it in different situations. 

Working with TypeScript can really enhance your productivity building applications in the React ecosystem. The React community is very focussed on small components, this architectural pattern is great for scaling and sharing code but it does mean we need to think about how these components fit together and keep the contracts between them so that we can rely on the stability of the system as a whole. TypeScript can be one way to help with this.

NB. Before we go any further I want to note that the power I show in this article relies on TypeScript to have all the strict options on. Here is a list of them at the time of writing this article.

```json
{
  "compilerOptions": {
    "noImplicitAny": true,
    "noImplicitThis": true,
    "noImplicitReturns": true,
    "strictNullChecks": true
  }
}
```

# Using Type Aliases to Build a Rich Description of the Domain

In this post I want to go beyond React and Redux and explore ways in which we can improve the readability of our code by creating a rich domain of types that describe the data better.

