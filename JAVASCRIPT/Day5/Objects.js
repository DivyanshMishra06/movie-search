// const user={
//     name:"Divyansh", //name->key,"Divyansh"->value
//     Email:"Dm@gmail.com",
//     Age:20,
//     Address:"Bareilly"
// }
// console.log(user);

// //CRUD operations

// //update
// user.aadhar=1234;
// user.Age=23;

// console.log(user);

// //delete
// delete user.Email;
// console.log(user);

// //important
// console.log(Object.keys(user));
// console.log(Object.values(user));
// console.log(Object.entries(user));

// //object ko destructring karna
// const {name,Age}=user;
// console.log(name,Age);

// //function ko bhi add kar sakte hai

// const id={
//     name:"Ram",
//     age:20,
//     greeting:function(){
//         console.log("I am learning Javascript");
//         return 20;
//     }
// }
// const va=id.greeting();
// console.log(va);

// //this keyword ->refers to current object
// const student={
//     name:"Divyansh",
//     greeting:function(){
//         console.log(`Hello,my name is ${this.name}`);
//     }
// };
// student.greeting();

// //looping over an Objects
// //for..in loop object ke sabhi keys ko one by one nikalta hai
// const car={
//     make:"Honda",
//     model:"Civic",
//     year:2021
// };
// for (const key in car){
//     console.log(`Key: ${key}, Value: ${car[key]}`);//$key->current key and $car[key]->us key ki value
// }







//create an object
// const car={
//     name:"Honda",
//     model:2020,
//     color:'red',
//     price:20000
// };
// console.log(car.color);
// console.log(car.price);
// console.log(car["model"]);
// console.log(car);

// car.price=300000;
// car.color='black';
// car.type='EV';
// console.log(car);

// delete car.price;
// console.log(car);

// const student={
//     name:'Divyansh',
//     course:'Bsc',
//     id:'BCSS2024025',
//     branch:'Computer science',
// invertis:function(){
// console.log(`hello, i am ${this.name} studying in ${this.course} my id is ${this.id} and belongs to ${this.branch} field.`);
// }
// };
// student.invertis();

// const car={
//     make:"Honda",
//     model:"Civic",
//     year:2021,
//     color:'red',
//     price:30000,
//     type:'EV',
//     city:'Bareilly',
//     state:'uttar pradesh',
//     owner:"Divyansh"
// };
// // for (const key in car){
// //     console.log(`key: ${key},value: ${car[key]}`)
// // }
// console.log(Object.keys(car));
// console.log(Object.values(car));

// for (const [key,values] of Object.entries(car)){
//     console.log(`${key}:${values}`);
// }


let obj1 ={value:10};
let obj2=obj1;
obj2.value=20;
console.log(obj1.value);

const original={name:"Divyansh",age:30};
const copy={...original};
copy.age=31;
console.log(original.age);
console.log(copy.age);