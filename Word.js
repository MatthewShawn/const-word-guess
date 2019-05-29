var Letter = require("./Letter");
// constructor function which is used to create an object representing the 
// current word the user is attempting to guess. 

var Word = function(theString) {
    this.letterArray = [];

    //Create an array of Letter objects from the string passed into the Word constructor
    for (var idx = 0; idx < theString.length; idx++) {
        //console.log("Validating that we are accessing the input string: " + theString[idx]);
        //var tee = new Letter("T");
        var letter = new Letter(theString[idx]);
        this.letterArray.push(letter);
    }


    // This Method returns the array of Letters as a string. 
    // An underscore "_" will be a placeholder, if the Letter has not been guessed.
    this.getWordString = function() {
        var outString = "";
        for (var idx = 0; idx < this.letterArray.length; idx++) {
            outString = outString + this.letterArray[idx].getLetter();
        }
        return outString;
    };

    // method which that takes a character as an argument and checks it 
    // against the Letters array, returning true is at least one match
    // is found in the Letters array
    this.guessALetter = function(aGuessedLetter) {
        var atLeastOne = false;
        if (!isAlpha(aGuessedLetter)) return false; // if the user guessed nonsense

        for (var idx = 0; idx < this.letterArray.length; idx++) {
            var checker = this.letterArray[idx].guessLetter(aGuessedLetter);
            if (!atLeastOne) atLeastOne = checker;
        }
        return atLeastOne;
    };

    this.isDone = function() {
        // loop throught the entire letterArray, and search for a non-space non-guessed letter
        //  If all the letters are either guessed or spaces, then return true.
        for (var idx = 0; idx < this.letterArray.length; idx++) {
            if (this.letterArray[idx].underLetter === " " || this.letterArray[idx].isLetterGuessed) {
                // console.log("space or letter found!")

            } else {
                //console.log("found issue, so returning false: " + this.letterArray[idx].underLetter);
                return false;
            }
        }
        return true;
    }

    // Quick and dirty function to check to see if a character is length one
    // and an alphabetic.  Returns true or false...not obvious.
    var isAlpha = function(ch) {
        return typeof ch === "string" && ch.length === 1 &&
            (ch >= "a" && ch <= "z" || ch >= "A" && ch <= "Z");
    }
};

// test code...keep
//var foo = new Word("The Cask of Amontillado");
//console.log("The next line should be all _'s and spaces, because none have been guessed.\n");
//console.log(foo.getWordString() + "\n");
//foo.guessALetter("s");
//foo.guessALetter("a");
//foo.guessALetter("l");
///console.log("The next line should have some guessed items.\n");
//console.log(foo.getWordString() + "\n");

module.exports = Word;