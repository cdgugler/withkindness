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
        var playerStartX = 310;
        var playerStartY = 220;
        this.gameOver = false;
        this.game.aliens = [];
        this.game.spits = [];
        this.game.allSprites = { 
            top: this.game.add.group(),
            sprites: [], 
            sortSprites: function() {
                this.sprites.sort(function(a,b) {
                    var first = a.body.y + a.yAdjustment;
                    var second = b.body.y + b.yAdjustment;
                    if (first > second) {
                        return 1;
                    }
                    if (first < second) {
                        return -1;
                    }
                    return 0;
                });
            this.sprites.forEach(function(sprite) {
                sprite.bringToTop();
            });
            }
        };

        var hugKey = this.game.input.keyboard.addKey(Phaser.Keyboard.F);
        hugKey.onDown.add(function() {
            if (this.game.player.embraced) {
                this.game.player.embraceHarder();
            } else {
                if (!this.game.player.isHugging) {
                    this.game.player.hug();
                }
            }
        }, this);

        this.game.physics.enable(this, Phaser.Physics.ARCADE);

        this.game.stage.backgroundColor = bgColor;
		this.spaceBackground = this.add.sprite(0, 0, 'preloaderBackground');
		this.groundBackground = this.add.sprite(0, this.game.stage.height - 180, 'groundBG');
        this.game.playerHealthBar = this.game.add.sprite(10, 10, 'sprites', 'playerhealth');

        this.game.player = new WithKindness.Sprite.Player(this.game, playerStartX, playerStartY);
        this.game.alien = new WithKindness.Sprite.Alien(this.game, 1);

        this.game.cursors = this.game.input.keyboard.createCursorKeys();
        this.game.gameOver = false;

        this.newFriend = function() {
            new WithKindness.Sprite.Alien(this.game, 1);
        };

        this.game.alientimer = this.game.time.create(this.game);
        this.game.alientimer.loop(2500, this.newFriend, this);
        this.game.alientimer.start();


	},

	update: function () {
        this.game.allSprites.sortSprites();
        this.game.physics.arcade.overlap(this.game.player, this.game.aliens, this.game.player.alienCollision);
        this.game.physics.arcade.overlap(this.game.player, this.game.spits, this.game.player.hit);
        this.game.playerHealthBar.width = this.game.player.health;
	},

	quitGame: function (pointer) {

        this.game.player = null;
        this.game.camera.x = 0;
        this.game.camera.y = 0;

		this.state.start('MainMenu');
	},
    render: function () {
        // this.game.debug.body(this.game.player);
        // this.game.debug.body(this.game.alien);
        // this.game.debug.body(this.game.player.bodyLeft);
        // this.game.debug.body(this.game.player.legLeft);
    }

};
