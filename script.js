const displayExpression = document.querySelector('.display .expression');
const displayResult = document.querySelector('.display .result');
const numberButtons = document.querySelectorAll('.number');
const functionalButtons = document.querySelectorAll('.functional-button');
const equalsButton = document.querySelector('#equalsButton');
const clearButton = document.querySelector('#clearButton');
const ERROR_MESSAGE = 'ERROR!';
const expressionArray = [];
let buffer = '';

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (expressionArray[0] === ERROR_MESSAGE) clear();
    appendToBuffer(button.textContent);
    refreshDisplay(button.textContent);
  })
});

functionalButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (expressionArray[0] === ERROR_MESSAGE) clear();
    if (buffer === '') return;
    pushValue();
    pushOperator(button.textContent)
    refreshDisplay(button.textContent);
  })
});

equalsButton.addEventListener('click', calculate);

clearButton.addEventListener('click', clear);


function truncate(number) {
  if (typeof number === 'string') return ERROR_MESSAGE;
  return Math.floor(number * 100) / 100;
}

function add(a, b) {
  return +a + +b; 
}

function subtract(a, b) {
  return +a - +b; 
}

function multiply(a, b) {
  return +a * +b; 
}

function divide(a, b) {;
  if (b === 0) return ERROR_MESSAGE;
  return +a / +b; 
}


function pushValue() {
  if (buffer) {
    expressionArray.push(buffer);
    buffer = '';
  };
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

function displayFinalResult(number) {
  displayExpression.textContent = truncate(number);
}
function clear() {
  buffer = '';
  expressionArray.length = 0;
  displayExpression.textContent = '';
}

function calculate() {
  // Return if array is empty
  if (expressionArray.length === 0 || expressionArray.length === 1) return 1;
  pushValue();
  // operators: (× and /),(+ and -)
  do {  // DO UNTIL EXPRESSION ARRAY LENGTH IS 1
    // Find multiply or division operator index 
    let operatorIndex;
    // If operator is '×' call multiply function
    do { // DO UNTIL THERE ARE NO MORE MULTIPLY AND DIVISION OPERATORS
      operatorIndex = expressionArray.findIndex(item => item === '×' || item === '/');
      if (expressionArray[operatorIndex] === '×') {
        expressionArray[operatorIndex - 1] = multiply(+expressionArray[operatorIndex - 1], +expressionArray[operatorIndex + 1])
        expressionArray.splice(operatorIndex, 2);
      }
      // If operator is '/' call divide function
      else if ((expressionArray[operatorIndex] === '/')) {
        expressionArray[operatorIndex - 1] = divide(+expressionArray[operatorIndex - 1], +expressionArray[operatorIndex + 1])
        expressionArray.splice(operatorIndex, 2);
        if (expressionArray.includes(ERROR_MESSAGE)) {
          expressionArray.length = 0;
          expressionArray[0] = ERROR_MESSAGE;
        }
      }
    }
    while (expressionArray.findIndex(item => item === '×' || item === '/') !== -1);
    
    // If operator is '+' call add function
    do { // DO UNTIL THERE ARE NO MORE ADD AND SUBTRACT OPERATORS
      operatorIndex = expressionArray.findIndex(item => item === '+' || item === '-');
      if (expressionArray[operatorIndex] === '+') {
        expressionArray[operatorIndex - 1] = add(+expressionArray[operatorIndex - 1], +expressionArray[operatorIndex + 1])
        expressionArray.splice(operatorIndex, 2);
      }
      // If operator is '-' call subtract function
      else if ((expressionArray[operatorIndex] === '-')) {
        expressionArray[operatorIndex - 1] = subtract(+expressionArray[operatorIndex - 1], +expressionArray[operatorIndex + 1])
        expressionArray.splice(operatorIndex, 2);
      }
    }
    while (expressionArray.findIndex(item => item === '+' || item === '-') !== -1);
  } 
  while (expressionArray.length !== 1);
  const result = expressionArray[0];
  displayFinalResult(result);
}


// TODO 
// Display a snarky error message if the user tries to divide by 0… and don’t let it crash your calculator!
// Dont let pass in multiple operators at once by checking if last array element is operator
// Add modulo
// Add + -