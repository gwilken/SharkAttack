
var pirateWords = ['avast', 'arrrrrrghhh', 'mutiney', 'matey', 'binnacle', 'head', 'monkey', 'parrot', 'landlubber', 'booty', 'cutlass', 'jolly', 'jollyroger', 'shark', 'scallywag','whale', 'plank', 'yohoho', 'blimey', 'heave', 'treasure', 'parley', 'holdfast', 'skull', 'pacific' ];


var User = function(name) {

	this.name = name;
	this.wins = 0;
	this.losses = 0;

	//setter and getter functions for the user object.

	this.addWin = function() {
		this.wins++;
	}

	this.addLoss = function() {
		this.losses++;
	}	

	this.getWins = function() {
		return this.wins;
	}

	this.getLosses = function() {
		return this.losses;
	}

}


var Game = function(user, wordToGuess) {

	console.log(wordToGuess); //for debuggin', and cheating you filthy pirate!

	this.user = user;
	this.word = wordToGuess.toUpperCase();
	this.hiddenWord = '_'.repeat(this.word.length).split('');	
	this.guessesLeft = this.word.length;
	this.active = true;
	this.lettersPlayed = {
		inWord: [],
		notInWord: []
	};

	
	var scum = document.getElementById("audioScum");
	var arr = document.getElementById("audioArr");	

	var instructions = "guess the PIRATE PASSWORD you filthy bilge rat! or down to Davey Jones' locker with ye!";
	
	document.getElementById("word").innerHTML = this.hiddenWord.join('');

 this.reset = function() {

	this.guess = function(guessedLetter) {

 }
		// first check if the letter has already been played, then  check if the guessed letter is in the randomly selected word.
		// kick the user out to respective branch.

		if ( this.lettersPlayed.notInWord.includes(guessedLetter) || this.lettersPlayed.inWord.includes(guessedLetter) ) {

				this.message('ya ALREADY GUESSED that letter you scurvy wentch!');
			
			} else 

				if( !this.word.includes(guessedLetter) ) {

					this.lettersPlayed.notInWord.push(guessedLetter);
					
					this.fail();

				} else {

					// turn the guessed letter into a regular expression so we can easily check against it. 

						var guess = new RegExp( guessedLetter , 'ig');

					// use a while loop to find successive matches if the guessed letter appears more than once.
					//  using .exec in this way in a while loop "the search starts at the substring of [this.word]
					// specified by the regular expression's lastIndex property (test() will also advance the lastIndex property)."
					// per the MDN documentation of RegExp.  

						while (check = guess.exec(this.word)) {

							this.hiddenWord[check.index] = guessedLetter;

						}

					// push the guessed letters to an array so we can check them later.

						this.lettersPlayed.inWord.push(guessedLetter);
						
						this.success();
			
						}
				}


	this.fail = function() {

		// display the letters guessed but not in random word by joining the array.

		document.getElementById("guessed").innerHTML = this.lettersPlayed.notInWord.join('');

		this.guessesLeft--;
		
		if (this.guessesLeft === 0) {
			this.endOfGame(false);
		}

		this.message('try ANOTHER LETTER you snivilling deck swab!');

		// play the loser sound and update the score board! I'm just kidding, there are no losers here.

		scum.play();

		this.updateBoard();

	}


	this.success = function() {

		this.message("ARR that's the spirit!");

		// display the current state of the hidden word by setting html as the joined the array.

		document.getElementById("word").innerHTML = this.hiddenWord.join('');

		arr.play();

		this.updateBoard();

		// we can check if all the letters have been guessed by just looking for any underscores in the word.
		// if none, all letters have been guessed. game over with a win.  

		if (this.hiddenWord.join().includes('_') === false) {

			this.endOfGame(true);		
		}

	}


	this.updateBoard = function() {

		if(this.guessesLeft > 0) {
			
			guessesHtml = this.guessesLeft + " parleys left";

			document.getElementById("parley").innerHTML = guessesHtml;
		
		}

		// the wins and losses counter are mainted by getting the users current win/lose vaiables
		// then doing a .repeat on the div! the images will reflect the score easy.

		winsHtml = "<img src='assets/images/rum.png' class='rum'>".repeat(this.user.getWins());

		document.getElementById("winsDiv").innerHTML = winsHtml;

	
		losesHtml = "<img src='assets/images/bones.png' class='jollyRoger'>".repeat(this.user.getLosses());

		document.getElementById("lossesDiv").innerHTML = losesHtml;



	}


	this.endOfGame = function(win) {

		// after win or lose update the users win/loss variable using the setter functions we created on the
		// user object.

		if(win) {
			this.message('ye arrrrr a PIRATE indeed! welcome aboard! Try to guess me another.');
			
			this.guessesLeft = null;

			document.getElementById("guessed").innerHTML = '';

			this.user.addWin();

		}

		if(!win) {
			this.message("'tis soon down to the DEPTHS with you scallywag! try me another.");
			
			this.lettersPlayed.notInWord = [];

			this.guessesLeft = null;

			document.getElementById("guessed").innerHTML = '';

			this.user.addLoss();

		}
		
		// create a new game once game is over. THERE IS NO ESCAPE FROM THE PIRATE GAME!
	
		newGame = new Game(user, pirateWords[Math.floor(Math.random() * pirateWords.length)]);

		this.updateBoard();	
			
	}

	// a simple method we can use to update the h1. used as a message board to users.

	this.message = function(msg) {

		document.getElementById("message").innerHTML = msg;
	
	}

	this.updateBoard();

}


// create a user, then build the game with that user and a randomly selected pirate word from array.

var user = new User('Greg');

var newGame = new Game(user, pirateWords[Math.floor(Math.random() * pirateWords.length)]);



document.onkeyup = function(event) {

	if(newGame) {
		
		// we will get the html keycode instead of the key string from the event object.

		var userInput = event.keyCode;

		// we can check user input by looking at the html keycode range. 65 == 'A' and 91 == 'Z'
		// all other inputs produce an error message to the user and does not send the game a
		// guessed letter

		if(userInput > 64 && userInput < 91) {

			newGame.guess(String.fromCharCode(userInput));

		} else newGame.message('try entering some REAL characters you worthless peice of shark bait!');
	}

}








