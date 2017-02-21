class Game {
  constructor(){
    this.marks = ["X", "O"];
    this.currentPlayer = this.marks[0];
    this.gameOver = false;
    this.gameBoard = this.makeGameBoard();
  }

  isGameOver() {

  }

  takeTurn($li) {
    if (this.isValidMove($li)) {
      const value = $li.val();

      //calculates column value
      const colValue = Math.floor(value / 3);

      //calculates row value
      const rowValue = value % 3;

      this.gameBoard[colValue][rowValue] = this.currentPlayer;
      $li.css("background-color", "blue");
      $li.text("X");

      // if (this.isGameOver()) {
      //   alert(this.currentPlayer + "is the winner!")
      // }

      //switch players
    } else {
      alert("Invalid move! Try another position")
    }
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
}

module.exports = Game;
