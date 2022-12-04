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
      if (this.value > 0) {
        this.isLocked = true;
        this.querySelector.style.backgroundColor = "black";
        this.querySelector.style.color = "white";
      }
    }
  }

  clearValue() {
    this.value = "";
    this.querySelector.innerHTML = "";
  }

  unlock() {
    this.isLocked = false;
    this.querySelector.style.backgroundColor = "white";
    this.querySelector.style.color = "black";
  }
}

class Player {
  constructor(id, name) {
    this.id = id[0];
    this.name = name;
    this.roundsRemaining = 6; //should be 13!
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
            tot = tot + dice[i].value;
          }
        }
        break;
      case "2s":
        for (i = 0; i <= 4; i++) {
          if (dice[i].value == 2) {
            tot = tot + dice[i].value;
          }
        }
        break;
      case "3s":
        for (i = 0; i <= 4; i++) {
          if (dice[i].value == 3) {
            tot = tot + dice[i].value;
          }
        }
        break;
      case "4s":
        for (i = 0; i <= 4; i++) {
          if (dice[i].value == 4) {
            tot = tot + dice[i].value;
          }
        }
        break;
      case "5s":
        for (i = 0; i <= 4; i++) {
          if (dice[i].value == 5) {
            tot = tot + dice[i].value;
          }
        }
        break;
      case "6s":
        for (i = 0; i <= 4; i++) {
          if (dice[i].value == 6) {
            tot = tot + dice[i].value;
          }
        }
        break;
    }
    this.scoreCard.set(mapKey, ["not-available", tot]);
    let qs = document.querySelector(`.sc-${mapKey}-p${currentPlayer.id}`);
    qs.innerHTML = tot;

    this.roundsRemaining--;
    this.diceRollsRemainingThisRound = 3;
    //set the text for button
    rollButton.innerHTML =
      "Roll Dice (" + currentPlayer.diceRollsRemainingThisRound + " remaining)";

    //Unlock all dice
    for (i = 0; i <= 4; i++) {
      dice[i].unlock();
      dice[i].clearValue();
    }
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Global Variables / Constant Definitions
const diceNames = ["one", "two", "three", "four", "five"];
const playerNames = ["Player 1"]; //TODO Make the number of players changeable (1-4 players) and get input from the User
const dice = [];
const player = [];
let currentPlayer;

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
rollButton = document.querySelector(".roll");

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Main Game Functions
function rollDice() {
  //Throw the Dice
  if (currentPlayer.diceRollsRemainingThisRound >= 1 && aDiceIsUnlocked()) {
    for (i = 0; i <= 4; i++) {
      dice[i].throw();
    }
    currentPlayer.diceRollsRemainingThisRound--;
    rollButton.innerHTML =
      "Roll Dice (" + currentPlayer.diceRollsRemainingThisRound + " remaining)";
  }
}

function tryPosition(mapKey) {
  let totalScore = 0;
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
    currentPlayer.scoreCard.get(mapKey)[0] == "available" &&
    dice[0].value > 0 //Prevent setting before rolling dice!
  ) {
    currentPlayer.usePosition(mapKey);
    if (currentPlayer.roundsRemaining <= 0) {
      //prevent further throws
      currentPlayer.diceRollsRemainingThisRound = 0;
      rollButton.innerHTML = "Game Over";

      //show the total
      for (let [key, value] of currentPlayer.scoreCard) {
        totalScore = totalScore + value[1];
      }
      total.innerHTML = totalScore;
    }
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
