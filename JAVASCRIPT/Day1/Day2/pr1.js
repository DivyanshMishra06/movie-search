//check any no is multiple of 5 or not
// let n=prompt("Enter any number=");
// if(n%5===0){
//     console.log(n,"multiple of 5");
// }
// else{
//     console.log(n,"not multiple of 5");
// }

//write a code which can give grades to students according to their scores
// let score=prompt("Enter your score=");
// if(score>=90&&score<=100){
//     console.log("Grade-A");
// }
// if(score>=70&&score<=89){
//     console.log("Grade-B");
// }
// if(score>=60&&score<=69){
//     console.log("Grade-C");
// }
// if(score>=50&&score<=59){
//     console.log("Grade-D");
// }
// if(score>=0&&score<=49){
//     console.log("Fail");
// }

let score=prompt("Enter your score(0-100)");
if(score>=90&&score<=100){
    Grade="A+";
}
else if(score>=70&&score<=89){
    Grade="A";
    
}
else if(score>=60&&score<=69){
    Grade="B";

}
else if(score>=50&&score<=59){
    Grade="C";
    
}
else if(score>=0&&score<=49){
    Grade="F";
    
}
else{
    console.log("Something went wrong!!");
}
console.log("Grade=",Grade);
