WithKindness.MainMenu = function (game) {
	this.music = null;
	this.playButton = null;
};

WithKindness.MainMenu.prototype = {

	create: function () {
        var titleWidth = 185;
        var titleHeight = 20;
		this.background = this.add.sprite(0, 0, 'preloaderBackground');
		this.playButton = this.add.button(this.game.camera.x + gameWidth / 2 - titleWidth / 2, 
                                          this.game.camera.y + gameHeight / 2 - titleHeight / 2, 
                                          'sprites', 
                                          this.startGame, 
                                          this, 
                                          'title', 
                                          'title');
	},

	update: function () {
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            this.startGame();
        }
	},

	startGame: function (pointer) {
		this.state.start('Game');
	}

};
