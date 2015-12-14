import { MoveSpell } from 'spells/move';
import { StopSpell } from 'spells/stop';
import { JumpSpell } from 'spells/jump';
import { FireballSpell } from 'spells/fireball';
import { ShieldSpell } from 'spells/shield';
import { LevitationSpell } from 'spells/levitation';
import { MuteSpell } from 'spells/mute';
import { PortalSpell } from 'spells/portal';

export class Player extends Phaser.Sprite {
    constructor(state, x, y) {
        super(state.game, x, y, 'player');

        this.game.camera.follow(this);

        this.spells = {};
        this.spells[MoveSpell.combination()] = new MoveSpell(MoveSpell.combination(), this);
        this.spells[JumpSpell.combination()] = new JumpSpell(JumpSpell.combination(), this);
        this.spells[StopSpell.combination()] = new StopSpell(StopSpell.combination(), this);
        this.spells[ShieldSpell.combination()] = new ShieldSpell(ShieldSpell.combination(), this);
        this.spells[FireballSpell.combination()] = new FireballSpell(FireballSpell.combination(), this);
        this.spells[LevitationSpell.combination()] = new LevitationSpell(LevitationSpell.combination(), this);
        this.spells[MuteSpell.combination()] = new MuteSpell(MuteSpell.combination(), this);
        this.spells[PortalSpell.combination()] = new PortalSpell(PortalSpell.combination(), this);

        this.gameState = state;
        this.anchor.setTo(0.5);
        this.game.add.existing(this);
        this.game.physics.arcade.enable(this);
        this.body.width = this.width / 2;
        this.body.offset.x -= 5;

        this.animations.add("idle", [0, 1], 2, true);
        this.animations.add("walk", [8,9,10,11], 4, true);
        this.animations.add("idlecast", [4,5,6,7], 8, true);
        this.animations.add("walkcast", [12,13,14,15], 8, true);
        this.play("idle");

        this.maxHealth = 3;
        this.health = this.maxHealth;
        this.checkWorldBounds = true;
        this.outOfBoundsKill = true;

        //Cast bar
        this.castBar = this.addChild(this.game.make.sprite(0, -40, 'castbar'));
        this.castBar.anchor.setTo(0.5);
        this.castBar.scale.setTo(12, 4);
        this.spellName = this.addChild(this.game.make.bitmapText(0, -50, 'carrier_command', '', 14));
        this.spellName.alpha = 0;
        let animation = this.castBar.animations.add('casting', [0, 1, 2, 3, 4, 5, 0], 75, false);
        animation.onComplete.add(function() {
            this.currentSpell.cast();
            this.play('idle');
        }, this);

        //Spell
        this.spell = "";
        this.spellTimer = this.game.time.create(false);
    }

    cast() {
        if (this.spells[this.spell]) {
            this.currentSpell = this.spells[this.spell];
            this.spellName.text = `${this.currentSpell.name}!`;
            this.spellName.alpha = 1;
            this.game.add.tween(this.spellName).to({
                alpha: 0
            },  Phaser.Timer.HALF, "Linear", true, 0.5 * Phaser.Timer.HALF);
            this.castBar.play('casting');
        } else {
            if (this.body.velocity.x > 0) {
                this.play('walk');
            } else {
                this.play('idle');
            }
        }
    }

    addKeyToSpell(key, keyCode) {
        if (!this.game.paused) {
            // this.castBar.animations.stop();
            // this.castBar.play('casting');
            this.spellTimer.stop();
            this.spell += keyCode;
            this.gameState.updateSpellHud(keyCode);
            if (this.body.velocity.x > 0) {
                this.play('walkcast');
            } else {
                this.play('idlecast');
            }
            this.spellTimer.add(0.3 * Phaser.Timer.SECOND, function() {
                this.cast();
                this.spell = "";
                this.gameState.clearSpellHud();
            }, this);
            this.spellTimer.start();
        }
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
                    this.gameState.restart();
                }
            }, this);
            timer.start();
            this.gameState.updateHealthHud();
        }
    }

    stop() {
        this.body.velocity.setTo(0);
        this.play("idle");
    }

    collect(coin) {
        this.gameState.score += coin.value;
        this.gameState.updateScoreHud();
        coin.kill();
    }

    respawn(position) {
        this.stop();
        this.health = this.maxHealth;
        this.gameState.updateHealthHud();
        this.position.x = position.x;
        this.position.y = position.y;
    }

}
