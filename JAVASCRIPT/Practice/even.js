// let n=prompt("Enter any number=");
// console.log(n);
// if(n%2===0){
//     console.log("Even")
// }
// else{
//     console.log("odd")
// }

//check positive negative no.
// let n=prompt("Enter any number=");
// console.log(n);
// if(n>=0){
//     alert("positive number");
// }
// else{
//     alert("negative number")
// }

//find greatest no b/w two
// let a=prompt("Enter first number=");
// console.log(a);
// let b=prompt("Enter second number=");
// console.log(b);
// if(a>b){
//     console.log(a,"is greater than",b);
// }
// else if(a==b){
//     console.log("both are equal");
// }
// else{
//     console.log(b,"is greater than",a);
// }

//check age is valid for voting or not
// let age=prompt("Enter your age=");
// console.log(age);
// if(age>=18){
//     console.log("you are eligible for voting");
// }
// else{
//     console.log("you are not eligible for voting");
// }

//check any no is divisible by 3,5
// let n=prompt("Enter any number=");
// console.log(n);
// if(n%3==0&&n%5==0){
//     console.log(n,"is divisible by 3 and 5");
// }
// else if(n%5==0){
//     console.log(n,"is  divisible by 5");
// }
// else if(n%3==0){
//     console.log(n,"is divisible by 3");
// }
// else {
//     console.log(n,"is not divisible by 5 not 3");
// }

//check leap year
// let year=prompt("Enter any year=");
// console.log(year);
// if(year%4==0 && (year%400==0||year!=0)){
//     console.log("it is leap year");
// }
// else{
//     console.log("it is not a leap year");

// }

//check vowel and consonant
// let ch=prompt("Enter any character=");
// console.log(ch);
// if(ch.length!==1){
//     console.log("Enter single character");
// }
// else if (ch >= 'a' && ch <= 'z' ||ch >= 'A' && ch <= 'Z')
//     {
//      if(ch=='a'||ch=='e'||ch=='i'||ch=='o'||ch=='u'||ch=='A'||ch=='E'||ch=='I'||ch=='O'||ch=='U'){
//     console.log("it is vowel");
//     }
//      else{
//     console.log("it is consonant");
//    }
//  }
// else{
//     console.log("not a alphabet");
// }

//check any no is three digit no or not
// let n=prompt("Enter any number=");
// if(n>=100&&n<=1000){
//     console.log("it is three digit number");
// }
// else{
//     console.log("this is not three digit number");
// }

//table of any number
// let n=parseInt(prompt("Enter any number="));

// for(let i=1;i<=10;i++){
//    let t=n*i;
//     console.log(t);
// }

//count digits of any number
// let n =prompt("Enter any nymber=");
// n=parseInt(n);//parseInt is js function which is convert string->number
// let count=0;
// if (n<0){
//     n=-n;
// }
// if(n===0){
//     count=1;
// }
// while(n>0){
//     n=parseInt(n/10);
//     count++;
// }
// console.log(count);

//sum of any number
// let n=parseInt(prompt("Enter number="));
// let digit=0;
// let sum=0;
// while(n!==0){
//     digit=n%10;
//     sum=sum+digit;
//     n=parseInt(n/10);
// }
// console.log(sum);

//swaping two numbers
// let a=parseInt(prompt("Enter first number="));
// console.log(a);
// let b=parseInt(prompt("Enter second number="));
// console.log(b);
// // a=a+b;
// // b=a-b;
// // a=a-b;
// [a,b]=[b,a];
// console.log(a,b);

//sum of first 10 even/odd numbers
// let sumeven=0;
// for(let i=1;i<=10;i++){
//     sumeven +=2*i;
// }
// console.log("sum of first 10 even numbers=",sumeven);
// let sumodd=0;
// for(let i=1;i<=10;i++){
//     sumodd+=2*i-1;
// }
// console.log("sum of first 10 odd numbers=",sumodd);

//find the average and percentage of 5 students
// Input marks of 5 subjects
// let s1=parseFloat(prompt("Enter marks of subject 1:"));
// let s2=parseFloat(prompt("Enter marks of subject 2:"));
// let s3=parseFloat(prompt("Enter marks of subject 3:"));
// let s4=parseFloat(prompt("Enter marks of subject 4:"));
// let s5=parseFloat(prompt("Enter marks of subject 5:"));
// let sum=s1+s2+s3+s4+s5;
// let avg=sum/5;
// let percentage=(sum/500)*100;
// console.log("sum=",sum,"average=",avg,"percentage=",percentage);

//convert km to mile
// let k=parseFloat(prompt("Enter any kilometer range="));
// let mile=k*0.621371;
// console.log(k," km in mile=",mile.toFixed(2));

//area calculator
// let r=parseFloat(prompt("Enter radius="));
// area=3.14*r*r;
// console.log(area);

//Rectangle
// let width=parseFloat(prompt("Enter width="));
// let length=parseInt(prompt("Enter length="));
// area=width*length;
// console.log(area);

//Triangle
// let height=parseFloat(prompt("Enter Height="));
// let base=parseFloat(prompt("Enter Base="));
// area=(1/2)*(height*base);
// console.log(area);

//Square
let a=parseFloat(prompt("Enter side="));
area=a*a;
console.log(area);