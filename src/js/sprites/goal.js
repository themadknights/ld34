export class Goal extends Phaser.Sprite {
    constructor(state, x, y) {
        super(state.game, x, y, 'goal');
        this.gameState = state;
        this.anchor.setTo(0.5);
        this.game.add.existing(this);
        this.game.physics.arcade.enable(this);

        this.body.width = 32;
        this.body.height = this.height / 2;
        this.body.offset.x += 10;
        this.body.offset.y += this.height / 4;

        this.body.allowGravity = false;
    }

    setData(data) {
        if (data.properties) {
            this.nextLevel = data.properties.nextLevel;
        }
    }
}
