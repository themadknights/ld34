export class Player extends Phaser.Sprite {
    constructor(state, x, y) {
        super(state.game, x, y, 'player');
        this.anchor.setTo(0.5);
        this.game.add.existing(this);
        this.game.physics.arcade.enable(this);
        this.game.camera.follow(this);

        this.animations.add("idle", [0, 1], 10, true);
        this.play("idle");
    }
}
