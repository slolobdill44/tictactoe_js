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
	
	  changePlayers() {
	    if (this.currentPlayer === this.marks[0]) {
	      this.currentPlayer = this.marks[1];
	    } else {
	      this.currentPlayer = this.marks[0];
	    }
	  }
	
	  isGameOver() {
	    if (this.checkRowWin() || this.checkColWin() || this.checkDiagWin()) {
	      return true;
	    }
	    return false;
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
	      console.log(this.gameBoard[i][j]);
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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map