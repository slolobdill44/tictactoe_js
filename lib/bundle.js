/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const View = __webpack_require__(1);
	const Game = __webpack_require__(2);
	
	$( () => {
	  const board = $(".ttt-board");
	
	  const game = new Game();
	
	  new View(game, board);
	
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

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


/***/ },
/* 2 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map