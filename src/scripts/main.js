//Nice Dice
//v1.0
//By Neil

//Class Definitions

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
  let subTotal = 0;
  let total = 0;

  if (
    currentPlayer.roundsRemaining > 0 && //User cannot play if has already played all the rounds
    currentPlayer.scoreCard.get(mapKey)[0] == "available" && //check this position has not already been used
    dice[0].value > 0 //Check the dice has been rolled to prevent setting before rolling dice!
  ) {
    //Continues using this position, go calculate the points to be assigned
    currentPlayer.usePosition(mapKey);

    if (currentPlayer.roundsRemaining <= 0) {
      //prevent further throws
      currentPlayer.diceRollsRemainingThisRound = 0;
      rollButton.innerHTML = "Game Over";

      //calculate the total
      currentPlayer.calculateTotal();

      let qcSubTotal = document.querySelector(
        `.sc-subtotal-p${currentPlayer.id}-score`
      );
      qcSubTotal.innerHTML = currentPlayer.subTotal;

      let qcBonus = document.querySelector(
        `.sc-bonus-p${currentPlayer.id}-score`
      );
      qcBonus.innerHTML = currentPlayer.bonus;

      let qcTotal = document.querySelector(
        `.sc-total-p${currentPlayer.id}-score`
      );
      qcTotal.innerHTML = currentPlayer.total;
    }
  }
}

function aDiceIsUnlocked() {
  for (i = 0; i <= 4; i++) {
    if (!dice[i].isLocked) {
      return true;
    }
  }
  return false;
}

//Random Integer Generator
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
