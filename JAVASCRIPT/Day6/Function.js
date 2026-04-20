function greeting(){
    console.log("Invertia is coming soon");
}

// function add(num1,num2){
//     const sum=num1+num2;
//     console.log(sum);
// }

// greeting();
// add(2,4);

//Rest Operator
function add(...num){
    //const sum=num;
    let sum=0;
    for(let n of num){
        sum+=n;
    }
    console.log(sum);
}
add(6,7);
add(6,7,8);
add(6,7,8,9);
add(7,8,9,3,9,4,1);

//Spread Operator
const arr=[10,20,30,40,50];
const arr2=[40,30,70,80];
const ans=[...arr,...arr2];
console.log(ans);

const user={name:"Divyansh",city:"Bareilly",Course:"Bsc"};
const newuser={contact:9236909926,...user};
console.log(newuser);


//method 2 creating function:expression
// const addnumber=function(num1,num2){
// return num1+num2;
// }
// console.log(addnumber(3,5));

//arrow function
// const addnumber = (num1,num2)=>{
// return num1+num2;
// }
//or
// const addnumber=(num1,num2)=> num1+num2;
// console.log(addnumber(3,4));

//IIFE function
(function greet(){
    console.log("HelloJi");
})();

//iife with arrow
(()=>{
    console.log("hello");
})()

//callback function
function greet(){
    console.log("Hello");
}
function meet(callback){
    console.log("I am doing something");
    callback();
}
meet(greet);

//real example of callback fn
function blinkitOrderPlaced(){
    console.log("We have started packing your order");
}
function zomatoOrderPlaced(){
    console.log("we have started preparing your food");
}

function payment(amount,callback){
    console.log(`${amount} payment has initilized`)
    console.log("payment is recieved");
    callback();
}
payment(500,zomatoOrderPlaced);
payment(300,blinkitOrderPlaced);
