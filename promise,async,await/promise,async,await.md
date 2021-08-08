

<h1>promise,async와 await</h1>

<h3>call back</h3>
<p>자바스크립트 호스트 환경이 제공하는 여러합수를 시용하면 비동기(asynchronous)동작을 스케줄링 할 수 있다. 원하는 때에 동작이 시작하도록 할 수 있는 것이다.그중 스케줄링에 사용되는 대표적인 함수가 setTimeout이다.</p>

<p>src에 있는 스크립트를 읽어오는 함수 loadScript(src)를 예시로 비동기 동작 처리가 어떻게 일어나는지 살펴보자.</p>

```javascript
function loadScript(src) {
  // <script> 태그를 만들고 페이지에 태그를 추가합니다.
  // 태그가 페이지에 추가되면 src에 있는 스크립트를 로딩하고 실행합니다.
  let script = document.createElement('script');
  script.src = src;
  document.head.append(script);
}
```

<p>함수 loadScript(src)는 script src="…"를 동적으로 만들고 이를 문서에 추가하는데 이때 브라우저는 자동으로 태그에 있는 스크립트를 불러오고, 로딩이 완료되면 스크립트를 실행한다.</p>

```javascript
// 해당 경로에 위치한 스크립트를 불러오고 실행함
loadScript('/my/script.js');
// loadScript 아래의 코드는
// 스크립트 로딩이 끝날 때까지 기다리지 않는다.
// ...
```

<p>그러나 해당 코드에서 함수는 실행되지 않는다. 이는 스크립트를 읽어올 수 있는 시간을 브라우저가 충분히 확보하지 못했기 때문이다. 원하는 결과를 도출하려면 스크립트 로딩이 끝났는지 그 여부를 확인할 수 있어야 한다.</p>

```javascript
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(script);

  document.head.append(script);
}
```
<p>새롭게 불러온 스크립트에 있는 함수를 콜백 함수 안에서 호출하면 원하는 대로 외부 스크립트 안의 함수를 사용할 수 있다.</p>

<h3>Promise</h3>
<p>Promise 객체는 비동기 작업이 맞이할 미래의 완료 또는 실패와 그 결과 값을 나타낸다. 프로미스를 사용하면 비동기 메서드에서 마치 동기 메서드 처럼 값을 반환하는게 가능해진다. 이때 반환하는 것은 최종 결과가 아닌 미래의 어떤 시점의 결과이다.</p>

<p>프로미스는 다음 중 하나의 상태를 가진다.</p>
<li>대기(pending): 이행하거나 거부되지 않은 초기 상태.</li>
<li>이행(fulfilled): 연산이 성공적으로 완료됨.</li>
<li>거부(rejected): 연산이 실패함.</li>

<p>대기 중인 프로미스는 값과 함께 이행할 수도, 어떤 이유(오류)로 인해 거부될 수 있다.</p>

<p>먼저 new Promise에 전달되는 함수는 executor(실행자, 실행 함수) 라고 부른다. executor는 new Promise가 만들어질 때 자동으로 실행되는데, 결과를 최종적으로 만들어내는 제작 코드를 포함한다. 위 비유에서 '가수’가 바로 executor이다.</p>

<p>executor의 인수 resolve와 reject는 자바스크립트에서 자체 제공하는 콜백이다. 개발자는 resolve와 reject를 신경 쓰지 않고 executor 안 코드만 작성하면 된다.</p>

<li>resolve(value) — 일이 성공적으로 끝난 경우 그 결과를 나타내는 value와 함께 호출</li>
<li>reject(error) — 에러 발생 시 에러 객체를 나타내는 error와 함께 호출</li>
<p> executor는 자동으로 실행되는데 여기서 원하는 일이 처리된다. 처리가 끝나면 executor는 처리 성공 여부에 따라 resolve나 reject를 호출한다.</p>

<p>한편, new Promise 생성자가 반환하는 promise 객체는 다음과 같은 내부 프로퍼티를 갖습니다.</p>

<li>state — 처음엔 "pending"(보류)이었다 resolve가 호출되면 "fulfilled", reject가 호출되면 "rejected"로 변한다.</li>
<li>result — 처음엔 undefined이었다 resolve(value)가 호출되면 value로, reject(error)가 호출되면 error로 변한다..</li>

<pre>
프라미스는 성공 또는 실패만 한다.
executor는 resolve나 reject 중 하나를 반드시 호출해야 한다. 이때 변경된 상태는 더 이상 변하지 않는다.

처리가 끝난 프라미스에 resolve와 reject를 호출하면 무시된다.
</pre>

<h3>프로미스 체이닝(Promise chaining)</h3>
<p>스크립트를 불러오는 것과 같이 순차적으로 처리해야 하는 비동기 작업이 여러 개 있다고 가정했을때 이러한 비동기 작업을 순차적으로 처리하기 위해서는 어떤 작업이 필요한가?</p>

<p>그럴때 활용할수 있는 비동기 처리법이 프로미스 체이닝(Promise chaining)이다.</p>

```javascript
new Promise(function(resolve, reject) {

  setTimeout(() => resolve(1), 1000); // (*)

}).then(function(result) { // (**)

  alert(result); // 1
  return result * 2;

}).then(function(result) { // (***)

  alert(result); // 2
  return result * 2;

}).then(function(result) {

  alert(result); // 4
  return result * 2;

});
```

<p>프라미스 체이닝은 result가 .then 핸들러의 체인(사슬)을 통해 전달된다는 점에서 착안한 아이디어이다.</p>
<p>해당코드는 다음과 같은 순서로 실행된다.</p>
<ol>
    <li>1초 후 최초 프라미스가 이행된다.</li>
    <li>첫번째 .then 핸들러가 호출된다.</li>
    <li>2에서 반환한 값은 다음 .then 핸들러에 전달됩니다.</li>
    <li>이런 과정이 계속 이어집니다</li>
</ol>
<p>result가 핸들러 체인을 따라 전달되므로, alert 창엔 1, 2, 4가 순서대로 출력됨을 확일할 수 있다.프라미스 체이닝이 가능한 이유는 promise.then을 호출하면 프라미스가 반환되기 때문이고 반환된 프라미스엔 당연히 .then을 호출할 수 있다.</p>

<h4>프로미스 반환하기</h4>
<p>.then(handler)에 사용된 핸들러가 프라미스를 생성하거나 반환하는 경우도 있는데 이 경우 이어지는 핸들러는 프라미스가 처리될 때까지 기다리다가 처리가 완료되면 그 결과를 받는다.</p>

```javascript
new Promise(function(resolve, reject) {

  setTimeout(() => resolve(1), 1000);

}).then(function(result) {

  alert(result); // 1

  return new Promise((resolve, reject) => { // (*)
    setTimeout(() => resolve(result * 2), 1000);
  });

}).then(function(result) { // (**)

  alert(result); // 2

  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(result * 2), 1000);
  });

}).then(function(result) {

  alert(result); // 4

});
```
<p>예시에서 첫 번째 .then은 1을 출력하고 new Promise(…)를 반환((*))한니다.
1초 후 이 프라미스가 이행되고 그 결과(resolve의 인수인 result * 2)는 두 번째 .then으로 전달된다. 두 번째 핸들러((**))는 2를 출력하고 동일한 과정이 반복된다. 이를 통해  핸들러 안에서 프라미스를 반환하는 것도 비동기 작업 체이닝을 가능하다는 것을 알 수 있다.</p>

<h3>프라미스와 에러 핸들링</h3>
<p>프라미스가 거부되면 제어 흐름이 제일 가까운 rejection 핸들러로 넘어가기 마련이다. 이때 프라미스 체인을 사용하면 에러를 쉽게 처리할 수 있다.</p>

<h4>암시적 try…catch</h4>
<p>프라미스 executor와 프라미스 핸들러 코드 주위엔 보이지 않는(암시적) try..catch가 있다. 예외가 발생하면 암시적 try..catch에서 예외를 잡고 이를 reject처럼 다룬다.</p>

```javascript
new Promise((resolve, reject) => {
  throw new Error("에러 발생!");
}).catch(alert); // Error: 에러 발생!
```
<p>executor 주위의 '암시적 try..catch'는 스스로 에러를 잡고, 에러를 거부상태의 프라미스로 변경시킨다.executor 함수뿐만 아니라 핸들러에서도 발생한다. .then 핸들러 안에서 throw를 사용해 에러를 던지면, 이 자체가 거부된 프라미스를 의미하게 된다.</p>

```javascript
new Promise((resolve, reject) => {
  resolve("ok");
}).then((result) => {
  throw new Error("에러 발생!"); // 프라미스가 거부됨
}).catch(alert); // Error: 에러 발생!
```
<p>throw문이 만든 에러뿐만 아니라 모든 종류의 에러가 암시적 try..catch에서 처리된다. 만약 핸들러 위쪽에서 에러가 발생하게 된다면 .catch가 해당 에러를 잡게 된다.</p>
<b>그렇다면 체인 끝에 .catch를 추가하지 못하는 경우엔 어떻게 되는가?</b>
<p>에러가 발생하면 프라미스는 거부상태가 되고, 실행 흐름은 가장 가까운 rejection 핸들러로 넘어간다. 그런데 위 예시엔 예외를 처리해 줄 핸들러가 없어서 에러가 <b>갇혀버린다.</b> </p>
<p>브라우저 환경에선 이런 에러를 unhandledrejection 이벤트로 잡을 수 있습니다.</p>
<hr>

<h3>프라미스 API<h3>
<p>Promise 클래스에는 5가지 정적 메서드가 있다.</p>

<ol>
<li>Promise.all(promises) – 모든 프라미스가 이행될 때까지 기다렸다가 그 결괏값을 담은 배열을 반환하는데 이때 주어진 프라미스 중 하나라도 실패하면 Promise.all는 거부되고, 나머지 프라미스의 결과는 무시된다.</li>
<p>아래 Promise.all은 3초 후에 처리되고, 반환되는 프라미스의 result는 배열 [1, 2, 3]이 된다.</p>

```javascript
Promise.all([
  new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
  new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
  new Promise(resolve => setTimeout(() => resolve(3), 1000))  // 3
]).then(alert); // 프라미스 전체가 처리되면 1, 2, 3이 반환
```
<p>작업해야 할 데이터가 담긴 배열을 프라미스 배열로 매핑하고, 이 배열을 Promise.all로 감싸는 트릭은 자주 사용된다.</p>

<li>Promise.allSettled(promises) – 최근에 추가된 메서드로 모든 프라미스가 처리될 때까지 기다렸다가 그 결과(객체)를 담은 배열을 반환한다. 객체엔 다음과 같은 정보가 담긴다.</li>
<br>
<p>Promise.all</p>

```javascript
Promise.all([
  fetch('/template.html'),
  fetch('/style.css'),
  fetch('/data.json')
]).then(render); // render 메서드는 fetch 결과 전부가 있어야 제대로 동작
```

<p>Promise.all은 프라미스가 하나라도 거절되면 전체를 거절하는 방식으로 프로미스 결과가 모두 필요할때 유용하다.</p>
<p>반면, Promise.allSettled는 모든 프라미스가 처리될 때까지 기다린다. 반환되는 배열은 다음과 같은 요소를 갖는다.여러 요청 중 하나가 실패해도 다른 요청 결과는 여전히 있어야 하는 경우 Promise.allSettled를 사용할 수 있다.</p>
<ul>
    <li>status: "fulfilled(응답이 성공할 경우)" 또는 "rejected(에러가 발생할경우)"</li>
    <li>value(프라미스가 성공한 경우) 또는 reason(프라미스가 실패한 경우)</li>
<ul>
<li>Promise.race(promises) – 가장 먼저 처리된 프라미스의 결과 또는 에러를 담은 프라미스를 반환한다.</li>
<p>Promise.race는 Promise.all과 비슷하다. 다만 가장 먼저 처리되는 프라미스의 결과(혹은 에러)를 반환한다</p>

```javascript
let promise = Promise.race(iterable); //예시의 결과는 1.

```

```javascript

Promise.race([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("에러 발생!")), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).then(alert); // 1
```
<p>첫 번째 프라미스가 가장 빨리 처리상태가 되어 첫번째 프라미스의 결과가 result 값이 된다. 이런 상태가 도출되면 다른 피라미스의 결과 또는 에러는 무시된다.</p>

<li>Promise.resolve(value) – 주어진 값을 사용해 결과 값이 value인 이행 상태의 프라미스를 만든다.</li>
<li>Promise.reject(error) – 주어진 에러를 사용해 거부 상태의 프라미스를 만든다.</li>

<li>* 실무에선 다섯 메서드 중 Promise.all을 가장 많이 사용한다.</li>
</ol>

<pre>
<p>+ 프라미스화</p>
<p>콜백을 받는 함수를 프라미스를 반환하는 함수로 바꾸는 것을 '프라미스화(promisification)'라고 한다.async/await와 함께 사용하면 더 좋지만 콜백을 완전히 대체할 순 없다. 그 이유는 프로미스는 하나의 결과만 가질수 있지만 콜백은 여러번 호출할 수 있기 때문이다. 따라서 프로미스는 콜백을 단 한번 호출하는 함수에만 적용하는 것이 좋다. </p>
</pre>

<h3>async와 await</h3>
<h4>async 함수</h4>

```javascript
async function f() {
  return 1;
}
```
<p>function 앞에 async를 붙이면 해당 함수는 항상 프로미스를 반환한다. 프로미스가 아닌 값을 반환하더라도 이행 상태의 프로미스(resolved promise)로 값을 감싸 이행된 프로미스가 반환된다</p>

```javascript
async function f() {
  return 1;
}

f().then(alert); // 1
```
와 아래의 코드는 동일하다

```javascript
async function f() {
  return Promise.resolve(1);
}

f().then(alert); // 1
```
<p>async가 붙은 함수는 반드시 프로미스를 반환하고, 프로미스가 아닌 것은 프로미스로 감싸 반환하는 것을 알 수 있다.</p>

<h4>await</h4>

```javascript
// await는 async 함수 안에서만 동작한다.
let value = await promise;
```
<p>자바스크립트는 await 키워드를 만나면 프라미스가 처리(settled)될 때까지 기다립니다. 결과는 그 이후 반환된다.</p>

```javascript
async function f() {

  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("완료!"), 1000)
  });

  let result = await promise; // 프라미스가 이행될 때까지 기다림 (*)

  alert(result); // "완료!"
}

f();

```
<p>해당 코드를 통해 1초후 이행되는 프로미스를 예시로 사용하여 await가 어떻게 동작하는지 살펴볼 수 있다</p>

<p>함수 호출 및 실행 도중에 (*)로 표시한 줄에서 실행이 잠시 중단 되었다가 프라미스가 처리되면 실행이 재개된다.이때 프라미스 객체의 result 값이 변수 result에 할당되고 위 예시를 실행하면 1초 뒤에 '완료!'가 출력된다. 
<br>
await는 프라미스가 처리되길 기다리는 동안엔 엔진이 다른 일(다른 스크립트를 실행, 이벤트 처리 등)을 할 수 있기 때문에, CPU 리소스가 낭비를 막을 수 있다.</p>