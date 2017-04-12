
var pirateWords = ['avast', 'arrrrrrghhh', 'mutiney', 'matey', 'binnacle', 'head', 'monkey', 'parrot', 'landlubber', 'booty', 'cutlass', 'jolly', 'jollyroger', 'shark', 'scallywag','whale', 'plank', 'yohoho', 'blimey', 'heave', 'treasure', 'parley', 'holdfast', 'skull', 'pacific' ];


var User = function(name) {

	this.name = name;
	this.wins = 0;
	this.losses = 0;

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

	console.log(wordToGuess);

	this.user = user;
	this.word = wordToGuess;
	this.hiddenWord = '_'.repeat(this.word.length).split('');	
	this.guessesLeft = this.word.length;
	this.active = true;
	this.lettersPlayed = {
		inWord: [],
		notInWord: []
	};


	var scum = document.getElementById("audioScum");
	var arr = document.getElementById("audioArr");	

	var instructions = "out with the PIRATE PASSWORD you filthy bilge rat! or down to Davey Jones' locker with ye!";
	

	document.getElementById("word").innerHTML = this.hiddenWord.join('');


	this.guess = function(guessedLetter) {

		if (guessedLetter.charCodeAt(0) < 65 || guessedLetter.charCodeAt(0) > 90 || guessedLetter === 'SHIFT' || guessedLetter === 'META' || guessedLetter === 'CONTROL' || guessedLetter === 'ALT' || guessedLetter === 'ARROWUP' || guessedLetter === 'ARROWDOWN'  || guessedLetter === 'ARROWLEFT'  || guessedLetter === 'ARROWRIGHT' || guessedLetter === 'CAPSLOCK' || guessedLetter === 'BACKSPACE') {

			this.message('try entering some REAL characters you worthless peice of shark bait!');
		
		} else

		if ( this.lettersPlayed.notInWord.includes(guessedLetter) || this.lettersPlayed.inWord.includes(guessedLetter) ) {

				this.message('ya ALREADY GUESSED that letter you scurvy wentch!');
			
			} else 

				if( !this.word.includes(guessedLetter) ) {

					this.lettersPlayed.notInWord.push(guessedLetter);
					
					this.fail();

				} else {

						var guess = new RegExp( guessedLetter , 'ig');

						while (check = guess.exec(this.word)) {

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

		if(this.guessesLeft <= 0) this.endOfGame();

	}


	this.success = function() {

		this.message("ARR that's the spirit!");

		document.getElementById("word").innerHTML = this.hiddenWord.join('');

		arr.play();

		if (this.hiddenWord.join().includes('_') === false) {
			this.endOfGame(true);
			console.log('win');
		}

	}


	this.endOfGame = function(win) {

		if(win) {
			this.user.addWin();
		}

		if(!win) {
			this.user.addLoss();
		}

		this.message('try again you worthless deck swab! enter a NEW PIRATE PASSWORD!');
		
		console.log('wins', this.user.getWins());

		console.log('losses', this.user.getLosses());


		newGame = new Game(user, pirateWords[Math.floor(Math.random() * pirateWords.length)]);

	}


	this.message = function(msg) {

		document.getElementById("message").innerHTML = msg;
	
	}

}


var user = new User('Greg');

var newGame = new Game(user, pirateWords[Math.floor(Math.random() * pirateWords.length)]);



document.onkeyup = function(event) {

	if(newGame) {
		
		var userInput = event.key.toUpperCase();

			console.log(userInput.charCodeAt(0));

			newGame.guess(userInput);

		} //else console.log('invalid key');
	} 










