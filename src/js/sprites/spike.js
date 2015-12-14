export class Spike extends Phaser.Sprite {
    constructor(state, data) {
        super(state.game, data.x + 16, data.y - 16, 'spikes');
        this.gameState = state;
        this.anchor.setTo(0.5);
        this.game.add.existing(this);
        this.game.physics.arcade.enable(this);

        this.body.height = this.height / 4;
        this.body.offset.y = this.height / 3;
        this.body.allowGravity = false;

        this.frame = state.game.rnd.integerInRange(0, 3);
    }
}
