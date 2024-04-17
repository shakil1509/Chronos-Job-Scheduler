'use strict';

const monthNamesConversion = require('./month-names-conversion');
const weekDayNamesConversion = require('./week-day-names-conversion');
const convertAsterisksToRanges = require('./asterisk-to-range-conversion');
const convertRanges = require('./range-conversion');
const convertSteps = require('./step-values-conversion');

module.exports = (() => {


    function appendSeccondExpression(expressions){
        if(expressions.length === 5){
            return ['0'].concat(expressions);
        }
        return expressions;
    }

    function removeSpaces(str) {
        return str.replace(/\s{2,}/g, ' ').trim();
    }

    function normalizeIntegers(expressions) {
        for (let i=0; i < expressions.length; i++){
            const numbers = expressions[i].split(',');
            for (let j=0; j<numbers.length; j++){
                numbers[j] = parseInt(numbers[j]);
            }
            expressions[i] = numbers;
        }
        return expressions;
    }

    function interprete(expression){
        let expressions = removeSpaces(expression).split(' ');
        expressions = appendSeccondExpression(expressions);
        expressions[4] = monthNamesConversion(expressions[4]);
        expressions[5] = weekDayNamesConversion(expressions[5]);
        expressions = convertAsterisksToRanges(expressions);
        expressions = convertRanges(expressions);
        expressions = convertSteps(expressions);

        expressions = normalizeIntegers(expressions);

        return expressions.join(' ');
    }

    return interprete;
})();