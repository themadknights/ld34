import { MoveSpell } from 'spells/move';
import { StopSpell } from 'spells/stop';
import { JumpSpell } from 'spells/jump';
import { FireballSpell } from 'spells/fireball';
import { ShieldSpell } from 'spells/shield';
import { LevitationSpell } from 'spells/levitation';

export class Player extends Phaser.Sprite {
    constructor(state, x, y) {
        super(state.game, x, y, 'player');

        this.spells = {
            "Z": new MoveSpell(this),
            "ZX": new StopSpell(this),
            "X": new JumpSpell(this),
            "ZXXZ": new FireballSpell(this),
            "XZ": new ShieldSpell(this),
            "ZZ": new LevitationSpell(this)
        };

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
    }

    cast() {
        if (this.currentSpell) {
            this.currentSpell.cancel();
        }

        if (this.spells[this.spell]) {
            this.currentSpell = this.spells[this.spell];
            this.currentSpell.cast();
        }
    }

    addKeyToSpell(key, keyCode) {
        this.castBar.animations.stop();
        this.castBar.play('casting');
        this.spellTimer.stop();
        this.spell += keyCode;
        this.gameState.updateSpellHud(keyCode);
        this.spellTimer.add(Phaser.Timer.HALF, function() {
            this.cast();
            this.spell = "";
            this.gameState.clearSpellHud();
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
