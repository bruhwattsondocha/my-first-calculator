function truncate(number) {
  return Math.floor(number * 100) / 100;
}
function add(a, b) {
  return +a + +b; 
};
function subtract(a, b) {
  return +a - +b; 
}
function multiply(a, b) {
  return +a * +b; 
}
function divide(a, b) {;
  return +a / +b; 
}

function operate(a, operator, b) {
  switch(operator) {
    case '+':
      return add(a, b);
    case '-':
      return subtract(a, b);
    case '×':
      return multiply(a, b);
    case '/':
      return divide(a, b);
  }
}

const displayExpression = document.querySelector('.display .expression');
const displayResult = document.querySelector('.display .result');
const numberButtons = document.querySelectorAll('.number');
const functionalButtons = document.querySelectorAll('.functional-button');
const equalsButton = document.querySelector('#equalsButton');
const clearButton = document.querySelector('#clearButton');
const ERROR_MESSAGE = 'ERROR!';

// Create array
const expressionArray = [];
let buffer = '';
// Create temporary number holder
// When pressing NUMBER append it to buffer
numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    appendToBuffer(button.textContent);
    refreshDisplay(button.textContent);
  })
});
// When pressing OPERATOR push tempNumber to array and OPERATOR itself
functionalButtons.forEach(button => {
  button.addEventListener('click', () => {
    pushValue();
    pushOperator(button.textContent)
    refreshDisplay(button.textContent);
  })
});
// 
// Do this how many times you want
// After pressing EQUALS sign loop through array to find operator with higher precedence
// FOR NOW they are MULTIPLY or DIVIDE and after them SUM and SUBTRACT
// Take expressionArray[operatorIndex] and call a function that uses OPERATOR sign and operates expressionArray[operatorIndex - 1] and expressionArray[operatorIndex + 1] 
// and store it in expressionArray[operatorIndex - 1] and remove expressionArray[operatorIndex] and expressionArray[operatorIndex + 1]
// Loop again until there are no more MULTIPLY or DIVIDE operators
// Then loop through OPERATORS with lower precedence i.e. SUM and SUBTRACT
// Display expressionArray.join(' ') on display

function pushValue() {
  expressionArray.push(buffer);
  buffer = '';
}
function pushOperator(operator) {
  expressionArray.push(operator)
}
function appendToBuffer(number) {
  buffer += number;
}
function refreshDisplay(number) {
  displayExpression.textContent += number;
}