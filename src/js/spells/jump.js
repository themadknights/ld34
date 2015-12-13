import { Spell } from 'spells/base';

export class JumpSpell extends Spell {
    constructor(user) {
        super(user, 'jumpFx');
    }

    castAction() {
        this.user.body.velocity.y = -200;
        this.user.mustJump = true;
    }
}
