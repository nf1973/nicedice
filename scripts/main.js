//Nice Dice
//v1.0
//By Neil

//Class Definitions
class Dice {
  constructor(name) {
    this.name = name;
    let qs = ".dice-" + name.toLowerCase();
    this.querySelector = document.querySelector(qs);

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

  usePosition(mapKey) {
    let tot = 0;
    switch (mapKey) {
      case "1s":
        for (i = 0; i <= 4; i++) {
          if (dice[i].value == 1) {
            tot = tot + value;
          }
          break;
        }
        this.scoreCard.set(mapKey[0], "not available");
        this.scoreCard.set(mapKey[1], tot);
        console.log(this.scoreCard);
    }
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
  if (currentPlayer.diceRollsRemainingThisRound >= 1 && aDiceIsUnlocked()) {
    console.log(
      "Player " +
        currentPlayer.name +
        " (id:" +
        currentPlayer.id +
        ") has " +
        currentPlayer.diceRollsRemainingThisRound +
        " dice rolls remaining"
    );
    for (i = 0; i <= 4; i++) {
      dice[i].throw();
      lastThrow = lastThrow + dice[i].value;
      total.innerHTML = lastThrow;
    }
    currentPlayer.diceRollsRemainingThisRound--;
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
    currentPlayer.usePosition(mapKey);
  }
}

function aDiceIsUnlocked() {
  for (i = 0; i <= 4; i++) {
    if (!dice[i].isLocked) {
      return true;
    }
  }
  console.log("All dice are locked");
  return false;
}

//Random Integer Generator
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
