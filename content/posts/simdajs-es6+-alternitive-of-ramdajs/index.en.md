---
title: "Simda.js, A light-weight alternative of Ramda.js"
date: 2020-02-09
draft: false
resources:
- name: "featured-image"
  src: "featured-image.png"

tags: ["javascript", "es6+", "utils", "ramda", "simda"]
categories: ["projects"]
---

# [Simda.js](https://www.npmjs.com/package/simda)

A light-weight alternative (in ES6+) of [Ramda.js](https://ramdajs.com/)

### Installation

```shell
npm i simda
```

### Usage

```js
import * as S from 'simda'

const newObj = S.assocPath(['a', 1, 'c'], 999)({a: [{b: 111}]})
console.log(newObj) // => {a:[{b:111},{c:999}]}
```
