import { Spell } from 'spells/base';

export class LevitationSpell extends Spell {
    constructor(user) {
        super(user, 'levitateFx');
        this.duration = 2;
    }

    castAction() {
        this.user.body.allowGravity = false;
        this.user.body.velocity.y = 0;

        this.levitationTween = this.user.game.add.tween(this.user);

        this.levitationTween.to({
            y: "-10"
        }, 200, Phaser.Easing.Bounce.InOut, true, 0, 4, true);

        this.levitationTween.loop(true);
        this.levitationTween.start();
    }

    cancelAction() {
        this.user.body.allowGravity = true;
        this.levitationTween.stop();
    }
}
