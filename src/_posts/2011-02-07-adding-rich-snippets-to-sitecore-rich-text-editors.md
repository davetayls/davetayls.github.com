---
layout: post
author: davetayls
title: Adding rich snippets to Sitecore Rich Text Editors
categories: Sitecore
---

I like the way sitecore allows you to manage a lot of the functionality of it's RTE from within the content editor itself. Settings for rich snippets along with toolbar options are held within the core database. Here is a quick look at how you would add rich html snippets to Sitecore rich text editors.

Switch to the core database
---------------------------
At the bottom right of your screen there is a database icon, click this to open the context menu and select core.

![Sitecore database switcher](http://farm6.static.flickr.com/5213/5424495881_563a2f6d7e_m.jpg)


Open the rich text settings content node
----------------------------------------
Once Sitecore and changed to the core database go in to the Content Editor and browse to the following node:

![Sitecore content tree](http://farm6.static.flickr.com/5051/5424495959_170f93bc2c_z.jpg)

/system/Settings/Html Editor Profiles/Rich Text Default/Snippets

If you have the default installation you will probably see a Sample Snippet inside this folder.

![content tree showing sample snippet](http://farm6.static.flickr.com/5052/5424496037_f7f34fd7ac_b.jpg)

Insert a new snippet
--------------------

You can either duplicate a snippet that already exists or to add a new one you right click the Snippets folder and select Insert/Insert from Template

![insert from template](http://farm6.static.flickr.com/5060/5425096460_14e282d12b.jpg)

Inside the dialog window the shows select the following path

/System/Html Editor Profiles/Html Editor Snippet

![insert dialog](http://farm6.static.flickr.com/5051/5425096528_a2c4cc0294_z.jpg)

Give your snippet a name and choose Insert

You will see your new snippet added to the Snippets folder. You can then edit the value which will be the title of the snippet within the RTE and the Value which will be the HTML content injected in to the field.

![new snippet shown](http://farm6.static.flickr.com/5176/5425096560_429f735414_b.jpg)

Save the content item (You don't need to publish because you're working inside the core database).

Check the new snippet has appeared
----------------------------------

Now when you open up a RTE which is using the default profile you will see your new snippet in the list.

![snippet picker showing new snippet](http://farm6.static.flickr.com/5216/5424528583_bde8e6062a_m.jpg)

