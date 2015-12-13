import { Spell } from 'spells/base';

export class MoveSpell extends Spell {
    constructor(user) {
        super(user);
    }

    castAction() {
        this.user.body.velocity.x = 100;
    }
}