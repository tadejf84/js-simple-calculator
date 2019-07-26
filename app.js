// DOM caching
const btnsNum = document.querySelectorAll('.btn--num');
const btnDecimalSeparator = document.querySelector('.btn--decimal-separator');
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

    // append number/separator to current operand
    appendNumber(num) {
        if(num === '.' && this.curOperand.includes('.')) return; // only one decimal point allowed
        this.curOperand = this.curOperand + num.toString();
        CalculatorUI.updateDisplay(this.prevOperand, this.curOperand);
    }

    // selected operation
    operationSelect(operation) {
        if (this.curOperand === '') return;
        if (this.prevOperand !== '') this.compute();
        this.operation = operation;
        this.prevOperand = this.curOperand;
        this.curOperand = '';
        CalculatorUI.updateDisplay(this.prevOperand, this.curOperand);
    }

    compute() {
        console.log('computing...');
    }
}

// calculator class for UI
class CalculatorUI {
    static updateDisplay(prevOperand, curOperand) {
        prevOperandDisplay.innerText = prevOperand;
        curOperandDisplay.innerText = curOperand;
    }
}

// instantiate calculator
const calculator = new Calculator(prevOperandDisplay, curOperandDisplay);

// event listener
btnsNum.forEach( btn => {
    btn.addEventListener('click', () => {
        calculator.appendNumber(btn.innerText);
    });
});

btnDecimalSeparator.addEventListener('click', function () {
    calculator.appendNumber(this.innerText);
});

btnsOperation.forEach( btn => {
    btn.addEventListener('click', () => {
        calculator.operationSelect(btn.innerText);
    });
});