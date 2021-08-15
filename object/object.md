<h1>객체</h1>

<h3>객체</h3>
<p> : 특수한 기능을 가진 연관 배열(associative array)</p>
<p>① 자바스크립트에는 8가지 자료형이 있음</p>
<p>- 원시형 : 오직 하나의 데이터만 담을 수 있음</p>
<p>- 객체형 : 다양한 데이터를 담을 수 있음 --> key로 구분된 Data집합 or 복잡한 개체(entity)</p>
<br>
<p>② 객체는 {}를 이용하여 만든다.</p>
<p>③ 중괄호 안에는 키(key, 문자형):값(value, 자료형)쌍으로 구성된 프로퍼티(Property)를 저장 가능 </p>

```javascript
let user = new object() //'객체 생성자' 문법
let user = {} //'객체 리터럴' 문법

```

<p>*중괄호를 이용해 객체를 선언하는 것을 객체 리터럴 이라고 부른다.</p>

<br>
<h3>리터럴과 프로퍼티</h3>
<p>1. 콜론(:)을 기준으로 왼쪽엔 키, 오른쪽엔 값 위치</p>

```  javascript
let user = {     // 객체
  name: "euion",  // 키: "name",  값: "euion"
  age: 30        // 키: "age", 값: 30
};
```

<p>서랍장 안에 파일 2개가 담겨있고 각 파일에 name, age 라는 이름표가 붙어있을때 서랍장에 파일을 추가하고 뺄 수 있듯이 개발자는 프로퍼티를 추가, 삭제 할 수 있다.</p>

<h4>상수 객체는 수정될 수 있다.</h4>

```javascript
const user = {
  name: "LIM"
};

user.name = "euion"; // (*)

alert(user.name); // euion
```

<h3>대괄호 표기법</h3>
<p> 객체를 만들 때 객체 리터럴 안의 키가 대괄호로 둘러쌓여져 있는 경우 computed property라고 부른다.</p>

```javascript
let phone = prompt("당신이 원하는 폰 기종은 무엇인가요?", "buy");

let euion = {
  [phone]: "galaxy", // 변수 phone에서 프로퍼티 이름을 동적으로 받아온다.
}
alert(euion.buy); //phone에 "apple"이 할당되었다면 galaxy가 출력된다.
```

<p> 해당 코드 중 `[phone]`은 프로퍼티 이름을 변수 phone에서 가져오겠다는 것을 의미한다. 이때 phone에는 galaxy가 할당되었므로 phone을 입력한다면 galaxy가 출력된다.</p>

```javascript
let phone = 'galaxy';
let euion = {
  [phone + 'Company']: "samsung" // euion.galaxyCompany = "samsung"
};
```
<p>`+` 기호를 활용하여 좀 더 복잡하게 활용할 수도 있다.</p>
<h3>for ...in 반복문</h3>

```javascript
for (key in object) {
  // 각 프로퍼티 키(key)를 이용하여 본문(body)을 실행.
}

let user = {
  name: "euion",
  age: 23,
  isAdmin: true
};

for (let key in user) {
  // 키
  alert( key );  // name, age, isAdmin
  // 키에 해당하는 값
  alert( user[key] ); // euion, 23, true
}

```

<p> `for(;;)`문과 `for .. in`은 반복변수(looping variable)를 선언하여 표현하였다. </p>

<h4>프로퍼티에 순서가 있을까></h4>
<p>정수프로퍼티는 자동으로 정렬되고 그 외 프로퍼티는 객체에 추가한 순서 그대로 정렬된다.</p>



<h3>참조에 의한 객체 복사</h3>
<p>원시값(문자열, 숫자, 불린 값)이 값 그 자체로 저장, 할당, 복사 되는 반면에 객체 타입은 참조에 의해 저장되고 복사된다.</p>

<p> 아래의 값의 경우 각각 독립된 변수에 문자열 "Hello"가 저장된다.</p>


```javascript
let message = "Hello!";
let phrase = message;
```

<p> 이때 <b>변수엔 객체가 그대로 저장되는 것이 아니라, 객체가 저장되어있는 '메모리 주소’인 객체에 대한 '참조 값’이 저장</b>되는것. 즉 <b>객체의 참조값이 복사되고 객체는 복사되지 않는다.</b></p>

<h4>객체 복사, 병합, Object.assign</h4>
<p>복제가 필요한 상황일 경우 새로운 객체를 만든 다음 기존 객체의 프로퍼티들을 순회해 원시 수준까지 프로퍼티를 복사</p>

```javascript
//객체 복사, 병합 예제
let user = {
    name: "euion",
    age: 23
  };
  
  let clone = {}; // 새로운 빈 객체
  
  // 빈 객체에 user 프로퍼티 전부를 복사해 넣음
  for (let key in user) {
    clone[key] = user[key];
  }
  
  // 이제 clone은 완전히 독립적인 복제본이 되었다.
  clone.name = "minsu"; // clone의 데이터를 변경
  
  alert( user.name ); // 기존 객체에는 여전히 euion이 있다.

``` 
<b>단점 : 원시값일 경우만 가정하게 됨</b>


```javascript
  //중첩 객체 복사
  let user = {
    name: "euion",
    sizes: {
      height: 182,
      width: 50
    }
  };
  
  let clone = Object.assign({}, user);
  
  alert( user.sizes === clone.sizes ); // true, 같은 객체.
  
  // user와 clone는 sizes를 공유.
  user.sizes.width++;       // 한 객체에서 프로퍼티를 변경.
  alert(clone.sizes.width); // 51, 다른 객체에서 변경 사항을 확인 가능.
```

<p>clone.sizes = user.sizes로 프로퍼티를 복사하는 것만으론 객체를 복제할 수 없다. user.sizes는 객체이기 때문에 참조 값이 복사되기 때문이다. clone.sizes = user.sizes로 프로퍼티를 복사하면 clone과 user는 같은 sizes를 공유하게 된다.</p>
<br>
<p>
이 문제를 해결하려면 user[key]의 각 값을 검사하면서, 반복문을 사용해 주어야 하는데 이때 반복문의 역할은 그 값이 객체인 경우 객체의 구조도 복사해주어야 한다. 이런 방식을 '깊은 복사(deep cloning)'라고 합니다.
</p>

<p>얕은 복사(shallow copy) 를 가능하게 해주는 것은 Object.assign</p>

<h3>가비지 컬렉션</h3>
<p>가비지 컬렉터(garbage collector)가 끊임없이 동작. 모든 객체를 모니터링하고 도달할 수 없는 객체는 삭제. 여기서 도달할 수 없는 객체는 접근하거나 사용할 수 없는 경우를 의미한다.</p>


<h4>가비지 컬렉션 참조 방식</h4>
<p>다음의 경우 모두 메모리에서 삭제된다.</p>
<li>간단한 경우<li>

```javascript
// user엔 객체 참조 값이 저장됩니다.
let user = {
  name: "euion"
};
user = null; 
```
<li>참조 2개</li>

``` javascript
let star = {
  name: "ariana"
};

let award = star;
star = null;
```
<li>연결된 객체</li>

``` javascript
function marry(man, woman) {
  woman.husband = man;
  man.wife = woman;

  return {
    father: man,
    mother: woman
  }
}

let family = marry({
  name: "Bieber"
}, {
  name: "Hailey"
});

delete family.father;
delete family.mother.husband;
```

<ul>
<li>가비지 컬랙션은 엔진에 의해 자동으로 수행된다.</li>
<li>객체는 도달 가능한 상태일때 메모리에 남는다.</li>
<li>참조된다고 해서 도달 가능한 것은 아님</li>
</ul>

<h3>메서드와 this</h3>
<p><b>메서드(method)</b>객체 프로퍼티에 할당한 함수</p>
<p>메서드 내부에서 This 키워드를 사용하면 객체에 접근 가능. 이때 점 앞에 위치한 this는 메서드를 호출할때 사용된 객체를 말함 해당 코드에서는 this.name  </p>

``` javascript
let user = {
  name: "euion",
  age: 23,

  sayHi() {
    alert( this.name ); 
  }

};

user.sayHi() // euion

```
<p>user.sayHi()가 실행되는 동안에 this는 user를 나타냄. 그렇기에 해당 코드에서 this를 사용하지 않고 외부 변수를 이용해 객체에 접근 하는 것도 가능.</p>

```javascript
let user = {
  name: "John",
  age: 30,

  sayHi() {
    alert(user.name); // 'this' 대신 'user'를 이용함
  }

};
```
<p>(PLUS) Execution Context<p>
<p><b>실행 가능한 자바스크립트 코드 블록이 실행되는 환경</b>으로 코드가 잘 작동할 수 있도록 변수와 함수가 가진 값을 알고 이에 대한 환경을 구성하는 것을 말함.</p>

<h3>EC의 3가지 종류</h3>
<ol>
  <li>Global Execution Context (전역 실행 컨텍스트)</li>
  <li>Functional Execution Context (함수 실행 컨텍스트)</li>
  <li>Eval Function Execution Context (eval 실행 컨텍스트)</li>
</ol>

<h4>Global Execution Context (전역 실행 컨텍스트)</h4>
<pre>
  가장 먼저 콜스택에 올라가는 EC이다. 전역 EC는 일반적인 다른 EC들과 달리 arguments 객체가 없으며, 전역 객체 하나만을 포함하는 스코프 체인과 this 가 있다.

  그리고 전역 EC는 `<script />` 태그를 마주치면, 생성된다.
</pre>

<h4>Functional Execution Context (함수 실행 컨텍스트)</h4>
<p>함수가 호출될 때마다 생성되는 EC로 arguments 와 스코프 체인, this 가 있다.</p>

<h4>Eval Function Execution Context (Eval 실행 컨텍스트)</h4>
<p>eval() 함수를 실행해서 만들어진 EC를 말한다.</p>

<p>만약 여기서 user를 복사하여 다른 변수에 할당하고 user 는 전혀 다른 값으로 덮어썼을 경우??</p>
<p>sayHi()는 원치 않는 값(null)을 참조하게 됨.</p>
<p>null과 같은 원치 않는 값을 참조하는 것을 방지하기 위해 this로 바꿔주어야 한다.</p>

``` javascript
let user = {
  name: "euion",
  age: 23,

  sayHi() {
    alert( this.name ); //this 키워드를 사용하여 user 객체에 접근 but, user 그 자체는 아님!
  }

};

user.sayHi() // euion

let admin = user;
user = null; 

admin.sayHi(); //user = null로 인한 오류 발생 방지됨.

```
<h4>this가 없는 allow function</h4>
<b>allow function</b>

<li><p> function 키워드 대신 화살표(=>)를 사용하여 보다 간략한 방법으로 함수를 선언가능</p></li>
<li>익명 함수로만 사용할 수 있다. 따라서 화살표 함수를 호출하기 위해서는 함수 표현식을 사용한다.</li>

```javascript

var pow = function (x) { return x * x; };
console.log(pow(10)); // 100
```

```javascript
const pow = x => x * x;
console.log(pow(10)); // 100
```

<p>allow function은 동적으로 바인딩할 객체가 결정되는 일반함수와 달리 this에 바인딩할 객체가 정적으로 결정된다. es6에서 this는 언제나 자신을 둘러싼 환경의 this를 그대로 계승 받는다. </p>

```javascript
function star() { 
  console.log('Inside `house`:', this.foo); //13 
  return { 
    foo: 25, 
    bar: () => console.log('Inside `bar`:', this.foo) // 13 
    }; 
  } 
  
  objFunction.call({foo: 13}).bar();


```
<p>위 코드의 경우 this.foo는 25가 되어야 하지만 allow function은 call 메소드를 통한 간접실행이 일어날때의 this <u>문맥을 그대로 계승하기 때문에</u> 결과는 25가 아닌 <b>13</b>이 출력된다.</p>

<h3>생성자 함수</h3>
<li><p>유사한 객체를 여러개 만들어야 할 경우 사용</p></li>
<li>`new` 연산자와 생성자 함수를 사용하면 유사한 객체 여러개 생성 가능</li>
<li> 
함수는 아래 두 관례를 따릅니다.

<li>함수 이름의 첫 글자는 대문자로 시작</li>
<li>반드시 'new' 연산자를 붙여 실행합니다.</li>
</li>

```javascript
function Star(name) {
  this.name = name;
  this.isStar = false;
}
let star = new Star("아이유");
alert(star.name); // 아이유
alert(star.isStar); // false

```
<p>new User(...)를 써서 함수를 실행하면 아래와 같은 알고리즘이 동작</p>

<ol>
<li>빈 객체를 만들어 this에 할당.</li>
<li>함수 본문을 실행합니다. this에 새로운 프로퍼티를 추가해 this를 수정.</li>
<li>this를 반환.</li>
</ol>

<p>이는 아래 코드를 입력한 것과 동일하게 동작한다</p>

```javascript
let star = {
  name: "아이유",
  isAdmin: false
};
```

<h3>옵셔널 체이닝(optional chaining)</h3>

<li><p>자바스크립트를 사용해 존재하지 않는 요소에 접근해 요소의 정보를 가저오려 할 경우 에러 발생</p></li>
<li><p>이런 문제들을 해결하기 위해 사용했던 `&&` 연산자 대신 `?.` 연산자가 추가됨</p></li>
<li>`?.` '앞’의 평가 대상이 `undefined`나 `null` 이면 평가를 멈추고 `undefined` 를 반환</li>

```javascript
let user = {}; // 주소 정보가 없는 사용자

alert( user?.address?.street ); // undefined, 에러가 발생하지 않는다.
```
<p>user?.address로 주소를 읽으면 아래와 같이 user 객체가 존재하지 않더라도 에러가 발생하지 않는다.</p>


```javascript
let user = null;

alert( user?.address ); // undefined
alert( user?.address.street ); // undefined
```
<p>위 예시를 통해 우리는 `?.` 은 `?.` ‘앞’ 평가 대상에만 동작되고, 확장은 되지 않는다는 사실을 알 수 있다.</p>
