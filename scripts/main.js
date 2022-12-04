//Nice Dice
//v1.0
//By Neil

//Class Definitions
class Dice {
  constructor(name) {
    this.name = name;
    //this.value=getRandomInt(6)+1;
    let qs = ".dice-" + name.toLowerCase();
    this.querySelector = document.querySelector(qs);
    //this.querySelector.innerHTML=this.value;
    this.throw();
    this.isLocked = false;
  }

  throw() {
    if (!this.isLocked) {
      this.value = getRandomInt(6) + 1;
      this.querySelector.innerHTML = this.value;
    }
  }

  lockSwitch() {
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

class Player {
  constructor(id, name) {
    this.id = id[0];
    this.name = name;
    this.roundsRemaining = 13;
    this.diceRollsRemainingThisRound = 3;
    this.qsName = document.querySelector(`.sc-p${id}-name`);
    this.qs1s = document.querySelector(`.sc-1s-p${id}`);
    this.qs2s = document.querySelector(`.sc-2s-p${id}`);
    this.qs3s = document.querySelector(`.sc-3s-p${id}`);
    this.qsName.textContent = name;
    this.scoreCard = new Map([
      ["1s", ["available", 0]],
      ["2s", ["available", 0]],
      ["3s", ["available", 0]],
      ["4s", ["available", 0]],
      ["5s", ["available", 0]],
      ["6s", ["available", 0]],
      ["3kind", ["available", 0]],
      ["4kind", ["available", 0]],
      ["fullhouse", ["available", 0]],
      ["smallstr", ["available", 0]],
      ["largestr", ["available", 0]],
      ["5kind", ["available", 0]],
      ["chance", ["available", 0]],
    ]);
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Global Variables / Constant Definitions
const diceNames = ["one", "two", "three", "four", "five"];
const playerNames = ["Neil"]; //TODO Make the number of players changeable (1-4 players) and get input from the User
const dice = [];
const player = [];
let currentPlayer;

var lastThrow = 0;

//Create game artifacts

//5 Dice
for (i = 0; i <= 4; i++) {
  dice[i] = new Dice(diceNames[i]);
}

//Players
for (i = 0; i <= playerNames.length - 1; i++) {
  player[i] = new Player([i], playerNames[i]);
}
//Manually set the first player only at the start of the game
currentPlayer = player[0];
console.log("Current Player is " + currentPlayer.name);

//Get static DOM Elements
total = document.querySelector(".total");

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Main Game Functions
function rollDice() {
  lastThrow = 0;
  //Throw the Dice
  for (i = 0; i <= 4; i++) {
    dice[i].throw();
    lastThrow = lastThrow + dice[i].value;
    total.innerHTML = lastThrow;
  }
}

function setPosition(mapKey) {
  console.log(
    "Player " +
      currentPlayer.name +
      " (id:" +
      currentPlayer.id +
      ") had " +
      currentPlayer.roundsRemaining +
      " rounds remaining. Selected position is " +
      currentPlayer.scoreCard.get(mapKey)[0]
  );

  if (
    currentPlayer.roundsRemaining > 0 &&
    currentPlayer.scoreCard.get(mapKey)[0] == "available"
  ) {
    console.log("Made It");
  }
}

//Random Integer Generator
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
