WithKindness.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;
	this.ready = false;

};

WithKindness.Preloader.prototype = {

	preload: function () {
		this.background = this.add.sprite(0, 0, 'preloaderBackground');
		this.preloadBar = this.add.sprite(this.game.centerX, this.game.centerY, 'preloaderBar');

		//	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.
		this.load.setPreloadSprite(this.preloadBar);

        this.load.image('groundBG', 'images/ground.png');
		this.load.atlasJSONHash('sprites', 'build/images/sprites.png', 'build/images/sprites.json');
	},

	create: function () {
		this.preloadBar.cropEnabled = false;
		this.state.start('MainMenu');
	},
};
