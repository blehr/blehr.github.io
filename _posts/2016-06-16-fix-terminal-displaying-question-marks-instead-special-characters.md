---
id: 619
title: Fix Terminal Displaying ��� Instead of Special Characters
date: 2016-06-16T20:17:14+00:00
author: Brandon
layout: post
guid: http://brandonlehr.com/?p=619
permalink: /fix-terminal-displaying-question-marks-instead-special-characters/
categories:
  - Learning to Code
tags:
  - Free Code Camp
  - React.js
  - tips
featured_image: /uploads/2016/06/Screenshot-061616-200931.png
---


[<img class="aligncenter wp-image-624 size-full" src="{{ site.baseurl }}/uploads/2016/06/Screenshot-061616-200931.png?fit=640%2C413" alt="terminal broke" srcset="{{ site.baseurl }}/uploads/2016/06/Screenshot-061616-200931.png?w=819 819w, {{ site.baseurl }}/uploads/2016/06/Screenshot-061616-200931.png?resize=300%2C194 300w" sizes="(max-width: 640px) 100vw, 640px" data-recalc-dims="1" />]({{ site.baseurl }}/uploads/2016/06/Screenshot-061616-200931.png)

I&#8217;m running an xfce4 desktop on a trusty ubuntu](https://github.com/dnschneid/crouton) on an antique [Acer Chromebook](http://www.pcworld.com/article/2046477/review-acers-c710-2457-chromebook-is-a-basic-bargain-browsing-machine.html). I know, it&#8217;s about the craziest development setup ever, but I make it work. Anyway, I had a problem with the terminal displaying the odd question marks, ���, instead of the special characters that it should have. This wasn&#8217;t the end of the world, just rather annoying. So, I decided to find a fix. It turns out it was rather simple in my case. From the terminal go to edit => preferences => advanced, and at default character encoding select Unicode => UTF-8. Close out the terminal and reopen, profit!

[<img class="aligncenter size-full wp-image-623" src="{{ site.baseurl }}/uploads/2016/06/Screenshot-061616-200659.png?fit=640%2C434" alt="terminal fixed" srcset="{{ site.baseurl }}/uploads/2016/06/Screenshot-061616-200659.png?w=819 819w, {{ site.baseurl }}/uploads/2016/06/Screenshot-061616-200659.png?resize=300%2C203 300w" sizes="(max-width: 640px) 100vw, 640px" data-recalc-dims="1" />]({{ site.baseurl }}/uploads/2016/06/Screenshot-061616-200659.png)

I&#8217;m not sure if this will fix everyone&#8217;s problem, Linux can be a scary world, but it can&#8217;t hurt to try!

&nbsp;
