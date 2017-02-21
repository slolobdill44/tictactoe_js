class View {
  constructor(game, $el) {
    this.game = game;
    this.board = this.setupBoard($el);
  }

  setupBoard($el) {
    for (var listItems = 0; listItems < 9; listItems++) {
      console.log($el);
      $el.append("<li class='board-tile'></li>")
    }
  }
}

module.exports = View;
