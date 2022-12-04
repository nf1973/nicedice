class Player {
  constructor(id, name) {
    this.id = id[0];
    this.name = name;
    this.roundsRemaining = 13;
    this.diceRollsRemainingThisRound = 3;
    // this.qsName = document.querySelector(`.sc-p${id}-name`);
    // this.qsName.textContent = name;
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
    let counter = 0;
    let tot = 0;
    let diceArray = [];
    for (let faces of dice) {
      diceArray.push(faces.value);
    }

    switch (mapKey) {
      case "1s":
        for (i = 0; i <= 4; i++) {
          if (diceArray[i] == 1) {
            tot = tot + diceArray[i];
          }
        }
        break;
      case "2s":
        for (i = 0; i <= 4; i++) {
          if (diceArray[i] == 2) {
            tot = tot + diceArray[i];
          }
        }
        break;
      case "3s":
        for (i = 0; i <= 4; i++) {
          if (diceArray[i] == 3) {
            tot = tot + diceArray[i];
          }
        }
        break;
      case "4s":
        for (i = 0; i <= 4; i++) {
          if (diceArray[i] == 4) {
            tot = tot + diceArray[i];
          }
        }
        break;
      case "5s":
        for (i = 0; i <= 4; i++) {
          if (diceArray[i] == 5) {
            tot = tot + diceArray[i];
          }
        }
        break;
      case "6s":
        for (i = 0; i <= 4; i++) {
          if (diceArray[i] == 6) {
            tot = tot + diceArray[i];
          }
        }
        break;
      case "3kind":
        diceArray.sort();
        for (i = 0; i <= 3; i++) {
          if (diceArray[i] == diceArray[i + 1]) {
            counter++;
          }
          if (counter >= 2) {
            for (i = 0; i <= 4; i++) {
              tot = tot + diceArray[i];
            }
          }
        }
        break;
      case "4kind": //TODO - Identify why Full House works here
        diceArray.sort();
        for (i = 0; i <= 3; i++) {
          if (diceArray[i] == diceArray[i + 1]) {
            counter++;
          }
          if (counter >= 3) {
            for (i = 0; i <= 4; i++) {
              tot = tot + diceArray[i];
            }
          }
        }
        break;
      case "fullhouse":
        diceArray.sort();
        for (i = 0; i <= 3; i++) {
          if (diceArray[i] == diceArray[i + 1]) {
            counter++;
          }
          if (counter >= 3) {
            tot = 25;
          }
        }
        break;
      case "smallstr":
        diceArray.sort();
        for (i = 0; i <= 3; i++) {
          if (diceArray[i] == diceArray[i + 1] - 1) {
            counter++;
          }
          if (counter >= 3) {
            tot = 30;
          }
        }
        break;
      case "largestr":
        diceArray.sort();
        for (i = 0; i <= 3; i++) {
          if (diceArray[i] == diceArray[i + 1] - 1) {
            counter++;
          }
          if (counter >= 4) {
            tot = 40;
          }
        }
        break;
      case "5kind":
        diceArray.sort();
        for (i = 0; i <= 3; i++) {
          if (diceArray[i] == diceArray[i + 1]) {
            counter++;
          }
          if (counter >= 4) {
            tot = 50;
          }
        }

        break;
      case "chance":
        for (i = 0; i <= 4; i++) {
          tot = tot + diceArray[i];
        }
        break;
    }
    this.scoreCard.set(mapKey, ["not-available", tot]);
    let qsScore = document.querySelector(
      `.sc-${mapKey}-p${currentPlayer.id}-score`
    );
    let qsButton = document.querySelector(
      `.sc-${mapKey}-p${currentPlayer.id}-btn`
    );
    qsScore.innerHTML = tot;
    qsButton.style.backgroundColor = "transparent";

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
