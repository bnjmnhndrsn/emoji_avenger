window.EmojiA = (window.EmojiA) ? window.EmojiA : {};

EmojiA.GameView = (function(){

var GameView = function(canvas) {
    	this.ctx = canvas.getContext("2d");
};

GameView.prototype.start = function(callback) {
	this._isPlaying = true;
	this._isPaused = false;
	this.game = new EmojiA.Game();
	var gameview = this;

	this.bindKeyHandlers();

    var gameInterval = setInterval(function(){
		if (!gameview.isPaused()){
			gameview.game.hero.fireBullet();
			gameview.checkKeyHandlers();
			gameview.game.step();
			gameview.game.draw(gameview.ctx);
		}

		if (gameview.game.isOver()){
		clearInterval(gameInterval);
		callback();
		}
    }, 20);
};

GameView.prototype.isPaused = function(){
	return this._paused;
};

GameView.prototype.pause = function(){
	this._paused = true;
};

GameView.prototype.resume = function(){
	this._paused = false;
};

GameView.prototype.checkKeyHandlers = function(){
	TURN = .1;
	direction = 0;
    if (key.isPressed(37)) {
      direction -= TURN;
    }
    if (key.isPressed(39)) {
      direction += TURN;
    }
	this.game.hero.incrementDirection(direction);
};

GameView.prototype.bindKeyHandlers = function(){
	key.unbind('down');
	key.unbind('left', 'right');
	key.unbind('up', 'space');

	var gameview = this;

	key('down', function(event){
		event.preventDefault();
		console.log('asdfasd');
		gameview.game.hero.reverse();
	});

	key('left, right', function(event){
		event.preventDefault();
	})

	key('up, space', function(event){
		event.preventDefault();
		gameview.game.hero.zoom();
	})
};

GameView.prototype.isPlaying = function(){
	return this._isPlaying;
}

return GameView;

})();
