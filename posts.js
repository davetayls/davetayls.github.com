---
layout: nil
---
{

    "title": "Dave Taylor (@davetayls)",
    "atom": "http://davetayls.me/atom.xml",
    "site": "http://davetayls.me/",
    "author": {
        "name": "David Taylor"
        "email": "dave@the-taylors.org"
    },
    entries: [
        {}
 {% for post in site.posts %}
 {% if post.status != 'draft' %}
    ,   {
            "title": "{{ post.title }}",
            "link": "http://davetayls.me{{ post.url }}",
            "updated": "{{ post.date | date_to_xmlschema }}",
            "id": "http://davetayls.me{{ post.id }}",
            "categories": "{{ post.categories }}"
        },
 {% endif %}
 {% endfor %}
 ],
 "updated": {{ site.time | date_to_xmlschema }}
}
