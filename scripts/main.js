//Nice Dice
//v1.0
//By Neil

//Class Definitions
class Dice {
    constructor (name) {
        this.name=name;
        //this.value=getRandomInt(6)+1;
        let qs='.dice-'+name.toLowerCase();
        this.querySelector=document.querySelector(qs);
        //this.querySelector.innerHTML=this.value;
        this.throw();
        this.isLocked=false;
    } 

    throw () {
        if (!this.isLocked) {
            this.value=getRandomInt(6)+1;
            this.querySelector.innerHTML=this.value;
        } 
    } 

    lockSwitch () {
        if (this.isLocked) {
            this.isLocked = false;
            this.querySelector.style.backgroundColor = "white";
            this.querySelector.style.color = "black";
            } else {
            this.isLocked = true;
            this.querySelector.style.backgroundColor = "black";
            this.querySelector.style.color = "white";
            }
        }
    }


//Global Variables / Constant Definitions
const diceNames=["one", "two", "three", "four", "five"]
const dice = []; 
var lastThrow = 0;

for (i=0; i<=4; i++) {
    dice[i] = new Dice (diceNames[i]); 
}



//Get static DOM Elements
total=document.querySelector(".total");


//Main Game Functions
function rollDice() {
   lastThrow=0;
    //Set the next value on the dice
    for (i=0; i<=4; i++) {
        dice[i].throw();
        lastThrow=lastThrow+dice[i].value;
        total.innerHTML=lastThrow;
    }
}




//Random Integer Generator
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
