// Array of words to be guessed
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

// Retrieve elements from HTML
var wordToGuessEl = document.getElementById('word-to-guess');
var previousWordEl = document.getElementById('previous-word');
var incorrectLettersEl = document.getElementById('incorrect-letters');
var remainingGuessesEl = document.getElementById('remaining-guesses');
var winEl = document.getElementById('wins');
var loseEl = document.getElementById('losses');


var displayArr = []; // Array to display guessed letters
var incorrectArr = []; // Array to store incorrect guesses
var correctArr = []; // Array to store correct guesses
var previousWord = ""; // Variable to store the previous word
var remainingGuesses = 10; // Variable to store remaining guesses
var wordToGuess; // Variable to store the word to be guessed

// track wins and losses
var wins = 0;
var losses = 0;

// Initializing remaining guesses display
remainingGuessesEl.textContent = `${remainingGuesses}`;


startGame();

// Function to start the game
function startGame() {
  // Selecting a word at random from the words array
  wordToGuess = words[Math.floor(Math.random() * words.length)];
  console.log(wordToGuess);

  // Resetting arrays and variables
  correctArr = [];
  incorrectArr = [];
  displayArr = [];
  remainingGuesses = 10;

  // Displaying the initial state of the word to be guessed
  wordPick();
}

// Event listener for keyboard input
document.body.addEventListener('keyup', function (e) {
  var key = e.key.toLowerCase();
  console.log(key);

  // Validate if the input is a lowercase letter
  if (!/^[a-z]+$/.test(key)) return;


  // Checking if the letter has already been guessed
  if (incorrectArr.includes(key) || correctArr.includes(key)) return;

  // Processing the guessed letter
  if (wordToGuess.includes(key) && correctArr.indexOf(key) === -1) {
    correctArr.push(key);
    wordPick();
  } else if (!wordToGuess.includes(key) && correctArr.indexOf(key) === -1) {
    incorrectArr.push(key);
    remainingGuesses--;
    remainingGuessesEl.textContent = `${remainingGuesses}`;
  }

  // Updating the display of incorrect letters
  incorrectLettersEl.textContent = incorrectArr.join(', ');

  // Checking if the user has won or lost
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

// Function to update the display of the word to be guessed
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
