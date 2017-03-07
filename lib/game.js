class Game {
  constructor(){
    this.marks = ["X", "O"];
    this.currentPlayer = this.marks[0];
    this.gameOver = false;
    this.gameBoard = this.makeGameBoard();
  }

  makeGameBoard() {
    const grid = []

    for (var i = 0; i < 3; i++) {
      grid.push([]);
      for (var n = 0; n < 3; n++) {
        grid[i].push(null);
      }
    }
    return grid;
  }

  isValidMove(colValue, rowValue) {
    if (this.gameBoard[colValue][rowValue] !== null) {
      return false;
    }
    return true;
  }

  takeTurn($li) {

    const value = $li.val();

    //calculates internal game board column
    const colValue = Math.floor(value / 3);

    //calculates internal game board row
    const rowValue = value % 3;

    if (this.isValidMove(colValue, rowValue)) {

      this.gameBoard[colValue][rowValue] = this.currentPlayer;
      $li.append("<div class='tile-text'>" + this.currentPlayer + "</div>");

      if (this.currentPlayer === this.marks[0]) {
        $li.css("background-color", "yellow");
      } else {
        $li.css("background-color", "cyan");
      }

    } else {
      alert("Invalid move! Try another position")
    }
  }

  takeComputerTurn(gameBoard) {

  }

  changePlayers() {
    if (this.currentPlayer === this.marks[0]) {
      this.currentPlayer = this.marks[1];
    } else {
      this.currentPlayer = this.marks[0];
    }
  }

  checkTie() {
    if ([].concat.apply([], this.gameBoard).some(x => x === null)) {
      return false;
    }
    return true;
  }

  isGameOver() {
    if (this.checkRowWin() || this.checkColWin() || this.checkDiagWin()) {
      return true;
    } else {
      return false;
    }
  }

  // checks all rows for a win
  checkRowWin(){
    for (var i = 0; i < 3; i++) {
      let isWin = true;
      for (var j = 0; j < 3; j++) {
        if (this.gameBoard[i][j] !== this.currentPlayer || this.gameBoard[i][j] === null) {
          isWin = false;
        }
      }
      if (isWin) {
        return true;
      }
    }
    return false;
  }

  //checks all columns for a win
  checkColWin() {
    for (var i = 0; i < 3; i++) {
      let isWin = true;
      for (var j = 0; j < 3; j++) {
        if (this.gameBoard[j][i] !== this.currentPlayer || this.gameBoard[j][i] === null ) {
          isWin = false;
        }
      }
      if (isWin) {
        return true;
      }
    }
    return false;
  }

  checkDiagWin() {
    let isWin = true;

    //checks [0,0], [1,1], and [2,2] for a win
    for (var i = 0; i < 3; i++) {
      if (this.gameBoard[i][i] !== this.currentPlayer || this.gameBoard[i][i] === null ) {
        isWin = false;
      }
    }
    if (isWin === true) {
      return true;
    }

    isWin = true;

    //checks [2,0], [1,1], and [0,2] for a win
    let j = 0;
    for (var i = 2; i >= 0; i--) {
      if (this.gameBoard[i][j] !== this.currentPlayer || this.gameBoard[i][j] === null ) {
        isWin = false;
      }
      j++;
    }

    return isWin;
  }

  resetGameBoard() {
    this.gameBoard = this.makeGameBoard();
  }
}

module.exports = Game;
