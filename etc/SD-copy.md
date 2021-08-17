<h2>얕은 복사(shallow copy)</h2>

<p>얕은 복사는 참조(주소)값의 복사를 나타낸다.</p>

```javascript
const obj = {value:1}
const newObj = obj;
newObj.vaule = 2;

console.log(obj.value); // 2
console.log(obj === newObj); // true
```

<p>obj 객체를 새로운 newObj 객체에 할당하였으며 이를 참조 할당이라 부른다. 복사 후 newObj 객체의 value값을 변경하였더니 기존의 obj.value값도 같이 변경된 것을 알 수 있다. 두 객체를 비교해도 true로 나온다. 이렇게 자바스크립트의 참조 타입은 <b>얕은 복사</b>가 된다고 볼 수 있으며, 이는 <b>데이터가 그대로 생성되는 것이 아닌 해당 데이터의 참조 값(메모리 주소)를 전달하여 결국 한 데이터를 공유하는 것</b>이다.</p>

<h2>깊은복사(deep copy)</h2>
<p>깊은 복사는 값 자체의 복사를 나타낸다.</p>

```javascript
let a = 1;
let b = a;

b = 2;

console.log(a); // 1
console.log(b); // 2
console.log(a === b); // false
```

<p>변수 a를 새로운 b에 할당하였고 b 값을 변경하여도 기존의 a의 값은 변경되지 않는다. 두 값을 비교하면 false가 출력되며 서로의 값은 단독으로 존재하다는 것을 알 수 있다. 이렇게 자바스크립트의 원시 타입은 <b>깊은 복사</b>가 되며, 이는 <b>독립적인 메모리에 값 자체를 할당하여 생성하는 것</b>이라 볼 수 있다.</p>

<h3>객체의 깊은 복사</h3>
<p>객체를 그대로 복사하여 사용할 경우 기존 객체의 원본 데이터가 더럽혀 질 수 있기 때문에 객체의 깊은 복사는 매우 중요하다. 객체를 깊이 복사하는 방법에 대해 몇가지 알아보자.</p>

<h4>object assign</h4>
<p>Object.assign() 메소드를 활용하는 방법이다</p>
<pre>
<b>문법</b>
Object.assign(생성할 객체, 복사할 객체) 메서드의 첫번째 인수로 빈 객체를 넣어주며, 두번째 인수로 할당할 객체를 넣으면 된다.
</pre>

```javascript
const obj = { a: 1 };
const newObj = Object.assign({}, obj);

newObj.a = 2;

console.log(obj); // { a: 1 }
console.log(obj === newObj); // false
```

<p>새로운 newObj 객체를 Object.assign() 메소드를 사용하여 생성하였으며, newObj.a 값을 변경하여도 기존의 obj는 변하지 않았다. 서로의 객체를 비교해도 false로 뜨며 서로 참조값이 다르다는 것을 알 수 있다.</p>

<p>그러나 <b>Object.assign()는 2차원 객체는 깊은 복사가이루어지지 않는다</b>Object.assign()를 활용한 복사는 완벽한 깊은 복사가 아니다. </p>

<p>위처럼 obj 객체의 b 프로퍼티의 값으로 { c: 2 } 객체를 가진 2차원 객체일 경우는 경우를 살펴보도록 하자</p>

```javascript
const obj = {
  a: 1,
  b: {
    c: 2,
  },
};

const newObj = Object.assign({}, obj);

newObj.b.c = 3;

console.log(obj); // { a: 1, b: { c: 3 } }
console.log(obj.b.c === newObj.b.c); // true
```

<p>2차원 객체를 newObj에 복사하고, newObj.b.c의 값을 변경하였다. 기존 obj 객체를 출력해보면 newObj.b.c의 값도 3으로 변경되었다. 복사된 하위 객체 { c: 2 }도 결국 객체이기 때문에 얕은 복사가 이루어진 것이다. 이는 Object.assign() 메서드의 한계이다.</p> 

<h4>전개 연산자(Spread Operator)</h4>

```javascript
const obj = { a: 1 };
const newObj = Object.assign({}, obj);

newObj.a = 2;

console.log(obj); // { a: 1 }
console.log(obj === newObj); // false
```

<p>전개 연산자를 활용해도 객체의 깊은 복사가 가능하다.</p>

```javascript
const obj = {
  a: 1,
  b: {
    c: 2,
  },
};

const newObj = { ...obj };

newObj.b.c = 3;

console.log(obj); // { a: 1, b: { c: 3 } }
console.log(obj.b.c === newObj.b.c); // true
```
<p>하지만 Object.assign()와 마찬가지로 2차원 객체는 얕은 복사가 되는 것을 확인할 수 있다.</p>

<h4>JSON 객체 메소드를 이용</h4>

<p>객체의 깊은 복사를 위해 JSON 객체의 stringify(), parse() 메소드를 사용할 수 있다.</p>

<pre>
<b>문법</b>
JSON.stringify() 메소드는 인수로 객체를 받으며 받은 객체는 문자열로 치환되며, JSON.parse() 메소드는 문자열을 인수로 받으며, 받은 문자열을 객체로 치환한다.
</pre>

```javascript
const obj = {
  a: 1,
  b: {
    c: 2,
  },
};

const newObj = JSON.parse(JSON.stringify(obj));

newObj.b.c = 3;

console.log(obj); // { a: 1, b: { c: 2 } }
console.log(obj.b.c === newObj.b.c); // false
```
<p>obj 객체를 JSON.stringify() 메소드를 이용하여 문자열로 변환한 뒤 다시 JSON.parse() 메소드로 객체로 변환하였다. 문자열로 변환한 뒤 다시 객체로 변환하였기에 2차원 객체에 대한 참조가 사라졌다. </p>

<p>하지만 이 방법도 2가지 문제가 있는데, 다른 방법에 비해 성능이 느린 점과 JSON.stringify() 메소드는 함수를 만났을 때 undefined로 처리한다는 점이다.</p>

```javascript
const obj = {
  a: 1,
  b: {
    c: 2,
  },
  func: function() {
      return this.a;
  }
};

const newObj = JSON.parse(JSON.stringify(obj));

console.log(newObj.func); // undefined
```

<p>복사된 newObj는 func가 없고 undefined로 출력되고 있다.</p>

<h4>커스텀 재귀 함수</h4>
<p>이 문제를 원칙적으로 해결하려면 직접 깊은 복사를 구현하는 커스텀 재귀 함수를 사용하는 것이다.</p>

```javascript
function deepCopy(obj) {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  let copy = {};
  for (let key in obj) {
    copy[key] = deepCopy(obj[key]);
  }
  return copy;
}

const obj = {
  a: 1,
  b: {
    c: 2,
  },
  func: function () {
    return this.a;
  },
};

const newObj = deepCopy(obj);

newObj.b.c = 3;
console.log(obj); // { a: 1, b: { c: 2 }, func: [Function: func] }
console.log(obj.b.c === newObj.b.c); // false
```

<p>deepCopy 함수의 인수로 obj 객체를 넣었다. 인수값이 객체가 아닌 경우는 그냥 반환하며, 객체인 경우 객체의 값 만큼 루프를 돌며 재귀를 호출하여 복사된 값을 반환한다. 복사된 newObj 객체를 보면 2차원 객체의 값도 깊은 복사가 이루어 졌으며, 객체의 함수도 제대로 표현되는 것을 확인할 수 있다.
</p>
<p>하지만 이미 객체의 깊은 복사를 위한 오픈 소스가 존재하며 lodash 모듈의 cloneDeep()을 이용하면 된다.</p>

<h4>lodash 모듈의 cloneDeep()</h4>
<p>lodash 모듈의 cloneDeep() 메소드를 이용하여 객체의 깊은 복사가 가능하다.</p>

<p>& npm i lodash</p>

<p>위 모듈을 설치한 뒤 아래 코드를 실행할 수 있다.</p>

```javascript
const lodash = require("lodash");

const obj = {
  a: 1,
  b: {
    c: 2,
  },
  func: function () {
    return this.a;
  },
};

const newObj = lodash.cloneDeep(obj);

newObj.b.c = 3;
console.log(obj); // { a: 1, b: { c: 2 }, func: [Function: func] }
console.log(obj.b.c === newObj.b.c); // false
```

<p>간단히 객체의 깊은 복사를 구현할 수 있다. 실제로 웹 개발을 하다보면 lodash 모듈은 흔히 사용되며, 가장 손쉽게 객체의 깊은 복사를 해결하는 방법이라 할 수 있다.</p>