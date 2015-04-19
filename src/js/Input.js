WithKindness.Util.handleInput = function (game, state) {
    if (game.cursors.left.isDown || game.input.keyboard.isDown(Phaser.Keyboard.A)) {
        game.player.movingHorizontal = true;
        if (game.player.body.x > 10) {
            game.player.moveLeft();
        }
    } else if (game.cursors.right.isDown || game.input.keyboard.isDown(Phaser.Keyboard.D)) {
        game.player.movingHorizontal = true;
        if (game.player.body.x < 600) {
            game.player.moveRight();
        }
    } else {
        game.player.movingHorizontal = false;
    }

    if (game.cursors.up.isDown || game.input.keyboard.isDown(Phaser.Keyboard.W)) {
        game.player.movingVertical = true;
        if (game.player.body.y > 140) {
            game.player.moveUp();
        }
    } else if (game.cursors.down.isDown || game.input.keyboard.isDown(Phaser.Keyboard.S)) {
        game.player.movingVertical = true;
        game.player.moveDown();
    } else {
        game.player.movingVertical = false;
    }

    if (!game.player.movingHorizontal && !game.player.movingVertical) {
        game.player.standStill();
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.F)) {
        game.player.hug();
    }

    if (game.gameOver == true) {
        if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            state.quitGame();
        }
    }
}
