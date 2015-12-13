let spells = {
    move: "Z",
    stop: "ZX",
    jump: "X",
    fireball: "ZXXZ",
    levitation: "ZZ"
};

export class Player extends Phaser.Sprite {
    constructor(state, x, y) {
        super(state.game, x, y, 'player');
        this.gameState = state;
        this.anchor.setTo(0.5);
        this.game.add.existing(this);
        this.game.physics.arcade.enable(this);
        this.game.camera.follow(this);

        this.animations.add("idle", [0, 1], 10, true);
        this.play("idle");

        this.maxHealth = 3;
        this.health = this.maxHealth;
        this.checkWorldBounds = true;
        this.outOfBoundsKill = true;

        //Cast bar
        this.castBar = this.addChild(this.game.make.sprite(0, -40, 'castbar'));
        this.castBar.anchor.setTo(0.5);
        this.castBar.scale.setTo(12, 4);
        this.castBar.animations.add('casting', [0, 1, 2, 3, 4, 5, 0], 12, false);

        //Spell
        this.spell = "";
        this.spellTimer = this.game.time.create(false);

        //Shield
        this.shield = this.addChild(this.game.make.sprite(40, 0, 'shield'));
        this.shield.anchor.setTo(0.5);
        this.game.physics.arcade.enable(this.shield);
        this.shield.body.allowGravity = false;
        this.shield.body.immovable = true;
        this.shield.kill();
        this.shieldTimer = this.game.time.create(false);
    }

    cast() {
        switch(this.spell) {
            case spells.move: //Move
                this.body.velocity.x = 100;
                break;
            case spells.stop: //Stop
                this.body.velocity.x = 0;
                break;
            case spells.jump: //Jump
                this.body.velocity.y = -200;
                break;
            case spells.fireball: //Fireball
                console.log(this.gameState.fireballs.length);
                let fireball = this.gameState.fireballs.getFirstExists(false);
                if(fireball) {
                    fireball.reset(this.x + 30, this.y);
                } else {
                    fireball = this.gameState.fireballs.create(this.x + 30, this.y, 'fireball');
                }
                fireball.anchor.setTo(0.5);
                this.game.physics.arcade.enable(fireball);
                fireball.body.allowGravity = false;
                fireball.body.velocity.x = 500;
                break;
            case "XZ": //Shield
                this.shield.revive();
                this.shieldTimer.stop();
                this.shieldTimer.add(Phaser.Timer.SECOND, function() {
                    this.shield.kill();
                }, this);
                this.shieldTimer.start();
                break;
            case spells.levitation:
                this.body.allowGravity = false;
                this.body.velocity.y = 0;
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

    damage(amount) {
        if(!this.invulnerable) {
            this.invulnerable = true;
            let timer = this.game.time.create(this.game, true);
            this.immunityTween = this.game.add.tween(this).to({ alpha: 0 }, 0.1 * Phaser.Timer.SECOND, "Linear", true, 0, -1);
            this.immunityTween.yoyo(true, 0);
            this.health -= amount;
            timer.add(2*Phaser.Timer.SECOND, function() {
                this.game.tweens.remove(this.immunityTween);
                this.invulnerable = false;
                this.alpha = 1;
                if (this.health <= 0) {
                    this.kill();
                }
            }, this);
            timer.start();
            this.gameState.updateHealthHud();
        }
    }

    kill() {
        super.kill();
        this.gameState.gameOver();
    }

    collect(coin) {
        this.gameState.score += coin.value;
        this.gameState.updateScoreHud();
        coin.kill();
    }

}
