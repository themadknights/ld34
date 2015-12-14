export class Memory extends Phaser.Sprite {
    constructor(state, data) {
        super(state.game, data.x + 16, data.y - 16, 'memory');
        this.gameState = state;
        this.anchor.setTo(0.5);
        this.game.add.existing(this);
        this.game.physics.arcade.enable(this);

        if (data.properties) {
            this.dialogueId = data.properties.dialogue;
        }

        this.animations.add("spin", [0,1,2,3,4,3,2,1], 8, true);
        this.play("spin");

        this.body.allowGravity = false;

        this.value = 100;

        this.fx = this.game.add.audio('coinFx');
        this.fx.volume = 0.1;
        this.events.onKilled.add(function() {
            this.fx.play();
        }, this);
    }
}
