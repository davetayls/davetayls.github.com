---
layout: post
postimage: /content/2017-06-ts-react.jpg
related: power-of-typescript
series: power-of-typescript
categories:
 - power-of-typescript
 - typescript
 - javascript
---

Hey everyone, welcome to Power of TypeScript Series, thanks for being here and I hope you find it useful.
I'm working on keeping each article short enough to read in about 10 to 15 minutes but packed with enough 
information to help working with these two fantastic technologies. If you notice any mistakes or ways in which
these articles can be improved please let me know by [raising an issue](https://github.com/davetayls/davetayls.github.com).

At [Seccl](https://seccl.tech) we love using [TypeScript](https://www.typescriptlang.org/) to build JavaScript applications. I've been using
it for several years now. Adopting it has been one of the best decisions I have made and it pains me when
I see negative sentiment to what is a very powerful tool. I thought I would put together some explorations,
using it in different situations. 

Working with TypeScript can really enhance your productivity building applications in the React ecosystem.
The React community is very focussed on small components, this architectural pattern is great for scaling and
sharing code but it does mean we need to think about how these components fit together and keep the contracts
between them so that we can rely on the stability of the system as a whole. TypeScript can be one way to help with this.
    
NB. Before we go any further I want to note that the power I show in this article relies on TypeScript to have
all the strict options on.

```json
{
  "compilerOptions": {
    "strict": "true"
  }
}
```

{% include components__SeriesPosts.html %}

