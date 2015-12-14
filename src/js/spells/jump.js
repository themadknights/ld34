import { Spell } from 'spells/base';

export class JumpSpell extends Spell {
    static combination () {
        return 'X';
    }

    constructor(combination, user) {
        super(combination, 'jump', user, 'jumpFx');
    }

    castAction() {
        this.user.body.velocity.y = -202;
        this.user.mustJump = true;
    }
}
