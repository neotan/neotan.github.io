---
published: true
layout: post
tags: CSS position relative overlap div
title: How to prevent overlap by customized content(e.g. div and img)?
date: 2015-06-04
---

* 
{:toc}

## Scenario
Imagine that 
 1. Your e-shop website allows users to publish their products(i.e. text, img) by themselves, even input some CSS to decorate the content.
 2. The published product will be show in a individual detail page with a rating (e.g. stars) on the top of the page.
 3. A foxy and technical users want to overlap the rating div with 5 stars by writting a pice of CSS.

like this:
<script async src="//jsfiddle.net/neotan12/2Lonqx2L/6/embed/html,css,result/"></script>

## Solutions
How to disable the cheating? We do have some options:

### 1. Add a max z-index value to true-ratting div?

Nope! 

The [normal-flow](https://www.w3.org/TR/CSS2/visuren.html#normal-flow) will still put the `content`(and its `fake-ratting` div) div on top of `header` (and its child `true-rating` div):

<script async src="//jsfiddle.net/neotan12/wyoxxfb4/1/embed/html,css,result/"></script>

Btw the max z-index values of popular browser were indicated by [Behnam Mohammadi & Gust van de Wal - Stackoverflow](https://stackoverflow.com/a/25461690) FYR:

| **Browser** | **Max z─index value** | **When exceeded, value changes to: **|
|:----------|:------|:------|
| Firefox 0 - 2 | 2147483647 | element disappears |
| Firefox 3 | 2147483647 | 0 |
| Firefox 4+ | 2147483647 | 2147483647 |
| Safari 0 - 3 | 16777271 | 16777271 |
| Safari 4+ | 2147483647 | 2147483647 |
| Internet Explorer 6+ | 2147483647 | 2147483647 |
| Chrome 29+ | 2147483647 | 2147483647 |
| Opera 9+ | 2147483647 | 2147483647 |


### 2. Separate `header` and `content` div into 2 `iFrame`
Yes, it will work well, because they were isolated with 2 different html files. But
[The iFrame Is Evil! - RWBlackburn LLC](http://www.rwblackburn.com/iframe-evil/), so it just a way, not good one.

### 3. Add z-index values to relative div

WHAT!!?? You may have been confused. Yes, trust me `z-index` is the good way, let's check it out:

1. Wrap `header` and `content` div with  `header-wrapper` and `content-wrapper`, and set them `position: relative`. **These 2 wrapper should be the part of your page template, i.e. don't allow uses to change them**.
2. Give the `header-wrapper` div a big  `z-index` (e.g. 1000) and `content-wrapper` dive a small `z-index` (e.g. 1) .

That's it, every thing work well and don't have to touch any users customized content, and users cannot hack the `true-rating` now.

<script async src="//jsfiddle.net/neotan12/oe3pezcw/7/embed/html,css,result/"></script>
