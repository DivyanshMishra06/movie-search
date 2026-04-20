let gameNum=25;
let userNum=prompt("Guess the game number:");
while(userNum!=gameNum){
    userNum=prompt("you entered wrong number,Try Again:");
}
console.log("congratulations, you entered the right number");