import { Spell } from 'spells/base';

export class LevitationSpell extends Spell {
    constructor(user) {
        super(user);
        this.duration = 2;
    }

    castAction() {
        this.user.body.allowGravity = false;
        this.user.body.velocity.y = 0;
    }

    cancelAction() {
        this.user.body.allowGravity = true;
    }
}
