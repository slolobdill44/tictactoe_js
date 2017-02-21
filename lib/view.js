class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupBoard();
    this.handleClick();
  }

  setupBoard($el) {
    for (var listItems = 0; listItems < 9; listItems++) {
      this.$el.append("<li class='board-tile' value='" + listItems + "'></li>");
    }
  }

  handleClick() {
    this.$el.on("click", "li", ( (e) => {
      const $li = $( e.currentTarget );
      $li.css("background-color", "blue");
      this.game.takeTurn($li);
    }))
  }

  runGame() {
    this.game.start();
    while (this.game.gameOver === false) {

    }
  }
}

module.exports = View;
