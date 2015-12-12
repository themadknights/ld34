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

        // Create player
        this.player = new Player(this, 200, 200);
    }

    update() {

    }

    render() {

    }
}
