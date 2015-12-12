export class Coin extends Phaser.Sprite {
    constructor(state, x, y) {
        super(state.game, x, y, 'coin');
        this.gameState = state;
        this.anchor.setTo(0.5);
        this.game.add.existing(this);
        this.game.physics.arcade.enable(this);

        this.body.allowGravity = false;

        this.value = 100;
    }
}
