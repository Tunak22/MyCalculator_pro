let firstOperand = ''
let secondOperand = ''
let currentOperation = null
let shouldResetScreen = false

 const lastOperationScreen = document.getElementById('lastOperationScreen')
 const currentOperationScreen = document.getElementById('currentOperationScreen')
 const clearButton = document.getElementById('clearBtn')
 const deleteButton = document.getElementById('deleteBtn')
 const numberButtons = document.querySelectorAll('[data-number]')
 const operatorButtons = document.querySelectorAll('[data-operator]')
 const pointButton = document.getElementById('pointBtn')
 const equalButton = document.getElementById('equalBtn')
// --------------attribute
window.addEventListener('keydown',handleKeyboardInput)
clearButton.addEventListener('click', clear)
deleteButton.addEventListener('click', deleteNumber)
pointButton.addEventListener('click', appendPoint)
equalButton.addEventListener('click', evaluate)

numberButtons.forEach((button) => 
button.addEventListener('click', () => appendNumber(button.textContent))
)
operatorButtons.forEach((button) => 
button.addEventListener('click', () => setOperation(button.textContent))
)

// function declaration------------------------

//function to append a number
function appendNumber(number) {
if( currentOperationScreen == 0 || shouldResetScreen)
resetScreen()
currentOperationScreen.textContent += number
}
function resetScreen() {
    currentOperationScreen.textContent = ''
    shouldResetScreen = false
}

// function to clear the screen
function clear(){
    currentOperationScreen.textContent = '0'
    lastOperationScreen.textContent = ''
    firstOperand = ''
    secondOperand = ''
    currentOperation = null
 };

 // function to append a point

 function appendPoint(){

    if (shouldResetScreen)
    resetScreen()
    if (currentOperationScreen.textContent == '')
        currentOperationScreen.textContent == '0'
    if(currentOperationScreen.textContent.includes('.')) return
    currentOperationScreen.textContent += '.'
 };

 //---delete function

 function deleteNumber(){
    currentOperationScreen.textContent = currentOperationScreen.textContent
    .toString()
    .slice(0, -1)
 };

 // ---function to set operation

 function setOperation(operator){
    if(currentOperation !== null) evaluate()
    firstOperand = currentOperationScreen.textContent
    currentOperation = operator
    currentOperationScreen.textContent = ` ${firstOperand} ${currentOperation}`
    shouldResetScreen = true
 };

 // function to evaluate-------
  
 function evaluate(){
    if( currentOperation === null || shouldResetScreen) return
    if ( currentOperation === '÷' && currentOperationScreen.textContent
    === '0') {
      alert('0 is indivisible')
   return }
   secondOperand= currentOperationScreen.textContent
   currentOperationScreen.textContent = roundResult(operate( currentOperation
      , firstOperand, secondOperand))
      lastOperationScreen.textContent = ` ${firstOperand} ${currentOperation}
      ${secondOperand}=`
      currentOperation = null
 };

 function roundResult(number){
   return Math.round (number*1000)/1000
 }

 function handleKeyboardInput(e){
   if (e.key >= 0 && e.key <= 9) appendNumber (e.key)
   if (e.key === '.') appendPoint()
   if (e.key === '=' || e.key === 'Enter') evaluate()
   if (e.key === 'Backspace') deleteNumber()
   if (e.key === 'Escape') clear()
   if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
   setOperation(convertOperator(e.key))
 }
 function convertOperator(keyboardOperator) {
   if (keyboardOperator === '/') return '÷'
   if (keyboardOperator === '*') return '×'
   if (keyboardOperator === '-') return '−'
   if (keyboardOperator === '+') return '+'
 }
 
 function add(a, b) {
   return a + b
 }
 
 function substract(a, b) {
   return a - b
 }
 
 function multiply(a, b) {
   return a * b
 }
 
 function divide(a, b) {
   return a / b
 }
 
 function operate(operator, a, b) {
   a = Number(a)
   b = Number(b)
   switch (operator) {
     case '+':
       return add(a, b)
     case '−':
       return substract(a, b)
     case '×':
       return multiply(a, b)
     case '÷':
       if (b === 0) return null
       else return divide(a, b)
     default:
       return null
   }
 }
 