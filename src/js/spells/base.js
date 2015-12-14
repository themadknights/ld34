export class Spell {
    constructor(combination, name, user, fx = null) {
        this.combination = combination;
        this.name = name;
        this.user = user;
        if(fx) {
            this.fx = this.user.game.add.audio(fx);
            this.fx.volume = 0.1;
        }
        this.duration = 0;
        this.count = 0;
        this.spellTimer = this.user.game.time.create(false);
    }

    cast() {
        if (this.count === 0) {
            this.reveal();
        }

        this.count += 1;
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

    reveal () {
        let templateCombination = $(`ul#spellslist li.${this.name} .combination .key`);
        templateCombination.each((index, key) => {
            $(key).addClass(this.combination[index]);
        });
    }
}
