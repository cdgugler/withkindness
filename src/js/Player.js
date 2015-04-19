/*
 * Player Class
 *
 */

WithKindness.Sprite.Player = function Player(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, null);
    game.add.existing(this);

    this.legLeft = game.add.sprite(0, 0 + 20, 'sprites', 'FootStill-l');
    this.legRight = game.add.sprite(0, 0 + 20, 'sprites', 'FootStill-r');
    this.bodyLeft = game.add.sprite(0 + 2, 0, 'sprites', 'BodyStill-l');
    this.bodyRight = game.add.sprite(0 + 2, 0, 'sprites', 'BodyStill-r');

    this.addChild(this.legLeft);
    this.addChild(this.legRight);
    this.addChild(this.bodyLeft);
    this.addChild(this.bodyRight);


    this.legLeft.animations.add('walking', ['Walk1-l', 'Walk2-l', 'Walk3-l', 'Walk4-l', 'Walk5-l', 'Walk6-l', 'Walk7-l', 'Walk8-l'], 10, true);
    this.legRight.animations.add('walking', ['Walk1-r', 'Walk2-r', 'Walk3-r', 'Walk4-r', 'Walk5-r', 'Walk6-r', 'Walk7-r', 'Walk8-r'], 10, true);
    this.legLeft.animations.add('standing', ['FootStill-l'], false, false);
    this.legRight.animations.add('standing', ['FootStill-r'], false, false);
    this.bodyLeft.animations.add('hug', ['Hug1-l', 'Hug2-l', 'Hug3-l'], 10, false);
    this.bodyRight.animations.add('hug', ['Hug1-r', 'Hug2-r', 'Hug3-r'], 10, false);
    this.bodyLeft.animations.add('unhug', ['Hug2-l', 'Hug1-l', 'BodyStill-l'], false, false);
    this.bodyRight.animations.add('unhug', ['Hug2-r', 'Hug1-r', 'BodyStill-r'], false, false);
    this.bodyLeft.animations.add('standing', ['BodyStill-l'], false, false);
    this.bodyRight.animations.add('standing', ['BodyStill-r'], false, false);

    this.bodyLeft.anchor.setTo(.5, .5);
    this.bodyRight.anchor.setTo(.5, .5);
    this.legLeft.anchor.setTo(.5, .5);
    this.legRight.anchor.setTo(.5, .5);

    this.initBodyParts();

    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.collideWorldBounds = true;
    this.body.setSize(28, 50, 3, 5);

    this.facing = 'right';
    this.anchor.setTo(.5,.5); // so we can flip it
    this.speed = 2;
    this.friction = 3;
    this.bodyMove = 0;
};

WithKindness.Sprite.Player.prototype = Object.create(Phaser.Sprite.prototype);
WithKindness.Sprite.Player.prototype.constructor = WithKindness.Sprite.Player;

WithKindness.Sprite.Player.prototype.die = function (state, message, audioFx) {
}

WithKindness.Sprite.Player.prototype.initBodyParts = function() {
    this.children.forEach(function(child) {
        child.game.physics.enable(child, Phaser.Physics.ARCADE);
        child.body.collideWorldBounds = true;
    });
}

WithKindness.Sprite.Player.prototype.moveLeft = function() {
    if (this.game.player.facing != 'left') {
        this.game.player.facing = 'left';
        this.game.player.scale.x = -1;
    }
    this.game.player.bodyMovin();
    this.game.player.legLeft.animations.play('walking');
    this.game.player.legRight.animations.play('walking');
    this.game.player.body.x -= this.game.player.speed;
}

WithKindness.Sprite.Player.prototype.moveRight = function() {
    if (this.game.player.facing != 'right') {
        this.game.player.facing = 'right';
        this.game.player.scale.x = 1;
    }
    this.game.player.bodyMovin();
    this.game.player.legLeft.animations.play('walking');
    this.game.player.legRight.animations.play('walking');
    this.game.player.body.x += this.game.player.speed;
}

WithKindness.Sprite.Player.prototype.bodyMovin = function() {
    this.bodyMove++;
    if (!this.bodyMoved && this.bodyMove % 10 == 0) {
        this.bodyMoved = true;
        this.game.player.bodyLeft.body.y +=2;
        this.game.player.bodyRight.body.y +=2;
    } else if (this.bodyMoved && this.bodyMove % 10 == 0) {
        this.bodyMoved = false;
        this.game.player.bodyLeft.body.y -=2;
        this.game.player.bodyRight.body.y -=2;
    }
}

WithKindness.Sprite.Player.prototype.moveUp = function() {
    if (this.game.player.facing != 'up') {
        this.game.player.facing = 'up';
    }
    this.game.player.bodyMovin();
    this.game.player.body.y -= this.game.player.speed;
    this.game.player.legLeft.animations.play('walking');
    this.game.player.legRight.animations.play('walking');
}

WithKindness.Sprite.Player.prototype.moveDown = function() {
    if (this.game.player.facing != 'down') {
        this.game.player.facing = 'down';
    }
    this.game.player.bodyMovin();
    this.game.player.animations.play('running');
    this.game.player.body.y += this.game.player.speed;
    this.game.player.legLeft.animations.play('walking');
    this.game.player.legRight.animations.play('walking');
}

WithKindness.Sprite.Player.prototype.standStill = function() {
    if (this.game.player.facing != 'idle') {
        this.game.player.facing = 'idle';
        this.game.player.legLeft.animations.play('standing');
        this.game.player.legRight.animations.play('standing');
    }
}

WithKindness.Sprite.Player.prototype.hug = function() {
    if (!this.game.player.isHugging) {
        this.game.player.isHugging = true;
        this.game.player.hugDelay = 25;
        this.game.player.bodyLeft.animations.play('hug');
        this.game.player.bodyRight.animations.play('hug');
    }
}

WithKindness.Sprite.Player.prototype.update = function() {
    WithKindness.Util.handleInput(this.game, this.game.state.getCurrentState());
    if (this.game.player.isHugging) { 
        this.game.player.hugDelay--; 
        if (this.game.player.hugDelay < 0) {
            this.game.player.isHugging = false;
            this.game.player.bodyLeft.animations.play('unhug');
            this.game.player.bodyRight.animations.play('unhug');
        }
    }
}

