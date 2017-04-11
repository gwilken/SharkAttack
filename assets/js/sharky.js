
var pirateWords = ['avast', 'binnacle', 'head', 'monkey', 'parrot', 'landlubber', 'booty', 'cutlass', 'jolly', 'jolly roger', 'shark', 'scallywag','thar she blows', 'walk the plank', 'yo ho ho', 'blimey', 'heave', 'buried treasure', 'parley', 'hold fast', 'davy jones' ];

var User = function(name) {

	this.name = name;
	this.wins = 0;
	this.losses = 0;
}


var Game = function(name, wordToGuess) {

	this.word = wordToGuess.toLowerCase();
	this.letterSpaces = wordToGuess.length;
	this.guessesLeft = wordToGuess.length;
	this.user = new User(name);

	this.guess = function(letter) {

		console.log('guessed letter', letter) ;
	
		//game logic

	}

	this.updateHtml = function() {
		
		//update elements logic

	}

}


var newGame = new Game('Greg', pirateWords[Math.floor(Math.random() * pirateWords.length)]);

console.log(newGame);