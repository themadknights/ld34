export class MobilePlatform extends Phaser.Sprite {
    constructor(state, data) {
        super(state.game, data.x + 64, data.y - 16, 'mobilePlatform');
        this.gameState = state;
        this.anchor.setTo(0.5);
        this.game.add.existing(this);
        this.game.physics.arcade.enable(this);
        this.body.allowGravity = false;
    }
}
