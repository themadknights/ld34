export class LoadState extends Phaser.State {
    constructor() {
        super();
    }

    preload() {
        this.loadingText = this.game.add.bitmapText(this.game.world.centerX, this.game.world.centerY, 'carrier_command', "Loading...", 18);
        this.loadingText.anchor.setTo(0.5);
        this.load.spritesheet('player', 'images/player.png', 64, 64, 2);
        this.load.spritesheet('castbar', 'images/castbar.png', 5, 1, 6);
        this.load.spritesheet('healthIcons', 'images/health_icons.png', 16, 16, 2);
        this.load.spritesheet('spikes', 'images/spikes.png', 32, 32, 2);
        this.load.spritesheet('enemy', 'images/slime.png', 32, 32, 3);
        this.load.image('fireball', 'images/fireball.png');
        this.load.image('shield', 'images/shield.png');
        this.load.image('shooter', 'images/shooter.png');
        this.load.image('projectile', 'images/projectile.png');
        this.load.image('mobilePlatform', 'images/mobile_platform.png');
        this.load.image('goal', 'images/goal.png');
        this.load.image('coin', 'images/coin.png');
        this.load.image('tileset', 'images/tileset.png');
        this.load.tilemap('level0', 'json/level0.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('level1', 'json/level1.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('shooterTest', 'json/shooterTest.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('platformTest', 'json/platformTest.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('levitationTest', 'json/levitationTest.json', null, Phaser.Tilemap.TILED_JSON);
    }

    create () {
        this.game.state.start('start');
    }
}
