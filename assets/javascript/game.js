// the var i will use in the java scripts
// gameslist = word bank
var gamesList = ["touchdown", "football", "flag" , "field"];
// letters = how many letters are in a word
var letters = [];
// blanks = how many blanks to display for letters count
var blanks = 0;
// when you fill the blanks with the correct letters
var blanksAndWins = [];
// display the wrongGuesses you do 
var wrongGuesses = [];




// 

// var random = ["#status"];


// More Globals - Counters
// how many wins you have
var wins = 0;
// how many losses you have
var losses = 0;
// you start with 10 tries if choose the wrong letter it drops by ONE
var numGuesses = 10;
// IMPORTANT: Leave this above object so that when startGame runs
// this is already loaded!!! or wrap in 'DOMContentLoaded'...
function printResults() {
  document.getElementById("guesses-left").innerHTML = numGuesses;
  document.getElementById("word-blanks").innerHTML = blanksAndWins.join(" ");
  document.getElementById("wrong-guesses").innerHTML = wrongGuesses.join(" ");
 }
function gameWin() {
    alert("you win!")
    document.getElementById("win-counter").innerHTML =Wins;
    hangman.starGame();
}
function gameLost() {
  
//   document.getElementById("status").innerHTML = 'You Lose!';
    alert("You lose!");
  document.getElementById("loss-counter").innerHTML =losses;
  hangman.startGame();
}
// IMPORTANT: Hangman object below! with methods to start game, check letters and end the game
var hangman = {
  chosenGame: "",
    startGame: function () {
    numGuesses = 10;
    chosenGame = gamesList[Math.floor(Math.random() * gamesList.length)];
    
    letters = chosenGame.split("");
    blanks = letters.length;
    blanksAndWins = [];
    wrongGuesses = [];
    for (var i = 0; i < blanks; i++) {
      blanksAndWins.push("_");
    }
    printResults();
  },
  checkLetters: function (letter) {
    var letterInWord = false;
    for (var i = 0; i < blanks; i++) {
      if (chosenGame[i] === letter) {
        letterInWord = true;
      }
    }
    if (letterInWord) {
      for (var x = 0; x < blanks; x++) {
        if (chosenGame[x] === letter) {
          blanksAndWins[x] = letter;
        }
      }
    }
    else {
      wrongGuesses.push(letter);
      numGuesses--;
     
    }
  },
  endGame: function () {
    printResults();
    if (letters.toString() === blanksAndWins.toString()) {
      gameWin();
      window.location.reload()
    }
    else if (numGuesses === 0) {
      gameLost();
      window.location.reload()
    }
  }
};
// .../end hangman object
// Function call to start game + event listener for key presses! leave this here!!!! must be able to refer to methods in object
// object needs to load first
hangman.startGame();
document.addEventListener('keypress', (event) => {
  lettersGuessed = String.fromCharCode(event.which).toLowerCase();
  hangman.checkLetters(lettersGuessed);
  hangman.endGame();
});

