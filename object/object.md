<h1>객체</h1>

<h3>객체</h3>
<p> : 특수한 기능을 가진 연관 배열(associative array)</p>
<p>① 자바스크립트에는 8가지 자료형이 있음</p>
<p>- 원시형 : 오직 하나의 데이터만 담을 수 있음</p>
<p>- 객체형 : 다양한 데이터를 담을 수 있음 --> key로 구분된 Data집합 or 복잡한 개체(entity)</p>
<br>
<p>② 객체는 {}를 이용하여 만든다.</p>
<p>③ 중괄호 안에는 키(key, 문자형):값(value, 자료형)쌍으로 구성된 프로퍼티(Property)를 저장 가능 </p>

```
let user = new object() //'객체 생성자' 문법
let user = {} //'객체 리터럴' 문법

```

<p>*중괄호를 이용해 객체를 선언하는 것을 객체 리터럴 이라고 부른다.</p>

<br>
<h3>리터럴과 프로퍼티</h3>
<p>1. 콜론(:)을 기준으로 왼쪽엔 키, 오른쪽엔 값 위치</p>

```  
let user = {     // 객체
  name: "euion",  // 키: "name",  값: "euion"
  age: 30        // 키: "age", 값: 30
};
```

<p>서랍장 안에 파일 2개가 담겨있고 각 파일에 name, age 라는 이름표가 붙어있을때 서랍장에 파일을 추가하고 뺄 수 있듯이 개발자는 프로퍼티를 추가, 삭제 할 수 있다.</p>

<h4>상수 객체는 수정될 수 있다.</h4>

```
const user = {
  name: "LIM"
};

user.name = "euion"; // (*)

alert(user.name); // euion
```

<h3>대괄호 표기법</h3>
<p> 객체를 만들 때 객체 리터럴 안의 키가 대괄호로 둘러쌓여져 있는 경우 computed property라고 부른다.</p>

```
let phone = prompt("당신이 원하는 폰 기종은 무엇인가요?", "buy");

let euion = {
  [phone]: "galaxy", // 변수 phone에서 프로퍼티 이름을 동적으로 받아온다.
}
alert(euion.buy); //phone에 "apple"이 할당되었다면 galaxy가 출력된다.
```

<p> 해당 코드 중 `[phone]`은 프로퍼티 이름을 변수 phone에서 가져오겠다는 것을 의미한다. 이때 phone에는 galaxy가 할당되었므로 phone을 입력한다면 galaxy가 출력된다.</p>

```
let phone = 'galaxy';
let euion = {
  [phone + 'Company']: "samsung" // euion.galaxyCompany = "samsung"
};
```
<p>`+` 기호를 활용하여 좀 더 복잡하게 활용할 수도 있다.</p>
<h3>for ...in 반복문</h3>
```
for (key in object) {
  // 각 프로퍼티 키(key)를 이용하여 본문(body)을 실행.
}
```

```

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