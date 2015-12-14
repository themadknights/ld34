import { Spell } from 'spells/base';

export class ShieldSpell extends Spell {
    static combination () {
        return 'XZ';
    }

    constructor(combination, user) {
        super(combination, 'shield', user, 'shieldFx');
        this.duration = 1;
        this.shield = this.user.addChild(this.user.game.make.sprite(30, 0, 'shield'));
        this.shield.anchor.setTo(0.5);
        this.user.game.physics.arcade.enable(this.shield);
        this.shield.body.allowGravity = false;
        this.shield.body.immovable = true;
        this.shield.kill();
    }

    castAction() {
        this.shield.revive();
    }

    cancelAction() {
        this.shield.kill();
    }
}
