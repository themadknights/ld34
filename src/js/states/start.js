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

        //Adding keyboard
        this.zKey = this.game.input.keyboard.addKey(Phaser.KeyCode.Z);
        this.xKey = this.game.input.keyboard.addKey(Phaser.KeyCode.X);
        //Add timer
        this.spellTimer = this.game.time.create(false);
        this.spellTimer.start();
        this.spell = "";
        this.zKey.onDown.add(function() {
            this.spell += "Z";
            this.spellTimer.stop();
            this.spellTimer.add(Phaser.Timer.SECOND, function() {
                //TODO: Cast
                console.log(this.spell);
                this.spell = "";
            }, this);
            this.spellTimer.start();
        }, this);
        this.xKey.onDown.add(function() {
            this.spell += "X";
            this.spellTimer.stop();
            this.spellTimer.add(Phaser.Timer.SECOND, function() {
                //TODO: Cast
                console.log(this.spell);
                this.spell = "";
            }, this);
            this.spellTimer.start();
        }, this);
    }

    update() {

    }

    render() {

    }
}
