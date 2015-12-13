export class Shooter extends Phaser.Sprite {
    constructor(state, data) {
        super(state.game, data.x + 16, data.y - 16, 'shooter');
        this.gameState = state;
        this.anchor.setTo(0.5);
        this.game.add.existing(this);
        this.game.physics.arcade.enable(this);

        this.body.allowGravity = false;

        if (data.properties) {
            if (data.properties.facing === "left") {
                this.scale.setTo(-1, 1);
                this.body.offset.x = -150;
                this.projectileOffset = -30;
                this.projectileSpeed = -100;
            } else {
                this.body.offset.x = 150;
                this.projectileOffset = 30;
                this.projectileSpeed = 100;
            }
            this.body.width = 300;

            this.ammo = data.properties.ammo || 1;
        }
    }

    shoot() {
        if (!this.reloading && this.ammo > 0) {
            this.ammo -= 1;
            this.reloading = true;
            this.createProjectile();
            let timer = this.game.time.create(this.game, true);
            timer.add(2 * Phaser.Timer.SECOND, function() {
                this.reloading = false;
            }, this);
            timer.start();
        }
    }

    createProjectile() {
        let projectile = this.gameState.projectiles.getFirstExists(false);
        if(projectile) {
            projectile.reset(this.x + this.projectileOffset, this.y);
        } else {
            projectile = this.gameState.projectiles.create(this.x + this.projectileOffset, this.y, 'projectile');
        }
        projectile.anchor.setTo(0.5);
        this.game.physics.arcade.enable(projectile);
        projectile.body.allowGravity = false;
        projectile.body.velocity.x = this.projectileSpeed;
    }
}
