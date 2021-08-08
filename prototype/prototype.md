<h1>프로토타입</h1>
<p> 프로토타입 상속(prototypal inheritance)을 이용하면 기존 객체에 약간의 기능을 얹어 새로운 객체를 만들 수 있다.</p>
<p>[[Prototype]] 프로퍼티는 내부 프로퍼티이면서 숨김 프로퍼티이지만 다양한 방법을 사용해 개발자가 값을 설정할 수 있다.
<br>
아래 예시처럼 특별한 이름인 __proto__을 사용하면 값을 설정할 수 있다. 여기서 __proto__는 [[Prototype]]용 getter·setter이다.
</p>

```javascript
let animal = {
  eats: true
};
let rabbit = {
  jumps: true
};

rabbit.__proto__ = animal; // animal이 rabbit의 프로토타입이 되어 rabbit에서 얻고자 하는 프로퍼티가 없을 경우 자동으로 animal 객체에서 프로퍼티를 얻을 수 있다,

// 프로퍼티 eats과 jumps를 rabbit에서도 사용할 수 있게 되었다.
alert( rabbit.eats ); // true (**)
alert( rabbit.jumps ); // true
```

<p> animal이 rabbit의 프로토타입이 되어 rabbit에서 얻고자 하는 프로퍼티가 없을 경우 자동으로 animal 객체에서 프로퍼티를 얻을 수 있다.</p>
<p>(**)로 표시한 줄에서 alert 함수가 rabbit.eats 프로퍼티를 읽으려 했는데, rabbit엔 eats라는 프로퍼티가 없다. 이때 자바스크립트는 [[Prototype]]이 참조하고 있는 객체인 animal에서 eats를 얻어낸다.</p>

<p>animal에 정의된 메서드를 rabbit에서 호출할 수도 있다.</p>

```javascript
let animal = {
  eats: true,
  walk() {
    alert("동물이 걷습니다.");
  }
};

let rabbit = {
  jumps: true,
  __proto__: animal
};

// 메서드 walk는 rabbit의 프로토타입인 animal에서 상속받았다.
rabbit.walk(); // 동물이 걷는다.

``` 

<p>animal에서 walk를 자동으로 상속받았기 때문에 rabbit에서도 walk를 호출할수 있게 되었다.</p>

<h4>프로토타입 체인</h4>

```javascript
let animal = {
  eats: true,
  walk() {
    alert("동물이 걷습니다.");
  }
};

let rabbit = {
  jumps: true,
  __proto__: animal
};

let longEar = {
  earLength: 10,
  __proto__: rabbit
};

// 메서드 walk는 프로토타입 체인을 통해 상속받았습니다.
longEar.walk(); // 동물이 걷습니다.
alert(longEar.jumps); // true (rabbit에서 상속받음)
```

<p>longEar --prototype--> rabbit --prototype--> animal</p>

<p>프로토타입 체이닝 제약사항</p>

<pre>

<li>순환 참조(circular reference)는 허용되지 않는다. __proto__를 이용해 닫힌 형태로 다른 객체를 참조하면 에러가 발생한다.</li>
<li>__proto__의 값은 객체나 null만 가능하다. 다른 자료형은 무시된다.</li>
<li>객체엔 오직 하나의 [[Portotype]]만 있을 수 있다는 당연한 제약도 있다. 객체는 두 개의 객체를 상속받지 못한다.</li>

</pre>

<p>프로토타입은 <b>프로퍼티를 읽을 때만 사용</b>한다.프로퍼티를 추가, 수정, 지우는 연산은 객체에 직접 해야 한다.<p>

<h3>This와 프로토타입<h3>
<p>this는 프로토타입에 영향을 받지 않는다. </p>
<b>메서드를 객체에서 호출했든 프로토타입에서 호출했든 상관없이 this는 언제나 . 앞에 있는 객체가 된다.</b>
<p>admin.fullName=으로 호출된 setter 함수를 호풀할때 this는 user가 아닌 admin이 된다.</p>

```javascript

let animal = {
  walk() {
    if (!this.isSleeping) {
      alert(`동물이 걸어갑니다.`);
    }
  },
  sleep() {
    this.isSleeping = true;
  }
};

let rabbit = {
  name: "하얀 토끼",
  __proto__: animal
};

// rabbit의 프로퍼티 isSleeping을 true로 변경.
rabbit.sleep();

alert(rabbit.isSleeping); // true
alert(animal.isSleeping); // undefined (프로토타입에는 isSleeping이라는 프로퍼티가 없다.)
```

<p>‘메서드 저장소’ 역할을 하는 객체 animal을 rabbit이 상속받게 할 경우 rabbit.sleep()을 호출하면 this.isSleeping이 객체 rabbit에 설정된다.</p>
<p>상속 받은 메서드의 this는 animal이 아닌 실제 메서드가 호출되는 시점의 점(.) 앞에 있는 객체가 된다. 따라서 this에 데이터를 쓰면 animal이 아닌 해당 객체의 상태가 변화한다. </p>         
<b>즉. 메서드는 공유되지만, 객체의 상태는 공유되지 않는다.</b>
<p> + for..in 은 상속 프로퍼티도 순회대상에 포함시킨다.</p>

<h3>함수의 prototype 프로퍼티</h3>
<p>new f()같은 생성자 함수를 이용하면 새로운 객체를 만들수 있다. F.prototype이 객체일 경우 new  연산자는 F.prototype을 사용해 새롭게 생성된 객체의 [[prototype]]을 설정한다. 이때 주의할 점은 F.prototype에서 "prototype"은 F에 정의된 일반 프로퍼티라는 점이다. F.prototype에서 "prototype"은 이름만 같은 일반 프로퍼티이다.</p>

```javascript
let animal = {
  eats: true
};

function Rabbit(name) {
  this.name = name;
}

Rabbit.prototype = animal;

let rabbit = new Rabbit("White Rabbit"); //  rabbit.__proto__ == animal

alert( rabbit.eats ); // true
```
<p>Rabbit.prototype = animal은 "new Rabbit을 호출해 만든 새로운 객체의 [[Prototype]]을 animal로 설정하라."라는 것을 의미한다.</p>

<b>F.prototype은 new F를 호출할 때만 사용</b>
<p>모든 함수는 기본적으로 F.prototype = { constructor : F }를 가지고 있으므로 함수의 "constructor" 프로퍼티를 사용하면 객체의 생성자를 얻을 수 있다</p>

<hr>
<h4>함수의 prototype 프로퍼티와 constructor 프로퍼티</h4>
<p>개발자가 특별히 할당하지 하지 않더라도 모든 함수는 "prototype"프로퍼티를 갖는다. 기본 프로퍼티인 "prototype"은 constructor 프로퍼티 하나만 있는 객체를 가리키는데, 이 constructor 프로퍼티는 함수 자신을 가리킨다.</p>

<p>특별한 조작을 가하지 않았다면 Rabbit을 구현한 객체 모두에서 [[Prototype]]을 거쳐 constructor 프로퍼티를 사용할 수 있다</p>

```javascript
function Rabbit() {}

/* 기본 prototype
Rabbit.prototype = { constructor: Rabbit };
*/
let rabbit = new Rabbit(); // {constructor: Rabbit}을 상속받음

alert(rabbit.constructor == Rabbit); // true (프로토타입을 거쳐 접근함)
```

<p>constructor 프로퍼티를 사용하면 기존에 있던 객체의 constructor를 사용해 새로운 객체를 만들 수 있습니다.
</p>

```javascript
function Rabbit(name) {
  this.name = name;
  alert(name);
}

let rabbit = new Rabbit("White Rabbit");

let rabbit2 = new rabbit.constructor("Black Rabbit");
```

<p><b>자바스크립트는 알맞은 "constructor" 값을 보장하지 않는다.</b> 그렇기에 함수의 기본 "prototype" 값을 다른 객체로 바꾸면 이 객체엔 "constructor"가 없게 된다. 이런 상황을 방지하고 알맞은 constructor를 유지하려면 "prototype" 전체를 덮어쓰지 말고 기본 "prototype"에 원하는 프로퍼티를 추가/제거해야 한다.</p>

```javascript
function Rabbit() {}

// Rabbit.prototype 전체를 덮어쓰지 말고
// 원하는 프로퍼티는 그냥 추가한다.
Rabbit.prototype.jumps = true
// 기본 Rabbit.prototype.constructor가 유지됨.
```

<h3>프로토타입 메서드와 __proto__</h3>
<p>__proto__는 브라우저를 대상으로 개발하고 있다면 다소 구식이기 때문에 더는 사용하지 않는 것이 좋다. 표준에도 관련 내용이 명시되어있다.</p>

<p>때문에 __proto__ 대신 이 메서드들을 사용하는것이 좋다.</p>
<li>Object.create(proto, [descriptors]) – [[Prototype]]이 proto를 참조하는 빈 객체를 만든다. 이때 프로퍼티 설명자를 추가로 넘길 수 있다.
</li>
<li>Object.getPrototypeOf(obj) – obj의 [[Prototype]]을 반환한다.
</li>
<li>Object.setPrototypeOf(obj, proto) – obj의 [[Prototype]]이 proto가 되도록 설정한다.</li>