export class Memory extends Phaser.Sprite {
    constructor(state, data) {
        super(state.game, data.x + 16, data.y - 16, 'memory');
        this.gameState = state;
        this.anchor.setTo(0.5);
        this.game.add.existing(this);
        this.game.physics.arcade.enable(this);
        if (!data.visible) {
            this.alpha = 0;
        }

        if (data.properties) {
            this.dialogueId = data.properties.dialogue;
            this.condition = data.properties.condition;
        }

        this.body.allowGravity = false;
        this.initialPositionY = this.body.position.y;
        this.body.velocity.y = -50;
    }

    update() {
        if (this.body.velocity.y < 0 && this.body.position.y <= (this.initialPositionY - 20)) {
            this.body.velocity.y *= -1;
        }

        if (this.body.velocity.y > 0 && this.body.position.y >= this.initialPositionY) {
            this.body.velocity.y *= -1;
            this.body.position.y = this.initialPositionY;
        }
    }
}
