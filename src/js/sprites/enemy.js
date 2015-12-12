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
        //var rightTile = this.gameState.map.getTileAbove(this.gameState.mapLayer, this.)
    }
}
