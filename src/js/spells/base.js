export class Spell {
    constructor(user, fx = null) {
        this.user = user;
        if(fx) {
            this.fx = this.user.game.add.audio(fx);
            this.fx.volume = 0.1;
        }
        this.duration = 0;
        this.spellTimer = this.user.game.time.create(false);
    }

    cast() {
        this.castAction();
        if(this.fx) {
            this.fx.play();
        }
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
