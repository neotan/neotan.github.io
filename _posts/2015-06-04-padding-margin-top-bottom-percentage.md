---
published: true
layout: post
tags: css, padding-top, padding-bottom, padding-top, padding-bottom
title: Why padding/margin-top and padding/margin-bottom as a percentage related to the parent's width?
date: 2015-06-04
---

* 
{:toc}

## Scenario
When you specify vertical properties (e.g. padding/margin-top and padding/margin-bottom) to a box is container in its parent box as below:

While you are resizing the **width** of browser window, you will see the height of yellow box is changing.

```html
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <title></title>
  <style>
    .container {
      width: 100%;
      height: 400px;
      background: red;
    }

    .inner {
      background-color: yellow;
      width: 300px;
      height: 200px;
      padding-top: 10%;
    }
  </style>
</head>

<body>
  <div class="container">.container 100% * 400
    <div class="inner">.inner 300 * 200</div>
  </div>
</body>

</html>

```

You probably noticed that the inner's padding/margin-top and padding/margin-bottom as a percentage will always related to its parent's **width**, instead of parent's height, is it a bug of W3C? Actually, NO, refer the W3C spec:

* [w3.org > 8.3 Margin properties](https://www.w3.org/TR/CSS2/box.html#margin-properties)
* [w3.org > 8.4 Padding properties](https://www.w3.org/TR/CSS2/box.html#padding-properties)

>Percentages:  	refer to **width** of containing block

## Why the W3C spec is written like this? 

Unknown so far, but some points were raised by [Ryan Kinal > w3c - Why are margin/padding percentages in CSS always calculated against width? - Stack Overflow](https://stackoverflow.com/a/11004839) are interesting and seems resonable.

>Element height is defined by the height of the children. If an element has padding-top: 10% (relative to parent height), that is going to affect the height of the parent. Since the height of the child is dependent on the height of the parent, and the height of the parent is dependent on the height of the child, we'll either have inaccurate height, or an infinite loop. Sure, this only affects the case where offset parent === parent, but still. It's an odd case that is difficult to resolve.
