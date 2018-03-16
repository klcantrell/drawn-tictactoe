export default function GameController() {
  let view, cpuLogic;

  return {
    init: function(dependencies = {view: '', cpuLogic: ''}) {
      view = dependencies.view;
      cpuLogic = dependencies.cpuLogic;

      view.init();
    },
    startGame: function(e) {
      view.reset();
      view.gamePrompts.gameStart.slideOut();
      this.toggleGameInProgress();
      let playerShape = e.currentTarget.textContent;
      cpuLogic.player_data.shape = playerShape;
      cpuLogic.CPU_data.shape = playerShape === 'X' ? 'O' : 'X';
      if (cpuLogic.CPU_data.shape === 'X') {
        cpuLogic.turn = "CPU";
        this.processCPUMove();
      } else {
        this.processPlayerIdle();
      }
    },
    processPlayerIdle: function() {
      const _this = this;
      _this.idleTimeout = setTimeout(_this.showIdleMessage, 5000);
    },
    processPlayerActive: function() {
      const _this = this;
      clearTimeout(_this.idleTimeout);
    },
    showIdleMessage: function() {
      view.gamePrompts.idle.slideIn();
      cpuLogic.gameInProgress = false;
    },
    hideIdleMessage: function() {
      view.gamePrompts.idle.slideOut();
      cpuLogic.gameInProgress = true;
    },
    showChooseMessage: function() {
      view.gamePrompts.chooseAnother.slideIn();
      cpuLogic.gameInProgress = false;
    },
    hideChooseMessage: function() {
      view.gamePrompts.chooseAnother.slideOut();
      cpuLogic.gameInProgress = true;
    },
    toggleGameInProgress: function() {
      cpuLogic.gameInProgress = cpuLogic.gameInProgress ? false : true;
    },
    processPlayerMove: function(e) {
      this.processPlayerActive();
      if (cpuLogic.gameInProgress && cpuLogic.turn === 'player') {
        let squareId = e.currentTarget.id;
        if (cpuLogic.grid[squareId]) {
          this.showChooseMessage();
        } else {
          this.registerPlayerMove(squareId);
          this.processCPUMove();
        }
      }
    },
    registerPlayerMove: function(squareId) {
      cpuLogic.player_data.moves++;
      cpuLogic.player_data.moveHistory.push(parseInt(squareId));
      cpuLogic.grid[squareId] = cpuLogic.player_data.shape;
      view.render();
      if (this.checkGameOver()) {
        this.endGame();
      }
      cpuLogic.turn = 'CPU';
    },
    processCPUMove: function() {
      setTimeout(() => {
        if (cpuLogic.gameInProgress) {
          let CPU_move = cpuLogic.CPU_makeMove();
          cpuLogic.CPU_data.moves++;
          cpuLogic.CPU_data.moveHistory.push(parseInt(CPU_move));
          cpuLogic.grid[CPU_move] = cpuLogic.CPU_data.shape;
          view.render();
          if (this.checkGameOver()) {
            this.endGame();
          } else {
            cpuLogic.turn = 'player';
            this.processPlayerIdle();
          }
        }
      }, 700);
    },
    getMoveData: function() {
      if (cpuLogic.turn === 'player') {
        return cpuLogic.player_data;
      } else {
        return cpuLogic.CPU_data;
      }
    },
    getGameInProgress: function() {
      return cpuLogic.gameInProgress;
    },
    getSquareData: function(e) {
      let squareId = e.currentTarget.id;
      return cpuLogic.grid[squareId];
    },
    getCurrentTurn: function() {
      return cpuLogic.turn;
    },
    checkGameOver: function() {
      const gridAnalysis = {
        vertical: this.pursueVerticalWin().score,
        horizontal: this.pursueHorizontalWin().score,
        diagonal: this.pursueDiagonalWin().score
      };
      const highestScoreKey = Object.keys(gridAnalysis).reduce((a, b) => {
            return gridAnalysis[a] > gridAnalysis[b] ? a : b;
      });
      const isBoardFull = cpuLogic.grid.indexOf('') < 0 ? true : false;

      switch (true) {
        case gridAnalysis[highestScoreKey] === 3:
          this.setVerdict(cpuLogic.turn);
          return true;
        case isBoardFull:
          return true;
        default:
          return false;
      }
    },
    endGame: function() {
      this.toggleGameInProgress();
      view.gamePrompts.gameEnd.setMessage();
      view.gamePrompts.gameEnd.slideIn();
    },
    setVerdict: function(turn) {
      cpuLogic.verdict = turn;
    },
    getVerdict: function() {
      return cpuLogic.verdict;
    },
    resetGame: function() {
      cpuLogic.grid = [
      '', '', '',
      '', '', '',
      '', '', ''
      ];
      cpuLogic.verdict = '';
      cpuLogic.turn= 'player';
      cpuLogic.gameInProgress = false,
      cpuLogic.player_data = {
        shape: 'X',
        moveHistory: [],
        moves: 0
      };
      cpuLogic.CPU_data = {
        shape: 'O',
        moveHistory: [],
        moves: 0
      };
      view.reset();
      view.gamePrompts.gameEnd.slideOut();
      view.gamePrompts.gameStart.slideIn();
    },
    checkVerticalThreat: function() {
      let lastMove = cpuLogic.player_data.moveHistory[cpuLogic.player_data.moveHistory.length - 1];
      let diffsAgainstLastMove = cpuLogic.player_data.moveHistory.map((item) => {
        if (item !== lastMove) {
          return lastMove - item;
        } else {
          return undefined;
        }
      });
      let verticalThreatDiff = diffsAgainstLastMove.filter((diff) => {
        if (Math.abs(diff) === 3 || Math.abs(diff) === 6) {
          return diff;
        }
      });
      if (typeof verticalThreatDiff[0] === 'number' &&
          !cpuLogic.grid[this.nullifyVerticalThreat(lastMove, verticalThreatDiff[0])]) {
        return this.nullifyVerticalThreat(lastMove, verticalThreatDiff[0]);
      } else {
        return false;
      }
    },
    nullifyVerticalThreat: function(lastMove, diff) {
      let threateningMoves = [lastMove, lastMove - diff];
      let movesLtoG = threateningMoves.sort((a, b) => {
        return a - b;
      });
      switch (true) {
          case ((movesLtoG[0] === 0 ||
                movesLtoG[0] === 1 ||
                movesLtoG[0] === 2) &&
                Math.abs(diff) === 3):
            return movesLtoG[0] + 6;
          case ((movesLtoG[0] === 0 ||
                movesLtoG[0] === 1 ||
                movesLtoG[0] === 2) &&
                Math.abs(diff) === 6):
            return movesLtoG[0] + 3;
          case ((movesLtoG[0] === 3 ||
                movesLtoG[0] === 4 ||
                movesLtoG[0] === 5) &&
                Math.abs(diff) === 3):
            return movesLtoG[0] - 3;
      }
    },
    checkHorizontalThreat: function() {
      let lastMove = cpuLogic.player_data.moveHistory[cpuLogic.player_data.moveHistory.length - 1];
      let sameRowMoves = cpuLogic.player_data.moveHistory.filter((item) => {
        if (item !== lastMove) {
          switch (lastMove) {
            case 0:
            case 1:
            case 2:
              return item <= 2 && item >= 0;
            case 3:
            case 4:
            case 5:
              return item <=5 && item >=3;
            case 6:
            case 7:
            case 8:
              return item <=8 && item >=6;
          }
        }
      });
      let horizontalThreatDiff = typeof sameRowMoves[0] === 'number' ? sameRowMoves.map((item) => lastMove - item) : false;
      if (typeof horizontalThreatDiff[0] === 'number' &&
          !cpuLogic.grid[this.nullifyHorizontalThreat(lastMove, horizontalThreatDiff[0])]) {
        return this.nullifyHorizontalThreat(lastMove, horizontalThreatDiff[0]);
      } else {
        return false;
      }
    },
    nullifyHorizontalThreat: function(lastMove, diff) {
      let threateningMoves = [lastMove, lastMove - diff];
      let movesLtoG = threateningMoves.sort((a, b) => {
        return a - b;
      });
      switch (true) {
          case ((movesLtoG[0] === 0 ||
                movesLtoG[0] === 3 ||
                movesLtoG[0] === 6) &&
                Math.abs(diff) === 1):
            return movesLtoG[0] + 2;
          case ((movesLtoG[0] === 0 ||
                movesLtoG[0] === 3 ||
                movesLtoG[0] === 6) &&
                Math.abs(diff) === 2):
            return movesLtoG[0] + 1;
          case ((movesLtoG[0] === 1 ||
                movesLtoG[0] === 4 ||
                movesLtoG[0] === 7) &&
                Math.abs(diff) === 1):
            return movesLtoG[0] - 1;
      }
    },
    checkDiagonalThreat: function() {
      let lastMove = cpuLogic.player_data.moveHistory[cpuLogic.player_data.moveHistory.length - 1];
      let diagonalThreats = cpuLogic.player_data.moveHistory.filter((item) => {
        if (item !== lastMove) {
          switch (lastMove) {
            case 4:
              return item === 2 || item === 6;
            case 0:
            case 8:
              return item === 4 || item === 0 || item === 8;
            case 2:
            case 6:
              return item === 4 || item === 2 || item === 6;
          }
        }
      });
      let diagonalThreatDiff = typeof diagonalThreats[0] === 'number' ? diagonalThreats.map((item) => lastMove - item) : false;
      if (typeof diagonalThreatDiff[0] === 'number' &&
          !cpuLogic.grid[this.nullifyDiagonalThreat(lastMove, diagonalThreatDiff[0])]) {
        return this.nullifyDiagonalThreat(lastMove, diagonalThreatDiff);
      } else {
        return false;
      }
    },
    nullifyDiagonalThreat: function(lastMove, diff) {
      let threateningMoves = [lastMove, lastMove - diff];
      let movesLtoG = threateningMoves.sort((a, b) => {
        return a - b;
      });
      switch (true) {
          case (movesLtoG[0] === 4 &&
                Math.abs(diff) === 2):
            return 2;
          case (movesLtoG[0] === 4 &&
                Math.abs(diff) === 4):
            return 0;
          case (movesLtoG[0] === 0 &&
                Math.abs(diff) === 4):
            return 8;
          case (movesLtoG[0] === 0 &&
                Math.abs(diff) === 8):
            return 4;
          case (movesLtoG[0] === 2 &&
                Math.abs(diff) === 2):
            return 6;
          case (movesLtoG[0] === 4 &&
                Math.abs(diff) === 6):
            return 4;
      }
    },
    getRandomEmptySquare: function() {
      let emptySpots = [];
      cpuLogic.grid.forEach((square, index) => {
        if (!square) {
          emptySpots.push(index);
        }
      });
      return emptySpots[this.randomIndexPicker(emptySpots.length)];
    },
    randomIndexPicker: function(lengthOfArray) {
      return Math.floor(Math.random() * lengthOfArray);
    },
    pursueVerticalWin: function() {
      let columnData = this.analyzeColumns(),
          potentialNextMoves = [];
      if (columnData) {
        columnData.column.forEach((gridIndex) => {
          if (!cpuLogic.grid[gridIndex]) {
            potentialNextMoves.push(gridIndex);
          }
        });
        if (columnData.score > 1) {
          return {move: potentialNextMoves[0], score: columnData.score};
        } else {
          return {move: potentialNextMoves[this.randomIndexPicker(potentialNextMoves.length)], score: columnData.score};
        }
      } else {
        return {score: -99};
      }
    },
    analyzeColumns: function() {
      let columnScores = {
        1: 0, 2: 0, 3: 0},
          col1 = [0, 3, 6],
          col2 = [1, 4, 7],
          col3 = [2, 5, 8];
      col1.forEach((square) => {
        columnScores['1'] += this.scoreSquare(cpuLogic.grid[square]);
      });
      col2.forEach((square) => {
        columnScores['2'] += this.scoreSquare(cpuLogic.grid[square]);
      });
      col3.forEach((square) => {
        columnScores['3'] += this.scoreSquare(cpuLogic.grid[square]);
      });
      let targetColumn = Object.entries(columnScores).sort((a,b) => {
        return b[1] - a[1];
      })[0][0];
      if (columnScores[targetColumn] > 1) {
        switch (targetColumn) {
          case '1':
            return {column: col1, score: columnScores[targetColumn]};
          case '2':
            return {column: col2, score: columnScores[targetColumn]};
          case '3':
            return {column: col3, score: columnScores[targetColumn]};
        }
      } else {
        return false;
      }
    },
    pursueHorizontalWin: function() {
      let rowData = this.analyzeRows(),
          potentialNextMoves = [];
      if (rowData) {
        rowData.row.forEach((gridIndex) => {
          if (!cpuLogic.grid[gridIndex]) {
            potentialNextMoves.push(gridIndex);
          }
        });
        if (rowData.score > 1) {
          return {move: potentialNextMoves[0], score: rowData.score};
        } else {
          return {move: potentialNextMoves[this.randomIndexPicker(potentialNextMoves.length)], score: rowData.score};
        }
      } else {
        return {score: -99};
      }
    },
    analyzeRows: function() {
      let rowScores = {
        1: 0, 2: 0, 3: 0},
          row1 = [0, 1, 2],
          row2 = [3, 4, 5],
          row3 = [6, 7, 8];
      row1.forEach((square) => {
        rowScores['1'] += this.scoreSquare(cpuLogic.grid[square]);
      });
      row2.forEach((square) => {
        rowScores['2'] += this.scoreSquare(cpuLogic.grid[square]);
      });
      row3.forEach((square) => {
        rowScores['3'] += this.scoreSquare(cpuLogic.grid[square]);
      });
      let targetRow = Object.entries(rowScores).sort((a,b) => {
        return b[1] - a[1];
      })[0][0];
      if (rowScores[targetRow] > 1) {
        switch (targetRow) {
          case '1':
            return {row: row1, score: rowScores[targetRow]};
          case '2':
            return {row: row2, score: rowScores[targetRow]};
          case '3':
            return {row: row3, score: rowScores[targetRow]};
        }
      } else {
        return false;
      }
    },
    pursueDiagonalWin: function() {
      let diagData = this.analyzeDiagonals(),
          potentialNextMoves = [];
      if (diagData) {
        diagData.diagonal.forEach((gridIndex) => {
          if (!cpuLogic.grid[gridIndex]) {
            potentialNextMoves.push(gridIndex);
          }
        });
        if (diagData.score > 1) {
          return {move: potentialNextMoves[0], score: diagData.score};
        } else {
          return {move: potentialNextMoves[this.randomIndexPicker(potentialNextMoves.length)], score: diagData.score};
        }
      } else {
        return {score: -99};
      }
    },
    analyzeDiagonals: function() {
      let diagScores = {
        1: 0, 2: 0},
          diag1 = [0, 4, 8],
          diag2 = [2, 4, 6];
      diag1.forEach((square) => {
        diagScores['1'] += this.scoreSquare(cpuLogic.grid[square]);
      });
      diag2.forEach((square) => {
        diagScores['2'] += this.scoreSquare(cpuLogic.grid[square]);
      });
      let targetDiag = Object.entries(diagScores).sort((a,b) => {
        return b[1] - a[1];
      })[0][0];
      if (diagScores[targetDiag] > 1) {
        switch (targetDiag) {
          case '1':
            return {diagonal: diag1, score: diagScores[targetDiag]};
          case '2':
            return {diagonal: diag2, score: diagScores[targetDiag]};
        }
      } else {
        return false;
      }
    },
    scoreSquare: function(squareContent) {
      let score = 0;
      switch (squareContent) {
        case (cpuLogic.player_data.shape):
          score -= 99;
          break;
        case (cpuLogic.CPU_data.shape):
          score++;
          break;
        default:
          score = 0;
          break;
      }
      return score;
    }
  }
}
