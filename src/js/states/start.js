import { pad } from 'utils';
import { Map } from 'map';
import { Goal } from 'sprites/goal';
import { Player } from 'sprites/player';
import { Dialogue } from 'dialogue';

export class StartState extends Phaser.State {
    constructor() {
        super();
    }

    init(levelId, score) {
        //Starting Physics
        this.physics.startSystem(Phaser.Physics.ARCADE);

        // @if NODE_ENV = 'development'
        //  Press F1 to toggle the debug display
        this.debugKey = this.input.keyboard.addKey(Phaser.Keyboard.F1);
        this.debugKey.onDown.add(this.toggleDebug, this);
        // @endif

        this.showDebug = false;

        // @if NODE_ENV = 'production'
        this.showDebug = false;
        // @endif

        this.levelId = levelId;
        this.score = score;
        this.initialScore = score;

        this.levelCompleted = false;
        this.checkPointPosition = null;
    }

    create() {
        //Creating gravity
        this.physics.arcade.gravity.y = 300;

        // Create map
        this.map = new Map(this, this.levelId);

        // Create coins
        this.coins = this.game.add.group();

        // Create memories
        this.memories = this.game.add.group();

        // Create spikes
        this.spikes = this.game.add.group();

        // Create goal
        this.goal = new Goal(this, 0, 0);

        //Fireball group
        this.fireballs = this.game.add.group();

        // Create enemies
        this.enemies = this.game.add.group();

        // Create shooters
        this.shooters = this.game.add.group();
        this.projectiles = this.game.add.group();

        // Create mobile platforms
        this.mobilePlatforms = this.game.add.group();

        // Create player
        this.player = new Player(this, 0, 0);

        // Load level
        this.map.loadLevel();

        // TODO: for debugging purposes
        this.cursors = this.game.input.keyboard.createCursorKeys();

        //Adding keyboard
        this.zKey = this.game.input.keyboard.addKey(Phaser.KeyCode.Z);
        this.xKey = this.game.input.keyboard.addKey(Phaser.KeyCode.X);

        this.zKey.onDown.add(this.player.addKeyToSpell, this.player, 0, 'Z');
        this.xKey.onDown.add(this.player.addKeyToSpell, this.player, 0, 'X');

        // Create hud
        this.createHUD();
    }

    update() {
        if(!this.player.mustJump) {
            this.game.physics.arcade.collide(this.player, this.map.platforms, () => {
                if (this.player.body.blocked.right || this.player.body.blocked.left) {
                    this.player.play('idle');
                }
            });
            this.physics.arcade.collide(this.player, this.mobilePlatforms);
        }
        this.player.mustJump = false;

        this.game.physics.arcade.collide(this.enemies, this.map.platforms);

        this.game.physics.arcade.collide(this.fireballs, this.map.platforms, function(fireball) {
            fireball.kill();
        });
        this.game.physics.arcade.overlap(this.fireballs, this.enemies, function(fireball, enemy) {
            fireball.kill();
            enemy.kill();
        });

        this.game.physics.arcade.collide(this.projectiles, this.map.platforms, function (projectile) {
            if (projectile.body.blocked.down) {
                if (projectile.body.velocity.x > 0) {
                    projectile.angle += 5;
                } else {
                    projectile.angle += -5;
                }
            }
        });

        this.game.physics.arcade.collide(this.player.spells['XZ'].shield, this.projectiles, function(shield, projectile) {
            projectile.kill();
        });

        this.physics.arcade.overlap(this.player, this.enemies, () => {
            this.player.damage(1);
        });

        this.physics.arcade.overlap(this.player, this.goal, () => {
            this.levelComplete(this.goal.nextLevel);
        });

        this.physics.arcade.overlap(this.player, this.coins, (player, coin) => {
            this.player.collect(coin);
        });

        this.physics.arcade.overlap(this.player, this.memories, (player, memory) => {
            if (memory.dialogueId) {
                this.dialogue.start(memory.dialogueId, memory.condition);
            }
            this.checkPointPosition = new Phaser.Point(memory.position.x, memory.position.y - memory.height / 2 - this.player.height / 2);
            memory.kill();
        });

        this.physics.arcade.overlap(this.player, this.spikes, (player, spike) => {
            if (player.body.velocity.y > 0 && player.body.bottom !== spike.body.bottom) {
                this.restart();
            }
        });

        this.physics.arcade.overlap(this.player, this.shooters, (player, shooter) => {
            shooter.shoot();
        });

        this.physics.arcade.overlap(this.player, this.projectiles, () => {
            this.player.damage(1);
        });
    }

    render() {
        if (this.showDebug) {
            this.game.debug.body(this.player);
            this.game.debug.body(this.goal);
            this.enemies.forEach((enemy) => this.game.debug.body(enemy));
            this.spikes.forEach((spike) => this.game.debug.body(spike));
            this.fireballs.forEach((fireball) => this.game.debug.body(fireball));
            this.shooters.forEach((shooter) => this.game.debug.body(shooter));
            this.projectiles.forEach((projectile) => this.game.debug.body(projectile));
            this.coins.forEach((coin) => this.game.debug.body(coin));
            this.mobilePlatforms.forEach((platform) => this.game.debug.body(platform));

            if (this.player.spells['XZ'].shield.alive) {
                this.game.debug.body(this.player.spells['XZ'].shield);
            }
        }
    }

    createHUD () {
        this.hudTopBackground = this.game.add.sprite(0, 0, 'hudBg');
        this.hudTopBackground.fixedToCamera = true;
        this.hudBottomBackground = this.game.add.sprite(0, this.game.height - 30, 'hudBg');
        this.hudBottomBackground.fixedToCamera = true;
        this.hudBottomBackground.alpha = 0.7;

        this.scoreLabel = this.game.add.bitmapText(this.game.width - 10, 10, 'carrier_command', `Score: ${pad(this.score)}`, 12);
        this.scoreLabel.anchor.setTo(1, 0);
        this.scoreLabel.fixedToCamera = true;

        this.healthLabel = this.game.add.bitmapText(10, 10, 'carrier_command', "Health: ", 12);
        this.healthLabel.fixedToCamera = true;

        this.healthIcons = this.game.add.group();
        this.healthIcons.fixedToCamera = true;
        for (let i = 0; i < this.player.maxHealth; i += 1) {
            let icon = this.game.add.sprite(this.healthLabel.width + 16 + i * 18, 16, 'healthIcons');
            icon.anchor.setTo(0.5);
            this.healthIcons.add(icon);
        }

        //Keys group
        this.hudKeys = this.game.add.group();

        this.updateHealthHud();

        this.levelCompleteOverlay = this.game.add.image(0, 0, 'levelCompleteOverlay');
        this.levelCompleteOverlay.alpha = 0;
        this.levelCompleteOverlay.fixedToCamera = true;
        this.levelCompleteText = this.game.add.bitmapText(400, 300, 'carrier_command', "Level complete!", 16);
        this.levelCompleteText.anchor.setTo(0.5);
        this.levelCompleteText.fixedToCamera = true;
        this.levelCompleteText.visible = false;

        this.dialogue = new Dialogue(this);
    }

    restart() {
        if (this.checkPointPosition) {
            this.player.respawn(this.checkPointPosition);
        } else {
            this.game.state.start('start', true, false, this.levelId, this.initialScore);
        }
    }

    levelComplete(nextLevel) {
        if (!this.levelCompleted) {
            this.player.invulnerable = true;
            this.levelCompleted = true;
            this.player.stop();
            this.levelCompleteTween = this.game.add.tween(this.levelCompleteOverlay).to({
                alpha: 0.7
            },  Phaser.Timer.HALF, "Linear", true);
            this.levelCompleteTween.onComplete.add(() => {
                this.levelCompleteText.visible = true;
                let timer = this.game.time.create(this.game, true);
                timer.add(Phaser.Timer.SECOND, function() {
                    if(nextLevel) {
                        this.game.state.start('start', true, false, nextLevel, this.score);
                    } else {
                        this.game.state.start('thanks', true, false, this.score);
                    }
                }, this);
                timer.start();
            });
            this.levelCompleteTween.start();
        }
    }

    updateHealthHud () {
        for (let i = 0; i < this.player.maxHealth; i += 1) {
            this.healthIcons.children[i].frame = i < this.player.health ? 0 : 1;
        }
    }

    updateSpellHud (letter) {
        let keyHud = this.game.add.sprite(16 + 32 * this.hudKeys.length + 1, this.game.height - 16, 'keys', letter === 'Z' ? 0 : 1);
        keyHud.fixedToCamera = true;
        keyHud.anchor.setTo(0.5);
        this.hudKeys.add(keyHud);
    }

    clearSpellHud() {
        this.hudKeys.removeAll();
    }

    updateScoreHud () {
        this.scoreLabel.text = `Score: ${pad(this.score)}`;
    }

    toggleDebug () {
        this.showDebug = (this.showDebug) ? false : true;
    }
}
