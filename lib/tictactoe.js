const View = require('./view.js');
const Game = require('./game.js');

$( () => {
  const board = $(".ttt-board");
  const game = new Game();

  new View(game, board);
});
