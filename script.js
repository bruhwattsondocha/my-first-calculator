function add(a, b, operator) {
  operator = '+';
  return a + b; 
};

function subtract(a, b, operator) {
  operator = '-';
  return a - b; 
}

function multiply(a, b, operator) {
  operator = 'x';
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
    case 'x':
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

