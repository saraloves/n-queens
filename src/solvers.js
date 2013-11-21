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
window.findNRooksSolution = function(n){
  var solution = new Board({'n':n });
  for (var i = 0; i < n; i++) {
    solution.togglePiece(i,i);
  }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n){
  var factorial = function (num){
    if (num <= 1){
      return 1;
    } else {
      return num * factorial(num-1);
    }
  };
  var solutionCount = factorial(n);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
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
