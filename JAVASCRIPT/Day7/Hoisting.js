// console.log(a);
// var a = 5;//output undefined

// console.log(b);
// let b = 10; //output ReferenceError

// hello();
// function hello() {
//   console.log("Hello"); //output Hello
// }

// sayHi();
// var sayHi = function() {
//   console.log("Hi"); //output TypeError
// };

// var x = 20;

// function test() {
//   console.log(x);
//   var x = 10;
// }

// test();  //undefined

// var a = 1;

// function demo() {
//   console.log(a);
// }

// demo();//1

// console.log(a);
// var a = 10;
// console.log(a);  //undefined 10

// console.log(a);

// function a() {
//   return 5;
// }

// var a = 10;  //Function a() {...}

// function outer() {
//   console.log(a);
//   var a = 50;
// }

// outer();  //undefined

// console.log(typeof x);
// var x = 100;  //undefined


let a = 5;

function demo() {
  console.log(a);
}

function demo2() {
  let a = 10;
  demo();
}

demo2();

console.log(x);

var x = 10;

function x() {
  console.log("Hello");
}