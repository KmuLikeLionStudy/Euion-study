<h1>클래스(class)</h1>
<p>클래스란 자바스크립트에서 함수의 한 종류이다.</p>

<h3>클래스와 기본 문법</h3>

<h4>기본 문법</h4>

```javascript
class MyClass {
  // 여러 메서드를 정의할 수 있음
  constructor() { ... }
  method1() { ... }
  method2() { ... }
  method3() { ... }
  ...
}
```

<p>클래스를 만들고, new MyClass()를 호출하면 내부에서 정의한 메서드가 들어 있는 객체가 생성된다. 객체의 기본 상태를 설정해주는 생성자 메서드 constructor()는 new에 의해 자동으로 호출되므로, 특별한 절차 없이 객체를 초기화할 수 있다.</p>

<p>class MyClass{...}문법구조가 진짜 하는 일은 다음과 같다.</p>
<ol>
<li>MyClass라는 이름을 가진 함수를 만드는데 이때 함수 본문은 생서자 메서드 constructor에서 가져온다. 만약 생성자 메서드가 없을 경우 본문이 비워진채로 함수가 만들어진다.</li>
<li>method같은 클래스 내에서 정의한 메서드를 MyClass.prototype에 저장한다.</li>
</ol>
<p>new MyClass를 호출해 객체를 만들고, 객체의 메서드를 호출하면 함수의 prototype 프로퍼티에서 설명한 것처럼 메서드를 프로토타입에서 가져온다. 이 과정이 있기 때문에 객체에서 클래스 메서드에 접근할 수 있다.</p>

<h4>getter와 setter</h4>
<p>리터럴을 사용해 만든 객체처럼 클래스도 getter나 setter, 계산된 프로퍼티(computed property)를 포함할 수 있다. 아래와 같은 방법으로 클래스를 선언하면User.prototype에 getter와 setter가 만들어지므로 get과 set을 사용가능해진다. </p>

```javascript
class User {

  constructor(name) {
    // setter를 활성화합니다.
    this.name = name;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    if (value.length < 4) {
      alert("이름이 너무 짧습니다.");
      return;
    }
    this._name = value;
  }

}

let user = new User("John");
alert(user.name); // John

user = new User(""); // 이름이 너무 짧습니다.
```
<h3>계산된 메서드 이름 […]</h3>
<p>대괄호를 사용하여 메서드 이름(computed method name)을 만들 수 있다.<p>

```javascript
class User {

  ['say' + 'Hi']() {
    alert("Hello");
  }

}

new User().sayHi();
```
<h3>클래스 상속</h3>
<p>클래스 상속을 사용하면 클래스를 다른 클래스로 확장할 수 있다.</p>

```javascript
class Animal {
  constructor(name) {
    this.speed = 0;
    this.name = name;
  }
  run(speed) {
    this.speed = speed;
    alert(`${this.name} 은/는 속도 ${this.speed}로 달립니다.`);
  }
  stop() {
    this.speed = 0;
    alert(`${this.name} 이/가 멈췄습니다.`);
  }
}

let animal = new Animal("동물");
class Rabbit extends Animal {
  hide() {
    alert(`${this.name} 이/가 숨었습니다!`);
  }
}

let rabbit = new Rabbit("흰 토끼");

rabbit.run(5); // 흰 토끼 은/는 속도 5로 달립니다.
rabbit.hide(); // 흰 토끼 이/가 숨었습니다!
```

<p>클래스 Rabbit을 사용해 만든 객체는 rabbit.hide() 같은 Rabbit에 정의된 메서드에도 접근할 수 있고, rabbit.run() 같은 Animal에 정의된 메서드에도 접근할 수 있다.</p>
<p>키워드 extends는 프로토타입을 기반으로 동작하며 Rabbit.prototype.[[Prototype]]을 Animal.prototype으로 설정한다. 그렇기 때문에 Rabbit.prototype에서 메서드를 찾지 못하면 Animal.prototype에서 메서드를 가져온다.</p>

<h4>메서드 오버라이딩</h4>
<p>메서드를 오버라이딩 할때 특별한 사항이 없으면 부모 클래스에 있는 메서드를 그대로 상속받는다. 그런데 자식 클래스에서 stop()등의 메서드를 자체적으로 정의하면 상속받은 메서드가 아닌 자체 메서드가 사용된다.</p>

<pre>
키워드 super는 이럴 때 사용한다.

<li>super.method(...)는 부모 클래스에 정의된 메서드, method를 호출한다.</li>
<li>super(...)는 부모 생성자를 호출하는데, 자식 생성자 내부에서만 사용 할 수 있다.</li>
</pre>

<p>*화살표 함수엔 super가 없다.
화살표 함수 다시 살펴보기에서 살펴본 바와 같이, 화살표 함수는 super를 지원하지 않는다.

super에 접근하면 super를 외부 함수에서 가져온다.</p>

<h4>생성자 오버라이딩</h4>
<p>지금까지 상속받는 자체 constructor가 없었다.  클래스가 다른 클래스를 상속받고 constructor가 없는 경우엔 아래처럼 ‘비어있는’ constructor가 만들어진다.</p>

```javascript
class Rabbit extends Animal {
  // 자체 생성자가 없는 클래스를 상속받으면 자동으로 만들어짐
  constructor(...args) {
    super(...args);
  }
}
```

<p><b>super(...)는 this를 사용하기 전에 반드시 호출해야 한다.</b></p>

```javascript
class Animal {

  constructor(name) {
    this.speed = 0;
    this.name = name;
  }


}

class Rabbit extends Animal {

  constructor(name, earLength) {
    super(name);
    this.earLength = earLength;
  }


}

let rabbit = new Rabbit("흰 토끼", 10);
alert(rabbit.name); // 흰 토끼
alert(rabbit.earLength); // 10
```
<h3>정적 메서드와 정적 프로퍼티</h3>
<p>정적 메서드: 특정 클래스 인스턴스가 아닌 클래스 '전체’에 필요한 기능을 만들 때 사용</p>
<p>인스턴스끼리 비교해주는 메서드 Article.compare(article1, article2)이나 팩토리 메서드 Article.createTodays()를 만들 때 정적 메서드가 쓰임</p>
<p>정적메서드는 클래스 선언부 안에 위치하고 앞에 static이라는 키워드가 붙는다. 데이터를 클래스 수준에 저장하고 싶을 때 사용한다. 정적 프로퍼티 역시 개별 인스턴스에 묶이지 않는다.</p>

```javascript
class MyClass {
  static property = ...;

  static method() {
    ...
  }
}
```
<p>static을 사용한 선언은 기술적으론 클래스 자체에 직접 할당하는 것과 동일하다.</p>

<h3>'instanceof'연산자.</h3>
<p>해당 연산자를 사용하면 객체가 특정 클래스에 속하는지 아닌지를 확인할 수 있다. instanceof는 상속 관계도 확인가능하다.</p>

<p>기초문법은 다음과 같다.</p>

```javascript
obj instanceof Class
```

<p>obj가 Class에 속하거나 Class를 상속받는 클래스에 속하면 true가 반환</p>

```javascript
class Rabbit {}
let rabbit = new Rabbit();

// rabbit이 클래스 Rabbit의 객체인가요?
alert( rabbit instanceof Rabbit ); // true
```
<p>instanceof는 생성자 함수에서도 사용가능</p>

```javascript
// 클래스가 아닌 생성자 함수
function Rabbit() {}

alert( new Rabbit() instanceof Rabbit ); // true
```
<p>Array 같은 내장 클래스에도 사용가능하다.</p>

```javascript
let arr = [1, 2, 3];
alert( arr instanceof Array ); // true
alert( arr instanceof Object ); // true
```

<hr>
<h3>믹스인</h3>
<p>자바스크립트는 단일 상속만을 허용하는 언어. 그렇다면 다른 클래스를 상속받을 필요 없이 메서드를 담고 있는 클래스는 무엇인가?</p>
<p>믹스인(mixin): 객체 지향 언어에서 범용적으로 쓰이는 용어로, 다른 클래스들의 메서드 조합을 포함하는 클래스를 의미한다.</p>

```javascript
// 믹스인
let sayHiMixin = {
  sayHi() {
    alert(`Hello ${this.name}`);
  },
  sayBye() {
    alert(`Bye ${this.name}`);
  }
};

// 사용법:
class User {
  constructor(name) {
    this.name = name;
  }
}

// 메서드 복사
Object.assign(User.prototype, sayHiMixin);

// 이제 User가 인사 가능
new User("Dude").sayHi(); // Hello Dude
```
<p>위 코드는 상속 없이 메서드만 간단히 복사하였다.</p>