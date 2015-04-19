WithKindness.Util.handleInput = function (game, state) {
    if (game.cursors.left.isDown || game.input.keyboard.isDown(Phaser.Keyboard.A)) {
        game.player.moveLeft();
    } else if (game.cursors.right.isDown || game.input.keyboard.isDown(Phaser.Keyboard.D)) {
        game.player.moveRight();
    } else if (game.cursors.up.isDown || game.input.keyboard.isDown(Phaser.Keyboard.W)) {
        game.player.moveUp();
    } else if (game.cursors.down.isDown || game.input.keyboard.isDown(Phaser.Keyboard.S)) {
        game.player.moveDown();
    } else {
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
