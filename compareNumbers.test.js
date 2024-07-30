// compareNumbers.test.js
const compareNumbers = require('./compareNumbers');

describe('compareNumbers', () => {
    test('should return -1 when the first number is smaller', () => {
        expect(compareNumbers(2, 3)).toBe(-1);
    });

    test('should return 1 when the first number is larger', () => {
        expect(compareNumbers(5, 3)).toBe(1);
    });

    test('should return 0 when both numbers are equal', () => {
        expect(compareNumbers(4, 4)).toBe(0);
    });
});
