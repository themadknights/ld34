import { Enemy } from 'sprites/enemy';
import { Coin } from 'sprites/coin';
import { Spike } from 'sprites/spike';
import { Shooter } from 'sprites/shooter';
import { MobilePlatform } from 'sprites/mobile_platform';
import { Memory } from 'sprites/memory';

export class Map extends Phaser.Tilemap {
    constructor(state, level) {
        super(state.game, level);

        this.gameState = state;

        this.addTilesetImage('tileset');
        this.setCollisionBetween(2,99);

        this.platforms = this.createLayer('foreground');
        this.platforms.resizeWorld();

        this.background = this.createLayer('background');

        let musicId = 'music0';

        if (this.properties && this.properties.music) {
            musicId = this.properties.music;
        }

        this.audio = state.game.add.audio(musicId, 0.05, true);
    }

    loadLevel() {
        this.loadCharacters();
        this.loadCoins();
        this.loadSpikes();
        this.loadShooters();
        this.loadMobilePlatforms();
        this.loadMemories();

        this.gameState.game.sound.stopAll();
        this.audio.play();
    }

    loadCharacters() {
        if (this.objects && this.objects.characters) {
            for(let character of this.objects.characters) {
                switch(character.type) {
                    case "player":
                        let player = this.gameState.player;
                        player.position.setTo(character.x + player.width / 2, character.y - player.height / 2);
                        break;
                    case "enemy":
                        this.gameState.enemies.add(new Enemy(this.gameState, character));
                        break;
                    case "goal":
                        let goal = this.gameState.goal;
                        goal.position.setTo(character.x + goal.width / 2, character.y - goal.height / 2);
                        goal.setData(character);
                        break;
                }
            }
        }
    }

    loadCoins() {
        if (this.objects && this.objects.coins) {
            for(let coin of this.objects.coins) {
                this.gameState.coins.add(new Coin(this.gameState, coin));
            }
        }
    }

    loadSpikes() {
        if (this.objects && this.objects.spikes) {
            for(let spike of this.objects.spikes) {
                this.gameState.spikes.add(new Spike(this.gameState, spike));
            }
        }
    }

    loadShooters() {
        if (this.objects && this.objects.shooters) {
            for(let shooter of this.objects.shooters) {
                this.gameState.shooters.add(new Shooter(this.gameState, shooter));
            }
        }
    }

    loadMobilePlatforms() {
        if (this.objects && this.objects.platforms) {
            for(let platform of this.objects.platforms) {
                this.gameState.mobilePlatforms.add(new MobilePlatform(this.gameState, platform));
            }
        }
    }

    loadMemories() {
        if (this.objects && this.objects.memories) {
            for(let memory of this.objects.memories) {
                this.gameState.memories.add(new Memory(this.gameState, memory));
            }
        }
    }
}
