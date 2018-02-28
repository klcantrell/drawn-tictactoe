// polyfills for IE
if (!Object.entries)
  Object.entries = function( obj ){
    let ownProps = Object.keys( obj ),
        i = ownProps.length,
        resArray = new Array(i); // preallocate the Array
    while (i--)
      resArray[i] = [ownProps[i], obj[ownProps[i]]];
    
    return resArray;
  };
// 

const gameModel = {
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
      case gameController.pursueVerticalWin().score > 1:
        return this.CPU_attack();
      case gameController.pursueHorizontalWin().score > 1:
        return this.CPU_attack();
      case gameController.pursueDiagonalWin().score > 1:
        return this.CPU_attack();
      case typeof gameController.checkDiagonalThreat() === 'number':
        return gameController.checkDiagonalThreat();
      case typeof gameController.checkVerticalThreat() === 'number':
        return gameController.checkVerticalThreat();
      case typeof gameController.checkHorizontalThreat() === 'number':
        return gameController.checkHorizontalThreat();
      default:
        return this.CPU_attack();
    }
  },
  counterBeforeAttack: function() {
    switch (true) {
      case gameController.pursueVerticalWin().score > 1:
        return this.attack_2();
      case gameController.pursueHorizontalWin().score > 1:
        return this.attack_2();
      case gameController.pursueDiagonalWin().score > 1:
        return this.attack_2();
      case typeof gameController.checkDiagonalThreat() === 'number':
        return gameController.checkDiagonalThreat();
      case typeof gameController.checkVerticalThreat() === 'number':
        return gameController.checkVerticalThreat();
      case typeof gameController.checkHorizontalThreat() === 'number':
        return gameController.checkHorizontalThreat();
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
    return gameController.getRandomEmptySquare();
  },
  attack_2: function() {
    let gridAnalysis = {
      vertical: gameController.pursueVerticalWin().score,
      horizontal: gameController.pursueHorizontalWin().score,
      diagonal: gameController.pursueDiagonalWin().score
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
        return gameController.pursueVerticalWin().move;
      case 'horizontal':
        return gameController.pursueHorizontalWin().move;
      case 'diagonal':
        return gameController.pursueDiagonalWin().move;
      default:
        return this.attack_1();
    }
  }
};





const gameController = {
  init: function() {
    gameView.init();
    gameStartView.init();
    gameEndView.init();
    idleMessage.init();
    chooseMessage.init();
  },
  startGame: function(e) {
    gameView.reset();
    gameStartView.slideOut();
    this.toggleGameInProgress();
    let playerShape = e.currentTarget.textContent;
    gameModel.player_data.shape = playerShape;
    gameModel.CPU_data.shape = playerShape === 'X' ? 'O' : 'X';
    if (gameModel.CPU_data.shape === 'X') {
      gameModel.turn = "CPU";
      this.processCPUMove();
    } else {
      this.processPlayerIdle();
    }
  },
  processPlayerIdle: function() {
    gameController.idleTimeout = setTimeout(gameController.showIdleMessage, 5000);
  },
  processPlayerActive: function() {
    clearTimeout(gameController.idleTimeout);
  },
  showIdleMessage: function() {
    idleMessage.slideIn();
    gameModel.gameInProgress = false;
  },
  hideIdleMessage: function() {
    idleMessage.slideOut();
    gameModel.gameInProgress = true;
  },
  showChooseMessage: function() {
    chooseMessage.slideIn();
    gameModel.gameInProgress = false;
  },
  hideChooseMessage: function() {
    chooseMessage.slideOut();
    gameModel.gameInProgress = true;
  },
  toggleGameInProgress: function() {
    gameModel.gameInProgress = gameModel.gameInProgress ? false : true;
  },
  processPlayerMove: function(e) {
    this.processPlayerActive();
    if (gameModel.gameInProgress && gameModel.turn === 'player') {
      let squareId = e.currentTarget.id;
      if (gameModel.grid[squareId]) {
        gameController.showChooseMessage();
      } else {
        this.registerPlayerMove(squareId);
        this.processCPUMove();
      }
    }
  },
  registerPlayerMove: function(squareId) {
    console.log(`Player chose ${squareId}`);
    gameModel.player_data.moves++;
    gameModel.player_data.moveHistory.push(parseInt(squareId));
    gameModel.grid[squareId] = gameModel.player_data.shape;
    gameView.render();
    if (this.checkGameOver()) {
      this.endGame();
    }
    gameModel.turn = 'CPU';
  },
  processCPUMove: function() {
    setTimeout(function() {
      if (gameModel.gameInProgress) {
        let CPU_move = gameModel.CPU_makeMove();
        console.log(`Computer chose ${CPU_move}`);
        gameModel.CPU_data.moves++;
        gameModel.CPU_data.moveHistory.push(parseInt(CPU_move));
        gameModel.grid[CPU_move] = gameModel.CPU_data.shape;
        gameView.render();
        if (gameController.checkGameOver()) {
          gameController.endGame();
        } else {
          gameModel.turn = 'player';
          gameController.processPlayerIdle(); 
        }
      } 
    }, 700);
  },
  getMoveData: function() {
    if (gameModel.turn === 'player') {
      return gameModel.player_data;
    } else {
      return gameModel.CPU_data;
    }
  },
  getGameInProgress: function() {
    return gameModel.gameInProgress;
  },
  getSquareData: function(e) {
    let squareId = e.currentTarget.id;
    return gameModel.grid[squareId];
  },
  getCurrentTurn: function() {
    return gameModel.turn;
  },
  checkGameOver: function() {
    let gridAnalysis = {
      vertical: gameController.pursueVerticalWin().score,
      horizontal: gameController.pursueHorizontalWin().score,
      diagonal: gameController.pursueDiagonalWin().score
    },
        highestScoreKey = Object.keys(gridAnalysis).reduce((a, b) => {
          return gridAnalysis[a] > gridAnalysis[b] ? a : b;
    }),
        isBoardFull = gameModel.grid.indexOf('') < 0 ? true : false;
    switch (true) {
      case gridAnalysis[highestScoreKey] === 3:
        this.setVerdict(gameModel.turn);
        return true;
      case isBoardFull:
        return true;
      default:
        return false;
    }
  },
  endGame: function() {
    this.toggleGameInProgress();
    gameEndView.setVerdictMessage();
    gameEndView.slideIn();
  },
  setVerdict: function(turn) {
    gameModel.verdict = turn;
  },
  getVerdict: function() {
    return gameModel.verdict;
  },
  resetGame: function() {
    gameModel.grid = [
    '', '', '',
    '', '', '',
    '', '', ''
    ];
    gameModel.verdict = '';
    gameModel.turn= 'player';
    gameModel.gameInProgress = false,
    gameModel.player_data = {
      shape: 'X',
      moveHistory: [],
      moves: 0
    };
    gameModel.CPU_data = {
      shape: 'O',
      moveHistory: [],
      moves: 0
    };
    gameView.reset();
    gameEndView.slideOut();
    gameStartView.slideIn();
  },
  checkVerticalThreat: function() {
    let lastMove = gameModel.player_data.moveHistory[gameModel.player_data.moveHistory.length - 1];
    let diffsAgainstLastMove = gameModel.player_data.moveHistory.map((item) => {
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
        !gameModel.grid[this.nullifyVerticalThreat(lastMove, verticalThreatDiff[0])]) {
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
    let lastMove = gameModel.player_data.moveHistory[gameModel.player_data.moveHistory.length - 1];
    let sameRowMoves = gameModel.player_data.moveHistory.filter((item) => {
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
        !gameModel.grid[this.nullifyHorizontalThreat(lastMove, horizontalThreatDiff[0])]) {
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
    let lastMove = gameModel.player_data.moveHistory[gameModel.player_data.moveHistory.length - 1];
    let diagonalThreats = gameModel.player_data.moveHistory.filter((item) => {
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
        !gameModel.grid[this.nullifyDiagonalThreat(lastMove, diagonalThreatDiff[0])]) {
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
    gameModel.grid.forEach((square, index) => {
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
        if (!gameModel.grid[gridIndex]) {
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
      columnScores['1'] += this.scoreSquare(gameModel.grid[square]);
    });
    col2.forEach((square) => {
      columnScores['2'] += this.scoreSquare(gameModel.grid[square]);
    });
    col3.forEach((square) => {
      columnScores['3'] += this.scoreSquare(gameModel.grid[square]);
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
        if (!gameModel.grid[gridIndex]) {
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
      rowScores['1'] += this.scoreSquare(gameModel.grid[square]);
    });
    row2.forEach((square) => {
      rowScores['2'] += this.scoreSquare(gameModel.grid[square]);
    });
    row3.forEach((square) => {
      rowScores['3'] += this.scoreSquare(gameModel.grid[square]);
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
        if (!gameModel.grid[gridIndex]) {
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
      diagScores['1'] += this.scoreSquare(gameModel.grid[square]);
    });
    diag2.forEach((square) => {
      diagScores['2'] += this.scoreSquare(gameModel.grid[square]);
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
      case (gameModel.player_data.shape):
        score -= 99;
        break;
      case (gameModel.CPU_data.shape):
        score++;
        break;
      default:
        score = 0;
        break;
    }
    return score;
  }
};






const gameView = {
  init: function() {
    this.cacheDome();
    this.bindEvents();
    this.drawBoardGrid();
  },
  cacheDome: function() {
    this.board = document.querySelector(".board");
    this.board_grid = document.querySelector(".board-grid");
    this.squares = this.board.getElementsByClassName("board__square");
  },
  bindEvents: function() {
    for (let i = 0; i < this.squares.length; i++) {
      this.squares[i].addEventListener('click', gameController.processPlayerMove.bind(gameController));
    }
  },
  drawBoardGrid: function() {
    let tl = new TimelineMax();
      tl
        .from('#vertical1', 0.5, {drawSVG: 0})
        .from('#vertical2', 0.5, {drawSVG: 0})
        .from('#horizontal1', 0.5, {drawSVG: 0})
        .from('#horizontal2', 0.5, {drawSVG: 0});
    for (let i = 0; i < this.squares.length; i++) {
      let square = this.squares[i];
      let startTime = 0.2 * i;
      tl.fromTo(square.firstChild, 1, {opacity: 0}, {opacity: 1}, startTime);
    }
    this.loadBoard();
  },
  loadBoard: function() {
    this.board.classList.remove("hide-before-load");
    // IE does not support classlist on SVG
    this.board_grid.style.visibility = 'visible';
  },
  getCurrentSquare: function(id) {
    // ARRAY.FROM NOT SUPPORTED IN IE
    // let squaresArray = Array.from(this.squares),
    //     targetIndex = squaresArray.findIndex((item) => {
    //   return item.id == id;
    // });
    let targetIndex;
    for (let i = 0, keys = Object.keys(this.squares); i < keys.length; i++) {
      if (this.squares[keys[i]].id == id) {
        targetIndex = i;
        break;
      }
    }
    return this.squares[targetIndex];
  },
  render: function() {
    let moveData = gameController.getMoveData();
    let square = this.getCurrentSquare(moveData.moveHistory[moveData.moveHistory.length - 1]);
    square.firstChild.innerHTML = this.insertShape(square.id, moveData.shape);
    this.drawShape(square.id, moveData.shape);
  },
  insertShape: function(id, shape) {
    if (shape === 'X') {
      return  `<svg class="svg-X" width="75" height="75" viewBox="0 0 75 75">
                <path id="diag_right${id}" d="m 0 0 75 75" stroke="hsla(9, 100%, 76%, 1)" stroke-width="2.5"/>
                <path id="diag_left${id}" d="m 75 0 -75 75" stroke="hsla(9, 100%, 76%, 1)" stroke-width="2.5"/>
              </svg>`;
    } else {
      return  `<svg class="svg-O" width="90" height="90" viewBox="3 0 21 21">
                  <path id="circle${id}" d="m 13.455845,1.0098512 c -5.4054596,0.019625 -9.7717564,4.3583082 -9.7523971,9.6907208 0.019359,5.332414 4.4170437,9.63928 9.8225031,9.619655 5.40546,-0.01962 9.771757,-4.358308 9.752397,-9.690721 -0.01936,-5.3324135 -4.417044,-9.63927948 -9.822503,-9.6196548 z" fill="transparent" stroke="hsla(42, 100%, 76%, 1)" stroke-width="0.65"/>
               </svg>`;
    }
  },
  drawShape: function(id, shape) {
    if (shape === 'X') {
      let tl = new TimelineMax();
      tl
        .from(`#diag_right${id}`, 0.5, {drawSVG: 0})
        .from(`#diag_left${id}`, 0.5, {drawSVG: 0});
    } else {
      let tl = new TimelineMax();
      tl
        .from(`#circle${id}`, 1.5, {drawSVG: 0})
    }
  },
  reset: function() {
    for (let i = 0; i < this.squares.length; i++) {
      this.squares[i].firstChild.textContent = '';
    }
  }
};

const idleMessage = {
  init: function() {
    this.cacheDom();
    this.bindEvents();
  },
  cacheDom: function() {
    this.tips = document.getElementById("idle-message");
    this.tipsButton = this.tips.querySelector("button");
  },
  bindEvents: function() {
    this.tipsButton.addEventListener('click', function() {
        gameController.processPlayerActive();
        gameController.hideIdleMessage();
      });
  },
  slideIn: function() {
    setTimeout(function() {
      idleMessage.tips.classList.add("message--slide-in"); 
    }, 100);
  },
  slideOut: function() {
    setTimeout(function() {
      idleMessage.tips.classList.remove("message--slide-in"); 
    }, 100);
  }
};

const chooseMessage = {
  init: function() {
    this.cacheDom();
    this.bindEvents();
  },
  cacheDom: function() {
    this.choose = document.getElementById("choose-message");
    this.chooseButton = this.choose.querySelector("button");
  },
  bindEvents: function() {
    this.chooseButton.addEventListener('click', gameController.hideChooseMessage);
  },
  slideIn: function() {
    setTimeout(function() {
      chooseMessage.choose.classList.add("message--slide-in"); 
    }, 100);
  },
  slideOut: function() {
    setTimeout(function() {
      chooseMessage.choose.classList.remove("message--slide-in"); 
    }, 100);
  }
};

const gameStartView = {
  init: function() {
    this.cacheDom();
    this.bindEvents();
    this.slideIn();
  },
  cacheDom: function() {
    this.gameStart = document.getElementById("game-start");
    this.gameStartButtons = this.gameStart.querySelectorAll("button");
  },
  bindEvents: function() {
    // ARRAY.FROM NOT SUPPORT IN IE    
    // let buttons = Array.from(this.gameStartButtons);
    // buttons.forEach((button) => {
    //   button.addEventListener('click', gameController.startGame.bind(gameController));
    // });
    for (let i = 0, keys = Object.keys(this.gameStartButtons); i < keys.length; i++) {
      this.gameStartButtons[keys[i]].addEventListener('click', gameController.startGame.bind(gameController));
    }
  },
  slideIn: function() {
    setTimeout(function() {
      gameStartView.gameStart.classList.add("message--slide-in"); 
    }, 100);
  },
  slideOut: function() {
    setTimeout(function() {
      gameStartView.gameStart.classList.remove("message--slide-in"); 
    }, 100);
  }
};

const gameEndView = {
  init: function() {
    this.cacheDom();
    this.bindEvents();
  },
  cacheDom: function() {
    this.gameEnd = document.getElementById("game-end");
    this.resetButton = this.gameEnd.querySelector("button");
    this.verdict = this.gameEnd.querySelector(".message__verdict");
  },
  bindEvents: function() {
      this.resetButton.addEventListener('click', gameController.resetGame.bind(gameController));
  },
  setVerdictMessage: function() {
    let verdictMessage = gameController.getVerdict() ? 
                          `${gameController.getVerdict()} wins!` :
                           'draw!';
    this.verdict.textContent = verdictMessage;
  },
  slideIn: function() {
    setTimeout(function() {
      gameEndView.gameEnd.classList.add("message--slide-in"); 
    }, 100);
  },
  slideOut: function() {
    setTimeout(function() {
      gameEndView.gameEnd.classList.remove("message--slide-in"); 
    }, 100);
  }
};



gameController.init();