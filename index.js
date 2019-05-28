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

var maxFails = 5;
var aTitle = wordList[Math.floor(Math.random() * wordList.length)];
var theWord = new Word(aTitle);
console.log(theWord.getWordString());

// Create a "Prompt" with a series of questions.
var askForALetter = function() {
    inquirer
        .prompt([
            // Here we create a basic text prompt.
            {
                type: "input",
                message: "Guess a letter to a movie title (no numbers or punctuation).",
                name: "aGuess"
            }
        ])
        .then(function(inquirerResponse) {
            // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
            if (inquirerResponse.aGuess[0] !== undefined) {
                var gotOne = theWord.guessALetter(inquirerResponse.aGuess[0]);
                if (gotOne === false) {
                    maxFails--;
                    if (maxFails === 0) {
                        console.log("Bummer!  The movie was: " + aTitle) + "/n/n";
                        maxFails = 5;
                        aTitle = wordList[Math.floor(Math.random() * wordList.length)];
                        theWord = new Word(aTitle);
                    }
                } else {
                    if (theWord.isDone()) {
                        console.log("Horray!!! you got the movie: " + aTitle + "\n");
                        console.log("Do it again!!! \n\n")
                        maxFails = 5;
                        aTitle = wordList[Math.floor(Math.random() * wordList.length)];
                        theWord = new Word(aTitle);
                    }
                }
            } else {
                console.log("I translate that as junk. \n\n");
                maxFails--;
                if (maxFails === 0) {
                    console.log("Bummer!  The movie was: " + aTitle) + "/n/n";
                    maxFails = 5;
                    aTitle = wordList[Math.floor(Math.random() * wordList.length)];
                    theWord = new Word(aTitle);
                }
            }
            console.log(theWord.getWordString());
            askForALetter();
        });
}

askForALetter();