// constructor function which should be able to either display an underlying 
// character or a blank placeholder (such as an underscore), depending on 
// whether or not the user has guessed the letter.
var Letter = function(theLetter) {
    this.underLetter = theLetter;
    this.isLetterGuessed = false;


    // method that returns the underlying letter if guessed is true, and 
    // an underscore "_" if false.
    this.getLetter = function() {
        if (this.underLetter === " " || this.isLetterGuessed) {
            //console.log("");
            return this.underLetter;
        } else {
            //console.log("");
            return "_";
        }
    };

    // method which that takes a character as an argument and checks it 
    // against the underlying character, updating the stored boolean value 
    // to true if it was guessed correctly
    this.guessLetter = function(aGuessedLetter) {
        if (aGuessedLetter === this.underLetter) {
            //console.log("");
            this.isLetterGuessed = true;
            return true;
        }
        return false;
    };


};

var testLet = new Letter("F");
console.log("We should see an _ next, because isLetterGuessed defaults to false:\n");
var aString = testLet.getLetter();
console.log(aString + "\n\n");
var didWeGuessIt = testLet.guessLetter("F");
if (didWeGuessIt) {
    console.log("We guessed it!!!");
} else { console.log("the code is busted...somehow") };