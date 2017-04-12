
var pirateWords = ['avast', 'arrrrrrghhh', 'mutiney', 'matey', 'binnacle', 'head', 'monkey', 'parrot', 'landlubber', 'booty', 'cutlass', 'jolly', 'jollyroger', 'shark', 'scallywag','whale', 'plank', 'yohoho', 'blimey', 'heave', 'treasure', 'parley', 'holdfast', 'skull', 'pacific' ];


var User = function(name) {

	this.name = name;
	this.wins = 0;
	this.losses = 0;
}


var Game = function(name, wordToGuess) {

	console.log(wordToGuess);

	this.word = wordToGuess;
	this.hiddenWord = '_'.repeat(this.word.length).split('');	
	this.guessesLeft = this.word.length;
	this.user = new User(name);
	this.active = true;
	this.lettersPlayed = {
		inWord: [],
		notInWord: []
	};


	var scum = document.getElementById("audioScum");
	var arr = document.getElementById("audioArr");	

	document.getElementById("word").innerHTML = this.hiddenWord.join('');


	this.guess = function(guessedLetter) {

		if ( this.lettersPlayed.notInWord.includes(guessedLetter) || this.lettersPlayed.inWord.includes(guessedLetter) ) {

				this.message('ya already guessed that letter you scurvy wentch!');
			
			} else if( !this.word.includes(guessedLetter) ) {

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

		this.guessesLeft--;
		
		scum.play();

		console.log(this.lettersPlayed.notInWord);

		if(this.guessesLeft <= 0) this.endOfGame();

	}


	this.success = function() {

		document.getElementById("word").innerHTML = this.hiddenWord.join('');

		arr.play();

	}


	this.endOfGame = function() {

		console.log('game over');
		this.active === false;

		//game over html logic

	}

	this.message = function(msg) {
		console.log('played');
		document.getElementById("message").innerHTML = msg.toUpperCase();
	}

}


var newGame = new Game('Greg', pirateWords[Math.floor(Math.random() * pirateWords.length)]);


document.onkeyup = function(event) {

	if(newGame.active) {
		
		var userInput = event.key;

		newGame.guess(userInput);

	} else console.log('Out of guesses!');

}








