class Player {
  constructor(id, name) {
    this.id = id[0];
    this.name = name;
    this.roundsRemaining = 6; //should be 13 for full game!
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
