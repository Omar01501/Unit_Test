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

// Example usage
const result = compareNumbers(3, '<', 5);

console.log(result); // Output: false

// Exit the process with the correct exit code
if (result) {
    process.exit(0); // Success
} else {
    process.exit(1); // Failure
}
