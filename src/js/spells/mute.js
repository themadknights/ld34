import { Spell } from 'spells/base';

export class MuteSpell extends Spell {
    static combination () {
        return 'ZZZXXX';
    }

    constructor(combination, user) {
        super(combination, 'mute', user);
    }

    castAction() {
        this.user.game.sound.mute = !this.user.game.sound.mute;
    }
}
