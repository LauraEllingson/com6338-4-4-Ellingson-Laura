var words = [
  'bananas',
  'grapes',
  'carousel',
  'milkshake',
  'javascript',
  'limousine',
  'chocolate',
  'programming',
  'meatloaf',
  'ukulele',
  'mango'
];

var wordToGuessEl = document.getElementById('word-to-guess');
var previousWordEl = document.getElementById('previous-word');
var incorrectLettersEl = document.getElementById('incorrect-letters');
var remainingGuessesEl = document.getElementById('remaining-guesses');
var winEl = document.getElementById('wins');
var loseEl = document.getElementById('losses');

var displayArr = [];
var incorrectArr = [];
var correctArr = [];
var previousWord = "";
var remainingGuesses = 10;
var wordToGuess;

var wins = 0;
var losses = 0;

remainingGuessesEl.textContent = `${remainingGuesses}`;
startGame();

function startGame() {
  wordToGuess = words[Math.floor(Math.random() * words.length)];
  console.log(wordToGuess);
  correctArr = [];
  incorrectArr = [];
  displayArr = [];
  remainingGuesses = 10;
  wordPick();
}

document.body.addEventListener('keyup', function (e) {
  var key = e.key.toLowerCase();
  console.log(key);
  
  if (!/^[a-zA-Z]+$/.test(key)) return;

  if (incorrectArr.includes(key) || correctArr.includes(key)) return;

  if (wordToGuess.includes(key) && correctArr.indexOf(key) === -1) {
    correctArr.push(key);
    wordPick();
  } else if (!wordToGuess.includes(key) && correctArr.indexOf(key) === -1) {
    incorrectArr.push(key);
    remainingGuesses--;
    remainingGuessesEl.textContent = `${remainingGuesses}`;
  }

  incorrectLettersEl.textContent = incorrectArr.join(', ');

  if (displayArr.join('') === wordToGuess) {
    wins++;
    winEl.textContent = `${wins}`;
    previousWordEl.textContent = `${wordToGuess}`;
    remainingGuesses = 10;
    remainingGuessesEl.textContent = `${remainingGuesses}`;
    startGame();
  }
  
  if (remainingGuesses === 0) {
    losses++;
    loseEl.textContent = `${losses}`;
    previousWordEl.textContent = `${wordToGuess}`;
    remainingGuesses = 10;
    remainingGuessesEl.textContent = `${remainingGuesses}`;
    startGame();
  }
})

function wordPick() {
  displayArr = [];
  for (var i = 0; i < wordToGuess.length; i++) {
    if (correctArr.includes(wordToGuess[i])) {
      displayArr.push(wordToGuess[i]);
    } else {
      displayArr.push('_');
    }
  }
  var displayStr = displayArr.join('');
  wordToGuessEl.textContent = displayStr;
  incorrectLettersEl.textContent = incorrectArr.join(', ');
}
