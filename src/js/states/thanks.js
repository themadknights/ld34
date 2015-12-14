export class ThanksState extends Phaser.State {
    constructor() {
        super();
    }

    init(score) {
        this.score = score || 0;
    }

    create() {
        //Add 'Tha mage'
        this.mage = this.game.add.sprite(200, 470, 'player');
        this.mage.animations.add('cast', [4,5,6,7], 8, true);

        this.castBar = this.mage.addChild(this.game.make.sprite(0, -20, 'castbar'));
        this.castBar.scale.setTo(12, 4);
        this.castingBarAnimation = this.castBar.animations.add('casting', [0, 1, 2, 3, 4, 5, 0], 12, false);

        //Adding keyboard
        this.zKey = this.game.input.keyboard.addKey(Phaser.KeyCode.Z);
        this.xKey = this.game.input.keyboard.addKey(Phaser.KeyCode.X);

        this.zKey.onDown.add(function() {
            this.mage.play('cast');
            this.castingBarAnimation.onComplete.add(function() {
                this.game.state.start('menu');
            }, this);
            this.castBar.play('casting');
        }, this);

        this.game.add.bitmapText(210, 180, 'carrier_command', 'THANKS FOR PLAYING!', 18);

        this.scoreText = this.game.add.bitmapText(400, 290, 'carrier_command', `Score: ${this.score}`, 16);
        this.scoreText.anchor.setTo(0.5);

        //Create menu
        this.game.add.bitmapText(300, 460, 'carrier_command', 'List of Spells: ', 16);
        this.game.add.bitmapText(320, 490, 'carrier_command', 'Go to title (Z)', 12);
    }

}
