class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupBoard();
    this.handleClick();
    this.handleResetButton();
  }

  setupBoard($el) {
    for (var listItems = 0; listItems < 9; listItems++) {
      this.$el.append("<li class='board-tile' value='" + listItems + "'></li>");
    }
  }

  handleClick() {
    this.$el.on("click", "li", ( (e) => {
      const $li = $( e.currentTarget );
      this.game.takeTurn($li);
      if (this.game.isGameOver()) {
        alert(this.game.currentPlayer + " is the winner!");

        this.resetGame();
      } else {
        this.game.changePlayers();
      }
    }))
  }

  handleResetButton() {
    const resetButton = $(".reset-button");

    resetButton.on("click", () => {
      this.resetGame();
    })
  }

  resetGame(){
    const tiles = $(".board-tile");
    tiles.remove();

    this.game.resetGameBoard();
    this.setupBoard(this.$el);
  }

}

module.exports = View;
