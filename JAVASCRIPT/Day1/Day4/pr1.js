//find the average of marks
let marks=[85,97,44,37,76,60];
let sum=0;
for(let val of marks){
sum=sum+val;
}

let avg=sum/marks.length;
console.log(`average marks of the class=${avg}`);

// Qs. For a given array with prices of 5 items -> [250, 645, 300, 900, 50]
// All items have an offer of 10% OFF on them. Change the array to store final price after
// applying offer.

let items=[250,645,300,900,50];

for(let i=0;i<items.length;i++){
    let offer=items[i]/10;

    items[i]-=offer;
}
console.log("after 10% offer prices are",items);

//Array Methods
let foodItems =["potato","tomato","onion","apple","litchi"];

//foodItems.push("chips","burger","peneer");
foodItems.pop(); //delete from end
console.log(foodItems);
console.log(foodItems.toString());//array->string

let superhero=["superman","shaktiman","spiderman","ironman"];
let realhero=["ram","krishna","bhim","arjuna"];

let heroes=superhero.concat(realhero);//join two array
console.log(heroes);

realhero.unshift("balram");//add in start
console.log(realhero);

realhero.shift(); //delete from start
console.log(realhero);

console.log(superhero.slice(1,3)); //(start,end)

let arr=[1,2,3,4,5];
arr.splice(2,2,101); //(start,delcount,new)
console.log(arr);

// find index
console.log(realhero.indexOf("bhim"));

//sort method
realhero.sort();
console.log(realhero);

//flat method
const arr2=[10,20,30,40,[50,60,70],[78,89],80];
console.log(arr2[4]);//output [50,60,70]
console.log(arr2[4][1]);//60

const a=arr2.flat();
console.log(a);
