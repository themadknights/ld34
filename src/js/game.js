import { PreloadState } from './states/preload';
import { LoadState } from './states/load';
import { StartState } from './states/start';
import { MenuState } from './sates/menu';
import { PublisherState } from './sates/publisher';
import { CreditsState } from './sates/credits';
import { ThanksState } from './sates/thanks';

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

export class Game extends Phaser.Game {
    constructor () {
        super(CANVAS_WIDTH, CANVAS_HEIGHT, Phaser.CANVAS, "", null, false, false);
        this.state.add('preload', new PreloadState());
        this.state.add('load', new LoadState());
        this.state.add('start', new StartState());
        this.state.add('credits', new CreditsState());
        this.state.add('publisher', new PublisherState());
        this.state.add('menu', new MenuState());
        this.state.add('thanks', new ThanksState());

        this.state.start('preload');
    }
}
