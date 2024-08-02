function compareNumbers(num1, operator, num2) {
    switch (operator) {
        case '>':
            return num1 > num2;
        case '<':
            return num1 < num2;
        case '=':
        case '==':
            return num1 == num2; 
        default:
            throw new Error('Invalid operator! Please use <, >, or =.');
    }
}


const result = compareNumbers(3, '<', 5);

console.log(result); 


if (result) {
    process.exit(0); 
} else {
    process.exit(1); 
}
