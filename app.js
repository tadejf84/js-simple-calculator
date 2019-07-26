// DOM caching
const btnsNum = document.querySelectorAll('.btn--num');
const btnsOperation = document.querySelectorAll('.btn--operation');
const btnEquals = document.querySelector('.btn--equals');
const btnDel = document.querySelector('.btn--del');
const btnClear = document.querySelector('.btn--clear');
const prevOperandDisplay = document.querySelector('.prev-operand');
const curOperandDisplay = document.querySelector('.cur-operand');

// calculator class for logic
class Calculator {
    constructor(prevOperandDisplay, curOperandDisplay) {
        this.prevOperandDisplay = prevOperandDisplay;
        this.curOperandDisplay = curOperandDisplay;
        this.clear();   // clear first
    }

    // clear display
    clear() {
        this.curOperand = '';
        this.prevOperand = '';
        this.operation = '';
    }


    delete() {

    }

    appendNumber(num) {
        this.curOperand = num;
        CalculatorUI.updateDisplay(this.curOperand);
    }

    operation(op) {

    }

    calculate() {

    }
}

// calculator class for UI
class CalculatorUI {
    static updateDisplay(curOperand) {
        curOperandDisplay.innerText = curOperand;
    }
}

// instantiate calculator
const calculator = new Calculator(prevOperandDisplay, curOperandDisplay);

// event listener
btnsNum.forEach(btn => {
    
    btn.addEventListener('click', () => {
        calculator.appendNumber(btn.innerText);
    });
});