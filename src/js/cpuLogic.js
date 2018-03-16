export default function CpuLogic(controller) {
  return {
    grid: [
      '', '', '',
      '', '', '',
      '', '', ''
    ],
    turn: 'player',
    gameInProgress: false,
    verdict: '',
    player_data: {
      shape: 'X',
      moveHistory: [],
      moves: 0
    },
    CPU_data: {
      shape: 'O',
      moveHistory: [],
      moves: 0
    },
    CPU_makeMove: function() {
      if (this.player_data.shape === 'X') {
        return this.CPU_counter();
      } else {
        return this.CPU_attack();
      }
    },
    CPU_counter: function() {
      switch (this.player_data.moves) {
        case 1:
          return this.counter_1();
        case 2:
        case 3:
        case 4:
          return this.counter_2();
      }
    },
    counter_1: function() {
      let playerMoves = this.player_data.moveHistory;
      switch (playerMoves[playerMoves.length - 1]) {
        case 3:
          return 5;
        case 5:
          return 3;
        case 1:
          return 7;
        case 7:
          return 1;
        case 0:
        case 2:
        case 6:
        case 8:
          return 4;
        case 4:
          return 0;
      }
    },
    counter_2: function() {
      switch (true) {
        case controller.pursueVerticalWin().score > 1:
          return this.CPU_attack();
        case controller.pursueHorizontalWin().score > 1:
          return this.CPU_attack();
        case controller.pursueDiagonalWin().score > 1:
          return this.CPU_attack();
        case typeof controller.checkDiagonalThreat() === 'number':
          return controller.checkDiagonalThreat();
        case typeof controller.checkVerticalThreat() === 'number':
          return controller.checkVerticalThreat();
        case typeof controller.checkHorizontalThreat() === 'number':
          return controller.checkHorizontalThreat();
        default:
          return this.CPU_attack();
      }
    },
    counterBeforeAttack: function() {
      switch (true) {
        case controller.pursueVerticalWin().score > 1:
          return this.attack_2();
        case controller.pursueHorizontalWin().score > 1:
          return this.attack_2();
        case controller.pursueDiagonalWin().score > 1:
          return this.attack_2();
        case typeof controller.checkDiagonalThreat() === 'number':
          return controller.checkDiagonalThreat();
        case typeof controller.checkVerticalThreat() === 'number':
          return controller.checkVerticalThreat();
        case typeof controller.checkHorizontalThreat() === 'number':
          return controller.checkHorizontalThreat();
      }
    },
    CPU_attack: function() {
      switch (this.CPU_data.moves) {
        case 0:
          return 4;
        case 1:
        case 2:
        case 3:
        case 4:
          if (typeof this.counterBeforeAttack() === 'number') {
            return this.counterBeforeAttack();
          } else {
            return this.attack_2();
          }
      }
    },
    attack_1: function() {
      return controller.getRandomEmptySquare();
    },
    attack_2: function() {
      let gridAnalysis = {
        vertical: controller.pursueVerticalWin().score,
        horizontal: controller.pursueHorizontalWin().score,
        diagonal: controller.pursueDiagonalWin().score
      },
          attackDirection = Object.entries(gridAnalysis).sort((a, b) => {
            return b[1] - a[1];
      })[0][0];
      if (gridAnalysis.vertical === gridAnalysis.horizontal &&
          gridAnalysis.vertical === gridAnalysis.diagonal) {
        attackDirection = 'none';
      }
      switch (attackDirection) {
        case 'vertical':
          return controller.pursueVerticalWin().move;
        case 'horizontal':
          return controller.pursueHorizontalWin().move;
        case 'diagonal':
          return controller.pursueDiagonalWin().move;
        default:
          return this.attack_1();
      }
    }
  }
}
