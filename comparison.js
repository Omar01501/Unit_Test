function compareNumbers(num1, operator, num2) {
    switch (operator) {
        case '>':
            return num1 > num2;
        case '<':
            return num1 < num2;
        case '=':
        case '==':
            return num1 == num2; // Use loose equality to compare values
        default:
            throw new Error('Invalid operator! Please use <, >, or =.');
    }
}

// Example usage:
console.log(compareNumbers(3, '=', 5));  // Output: false
console.log(compareNumbers(3, '==', '3'));  // Output: true (compares values only)
console.log(compareNumbers(10, '>', 5));  // Output: true
console.log(compareNumbers(3, '<', 7));  // Output: true
console.log(compareNumbers(5, '==', 5));  // Output: true
console.log(compareNumbers(5, '==', '5'));  // Output: true (loose equality allows type coercion)
