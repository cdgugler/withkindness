WithKindness.Game = function (game) {
    this.game;		//	a reference to the currently running game
    this.add;		//	used to add sprites, text, groups, etc
    this.camera;	//	a reference to the game camera
    this.cache;		//	the game cache
    this.input;		//	the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
    this.load;		//	for preloading assets
    this.math;		//	lots of useful common math operations
    this.sound;		//	the sound manager - add a sound, play one, set-up markers, etc
    this.stage;		//	the game stage
    this.time;		//	the clock
    this.tweens;    //  the tween manager
    this.state;	    //	the state manager
    this.world;		//	the game world
    this.particles;	//	the particle manager
    this.physics;	//	the physics manager
    this.rnd;		//	the repeatable random number generator
};

WithKindness.Game.prototype = {

	create: function () {
        var gravityY = 1200;
        var bgColor = '#333';
        var playerStartX = 0;
        var playerStartY = 0;

        this.game.physics.enable(this, Phaser.Physics.ARCADE);

        this.game.stage.backgroundColor = bgColor;

        this.game.player = new WithKindness.Sprite.Player(this.game, playerStartX, playerStartY);

        this.game.cursors = this.game.input.keyboard.createCursorKeys();
        this.game.gameOver = false;

	},

	update: function () {
	},

	quitGame: function (pointer) {

        this.game.player = null;
        this.game.camera.x = 0;
        this.game.camera.y = 0;

		this.state.start('MainMenu');
	},
    render: function () {
        // this.game.debug.body(this.game.player);
        // this.game.debug.body(this.game.player.bodyLeft);
        // this.game.debug.body(this.game.player.legLeft);
    }

};
