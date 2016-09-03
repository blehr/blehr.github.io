---
id: 573
title: Building a React Select Box Component
date: 2016-06-07T15:44:13+00:00
author: Brandon
layout: post
guid: http://brandonlehr.com/?p=573
permalink: /building-react-select-box-component/
categories:
  - JavaScript
  - Learning to Code
tags:
  - React.js
featured_image: /uploads/2016/06/react_logo-300x300.png
featured_image_max_width: 300px
comments: true
---
[<img class="img-md" src="{{ site.baseurl }}/uploads/2016/06/react_logo-300x300.png?fit=300%2C300" alt="react logo select box" srcset="{{ site.baseurl }}/uploads/2016/06/react_logo.png?resize=300%2C299 300w, {{ site.baseurl }}/uploads/2016/06/react_logo.png?resize=150%2C150 150w, {{ site.baseurl }}/uploads/2016/06/react_logo.png?w=598 598w" sizes="(max-width: 300px) 100vw, 300px" data-recalc-dims="1" />]({{ site.baseurl }}/uploads/2016/06/react_logo.png)

Maybe it&#8217;s just me, but the first time I built a select box in react, I was a little confused how it would work. When an option is selected, is it an onSelect event? How is the value entered into the state? Here is what I learned.

I was over thinking it. It turns out a select is pretty much handled the same way as any other react input. The `<select>` receives an onChange handler that can set the new state with the target value of the selected option. The code should make more sense than my words, so let&#8217;s just skip to that.

## React Select Box

<p data-height="265" data-theme-id="0" data-slug-hash="pbjNGR" data-default-tab="result" data-user="blehr" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/blehr/pen/pbjNGR/">React Select Box</a> by Brandon (<a href="http://codepen.io/blehr">@blehr</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

&nbsp;