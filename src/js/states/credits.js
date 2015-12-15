export class CreditsState extends Phaser.State {
    constructor() {
        super();
    }

    create() {
        this.publisherLogo = this.game.add.image(400, 150, 'tmkLogo');
        this.publisherLogo.fixedToCamera = true;
        this.publisherLogo.anchor.setTo(0.5);

        //Add 'Tha mage'
        this.mage = this.game.add.sprite(200, 470, 'player');
        this.mage.animations.add('cast', [4,5,6,7], 10, true);

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

        // Add tmk members
        this.game.add.bitmapText(320, 280, 'carrier_command', '@ReikVal', 16);
        this.game.add.bitmapText(320, 320, 'carrier_command', '@lastpotion', 16);
        this.game.add.bitmapText(320, 360, 'carrier_command', '@beagleknight', 16);

        //Create menu
        this.game.add.bitmapText(300, 460, 'carrier_command', 'List of Spells: ', 16);
        this.game.add.bitmapText(320, 490, 'carrier_command', 'Go to title (Z)', 12);
    }

}
