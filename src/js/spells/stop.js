import { Spell } from 'spells/base';

export class StopSpell extends Spell {
    constructor(user) {
        super(user);
    }

    castAction() {
        this.user.body.velocity.x = 0;
    }
}
