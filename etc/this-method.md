<h1>This의 메소드 call,apply, bind</h1>

<h2>This란?</h2>

<p>실행 컨텍스트가 block scope가 아닌 function scope로 생성되는 방식으로 함수가 실행되기도 한다. 이때 this라는 특수한 식별자가 자동으로 설정된다. this는 실행컨텍스트의 구성 요소 중 하나로 함수가 싷행되는 동안 이용할 수 있다. </p>

<b>현재의 실행 컨텍스트를 기반으로 호출자가 누구인지를 나타내는 식별자이다.</b>

<h2>this의 바인딩 패턴</h2>

<h3>기본</h3>

<p>모든 객체는 전역객체의 프로퍼티이다. 그러므로 전역 실행컨텍스트의 this, 즉 아무 함수에도 속하지 않은 범위에서 this는 전역 객체를 참조한다.  </p>

<p>func();와 window.func();는 모두 실행이 된다. 모든 전역변수와 함수는 사실 window 객체의 프로퍼티다. 객체를 명시하지 않으면 암시적으로 window의 프로퍼티로 간주된다. </p>

```javascript
var o = {'func':function(){
    console.log('Hello?');
}}
o.func();
window.o.func();

```

<p>window라는 객체를 따로 명시하지 않아도 자바스크립트에서 모든 객체는 기본적으로 전역객체의 프로퍼티임을 알 수 있다.</p>

<h3>객체의 메서드</h3>
<p>함수를 어떤 객체의 메서드로 호출하면 this의 값은 그 객체를 사용한다. 이때 함수가 정의된 방법이나 위치는 전혀 영향을 주지 않는다. 단지 어디로부터 호출되었는지가 중요할 뿐이다.</p>


```javascript
var info = {age: 23};

function euion() {
  return this.age;  // 함수에 바로 this
}

info.f = euion;

console.log(info.f()); // 23
```

```javascript
var info = {   
  age: 23,      
  f: function() {   // 객체 리터럴 사용
    return this.age;
  }
};

console.log(info.f()); // 23
```

<p>위 코드는 다른 방법으로 진행되지만 같은 결과를 도출한다.</p>

<p>다만 여기서 주의해야 할 점은 함수를 new 키워드와 함께 생성자로 사용하면 this는 새로생긴 객체에 묶인다.</p>

```javascript
function score() {
    this.score = "B+";
}

var student = new score();

console.log(student.score); // B+

function request(){
    this.score = "B+";
    return {score: "A"};
}

student = new request();
console.log(student.score);
```
<h3>.call 메서드와 .apply 메서드</h3>
<p>함수를 실행하는 방법에 function()이외에 call(), apply()라는 메서드가 있다. this의 값을 한 문맥에서 다른 문맥으로 넘기려면 이들을 사용해야 한다.call()나 apply()의 첫번째 매개변수로 객체를 제공하면 this가 그 객체에 묶인다.</p>

```javascript
  var obj = {a: 'Custom'};

  var a = 'Global';

  function whatsThis() {
    return this.a;  
  }

  whatsThis();          // 'Global'
  whatsThis.call(obj);  // 'Custom'
  whatsThis.apply(obj); // 'Custom'
```
<p>두 메서드의 첫번째 매개변수 뒤에 이어지는 인수들은 함수 호출에 사용할 매개변수이며 여기서 두 메서드의 차이를 알 수 있다.</p>

```javascript
  function add(c, d) {
    return this.a + this.b + c + d;
  }

  var o = {a: 1, b: 3};

  // 이어지는 인수들은 함수 호출에 사용할 매개변수
  add.call(o, 5, 7); // 16

  // 두 번째 매개변수는 배열,
  // 각 요소를 함수 호출에 사용
  add.apply(o, [10, 20]); // 34
```