function GameStart() {
  const game = new Game();

  while (game.isOver === false) {
    game.takeTurn();
  }
}

class Game {
  constructor {
    this.marks = ["X", "O"];
    this.currentPlayer = this.marks[0];
    this.isOver = false;
  }


}
