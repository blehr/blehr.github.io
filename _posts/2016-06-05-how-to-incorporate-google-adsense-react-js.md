---
id: 543
title: How to incorporate Google AdSense with React.js
date: 2016-06-05T13:37:54+00:00
author: Brandon
layout: post
guid: http://brandonlehr.com/?p=543
permalink: /how-to-incorporate-google-adsense-react-js/
categories:
  - javascript
  - reactjs
tags:
  - React.js
featured_image: /images/image-adsense-code.png
comments: true
description: How to incorporate Google AdSense with React.js
---
I recently needed to incorporate Google AdSense ads in a react.js application I was building. If you have used AdSense before, then you are acquainted with the code that is generated. For example


<pre>&lt;script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"&gt;&lt;/script&gt;
&lt;!-- ad name --&gt;
&lt;ins class="adsbygoogle"
 style="display:block"
 data-ad-client="ca-pub-xxxxxxxxxx"
 data-ad-slot="xxxxxxxxxx"
 data-ad-format="auto"&gt;&lt;/ins&gt;
&lt;script&gt;
(adsbygoogle = window.adsbygoogle || []).push({});
&lt;/script&gt;</pre>


## So how do I use this with react?

Pasting everything directly into a component doesn&#8217;t work. So here is what I came up with.<!--more-->

Place the first script into the document <head>

<pre>ex. index.html
&lt;head&gt;
...
&lt;script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"&gt;/script&gt;
&lt;/head&gt;</pre>

The next step is to create a GoogleAd component. The biggest change is placing the contents of the last script tag into the componentDidMount lifecycle event.

<pre>(adsbygoogle = window.adsbygoogle || []).push({});</pre>

A few other changes are required for react.js, such as changing class to className, converting the inline style tag from a string to an object, and I opted to wrap the adSense code in a div, which I could pass a style object to as well. The gist below contains some code to demonstrate.

<script src="https://gist.github.com/blehr/6fd24b76554e445d95029ca9430603c2.js"></script>

This solution has worked for me, but if you experience any problems, just let me know and I&#8217;ll see if I can help.
