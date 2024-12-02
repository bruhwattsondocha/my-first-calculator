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
    appendToBuffer(button.textContent);
    refreshDisplay(button.textContent);
  })
});

functionalButtons.forEach(button => {
  button.addEventListener('click', () => {
    pushValue();
    pushOperator(button.textContent)
    refreshDisplay(button.textContent);
  })
});

equalsButton.addEventListener('click', calculate);


function truncate(number) {
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
  return +a / +b; 
}


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

function displayFinalResult(number) {
  displayExpression.textContent = truncate(number);
}

function calculate() {
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
