class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupBoard();
    this.handleClick();
    this.handleResetButton();
  }

  setupBoard($el) {
    // $(".game-text").text("Current Player: " + this.game.currentPlayer);

    for (var listItems = 0; listItems < 9; listItems++) {
      this.$el.append("<li class='board-tile' id='" + listItems + "'></li>");
    }
  }

  handleClick() {
    this.$el.on("click", "li", ( (e) => {
      const $li = $( e.currentTarget );
      this.game.takeTurn($li);
      // if (this.game.isGameOver()) {
      //   $(".game-text").text(this.game.currentPlayer + " is the winner!");
      //
      //   this.$el.unbind('click');
      // } else if (this.game.checkTie()) {
      //   $(".game-text").text("Tie Game! Everyone is a winner.");
      //
      //   this.$el.unbind('click');
      // }
      // else {
      //   // console.log(this.game.currentPlayer);
      //   this.game.changePlayers();
      // }
    }))
  }

  handleResetButton() {
    $(".reset-button").on("click", () => {
      this.resetGame();
    })
  }

  resetGame(){
    const tiles = $(".board-tile");
    tiles.remove();

    this.game.resetGameBoard();
    this.setupBoard(this.$el);
    // this.handleClick();
    this.game.currentPlayer = this.game.marks[0];

    $(".game-text").text(" ");
  }

}

module.exports = View;
