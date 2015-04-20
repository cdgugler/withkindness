WithKindness.Sprite.Alien = function Alien(game, speed) {
    var sideOptions = [-50, 650];
    var side = game.rnd.pick(sideOptions);
    var y = game.rnd.integerInRange(200, 380);
    Phaser.Sprite.call(this, game, side, y, 'sprites', 'AlienStand');
    game.add.existing(this);

    this.animations.add('walking', ['AlienWalk1', 'AlienWalk2', 'AlienStand'], 10, true);
    this.animations.add('standing', ['AlienStand'], false, false);
    this.spittingAnimation = this.animations.add('spitting', ['AlienSpitting', 'AlienSpitting', 'AlienStand'], false, false);

    this.animations.play('walking');

    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.setSize(23, 50, 0, 5);

    this.yAdjustment = 0;
    this.facing = 'right';
    this.anchor.setTo(.5,.5); // so we can flip it
    this.speed = speed;
    this.friction = 3;
    this.bodyMove = 0;
    this.isEmbraced = false;
    this.game.allSprites.sprites.push(this);
    this.game.allSprites.sortSprites();
    this.timer = game.time.create(this.game);
    this.timer.loop(500, this.spitChance, this);
    this.timer.start();
    this.game.aliens.push(this);
};

WithKindness.Sprite.Alien.prototype = Object.create(Phaser.Sprite.prototype);
WithKindness.Sprite.Alien.prototype.constructor = WithKindness.Sprite.Alien;

WithKindness.Sprite.Alien.prototype.die = function (state, message, audioFx) {
}

WithKindness.Sprite.Alien.prototype.update = function () {
    if (this.alive) {
        this.moveToPlayer();
    }
}

WithKindness.Sprite.Alien.prototype.spitChance = function () {
    if (this.game.rnd.integerInRange(1,100) < 20) {
        this.spit();
    }
}


WithKindness.Sprite.Alien.prototype.moveToPlayer = function () {
    if (this.spittingAnimation.isFinished && !this.isEmbraced) {
        this.animations.play('walking');
    }
    if (this.body.x < this.game.player.body.x && !this.isEmbraced) {
        this.scale.x = 1;
        this.body.x += this.speed;
    } else if (!this.isEmbraced) {
        this.scale.x = -1;
        this.body.x -= this.speed;
    }
    if (this.body.y + 2 < this.game.player.body.y && !this.isEmbraced) {
        this.body.y += this.speed;
    } else if (!this.isEmbraced) {
        this.body.y -= this.speed;
    }
}

WithKindness.Sprite.Alien.prototype.spit = function () {
    if (this.alive) {
        this.animations.play('spitting');
        this.spitSprite = new WithKindness.Sprite.AlienSpit(this.game, this.body.x, this.body.y, this.scale.x, this.speed);
    }
}
