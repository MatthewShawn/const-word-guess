var Letter = require("./Letter.js");
// constructor function which is used to create an object representing the 
// current word the user is attempting to guess. 

var Word = function(theString) {
    for (var idx = 0; idx < theString.length; idx++) {
        console.log("Validating that we are accessing the input string: " + theStrig[idx]);
        var letter = new Letter(theString[idx]);
        this.letterArray.push(letter);
    }


    // method that returns the underlying letter if guessed is true, and 
    // an underscore "_" if false.
    this.getWordString = function() {
        var outString = "";
        for (var idx = 0; idx < this.letterArray.length; idx++) {
            outString = outString + this.letterArray[idx].getLetter();
        }
        return outString;
    };

    // method which that takes a character as an argument and checks it 
    // against the underlying character, updating the stored boolean value 
    // to true if it was guessed correctly
    this.guessALetter = function(aGuessedLetter) {
        var atLeastOne = false;
        if (!isAlpha(aGuessedLetter)) return false; // if the user guessed nonsense

        for (var idx = 0; idx < this.letterArray.length; idx++) {
            var checker = this.letterArray[idx].guessLetter(aGuessedLetter);
            if (!atLeastOne) atLeastOne = checker;
        }
        return atLeastOne;
    };

    var isAlpha = function(ch) {
        return typeof ch === "string" && ch.length === 1 &&
            (ch >= "a" && ch <= "z" || ch >= "A" && ch <= "Z");
    }
};