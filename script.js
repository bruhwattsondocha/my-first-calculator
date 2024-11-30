function add(a, b, operator) {
  operator = '+';
  return a + b; 
};

function subtract(a, b, operator) {
  operator = '-';
  return a - b; 
}

function multiply(a, b, operator) {
  operator = '×';
  return a * b; 
}

function divide(a, b, operator) {
  operator = '/';
  return a / b; 
}

// Takes two numbers and an operator
// Depending on what operator is passed
// Calls appropriate function
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

const display = document.querySelector('.display .window');

function populateDisplay(number) {
  display.textContent += number;
}
let displayNumber;
const numberButtons = document.querySelectorAll('.number');
for (let number of numberButtons) {
  number.addEventListener('click', (e) => {
    populateDisplay(e.target.textContent);
    displayNumber = display.textContent; 
  })
}

let firstValue;
let secondValue;
let operatorSign;
// Add all operator numbers
const functionalButton = document.querySelectorAll('.functional-button');
for (let operator of functionalButton) {
  operator.addEventListener('click', (e) => {
    firstValue = displayNumber;
    display.textContent = ''; 
    displayNumber = '';
    operatorSign = operator.innerText;
  })
};
// On click of operator store displayNumber as value1 
// Store operator sign and clear display.textContent and displayNumber
const equalsButton = document.querySelector('#equalsButton');
equalsButton.addEventListener('click', () => {
  secondValue = displayNumber;
  const result = operate(+firstValue, operatorSign, +secondValue);
  display.textContent = result;
})
// And on pressing equals assign displayNumber as value2 
// And call operate(value1, operator, value2);
