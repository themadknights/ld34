export class Enemy extends Phaser.Sprite {
    constructor(state, x, y) {
        super(state.game, x, y, 'enemy');
        this.gameState = state;
        this.anchor.setTo(0.5);
        this.game.add.existing(this);
        this.game.physics.arcade.enable(this);

        this.body.velocity.x = 100;
    }

    update () {
        if (this.body.blocked.down) {
            if (this.body.velocity.x > 0) {
                let rightTile = this.gameState.map.getTileWorldXY(this.body.right, this.body.bottom + 1, 32, 32, this.gameState.mapLayer);
                if (rightTile && rightTile.index === 1) {
                    this.body.velocity.x *= -1;
                }
            } else {
                let leftTile = this.gameState.map.getTileWorldXY(this.body.position.x, this.body.bottom + 1, 32, 32, this.gameState.mapLayer);
                if (leftTile && leftTile.index === 1) {
                    this.body.velocity.x *= -1;
                }
            }
        }
    }
}
