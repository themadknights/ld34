export class Spell {
    constructor(user) {
        this.user = user;
        this.duration = 0;
        this.spellTimer = this.user.game.time.create(false);
    }

    cast() {
        this.castAction();
        this.spellTimer.stop();
        this.spellTimer.add(this.duration * Phaser.Timer.SECOND, function() {
            this.cancel();
        }, this);
        this.spellTimer.start();
    }

    cancel() {
        this.cancelAction();
        this.spellTimer.stop();
    }

    castAction() {

    }

    cancelAction() {

    }
}
