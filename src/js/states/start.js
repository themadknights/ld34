import { Player } from 'sprites/player';
import { Enemy } from 'sprites/enemy';

export class StartState extends Phaser.State {
    constructor() {
        super();
    }

    init() {
        //Starting Physics
        this.physics.startSystem(Phaser.Physics.ARCADE);
    }

    create() {
        //Creating gravity
        this.physics.arcade.gravity.y = 300;

        // Create world
        this.map = this.add.tilemap('level1');
        this.map.addTilesetImage('tileset');
        this.map.setCollision(2);
        this.mapLayer = this.map.createLayer('foreground');
        this.mapLayer.resizeWorld();

        // Create player
        this.player = new Player(this, 100, 100);

        // Create enemies
        this.enemies = this.game.add.group();
        this.enemies.add(new Enemy(this, 500, 100));

        // TODO: for debugging purposes
        this.cursors = this.game.input.keyboard.createCursorKeys();

        //Adding keyboard
        this.zKey = this.game.input.keyboard.addKey(Phaser.KeyCode.Z);
        this.xKey = this.game.input.keyboard.addKey(Phaser.KeyCode.X);

        this.zKey.onDown.add(this.player.addKeyToSpell, this.player, 0, 'Z');
        this.xKey.onDown.add(this.player.addKeyToSpell, this.player, 0, 'X');

    }

    update() {
        this.game.physics.arcade.collide(this.player, this.mapLayer);
        this.game.physics.arcade.collide(this.enemies, this.mapLayer);

        this.physics.arcade.overlap(this.player, this.enemies, function() {
            // TODO:
        });

        // // TODO: for debugging purposes
        // if (this.cursors.up.isDown) {
        //     this.player.body.velocity.y = -200;
        // }
        //
        // if (this.cursors.left.isDown) {
        //     this.player.body.velocity.x = -200;
        // } else if (this.cursors.right.isDown) {
        //     this.player.body.velocity.x = 200;
        // } else {
        //     this.player.body.velocity.x = 0;
        // }
    }

    render() {

    }
}
