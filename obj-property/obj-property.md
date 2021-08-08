<h1>객체 프로퍼티</h1>
<h3>프로퍼티 플래그</h3>

<p>객체 프로퍼티는 값(value)와 함께 플래그(flag)라 불리는 특별한 속성 세가지를 갖는다.</p>
<ul>
    <li> `writable` - true면 값을 수정할 수 있다, 그렇지 않다면 읽기만 가능 </li>
    <li> `enumerable` - true면 반복문을 사용해 나열할 수 있다. 그렇지 않다면 나열 불가. </li>
    <li> `writable` - true면 프로퍼티 삭제나 플래그 수정이 가능. 그렇지 않다면 프로퍼티 삭제와 플래그 수정이 불가능 </li>
</ul>
<hr>
<p>이를 좀 더 구체적으로 살펴보았다</p>

<h4>writable 플래그</h4>
<p> `writable` 플래그를 사용해 user.name에 값을 쓰지 못하도록 해보았다. 이를 통해 writable 을 true로 변경하지 않는 한 그 누구도 객체의 이름을 변경할수 없게 되었다.</p>

```javascript
let user = {
  name: "euion"
};

Object.defineProperty(user, "name", {
  writable: false
});

user.name = "mina"; // Error
```


<h4>enumerable 플래그</h4>

<p>특정 프로퍼티의 `enumerable` 플래그 값을 `false`로 설정하면 `for..in` 반복문에 나타나지 않게 할 수 있습니다. 커스텀 `toString`도 열거가 불가능하게 할 수 있다</p>

```javascript
let user={
    name: "euion",
    toString(){
        return this.name;
    }
};
Object.defineProperty(user, "toString", {
  enumerable: false
});

for (let key in user) alert(key); // name
```

<h4>configurable 플래그</h4>

<p> `configurable:false ` 는 구성가능 하지 않음을 나타내는 non-contigurable flag이다. 어떤 프로퍼티의 configurable 플래그가 false로 설정되어 있다면 해당 프로퍼티는 객체에서 지울 수 없다. 내장객체 Math의 PI 프로퍼티가 대표적인 예시이다. 이 프로퍼티는 쓰기, 열거, 구성이 불가능하다.</p>

```javascript
Math.PI = 3; // Error
```

<h3>프로퍼티 getter와 setter</h3>

<p>객체의 종류</p>
<li>데이터 프로퍼티(data property): 일반적으로 사용하는 프로퍼티</li>
<li>접근자 프로퍼티(accessor property): 접근자 프로퍼티의 핵심은 함수. 이 함수는 값을 획득(get)하고 설정(set)하는 역할을 담당. 그런데 외부 코드에서는 함수가 아닌 일반적인 프로퍼티로 보임.</li>

<h3>접근자 프로퍼티의 상세</h3>
<p>접근자 프로퍼티는 getter(획득자), setter(설정자)메서드로 표현된다. 객체 리터럴 안에서 getter와 setter 메서드는 get과 set으로 나타낼 수 있다.</p>

<p>대표적인 표현방식. getter와 setter 메서드 둘다 추가하여 에러가 발생하지 않도록 해야한다.</p>

```javascript
let obj = {
  get propName() {
    // getter, obj.propName을 실행할 때 실행되는 코드
  },

  set propName(value) {
    // setter, obj.propName = value를 실행할 때 실행되는 코드
  }
};
```
<p>대표적인 예시</p>

```javascript
let user={
    phone: "galaxy",
    company: "samsung",
    
    get madeIn() {
        return `${this.phone} ${this.company}`
    },

    set madeIn(){
        [this.phone, this.company] = value.split(" ");
    }
};

// 주어진 값을 이용해 set madeIn이 실행된다.
user.madeIn = "iPhone Apple";

alert(user.phone); // iPhone
alert(user. company); // samsung

```
<h3>접근자 프로퍼티 설명자</h3>
<p>데이터 프로퍼티의 설명자와 접근자 프로퍼티의 설명자는 다르다.접근자 프로퍼티엔 설명자 value와 writable가 없는 대신에 get과 set이라는 함수가 있다. 접근자 프로퍼티가 갖는 설명자는 다음과 같다.</p>

<ul>
<li> get - 인수가 없는 함수. 프로퍼티를 읽을 때 동작</li>
<li> set - 인수가 하나인 함수. 프로퍼티 값을 쓸때 호출</li>
<li> enumerable - 데이터 프로퍼티와 동일함 </li>
<li> configurable – 데이터 프로퍼티와 동일함</li>
</ul>

<p>아래와 같이 defineProperty에 설명자 get과 set을 전달하면 madeIn을 위한 접근자를 만들 수 있다.</p>

```javascript
let user={
    phone: "galaxy",
    company: "samsung",

   Object.defineProperty(user, 'madeIn', { 
        get() {
            return `${this.phone} ${this.company}`
        },

        set(){
            [this.phone, this.company] = value.split(" ");
        }
    });
};

alert(user.madeIn); // galaxy samsung

for(let key in user) alert(key); // phone, company

```