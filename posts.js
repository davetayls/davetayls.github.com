---
layout: nil
---
{
 
    "title": "Dave Taylor (@davetayls)",
    "atom": "http://the-taylors.org/atom.xml",
    "site": "http://the-taylors.org/",
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
            "link": "http://the-taylors.org{{ post.url }}",
            "updated": "{{ post.date | date_to_xmlschema }}",
            "id": "http://the-taylors.org{{ post.id }}",
            "categories": "{{ post.categories }}"
        },
 {% endif %}
 {% endfor %}
 ],
 "updated": {{ site.time | date_to_xmlschema }}
}
