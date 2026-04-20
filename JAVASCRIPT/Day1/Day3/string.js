let str="ApnaCollege";

console.log(str.length);//for find length
console.log(str[0]);//for index characters

//Template Literals
let specialString=`this is template Literal`;
console.log(specialString);

let obj={
    item:"pen",
    price:10,
};
console.log("the cost of ",obj.item,"is",obj.price);

//using template litrals
let output=`the cost of ${obj.item} is ${obj.price} rupees`;
console.log(output);