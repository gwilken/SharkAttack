
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



	this.guess = function(guessedLetter) {

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

					// 

						while (guess.exec(this.word)) {

							var check = guess.exec(this.word);
							this.hiddenWord[check.index] = guessedLetter;

						}

						this.lettersPlayed.inWord.push(guessedLetter);
						
						this.success();
			
						}
				}


	this.fail = function() {

		document.getElementById("guessed").innerHTML = this.lettersPlayed.notInWord.join('');

		this.guessesLeft--;
		
		if (this.guessesLeft === 0) {
			this.endOfGame(false);
		}

		this.message('try ANOTHER LETTER you snivilling deck swab!');

		scum.play();

		this.updateBoard();

	}


	this.success = function() {

		this.message("ARR that's the spirit!");

		document.getElementById("word").innerHTML = this.hiddenWord.join('');

		arr.play();

		this.updateBoard();

		if (this.hiddenWord.join().includes('_') === false) {

			this.endOfGame(true);		
		}

	}


	this.updateBoard = function() {

		if(this.guessesLeft > 0) {
			
			guessesHtml = this.guessesLeft + " parleys left";

			document.getElementById("parley").innerHTML = guessesHtml;
		
		}

		winsHtml = "<img src='assets/images/rum.png' class='rum'>".repeat(this.user.getWins());

		document.getElementById("winsDiv").innerHTML = winsHtml;

	
		losesHtml = "<img src='assets/images/bones.png' class='jollyRoger'>".repeat(this.user.getLosses());

		document.getElementById("lossesDiv").innerHTML = losesHtml;



	}


	this.endOfGame = function(win) {

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
		
	
		newGame = new Game(user, pirateWords[Math.floor(Math.random() * pirateWords.length)]);

		this.updateBoard();	
			
	}


	this.message = function(msg) {

		document.getElementById("message").innerHTML = msg;
	
	}

	this.updateBoard();

}


var user = new User('Greg');

var newGame = new Game(user, pirateWords[Math.floor(Math.random() * pirateWords.length)]);



document.onkeyup = function(event) {

	if(newGame) {
		
		var userInput = event.keyCode;

		console.log(event);

		if(userInput > 64 && userInput < 91) {

			newGame.guess(String.fromCharCode(userInput));

		} else newGame.message('try entering some REAL characters you worthless peice of shark bait!');
	}

}








