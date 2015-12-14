export class LoadState extends Phaser.State {
    constructor() {
        super();
    }

    preload() {
        this.loadingText = this.game.add.bitmapText(this.game.world.centerX, this.game.world.centerY, 'carrier_command', "Loading...", 18);
        this.loadingText.anchor.setTo(0.5);
        this.load.spritesheet('player', 'images/player.png', 64, 64, 12);
        this.load.spritesheet('castbar', 'images/castbar.png', 5, 1, 6);
        this.load.spritesheet('healthIcons', 'images/health_icons.png', 16, 16, 2);
        this.load.spritesheet('spikes', 'images/spikes.png', 32, 32, 2);
        this.load.spritesheet('enemy', 'images/slime.png', 32, 32, 3);
        this.load.spritesheet('fireball', 'images/fireball.png', 32, 32, 4);
        this.load.spritesheet('keys', 'images/keys.png', 16, 16, 2);
        this.load.spritesheet('coin', 'images/coin.png', 32, 32, 5);
        this.load.spritesheet('memory', 'images/memory.png', 32, 32, 5);
        this.load.image('logo', 'images/logo.png');
        this.load.image('tmkLogo', 'images/TMKSquareG.png');
        this.load.image('shield', 'images/shield.png');
        this.load.image('shooter', 'images/shooter.png');
        this.load.image('projectile', 'images/projectile.png');
        this.load.image('mobilePlatform', 'images/mobile_platform.png');
        this.load.image('goal', 'images/goal.png');
        this.load.image('tileset', 'images/tileset.png');
        this.load.image('hudBg', 'images/hud_background.png');
        this.load.image('hudDialogue', 'images/hud_dialogue.png');
        this.load.image('mageAvatar', 'images/mage_avatar.png');
        this.load.image('memoryAvatar', 'images/memory_avatar.png');
        this.load.tilemap('level0', 'json/level0.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('level1', 'json/level1.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('level2', 'json/level2.json', null, Phaser.Tilemap.TILED_JSON);
        // @if NODE_ENV='development'
        this.load.tilemap('shooterTest', 'json/shooterTest.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('platformTest', 'json/platformTest.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('levitationTest', 'json/levitationTest.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('collisionTest', 'json/collisionTest.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('goalTest', 'json/goalTest.json', null, Phaser.Tilemap.TILED_JSON);
        // @endif
        this.load.audio('fireballFx', 'sounds/fireball.wav');
        this.load.audio('memoryFx', 'sounds/memory.wav');
        this.load.audio('jumpFx', 'sounds/jump.wav');
        this.load.audio('coinFx', 'sounds/coin.wav');
        this.load.audio('shieldFx', 'sounds/shield.wav');
        this.load.audio('levitateFx', 'sounds/levitate.wav');
        this.load.audio('music0', 'sounds/music0.ogg');
        this.load.json('dialogues', 'json/dialogues.json');
    }

    create () {
        let defaultScene = 'start';

        // @if NODE_ENV='production'
        defaultScene = 'publisher';
        // @endif

        this.game.state.start(defaultScene);
    }
}
