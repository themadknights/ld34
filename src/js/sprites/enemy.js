export class Enemy extends Phaser.Sprite {
    constructor(state, data) {
        super(state.game, data.x + 16, data.y - 16, 'enemy');
        this.gameState = state;
        this.anchor.setTo(0.5);
        this.game.add.existing(this);
        this.game.physics.arcade.enable(this);

        this.scale.setTo(-1, 1);

        this.body.velocity.x = 50;
        this.body.position.y += 10;
        this.body.offset.y = 5;
        this.body.height -= 10;
        // this.body.height -= 20;

        this.animations.add("patrol", [0,1,2,1], 8, true);
        this.play("patrol");
    }

    update () {
        if (this.body.blocked.down) {
            if (this.body.velocity.x > 0) {
                let rightTile = this.gameState.map.getTileWorldXY(this.body.right, this.body.bottom + 1, 32, 32, this.gameState.mapLayer);
                if (rightTile && rightTile.index === 1) {
                    this.body.velocity.x *= -1;
                    this.scale.setTo(1, 1);
                }
            } else {
                let leftTile = this.gameState.map.getTileWorldXY(this.body.position.x, this.body.bottom + 1, 32, 32, this.gameState.mapLayer);
                if (leftTile && leftTile.index === 1) {
                    this.body.velocity.x *= -1;
                    this.scale.setTo(-1, 1);
                }
            }
        }
    }
}
