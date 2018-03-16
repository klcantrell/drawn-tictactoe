import 'core-js/fn/object/assign';
import 'core-js/fn/object/entries';
import '../css/style.css';
import GameController from './gameController';
import CpuLogic from './cpuLogic';
import GameView from './gameView';

const gameController = GameController();
const cpuLogic = CpuLogic(gameController);
const gameView = GameView(gameController);

gameController.init({view: gameView, cpuLogic});
