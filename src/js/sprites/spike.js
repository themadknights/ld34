export class Spike extends Phaser.Sprite {
    constructor(state, x, y) {
        super(state.game, x, y, 'spikes');
        this.gameState = state;
        this.anchor.setTo(0.5);
        this.game.add.existing(this);
        this.game.physics.arcade.enable(this);

        this.body.allowGravity = false;

        this.frame = state.game.rnd.integerInRange(0, 3);
    }
}
