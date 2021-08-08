// // for ...in 반복문
// for (key in object) {
//     // 각 프로퍼티 키(key)를 이용하여 본문(body)을 실행.
//   }
  
//   let user = {
//     name: "euion",
//     age: 23,
//     isAdmin: true
//   };
  
//   for (let key in user) {
//     // 키
//     alert( key );  // name, age, isAdmin
//     // 키에 해당하는 값
//     alert( user[key] ); // euion, 23, true
//   }



// //객체 복사, 병합 예제
// let user = {
//     name: "euion",
//     age: 23
//   };
  
//   let clone = {}; // 새로운 빈 객체
  
//   // 빈 객체에 user 프로퍼티 전부를 복사해 넣음
//   for (let key in user) {
//     clone[key] = user[key];
//   }
  
//   // 이제 clone은 완전히 독립적인 복제본이 되었다.
//   clone.name = "minsu"; // clone의 데이터를 변경
  
//   alert( user.name ); // 기존 객체에는 여전히 euion이 있다.



//   //중첩 객체 복사
//   let user = {
//     name: "euion",
//     sizes: {
//       height: 182,
//       width: 50
//     }
//   };
  
//   let clone = Object.assign({}, user);
  
//   alert( user.sizes === clone.sizes ); // true, 같은 객체.
  
//   // user와 clone는 sizes를 공유.
//   user.sizes.width++;       // 한 객체에서 프로퍼티를 변경.
//   alert(clone.sizes.width); // 51, 다른 객체에서 변경 사항을 확인 가능.

//   //연결된 객체
//   function marry(man, woman) {
//     woman.husband = man;
//     man.wife = woman;
  
//     return {
//       father: man,
//       mother: woman
//     }
//   }
  
//   let family = marry({
//     name: "Bieber"
//   }, {
//     name: "Hailey"
//   });
  
//   delete family.father;
//   delete family.mother.husband;

let user = {
  name: "euion",
  age: 23,

  sayHi() {
    alert( this.name ); 
  }

};


let admin = user;
user = null; 