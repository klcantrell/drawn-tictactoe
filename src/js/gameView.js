import KUTE from 'kute.js';
import 'kute.js/kute-svg';
import GamePrompts from './gamePrompts';

export default function GameView(controller) {
  return {
    gamePrompts: GamePrompts(controller),
    init: function() {
      this.cacheDome();
      this.bindEvents();
      this.drawBoardGrid();
      this.gamePrompts.gameStart.init();
      this.gamePrompts.gameStart.slideIn();
      this.gamePrompts.gameEnd.init();
      this.gamePrompts.idle.init();
      this.gamePrompts.chooseAnother.init();
    },
    cacheDome: function() {
      this.board = document.querySelector(".board");
      this.board_grid = document.querySelector(".board-grid");
      this.squares = this.board.getElementsByClassName("board__square");
    },
    bindEvents: function() {
      for (let i = 0; i < this.squares.length; i++) {
        this.squares[i].addEventListener('click', controller.processPlayerMove.bind(controller));
      }
    },
    drawBoardGrid: function() {
      KUTE.fromTo('#vertical1', {draw: '0% 0%'}, {draw: '0% 100%'}, {duration: 500, delay: 200}).start();
      KUTE.fromTo('#vertical2', {draw: '0% 0%'}, {draw: '0% 100%'}, {duration: 500, delay: 400}).start();
      KUTE.fromTo('#horizontal1', {draw: '0% 0%'}, {draw: '0% 100%'}, {duration: 500, delay: 600}).start();
      KUTE.fromTo('#horizontal2', {draw: '0% 0%'}, {draw: '0% 100%'}, {duration: 500, delay: 800}).start();
      for (let i = 0; i < this.squares.length; i++) {
        let square = this.squares[i];
        let startTime = 200 * i;
        KUTE.to(square.firstChild, {opacity: 1}, {duration: 1000, delay: startTime}).start();
      }
      this.loadBoard();
    },
    loadBoard: function() {
      this.board.classList.remove("hide-before-load");
      // IE does not support classlist on SVG
      this.board_grid.style.visibility = 'visible';
    },
    getCurrentSquare: function(id) {
      const squaresArray = Array.from(this.squares);
      const targetIndex = squaresArray.findIndex((item) => {
        return item.id == id;
      });
      return this.squares[targetIndex];
    },
    render: function() {
      let moveData = controller.getMoveData();
      let square = this.getCurrentSquare(moveData.moveHistory[moveData.moveHistory.length - 1]);
      square.firstChild.innerHTML = this.insertShape(square.id, moveData.shape);
      this.drawShape(square.id, moveData.shape);
    },
    insertShape: function(id, shape) {
      if (shape === 'X') {
        return  `
          <svg class="svg-X" style="stroke-dasharray: 110; stroke-dashoffset: 110;" width="75" height="75" viewBox="0 0 75 75">
            <path id="diag_right${id}" d="m 0 0 75 75" stroke="hsla(9, 100%, 76%, 1)" stroke-width="2.5"/>
            <path id="diag_left${id}" d="m 75 0 -75 75" stroke="hsla(9, 100%, 76%, 1)" stroke-width="2.5"/>
          </svg>
        `;
      } else {
        return  `
          <svg class="svg-O" style="stroke-dasharray: 110; stroke-dashoffset: 110;" width="90" height="90" viewBox="3 0 21 21">
            <path id="circle${id}" d="m 13.455845,1.0098512 c -5.4054596,0.019625 -9.7717564,4.3583082 -9.7523971,9.6907208 0.019359,5.332414 4.4170437,9.63928 9.8225031,9.619655 5.40546,-0.01962 9.771757,-4.358308 9.752397,-9.690721 -0.01936,-5.3324135 -4.417044,-9.63927948 -9.822503,-9.6196548 z" fill="transparent" stroke="hsla(42, 100%, 76%, 1)" stroke-width="0.65"/>
         </svg>
        `;
      }
    },
    drawShape: function(id, shape) {
      if (shape === 'X') {
        KUTE.fromTo(`#diag_right${id}`, {draw: '0% 0%'}, {draw: '0% 100%'}, {duration: 500}).start();
        KUTE.fromTo(`#diag_left${id}`, {draw: '0% 0%'}, {draw: '0% 100%'}, {duration: 500, delay: 300}).start();
      } else {
        KUTE.fromTo(`#circle${id}`, {draw: '0% 0%'}, {draw: '0% 100%'}, {duration: 1500}).start();
      }
    },
    reset: function() {
      for (let i = 0; i < this.squares.length; i++) {
        this.squares[i].firstChild.textContent = '';
      }
    }
  };
}
