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
      this.querySelector.style.backgroundColor = "#decfca";
      this.querySelector.style.color = "black";
    } else {
      if (this.value > 0) {
        this.isLocked = true;
        this.querySelector.style.backgroundColor = "black";
        this.querySelector.style.color = "#decfca";
      }
    }
  }

  clearValue() {
    this.value = "";
    this.querySelector.innerHTML = "";
  }

  unlock() {
    this.isLocked = false;
    this.querySelector.style.backgroundColor = "#decfca";
    this.querySelector.style.color = "black";
  }
}
