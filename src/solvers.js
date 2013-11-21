/*           _                    
   ___  ___ | |_   _____ _ __ ___ 
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
var BoardTree = function(row){
  this.children = [];
  this.parent = null;
  this.row = row || null;
};

BoardTree.prototype.addChild = function(row){
  var newChild = new BoardTree(row);
  newChild.parent = this;
  this.children.push(newChild);
};

BoardTree.prototype.buildBoardTree = function (n, filterFunc, depth){
  depth = depth || 0;
  if (depth !== n){
    for ( var i = 0 ; i < n ; i++ ){
      // makes an n-sized row of zeros
      var row = Array.apply(null, new Array(n)).map(Number.prototype.valueOf,0);
      row[i] = 1;
      this.addChild(row);
      this.children[i].buildBoardTree(n, filterFunc, depth+1);
    }
  }
  return this;
};

BoardTree.prototype.pathTrace = function(n, depth, matrixArray, solutionArray) {
  depth = depth || 0;
  matrixArray = matrixArray || [];
  solutionArray = solutionArray || [];
  if (this.row){
    matrixArray.push(this.row);
  }
  if (depth !== n){
    for (var i = 0 ; i < this.children.length ; i++){
      this.children[i].pathTrace(n, depth + 1, matrixArray.slice(),solutionArray);
    }
    return solutionArray;
  } else {
    solutionArray.push(matrixArray);
    return solutionArray;
  }
};

window.findNRooksSolution = function(n){

  var solutionsRoot = new BoardTree();

  for ( var row = 0 ; row < n ; row++){
    for ( var col = 0 ; col < n ; col++ ){
      var itsBoard = new Board();
      itsBoard.togglePiece(row,col);
      if (!itsBoard.hasAnyRooksConflicts()){
        tree.addChild(itsBoard);
      }
    }
  }

  // var solution = new Board({'n':n });
  // for (var i = 0; i < n; i++) {
  //   solution.togglePiece(i,i);
  // }
  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  // return solution.rows();
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n){
  // var factorial = function (num){
  //   if (num <= 1){
  //     return 1;
  //   } else {
  //     return num * factorial(num-1);
  //   }
  // };
  // var solutionCount = factorial(n);
  // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  // return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n){
  var solution = new Board({'n':n });
  var row = 0;
  var counter = 0;
  for (var col = 0 ; col < n ; col++){
    solution.togglePiece(row,col);
    counter++;
    if (counter === n) { return solution.rows();}
    if (solution._isInBounds(row + 1, col + 2)) {
      solution.togglePiece(row + 1, col + 2);
      counter++;
      if (counter === n) { return solution.rows();}
      if (solution._isInBounds(row + 2, col - 1)) {
        solution.togglePiece(row + 2, col - 1);
        counter++;
        if (counter === n) { return solution.rows();}
        if (solution._isInBounds(row + 3, col +1 )) {
          solution.togglePiece(row + 3, col + 1);
          counter++;
          if (counter === n) { return solution.rows();}
        }
      }
    }
    solution = new Board({'n':n });
    counter = 0;
  }
  // console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution.rows();
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n){
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
