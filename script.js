// Select elements
const input = document.getElementById('input');
const buttons = document.querySelectorAll('button');

let currentInput = '';
let operator = '';
let firstOperand = null;

// Helper function to update the calculator screen
function updateInput() {
  input.value = currentInput;
}

// Event listener for button clicks
buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const buttonText = button.textContent;

    // Clear button
    if (buttonText === 'C') {
      currentInput = '';
      operator = '';
      firstOperand = null;
    }
    // Digit or decimal button
    else if (!isNaN(buttonText) || buttonText === '.') {
      currentInput += buttonText;
    }
    // Operator button
    else if (['+', '-', '*', '/'].includes(buttonText)) {
      if (operator && currentInput !== '') {
        // Perform the previous operation
        currentInput = calculate(firstOperand, parseFloat(currentInput), operator);
        operator = '';
        firstOperand = null;
      }
      operator = buttonText;
      firstOperand = parseFloat(currentInput);
      currentInput = '';
    }
    // Equals button
    else if (buttonText === '=') {
      if (operator && currentInput !== '') {
        currentInput = calculate(firstOperand, parseFloat(currentInput), operator);
        operator = '';
        firstOperand = null;
      }
    }

    updateInput();
  });
});

// Perform the arithmetic calculation
function calculate(firstOperand, secondOperand, operator) {
  switch (operator) {
    case '+':
      return (firstOperand + secondOperand).toString();
    case '-':
      return (firstOperand - secondOperand).toString();
    case '*':
      return (firstOperand * secondOperand).toString();
    case '/':
      if (secondOperand === 0) {
        alert('Division by zero is not allowed.');
        return '';
      }
      return (firstOperand / secondOperand).toString();
    default:
      return secondOperand.toString();
  }
}
// Function to load calculation history from the JSON file
function loadHistory() {
    try {
      const historyJSON = localStorage.getItem('calculationHistory');
      return JSON.parse(historyJSON) || [];
    } catch (error) {
      return [];
    }
  }
  
  // Function to save calculation history to the JSON file
  function saveHistory(history) {
    localStorage.setItem('calculationHistory', JSON.stringify(history));
  }
  
  // Initialize calculation history
  let calculationHistory = loadHistory();
  
  // Update calculation history with each calculation
  function updateHistory(input, result) {
    calculationHistory.unshift({ input, result });
    if (calculationHistory.length > 10) {
      calculationHistory.pop();
    }
    saveHistory(calculationHistory);
  }
  
  // ... (Your existing calculator logic)
  
  // Example of how to update the history after a calculation
  // Add this within your "=" button click handler
  if (buttonText === '=') {
    if (operator && currentInput !== '') {
      const result = calculate(firstOperand, parseFloat(currentInput), operator);
      currentInput = result;
      operator = '';
      firstOperand = null;
      updateHistory(currentInput, result);
    }
  }
  
