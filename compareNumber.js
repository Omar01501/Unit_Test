// compareNumbers.js

/**
 * Compares two numbers and returns -1, 0, or 1
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} - Returns -1 if a < b, 0 if a == b, 1 if a > b
 */
function compareNumbers(a, b) {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
}

module.exports = compareNumbers;
