---
layout: post
title: Including jsLint in your validation using nAnt, batch files or ajax
categories: releases
author: davetayls
postimage: /content/jslint.gif
---

[jsLint][1] is a fantastic tool developed by [Douglas Crockford][2], Yahoo!'s JavaScript architect which will validate JavaScript source to a strict specification which often catches hidden errors.

As the website says jsLint will probably "hurt your feelings" as it enforces conventions which not everyone would like...however, I would recommend you include it within your build scripts and work through any issues it throws up. You will be grateful of it in the end!

I am going to take you through ways to integrate jsLint in to a nAnt build process, or just be able to run it manually locally on Windows.

You can [download all the example files for this post][3].

### Setup

Download the relevant files needed and customise the jsLint.wsf defaults (line 56) to fit with your preferences. I have included a less strict version for this example.

### 1. Running jsLint manually

You can run jsLint manually on your js files by passing their location as the first parameter of jsLint.bat. The location can be an absolute or relative location. Here are some examples:

	jsLint.bat c:\project\js\test.js
	jsLint.bat ..\..\js\test.js

You may want to create another batch file which will run it on multiple files to save you having to type the locations in every time.

### 2. nAnt build target

You can include these tests within nAnt build scripts so that the build fails if the JavaScript doesn't validate. Here is an example build target ([download][3]).

    <target name="jsLintValidation" description="validates JS files">
      <foreach item="File" property="jsfile">
        <in>
          <items>
            <include name="${siteroot}\js\*.js" />
          </items>
        </in>
        <do>
          <exec
            program="${jslintdir}\jslint.bat"
            commandline="${jsfile}" />
        </do>
      </foreach>
    </target>

### 3. Using AJAX within your JavaScript Unit tests

The beauty of jsLint is it is writted in JavaScript, which means that you can use the functionality within a browser. This won't work on static sites because of security issues with XmlHttpRequests, but if your tests are on a hosted site then you can load your JavaScript using AJAX and run them through jsLint. It's as simple as running the JSLINT function ([example][4], [download][3]):

	var myResult = JSLINT(source, option);

If it checks out, JSLINT returns true. Otherwise, it returns false and you can inspect JSLINT.errors to find out the problems. Details of the structure of JSLINT.errors can be found within the comments of the fulljslint.js file.

Let me know how you find jsLint as a validation tool, or please feel free to ask any questions.

 [1]: http://www.jslint.com "jsLint"
 [2]: http://www.crockford.com/ "Douglas Crockford"
 [3]: https://davetayls.me/posts/2010/jslint/jsLintExamples.zip "jsLint Article Example Source Files"
 [4]: https://davetayls.me/posts/2010/jslint/jslintajaxexample.htm "jsLint Ajax Example"
