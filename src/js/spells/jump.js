import { Spell } from 'spells/base';

export class JumpSpell extends Spell {
    constructor(user) {
        super(user);
    }

    castAction() {
        this.user.body.velocity.y = -200;
    }
}
