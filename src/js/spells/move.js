import { Spell } from 'spells/base';

export class MoveSpell extends Spell {
    static combination () {
        return 'Z';
    }

    constructor(combination, user) {
        super(combination, 'move', user);
    }

    castAction() {
        this.user.body.velocity.x = 100;
        this.user.play("walk");
    }
}
