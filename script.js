"use strict";

let gameBoard = document.querySelector("#playground");

let images = document.querySelector("#playground-img");

let paper = document.querySelector(".paper");
let rock = document.querySelector(".rock");
let scissors = document.querySelector(".scissors");
let lizard = document.querySelector(".lizard");
let spock = document.querySelector(".spock");

let map = new Map();
map.set("rock", rock);
map.set("paper", paper);
map.set("scissors", scissors);
map.set("lizard", lizard);
map.set("spock", spock);

let scoreWon = document.querySelector(".number-won");
let scoreLost = document.querySelector(".number-lost");
let scoreDraw = document.querySelector(".number-draw");

let won = 0;
let lost = 0;
let draw = 0;

let playerChoice = "";
let oponentChoice = "";

let btnNew = document.querySelector("#btn-new");
let btnNext = document.querySelector("#btn-next");

let opponentElement = null;
let playerElement = null;

let loseSound = document.getElementById("loseSound");
let winSound = document.getElementById("winSound");
let rockSound = document.getElementById("rockSound");
let spockSound = document.getElementById("spockSound");
let rulesSound = document.getElementById("rulesSound");

let rules = document.getElementById("rules");

rules.addEventListener("click", function () {
  rulesSound.play();
});
//Random choose of number

let randomOponentChoice = function () {
  let random = Math.trunc(Math.random() * 5) + 1;
  console.log(random);
  if (random === 1) {
    oponentChoice = "rock";
  } else if (random === 2) {
    oponentChoice = "paper";
  } else if (random === 3) {
    oponentChoice = "scissors";
  } else if (random === 4) {
    oponentChoice = "lizard";
  } else if (random === 5) {
    oponentChoice = "spock";
  }
};

let updateGameStatistic = function () {
  scoreWon.textContent = won;
  scoreLost.textContent = lost;
  scoreDraw.textContent = draw;
};

let gameRules = function (userChoice, opponentChoice) {
  if (userChoice === opponentChoice) {
    draw++;
    if (draw > 3) {
      gameBoard.classList.add("draw");
      btnNext.disabled = true;
    }
  } else if (
    (userChoice === "rock" &&
      (opponentChoice === "scissors" || opponentChoice === "lizard")) ||
    (userChoice === "paper" &&
      (opponentChoice === "rock" || opponentChoice === "spock")) ||
    (userChoice === "scissors" &&
      (opponentChoice === "paper" || opponentChoice === "lizard")) ||
    (userChoice === "lizard" &&
      (opponentChoice === "spock" || opponentChoice === "paper")) ||
    (userChoice === "spock" &&
      (opponentChoice === "scissors" || opponentChoice === "rock"))
  ) {
    won++;
    if (won > 3) {
      gameBoard.classList.add("winner");
      btnNext.disabled = true;
      winSound.play();
    }
  } else {
    lost++;
    if (lost > 3) {
      gameBoard.classList.add("loser");
      btnNext.disabled = true;
      loseSound.play();
    }
  }

  updateGameStatistic();
};

function cycleImages(element) {
  const choices = ["rock", "paper", "scissors", "lizard", "spock"];
  let currentIndex = 0;
  btnNext.disabled = true;
  btnNew.disabled = true;

  const interval = setInterval(() => {
    element.src = map.get(choices[currentIndex]).src;
    currentIndex++;
    if (currentIndex > 4) {
      currentIndex = 0;
    }
  }, 200);

  setTimeout(() => {
    clearInterval(interval);
    btnNext.disabled = false;
    btnNew.disabled = false;
  }, 3500);
}

images.childNodes.forEach((img) => {
  img.addEventListener("click", function () {
    playerChoice = img.alt;

    if (playerChoice === "rock") {
      rockSound.play();
    }
    if (playerChoice === "spock") {
      spockSound.play();
    }

    map.forEach((value) => value.classList.add("hidden"));

    setTimeout(function () {
      gameBoard.style.width = "45rem";
    }, 500);

    setTimeout(function () {
      images.innerHTML = "";

      randomOponentChoice();

      opponentElement = createImageElement(oponentChoice);
      images.appendChild(opponentElement);

      playerElement = createImageElement(playerChoice);
      images.appendChild(playerElement);

      cycleImages(opponentElement);

      setTimeout(() => {
        opponentElement.src = map.get(oponentChoice).src;
        gameRules(playerChoice, oponentChoice);
      }, 3700);
    }, 1500);
  });
});

function createImageElement(choice) {
  let img = document.createElement("img");
  img.src = map.get(choice).src;
  img.alt = choice;
  img.classList.add(choice);
  img.classList.add("img-hover");
  img.classList.add("img-style");
  return img;
}

let newGame = function () {
  won = 0;
  lost = 0;
  draw = 0;
  updateGameStatistic();
  gameBoard.style.width = "70rem";
  gameBoard.classList.remove("winner");
  gameBoard.classList.remove("loser");
  gameBoard.classList.remove("draw");
  btnNext.disabled = false;
  images.innerHTML = "";

  map.forEach((img) => {
    img.classList.remove("hidden");
    images.appendChild(img);
  });
};

let nextRound = function () {
  gameBoard.style.width = "70rem";

  opponentElement.classList.add("hidden");
  playerElement.classList.add("hidden");

  setTimeout(function () {
    images.innerHTML = "";

    map.forEach((img) => {
      images.appendChild(img);
      img.classList.remove("hidden");
    });
  }, 1000);
};

btnNew.addEventListener("click", newGame);
btnNext.addEventListener("click", nextRound);
