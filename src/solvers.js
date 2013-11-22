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
// var BoardTree = function(row){
//   this.children = [];
//   this.parent = null;
//   this.board = null;
//   this.row = row || null;
// };

// BoardTree.prototype.addChild = function(row){
//   var newChild = new BoardTree(row);
//   newChild.parent = this;
//   this.children.push(newChild);
// };

// BoardTree.prototype.buildBoardTree = function (n, filterFunc, depth){
//   depth = depth || 0;
//   if (depth !== n){
//     for ( var i = 0 ; i < n ; i++ ){
//       // makes an n-sized row of zeros
//       var board = this.parent.board || new Board({'n':n});
//       var row = Array.apply(null, new Array(n)).map(Number.prototype.valueOf,0);
//       row[i] = 1;
//       board.rows()[depth-1] = row;
//       filterFunc.call(board);
//       // filter Board that would result from adding row for conflicts, if no conflict
//       // then
//         this.addChild(row);
//         this.children[i].buildBoardTree(n, filterFunc, depth+1);
//     }
//   }
//   return this;
// };

// BoardTree.prototype.pathTrace = function(n, depth, matrixArray, solutionArray) {
//   depth = depth || 0;
//   matrixArray = matrixArray || [];
//   solutionArray = solutionArray || [];
//   if (this.row){
//     matrixArray.push(this.row);
//   }
//   if (depth !== n){
//     for (var i = 0 ; i < this.children.length ; i++){
//       this.children[i].pathTrace(n, depth + 1, matrixArray.slice(),solutionArray);
//     }
//     return solutionArray;
//   } else {
//     solutionArray.push(matrixArray);
//     return solutionArray;
//   }
// };

window.findNRooksSolution = function(n){
  var solution;
  // var board = new Board({n:n});

  // //var row = 0;

  // var findSolutions = function(board, currentRow){
  //   if ( currentRow === n ) {
  //     //console.table(board.rows());
  //     solution = board.rows();
  //     return;
  //   }
  //   for (var i = 0; i < n; i++) {
  //     //debugger;
  //     board.togglePiece(currentRow,i);
  //     if (!board.hasAnyRooksConflicts()){
  //       findSolutions(board, currentRow + 1);
  //     }
  //     board.togglePiece(currentRow, i);
  //   }
  //   //return solutionCount;
  // };

  // findSolutions(board, 0);

  // // var solutionCount = factorial(n);
  // // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solution;
  //return undefined;
  // return solution.rows();
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n){
  solutionCount = 0;
  var board = new Board({n:n});

  var row = 0;

  var countSolutions = function(currentRow){
    if ( currentRow === n ) {
      solutionCount++;
      return;
    }
    for (var i = 0; i < n; i++) {
      board.togglePiece(currentRow,i);
      if (!board.hasAnyRooksConflicts()){
        countSolutions(currentRow + 1);
      }
      board.togglePiece(currentRow, i);
    }
  };

  countSolutions(row);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n){
  var solution = new Board({'n':n });
  // console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution.rows();
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n){
  var solutionCount; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
