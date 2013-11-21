// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function(){

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (typeof params == "undefined" || params == null) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function(){
      return _(_.range(this.get('n'))).map(function(rowIndex){
        return this.get(rowIndex);
      }, this);
    },

    columns: function(){
      var allColumns = [];
      for (var i = 0 ; i < this.rows().length ; i++){
        allColumns.push(_.map(this.rows(), function(row){
          return row[i];
        }));
      }
      return allColumns;
    },

    togglePiece: function(rowIndex, colIndex){
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex){
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex){
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function(){
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex){
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function(){
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex){
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _                     
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _ 
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_ 
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)
                                                   
 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    // 
    // test if a specific row on this board contains a conflict
    hasConflict: function(array){
      var rooks = 0;
      for ( var i = 0 ; i < array.length ; i++){
        rooks += array[i];
        if (rooks > 1){
          return true;
        }
      }
      return false;
    },

    // hasAnyConflict: function(arrayOfArrays){
    //   var that = this;
    //   return _.reduce(arrayOfArrays, function(seed, array){
    //     if (seed){
    //       return seed;
    //     } else {
    //       return that.hasConflict(array);
    //     }
    //   }, false);
    // },

    hasRowConflictAt: function(rowIndex){
      return this.hasConflict(this.rows()[rowIndex]);
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function(){
      var that = this;
      var eachToBoolean = _.map(this.rows(), function (row) {
        return that.hasConflict(row);
      });
      return _.any(eachToBoolean);
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    // 
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex){
      return this.hasConflict(this.columns()[colIndex]);
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function(){
      var that = this;
      var eachToBoolean = _.map(this.columns(), function (column) {
        return that.hasConflict(column);
      });
      return _.any(eachToBoolean);
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    // 
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow){
      var that = this;

      // need to accept negative numbers?

      var buildDiag = function(colIndex){
        var result = [];
        var rowInd = 0;
        for ( var col = colIndex; col < that.rows().length ; col++){
          var currRow = that.rows()[rowInd];
          if (currRow){
            var val = currRow[col];
            if (val !== undefined){
              result.push(val);
            }
          }
          rowInd++;
        }
        return result;
      };

      var diag = buildDiag(majorDiagonalColumnIndexAtFirstRow);
      return this.hasConflict(diag);
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function(){
      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    // 
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow){
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function(){
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n){
    return _(_.range(n)).map(function(){
      return _(_.range(n)).map(function(){
        return 0;
      });
    });
  };

}());
