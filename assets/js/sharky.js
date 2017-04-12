
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
	
	this.guess = function(guessedLetter) {

		if(!this.word.includes(guessedLetter)) {

			this.lettersPlayed.notInWord.push(guessedLetter);
			this.fail();

		} else {

			var guess = new RegExp( guessedLetter , 'ig');

			while (check = guess.exec(this.word)) {

				this.hiddenWord[check.index] = guessedLetter;

			}

			console.log(this.hiddenWord);	
		}
	

	
	}

	this.success = function() {

	}

	this.fail = function() {
		this.guessesLeft--;

		console.log('guess left:', this.guessesLeft);
			
		if(this.guessesLeft <= 0) this.endOfGame();
	}

	this.endOfTurn = function(success, array) {
		
		if(success) {

			console.log('letter(s) found at: ', array);

		
		} else {

			console.log('no letters');
			this.guessesLeft--;
			console.log(this.guessesLeft);
			
			if(this.guessesLeft <= 0) this.endOfGame();
		
		}

	}

	this.endOfGame = function() {

		console.log('game over');
		this.active === false;

		//game over html logic

	}

	this.message = function(msg) {
		//messmsg
	}

}


var newGame = new Game('Greg', pirateWords[Math.floor(Math.random() * pirateWords.length)]);


document.onkeyup = function(event) {

	if(newGame.active) {
		
		var userInput = event.key;

		newGame.guess(userInput);

	} else console.log('Out of guesses!');

}








