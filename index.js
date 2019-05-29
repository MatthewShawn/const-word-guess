var Word = require("./Word");

// Load the NPM Package inquirer
var inquirer = require("inquirer");

var wordList = ["Saving Private Ryan", "The Good The Bad and The Ugly", "Star Wars",
    "The Empire Strikes Back", "Return of The Jedi", "Casablanca", "The Big Sleep",
    "Key Largo", "Raiders of the Lost Ark", "A Fistful of Dollars", "For a Few Dollars More",
    "Tootsie", "Mr Mom", "Empire of the Sun", "Tears of the Sun", "Amadeus", "Jaws",
    "Attack of the Killer Tomatoes", "Monty Python and the Holy Grail", "Stardust",
    "The Day The Earth Stood Still", "Forbidden Planet"
]

var badGuesses = [];
var maxFails;
var aTitle;
var theWord;


//  This pile of code was getting repeated...often.
var reset = function() {
    maxFails = 5;
    aTitle = wordList[Math.floor(Math.random() * wordList.length)];
    theWord = new Word(aTitle);
    badGuesses = [];
}


// Prompt the user for a character, and process the result
var askForALetter = function() {
    inquirer
        .prompt([
            // Get a character guess from the user.
            {
                type: "input",
                message: "Guess a letter to a movie title (no numbers or punctuation).",
                name: "aGuess"
            }
        ])
        .then(function(inquirerResponse) {
            // if the user made a valid guess, check to see if it is in the word.
            if (inquirerResponse.aGuess[0] !== undefined) {
                var gotOne = theWord.guessALetter(inquirerResponse.aGuess[0]);
                if (gotOne === false) {
                    // the letter guessed is not in the word
                    maxFails--;
                    // keep a list of incorrect guesses for display to the user
                    // I *could* prevent duplicates if I was feeling charitable...I am not
                    badGuesses.push(inquirerResponse.aGuess[0]);
                    if (maxFails === 0) {
                        // too many fails, so reset the game
                        console.log("Bummer!  The movie was: " + aTitle) + "/n/n";
                        reset();
                    } else {
                        // throw the user a bone, so he will not guess duplicates...maybe
                        console.log("Already guessed: " + badGuesses);
                    }
                } else {
                    // if the user guess all the letters, give kudos and reset the game
                    if (theWord.isDone()) {
                        console.log("Horray!!! you got the movie: " + aTitle + "\n");
                        console.log("Do it again!!! \n\n");
                        reset();
                    }
                }
            } else {
                console.log("I translate that as junk. \n\n");
                maxFails--;
                // no bone throwing for inputing junk
                if (maxFails === 0) {
                    console.log("Bummer!  The movie was: " + aTitle) + "/n/n";
                    reset();
                }
            }
            //after all the processing, output the current state of the word
            console.log(theWord.getWordString());
            // recursive call to prompt the user for a letter guess
            askForALetter();
        });
}

// begin the game
reset();
console.log(theWord.getWordString());
askForALetter();