(function () {
    'use strict';

    angular.module('BlurMonitor.utilities').factory('bootstrapFactory', [function() {
        return {
            splitCollectionForColumns: splitCollectionForColumns
        };

        function splitCollectionForColumns(source, destination, rowSize) {
            var curCol = 0;
            var curRow = 0;

            angular.forEach(source, function(item) {
                if(curCol === rowSize) {
                    curCol = 0;
                    curRow++;
                }

                if(!angular.isArray(destination[curRow])) {
                    destination[curRow] = [];
                }

                if(!angular.isDefined(destination[curRow][curCol])) {
                    destination[curRow][curCol] = item;
                } else {
                    angular.merge(destination[curRow][curCol], item);
                }

                curCol++;
            });
        }
    }]);
})();