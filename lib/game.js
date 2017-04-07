class Game {
  constructor(){
    this.marks = ["X", "O"];
    this.currentPlayer = this.marks[0];
    this.gameOver = false;
    this.gameBoard = this.makeGameBoard();
  }

  makeGameBoard() {
    const grid = [];

    for (var i = 0; i < 3; i++) {
      grid.push([]);
      for (var n = 0; n < 3; n++) {
        grid[i].push(null);
      }
    }
    return grid;
  }

  isValidMove(rowValue, colValue) {
    // console.log(rowValue, colValue);
    if (this.gameBoard[rowValue][colValue] === null) {
      return true;
    }
    return false;
  }

  takeTurn($li) {

    const value = $li.attr("id");

    //calculates internal game board column
    const colValue = Math.floor(value / 3);

    //calculates internal game board row
    const rowValue = value % 3;

    if (this.isValidMove(rowValue, colValue)) {

      this.gameBoard[rowValue][colValue] = this.currentPlayer;

      $li.append("<div class='tile-text'>" + this.currentPlayer + "</div>");

      if (this.currentPlayer === this.marks[0]) {
        $li.css("background-color", "yellow");
      } else {
        $li.css("background-color", "cyan");
      }

      if (this.isGameOver()) {
        $(".game-text").text(this.currentPlayer + " is the winner!");

        // this.$el.unbind('click');
      } else if (this.checkTie()) {
        $(".game-text").text("Tie Game! Everyone is a winner.");

        // this.$el.unbind('click');
      }
      else {
        // console.log(this.game.currentPlayer);
        this.changePlayers();
      }

    } else {
      alert("Invalid move! Try another position")
    }
  }

  takeComputerTurn(gameBoard) {
    // console.log('taking computer turn...')
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        console.log("checking spot" + j);
        if (gameBoard[i][j] !== "X" && gameBoard[i][j] !== "O") {
          gameBoard[i][j] = "O";
          if (this.checkRowWin() || this.checkColWin() || this.checkDiagWin()) {
            const $winningSpot = $("li #" + (i + j));

            // console.log($winningSpot);

            // $winningSpot.append("<div class='tile-text'>" + this.currentPlayer + "</div>");
            if (this.currentPlayer === this.marks[0]) {
              $winningSpot.css("background-color", "yellow");
            } else {
              $winningSpot.css("background-color", "cyan");
            }

            $(".game-text").text(this.currentPlayer + " is the winner!");

            // this.$el.unbind('click');

            return;
          } else {
            gameBoard[i][j] = null;
          }
        }
      }
    }

    let randomBoardSpot = this.getRandomIntInclusive(0,9);

    //calculates internal game board column
    let colValue = Math.floor(randomBoardSpot / 3);

    //calculates internal game board row
    let rowValue = randomBoardSpot % 3;

    do {
      randomBoardSpot = this.getRandomIntInclusive(0,9);

      //calculates internal game board column
      colValue = Math.floor(randomBoardSpot / 3);

      //calculates internal game board row
      rowValue = randomBoardSpot % 3;
    }
    while(!this.isValidMove(rowValue, colValue));

    // while () {
    //   let randomBoardSpot = this.getRandomIntInclusive(0,9);
    //
    //   colValue = Math.floor(randomBoardSpot / 3);
    //
    //   rowValue = randomBoardSpot % 3;
    // }

    this.gameBoard[rowValue][colValue] = this.currentPlayer;

    let $li = $("#" + randomBoardSpot);
    // console.log(this.isValidMove(colValue, rowValue));
    // console.log(randomBoardSpot);
    // console.log($li);
    // console.log(this.gameBoard);

    $li.append("<div class='tile-text'>" + this.currentPlayer + "</div>");

    if (this.currentPlayer === this.marks[0]) {
      $li.css("background-color", "yellow");
    } else {
      $li.css("background-color", "cyan");
    }

    this.changePlayers();
  }

  getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  changePlayers() {
    if (this.currentPlayer === this.marks[1]) {
      // debugger;

      console.log("Changing to player X");

      this.currentPlayer = this.marks[0];
      // $(".game-text").text("Current Player: " + this.currentPlayer);

    } else if(this.currentPlayer === this.marks[0]) {

      console.log("Changing to player O");

      //AI Player
      this.currentPlayer = this.marks[1];
      this.takeComputerTurn(this.gameBoard);

      //Human player
      // $(".game-text").text("Current Player: " + this.currentPlayer);
      // this.currentPlayer = this.marks[1];
    }
  }

  checkTie() {
    if ([].concat.apply([], this.gameBoard).some(mark => mark === null)) {
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
