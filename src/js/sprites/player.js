export class Player extends Phaser.Sprite {
    constructor(state, x, y) {
        super(state.game, x, y, 'player');
        this.anchor.setTo(0.5);
        this.game.add.existing(this);
        this.game.physics.arcade.enable(this);
        this.game.camera.follow(this);

        this.animations.add("idle", [0, 1], 10, true);
        this.play("idle");

        this.maxHealth = 3;
        this.health = this.maxHealth;

        //Cast bar
        this.castBar = this.addChild(this.game.make.sprite(0, -40, 'castbar'));
        this.castBar.anchor.setTo(0.5);
        this.castBar.scale.setTo(12, 4);
        this.castBar.animations.add('casting', [0, 1, 2, 3, 4, 5, 0], 12, false);

        //Spell
        this.spell = "";
        this.spellTimer = this.game.time.create(false);
    }

    cast() {
        console.log(this.spell);
        switch(this.spell) {
            case "Z": //Move
                this.body.velocity.x = 100;
                break;
            case "ZX": //Stop
                this.body.velocity.x = 0;
                break;
            case "X": //Jump
                this.body.velocity.y = -200;
                break;
        }
    }

    addKeyToSpell(key, keyCode) {
        this.castBar.animations.stop();
        this.castBar.play('casting');
        this.spellTimer.stop();
        this.spell += keyCode;
        this.spellTimer.add(Phaser.Timer.HALF, function() {
            this.cast();
            this.spell = "";
        }, this);
        this.spellTimer.start();
    }
}
