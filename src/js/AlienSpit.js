WithKindness.Sprite.AlienSpit = function AlienSpit(game, x, y, direction, speed, originalY) {
    Phaser.Sprite.call(this, game, x, y, 'sprites', 'AlienSpit');
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.setSize(16, 16, 0, 0);
    this.anchor.setTo(.5,.5); // so we can flip it
    this.yAdjustment = 0;

    if (direction > 0) {
        this.x += 28 * direction;
        this.body.x += 28 * direction;
    } else {
        this.body.x += 8 * direction;
    }

    game.add.existing(this);


    this.speed = speed * 2;
    this.friction = 3;
    this.scale.x = direction;
    
    this.checkWorldBounds = true;
    this.game.allSprites.sprites.push(this);
    this.game.allSprites.sortSprites();
    this.game.spits.push(this);

    
    this.events.onOutOfBounds.add(function(obj) {
        obj.kill();
        var i = this.game.allSprites.sprites.indexOf(this);
        this.game.allSprites.sprites.splice(i, 1);

    }, this);
};

WithKindness.Sprite.AlienSpit.prototype = Object.create(Phaser.Sprite.prototype);
WithKindness.Sprite.AlienSpit.prototype.constructor = WithKindness.Sprite.AlienSpit;

WithKindness.Sprite.AlienSpit.prototype.update = function () {
    if (this.alive) {
        this.body.x += this.scale.x * this.speed;
    }
}
