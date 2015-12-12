import { Enemy } from 'sprites/enemy';
import { Coin } from 'sprites/coin';

export class Map extends Phaser.Tilemap {
    constructor(state) {
        super(state.game, 'level1');

        this.gameState = state;

        this.addTilesetImage('tileset');
        this.setCollisionBetween(2,99);

        this.platforms = this.createLayer('foreground');
        this.platforms.resizeWorld();
    }

    loadLevel() {
        for(let character of this.objects.characters) {
            switch(character.type) {
                case "player":
                    let player = this.gameState.player;
                    player.position.setTo(character.x + player.width / 2, character.y - player.height / 2);
                    break;
                case "enemy":
                    this.gameState.enemies.add(new Enemy(this.gameState, character.x + 16, character.y - 16));
                    break;
                case "goal":
                    let goal = this.gameState.goal;
                    goal.position.setTo(character.x + goal.width / 2, character.y - goal.height / 2);
                    break;
            }
        }
        this.loadCoins();
    }

    loadCoins() {
        for(let coin of this.objects.coins) {
            this.gameState.coins.add(new Coin(this.gameState, coin.x + 16, coin.y - 16));
        }
    }
}
