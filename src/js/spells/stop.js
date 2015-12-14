import { Spell } from 'spells/base';

export class StopSpell extends Spell {
    static combination () {
        return 'ZX';
    }

    constructor(combination, user) {
        super(combination, 'stop', user);
    }

    castAction() {
        this.user.body.velocity.x = 0;
        this.user.play("idle");
    }
}
