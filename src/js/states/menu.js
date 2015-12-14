export class MenuState extends Phaser.State {
    constructor() {
        super();
    }

    create() {
        this.logo = this.game.add.image(400, 240, 'logo');
        this.logo.fixedToCamera = true;
        this.logo.anchor.setTo(0.5);

        //Add 'Tha mage'
        this.mage = this.game.add.sprite(200, 470, 'player');
        this.mage.animations.add('cast', [0, 1], 10, true);

        this.castBar = this.mage.addChild(this.game.make.sprite(0, -20, 'castbar'));
        this.castBar.scale.setTo(12, 4);
        this.castingBarAnimation = this.castBar.animations.add('casting', [0, 1, 2, 3, 4, 5, 0], 12, false);

        //Adding keyboard
        this.zKey = this.game.input.keyboard.addKey(Phaser.KeyCode.Z);
        this.xKey = this.game.input.keyboard.addKey(Phaser.KeyCode.X);

        this.zKey.onDown.add(function() {
            this.mage.play('cast');
            this.castingBarAnimation.onComplete.add(function() {
                this.game.state.start('start', true, false, 'level0', 0);
            }, this);
            this.castBar.play('casting');
        }, this);
        this.xKey.onDown.add(function() {
            this.mage.play('cast');
            this.castBar.play('casting');
            this.castingBarAnimation.onComplete.add(function() {
                //TODO: Credits State
                this.game.state.start('credits');
            }, this);
        }, this);

        //Create menu
        this.game.add.bitmapText(300, 460, 'carrier_command', 'List of Spells: ', 16);
        this.game.add.bitmapText(320, 490, 'carrier_command', 'Start Game (Z)', 12);
        this.game.add.bitmapText(320, 520, 'carrier_command', 'Credits (X)', 12);
    }

}
