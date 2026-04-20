//let a=prompt("Enter any number=");
// console.log(a);

// if(a%2===0){
//     console.log("even")
// }else{
//     console.log("odd")
// }

student={
    name:"Divyansh",
    age:19,
    add:"Bareilly",
    mob:9236909926
}
console.log(student.name);
//update
student.mob=6386221159;
console.log(student);
student.marks=90;
console.log(student);
//delete
delete student.age;
console.log(student);

if("add" in student){
    console.log("Exist");
}else{
    console.log("not exist");
}
//using for in loop
for( let val in student){
    console.log(val);
}

let message={
    hello(){
        console.log("Hello world");
        }
};
message.hello();

let user={
    name:"Neha",
    address:{
        city:"Delhi"
    }
};
console.log(user.address.city);

let data={
    a:1,
    b:2,
    c:3
};
console.log(Object.keys(data).length);