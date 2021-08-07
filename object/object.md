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


```
let message = "Hello!";
let phrase = message;
```

<p> 이때 <b>변수엔 객체가 그대로 저장되는 것이 아니라, 객체가 저장되어있는 '메모리 주소’인 객체에 대한 '참조 값’이 저장</b>되는것. 즉 <b>객체의 참조값이 복사되고 객체는 복사되지 않는다.</b></p>

<h4>객체 복사, 병합</h4>
<p>복제가 필요한 상황일 경우 새로운 객체를 만든 다음 기존 객체의 프로퍼티들을 순회해 원시 수준까지 프로퍼티를 복사</p>

```

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


```
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

<p>'얕은 복사(shallow copy)' 를 가능하게 해주는 Object.assign</p>

<h3>가비지 컬렉션</h3>