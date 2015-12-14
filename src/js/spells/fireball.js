import { Spell } from 'spells/base';

export class FireballSpell extends Spell {
    static combination () {
        return 'ZXXZ';
    }

    constructor(combination, user) {
        super(combination, 'fireball', user, 'fireballFx');
    }

    castAction() {
        let fireball = this.user.gameState.fireballs.getFirstExists(false);
        if(fireball) {
            fireball.reset(this.user.x + 30, this.user.y);
        } else {
            fireball = this.user.gameState.fireballs.create(this.user.x + 30, this.user.y, 'fireball');
        }
        fireball.anchor.setTo(0.5);
        this.user.game.physics.arcade.enable(fireball);
        fireball.body.allowGravity = false;
        fireball.body.velocity.x = 500;
    }
}
