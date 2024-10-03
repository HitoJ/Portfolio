$(document).ready(function(){
  // List of words with hints
  let wordsWithHints = [
      { word: "hello", hint: "A common greeting" },
      { word: "world", hint: "The Earth, our planet" },
      { word: "jquery", hint: "A popular JavaScript library" },
      { word: "bootstrap", hint: "A CSS framework" },
      { word: "hangman", hint: "The name of this game!" },
      { word: "javascript", hint: "The language used to code this game" },
      { word: "html", hint: "Markup language for creating webpages" }
  ];

  // Select a random word and its hint
  let randomIndex = Math.floor(Math.random() * wordsWithHints.length);
  let chosenWord = wordsWithHints[randomIndex].word;
  let chosenHint = wordsWithHints[randomIndex].hint;
  
  // Prepare the word display with underscores
  let displayWord = "_ ".repeat(chosenWord.length).trim();
  let tries = 5;

  // Set the initial word display and hint
  $('#word').text(displayWord);
  $('#hint').text(chosenHint);  // Display the hint

  // Event listener for Guess button
  $('#guess-btn').click(function(){
      let guess = $('#guess-input').val().toLowerCase();
      if (guess.length !== 1 || !/^[a-z]$/.test(guess)) {
          $('#message').text("Please enter a valid single letter.");
          return;
      }

      let newDisplay = "";
      let correctGuess = false;

      // Update the word display based on the guess
      for (let i = 0; i < chosenWord.length; i++) {
          if (chosenWord[i] === guess) {
              newDisplay += guess + " ";
              correctGuess = true;
          } else {
              newDisplay += displayWord[2 * i] + " ";
          }
      }

      displayWord = newDisplay.trim();
      $('#word').text(displayWord);
      $('#guess-input').val('');

      // If the guess is incorrect, reduce the tries
      if (!correctGuess) {
          tries--;
          $('#tries-count').text(tries);
      }

      // Check if the game is over (win or lose)
      if (tries === 0) {
          $('#message').text("Game Over! The word was: " + chosenWord);
          $('#guess-btn').prop('disabled', true);
      } else if (displayWord.replace(/ /g, '') === chosenWord) {
          $('#message').text("Congratulations! You've guessed the word.");
          $('#guess-btn').prop('disabled', true);
      }
  });

  // Event listener for Reset button
$('#reset-btn').click(function(){
  // Select a new random word and its hint
  randomIndex = Math.floor(Math.random() * wordsWithHints.length);
  chosenWord = wordsWithHints[randomIndex].word;
  chosenHint = wordsWithHints[randomIndex].hint;
  
  // Reset the game state
  displayWord = "_ ".repeat(chosenWord.length).trim();
  tries = 5;

  // Update the UI
  $('#word').text(displayWord);
  $('#hint').text(chosenHint);  // Display the new hint
  $('#tries-count').text(tries);
  $('#message').text("");
  $('#guess-btn').prop('disabled', false);
});

document.getElementById("current-year").textContent = new Date().getFullYear();


});
