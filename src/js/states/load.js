export class LoadState extends Phaser.State {
    constructor() {
        super();
    }

    preload() {
        this.loadingText = this.game.add.bitmapText(this.game.world.centerX, this.game.world.centerY, 'carrier_command', "Loading...", 18);
        this.loadingText.anchor.setTo(0.5);
        this.load.spritesheet('player', 'images/player.png', 64, 64, 2);
        this.load.spritesheet('castbar', 'images/castbar.png', 5, 1, 6);
        this.load.image('enemy', 'images/enemy.png');
        this.load.image('tileset', 'images/tileset.png');
        this.load.tilemap('level1', 'json/level1.json', null, Phaser.Tilemap.TILED_JSON);
    }

    create () {
        this.game.state.start('start');
    }
}
