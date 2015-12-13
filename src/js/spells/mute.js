import { Spell } from 'spells/base';

export class MuteSpell extends Spell {
    constructor(user) {
        super(user);
    }

    castAction() {
        this.user.game.sound.mute = !this.user.game.sound.mute;
    }
}
