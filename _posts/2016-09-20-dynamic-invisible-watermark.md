---
published: true
layout: post
tags: CSS SVG background-image watermark
title: Dynamic invisible watermark
date: 2016-09-20
---

* 
{:toc}

Showcasing how to create watermark base on textual content, e.g. user's ID. 

## Solution A, use SVG
 The content of ordinary image format(e.g. png, jpg, gif) can only be painted in advance, cannot be updated dynamically. But we have SVG, it can help us out:
 
> Ref: https://stackoverflow.com/a/25536764

Sample code:

<script async src="//jsfiddle.net/neotan12/0gwh4nb6/embed/html,css,result/"></script>

## Solution B, use `document.createTextNode()`


Run this pice of code in Chrome's devtools(F12 > Console tab):

```js
function watermark(settings) {

  // Default settings
  var defaultSettings = {
    txt: "Watermark",
    x: 20, // Start X
    y: 20, // Start Y
    rows: 5, // Number of row
    cols: 5, // Number of column
    x_space: 40, // Horizontal-Space between watermarks
    y_space: 40, // Vertical-Space between watermarks
    color: '#000000', // Font color
    alpha: 0.005, // Opacity
    fontsize: '80px',
    font: 'Microsoft YaHei',
    width: 350,
    height: 90,
    angle: 25
  };
  // Use Customized Settings to replace Default Settings, like jquery.extend
  if (arguments.length === 1 && typeof arguments[0] === "object") {
    var src = arguments[0] || {};
    for (key in src) {
      if (src[key] && defaultSettings[key] && src[key] === defaultSettings[key])
        continue;
      else if (src[key])
        defaultSettings[key] = src[key];
    }
  }

  var frag = document.createDocumentFragment();

  // Get max-width of page
  var page_width = Math.max(document.body.scrollWidth, document.body.clientWidth);
  // Get max-height of page
  var page_height = Math.max(document.body.scrollHeight, document.body.clientHeight);

  // If the 'cols' is 0, or exceeded page's max-width, then re-calculate 'cols' and 'x_space'
  if (defaultSettings.cols == 0 || (parseInt(defaultSettings.x + defaultSettings.width * defaultSettings.cols + defaultSettings.x_space * (defaultSettings.cols - 1)) > page_width)) {
    defaultSettings.cols = parseInt((page_width - defaultSettings.x + defaultSettings.x_space) / (defaultSettings.width + defaultSettings.x_space));
    defaultSettings.x_space = parseInt((page_width - defaultSettings.x - defaultSettings.width * defaultSettings.cols) / (defaultSettings.cols - 1));
  }

  // If the 'rows' is 0, or exceeded page's max-height, then re-calculate 'rows' and 'y_space'
  if (defaultSettings.rows == 0 || (parseInt(defaultSettings.y + defaultSettings.height * defaultSettings.rows + defaultSettings.y_space * (defaultSettings.rows - 1)) > page_height)) {
    defaultSettings.rows = parseInt((defaultSettings.y_space + page_height - defaultSettings.y) / (defaultSettings.height + defaultSettings.y_space));
    defaultSettings.y_space = parseInt(((page_height - defaultSettings.y) - defaultSettings.height * defaultSettings.rows) / (defaultSettings.rows - 1));
  }
  var x;
  var y;
  for (var i = 0; i < defaultSettings.rows; i++) {
    y = defaultSettings.y + (defaultSettings.y_space + defaultSettings.height) * i;
    for (var j = 0; j < defaultSettings.cols; j++) {
      x = defaultSettings.x + (defaultSettings.width + defaultSettings.x_space) * j;

      var watermark_div = document.createElement('watermark_div');
      watermark_div.id = 'watermark_div' + i + j;
      watermark_div.appendChild(document.createTextNode(defaultSettings.txt));

      // Optional. Set the angle
      watermark_div.style.webkitTransform = "rotate(-" + defaultSettings.angle + "deg)";
      watermark_div.style.MozTransform = "rotate(-" + defaultSettings.angle + "deg)";
      watermark_div.style.msTransform = "rotate(-" + defaultSettings.angle + "deg)";
      watermark_div.style.OTransform = "rotate(-" + defaultSettings.angle + "deg)";
      watermark_div.style.transform = "rotate(-" + defaultSettings.angle + "deg)";
      watermark_div.style.visibility = "";
      watermark_div.style.position = "absolute";

      // IMPORTANT! Make the watermark div unselectable
      watermark_div.style.left = x + 'px';
      watermark_div.style.top = y + 'px';
      watermark_div.style.overflow = "hidden";
      watermark_div.style.zIndex = "9999";
      watermark_div.style.pointerEvents = "none";

      //watermark_div.style.border="solid #eee 1px";
      watermark_div.style.opacity = defaultSettings.alpha;
      watermark_div.style.fontSize = defaultSettings.fontsize;
      watermark_div.style.color = defaultSettings.color;
      watermark_div.style.textAlign = "center";
      watermark_div.style.width = defaultSettings.width + 'px';
      watermark_div.style.height = defaultSettings.height + 'px';
      watermark_div.style.display = "block";
      frag.appendChild(watermark_div);
    };
  };
  document.body.appendChild(frag);
}
watermark({
  txt: 'Watermark!'
})

```

![Run JS in Chrome's devtools](/EXT/images/watermark-run-js.png)

Then process the screen shot in Photoshop CS, you will see the water mark is shown.
![Watermark in JS](/EXT/images/watermark-js.png)
