---
layout: post
title: Coroutine implementation with generator
published: true
---

<p class="codepen" data-height="708" data-theme-id="light" data-default-tab="css,result" data-user="neotan" data-slug-hash="JjyeWBe" data-preview="true" style="height: 708px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="flex-shrink calculation">
  <span>See the Pen <a href="https://codepen.io/neotan/pen/JjyeWBe">
  flex-shrink calculation</a> by Neo Tan (<a href="https://codepen.io/neotan">@neotan</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

```js
var url = "https://jsonplaceholder.typicode.com/todos/1";

function promiseExec(promise, iterator) {
  if (promise?.then) {
    promise.then((x) => {
      const { value: anotherPromise } = iterator.next(x);
      promiseExec(anotherPromise, iterator);
    });
  }
}

function co(generator) {
  var iterator = generator();
  var { value: promise } = iterator.next();
  promiseExec(promise, iterator);
}

co(function* () {
  const res = yield fetch(url);
  const json = yield res.json();
  console.log({ json });
  document.querySelector("#app").innerHTML = JSON.stringify(json, null, 2);
});

```
