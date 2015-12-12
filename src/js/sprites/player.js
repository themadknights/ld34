export class Player extends Phaser.Sprite {
    constructor(state, x, y) {
        super(state.game, x, y, 'player');
        this.anchor.setTo(0.5);
        this.game.add.existing(this);
        this.game.physics.arcade.enable(this);
        this.game.camera.follow(this);

        this.animations.add("idle", [0, 1], 10, true);
        this.play("idle");

        this.spell = "";
    }

    cast() {
        console.log(this.spell);
        switch(this.spell) {
            case "Z": //Moverse
                this.body.velocity.x = 100;
                break;
            case "ZX": //Parar
                this.body.velocity.x = 0;
                break;
            case "X": //Saltar
                this.body.velocity.y = -200;
                break;
        }
    }
}
