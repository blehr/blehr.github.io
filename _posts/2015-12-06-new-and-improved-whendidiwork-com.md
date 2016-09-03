---
id: 235
title: 'New and Improved - whendidiwork.com'
date: 2015-12-06T15:47:02+00:00
author: Brandon
layout: post
guid: http://brandonlehr.com/?p=235
permalink: /new-and-improved-whendidiwork-com/
categories:
  - Applications and Websites
  - JavaScript
  - whendidiwork
tags:
  - Angular
  - nodeJS
  - whendidiwork
featured_image: /images/whendidiwork_icon_ribbon.png
featured_image_max_width: 300px
comments: true
---
<img src="{{ site.baseurl }}{{ page.featured_image }}" alt="whendidiwork-logo" class="img-md" />

I have [written before]({% post_url 2015-05-12-whendidiwork-a-time-clock-app %}) about my time tracking app, [whendidiwork](http://whendidiwork.com/), which is especially great for third shift workers. I still use it daily for recording my work and project hours to my Google calendar and a Google sheet.


## New Release New Features

Today I am proud to announce the release of a major update. The app has been re-written with a node backend and an angular front. Along with this updated technology, comes new features. All events created with this new release can now be edited and deleted from within the app and reflected on the respective calendar and sheet! No more opening another app to make changes or fix mistakes that may have been entered.<!--more-->

This time around I&#8217;m using a sweet <a href="https://github.com/dalelotts/angular-bootstrap-datetimepicker" data-pjax="#js-repo-pjax-container">angular-bootstrap-datetimepicker</a> that allows date and time to be easily selected from the same input rather than having to use separate inputs as before. This keeps the form smaller and the selections easier!

My favorite addition has been the ability to view sheet data directly. I have to admit, that previously when I made events, I was nervous whether or not they were being updated to the sheet as well. Seeing is believing! With a click of the view sheet button, the data will &#8220;open up&#8221;, directly below. No more worrying!


[<img class="img-rounded img-border" src="{{ site.baseurl }}/uploads/2015/12/screenshot-whendidiwork-full-tiny-1024x819.png?fit=640%2C512" alt="screenshot whendidiwork" srcset="{{ site.baseurl }}/uploads/2015/12/screenshot-whendidiwork-full-tiny.png?resize=1024%2C819 1024w, {{ site.baseurl }}/uploads/2015/12/screenshot-whendidiwork-full-tiny.png?resize=300%2C240 300w, {{ site.baseurl }}/uploads/2015/12/screenshot-whendidiwork-full-tiny.png?w=1366 1366w, {{ site.baseurl }}/uploads/2015/12/screenshot-whendidiwork-full-tiny.png?w=1280 1280w" sizes="(max-width: 640px) 100vw, 640px" data-recalc-dims="1" />]({{ site.baseurl }}/uploads/2015/12/screenshot-whendidiwork-full-tiny.png)

## The New whendidiwork.com

Head on over and check it out for yourself! If you experience any problems, have any suggestion, or just want to say hi, feel free to leave a comment below.

[whendidiwork.com](http://whendidiwork.com)