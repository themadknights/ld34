import { Player } from 'sprites/player';

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

        // TODO: for debugging purposes
        this.cursors = this.game.input.keyboard.createCursorKeys();
    }

    update() {
        this.game.physics.arcade.collide(this.player, this.mapLayer);

        // TODO: for debugging purposes
        if (this.cursors.up.isDown) {
            this.player.body.velocity.y = -200;
        }
        
        if (this.cursors.left.isDown) {
            this.player.body.velocity.x = -200;
        } else if (this.cursors.right.isDown) {
            this.player.body.velocity.x = 200;
        } else {
            this.player.body.velocity.x = 0;
        }
    }

    render() {

    }
}
