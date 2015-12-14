import { Spell } from 'spells/base';

export class PortalSpell extends Spell {
    static combination () {
        return 'ZXXZXZXZ';
    }

    constructor(combination, user) {
        super(combination, 'portal', user, 'portalFx');
    }

    castAction() {
        let goal = this.user.gameState.goal;
        this.user.position.x = goal.position.x;
        this.user.position.y = goal.position.y;
    }
}
