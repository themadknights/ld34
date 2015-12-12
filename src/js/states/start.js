import { pad } from 'utils';
import { Map } from 'map';
import { Goal } from 'sprites/goal';
import { Player } from 'sprites/player';

export class StartState extends Phaser.State {
    constructor() {
        super();
    }

    init() {
        //Starting Physics
        this.physics.startSystem(Phaser.Physics.ARCADE);

        //  Press F1 to toggle the debug display
        this.debugKey = this.input.keyboard.addKey(Phaser.Keyboard.F1);
        this.debugKey.onDown.add(this.toggleDebug, this);
    }

    create() {
        //Creating gravity
        this.physics.arcade.gravity.y = 300;

        // Create map
        this.map = new Map(this);

        // Create player
        this.player = new Player(this, 0, 0);

        // Create coins
        this.coins = this.game.add.group();

        // Create goal
        this.goal = new Goal(this, 0, 0);

        //Fireball group
        this.fireballs = this.game.add.group();

        // Create enemies
        this.enemies = this.game.add.group();

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
        this.game.physics.arcade.collide(this.player, this.map.platforms);

        this.game.physics.arcade.collide(this.enemies, this.map.platforms);

        this.game.physics.arcade.collide(this.fireballs, this.map.platforms, function(fireball) {
            fireball.kill();
        });
        this.game.physics.arcade.collide(this.fireballs, this.enemies, function(fireball, enemy) {
            fireball.kill();
            enemy.kill();
        });

        this.physics.arcade.overlap(this.player, this.enemies, () => {
            this.player.damage(1);
        });

        this.physics.arcade.overlap(this.player, this.goal, () => {
            this.levelComplete();
        });

        this.physics.arcade.overlap(this.player, this.coins, (player, coin) => {
            this.player.collect(coin);
        });

        // // TODO: for debugging purposes
        // if (this.cursors.up.isDown) {
        //     this.player.body.velocity.y = -200;
        // }
        //
        // if (this.cursors.left.isDown) {
        //     this.player.body.velocity.x = -200;
        // } else if (this.cursors.right.isDown) {
        //     this.player.body.velocity.x = 200;
        // } else {
        //     this.player.body.velocity.x = 0;
        // }
    }

    render() {
        if (this.showDebug) {
            this.game.debug.body(this.player);
            this.game.debug.body(this.goal);
            this.enemies.forEach((enemy) => this.game.debug.body(enemy));
        }
    }

    createHUD () {
        this.score = 0;
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
        this.updateHealthHud();
    }

    gameOver() {
        this.game.state.start('start', true, false, this.score);
    }

    levelComplete() {
        this.game.state.start('start', true, false, this.score);
    }

    updateHealthHud () {
        for (let i = 0; i < this.player.maxHealth; i += 1) {
            this.healthIcons.children[i].frame = i < this.player.health ? 0 : 1;
        }
    }

    updateScoreHud () {
        this.scoreLabel.text = `Score: ${pad(this.score)}`;
    }

    toggleDebug () {
        this.showDebug = (this.showDebug) ? false : true;
    }
}
