export class MobilePlatform extends Phaser.Sprite {
    constructor(state, data) {
        super(state.game, data.x + 64, data.y - 16, 'mobilePlatform');
        this.gameState = state;
        this.anchor.setTo(0.5);
        this.game.add.existing(this);
        this.game.physics.arcade.enable(this);
        this.body.allowGravity = false;
        this.body.immovable = true;
        this.body.checkCollision = {
            up: true,
            bottom: false,
            left: false,
            right: false
        };

        if (data.properties) {
            this.body.velocity.x = data.properties.speed;
            if (this.body.velocity.x > 0) {
                this.minDistance = this.position.x;
                this.maxDistance = this.position.x + data.properties.maxDistance * 32;
            } else {
                this.minDistance = this.position.x - data.properties.maxDistance * 32;
                this.maxDistance = this.position.x;
            }
        }
    }

    update() {
        if (this.body.velocity.x > 0) {
            if (this.position.x >= this.maxDistance) {
                this.body.velocity.x *= -1;
            }
        } else {
            if (this.position.x <= this.minDistance) {
                this.body.velocity.x *= -1;
            }
        }
    }
}
