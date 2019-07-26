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
        CalculatorUI.updateDisplay();
    }


    delete() {
        this.curOperand = this.curOperand.toString().slice(0, -1);
        CalculatorUI.updateDisplay(this.prevOperand, this.curOperand, this.operation);
    }

    // append number/separator to current operand
    appendNumber(num) {
        if(num === '.' && this.curOperand.includes('.')) return; // only one decimal point allowed
        this.curOperand = this.curOperand + num.toString();
        CalculatorUI.updateDisplay(this.prevOperand, this.curOperand, this.operation);
    }

    // selected operation
    operationSelect(operation) {
        if (this.curOperand === '') return;
        if (this.prevOperand !== '') this.compute();
        this.operation = operation;
        this.prevOperand = this.curOperand;
        this.curOperand = '';
        CalculatorUI.updateDisplay(this.prevOperand, this.curOperand, this.operation);
    }

    compute() {
        let result;
        const prevVal = +this.prevOperand;
        const curVal = +this.curOperand;
        switch (this.operation) {
            case '+': 
                result = prevVal + curVal;
                break;
            case '-':
                result = prevVal - curVal;
                break;
            case '/':
                result = prevVal / curVal;
                break;
            case '*':
                result = prevVal * curVal;
                break;
            default:
                return;
        }
        this.curOperand = result;
        this.prevOperand = '';
        this.operation = '';
        CalculatorUI.updateDisplay(this.prevOperand, this.curOperand, this.operation);
    }
}

// calculator class for UI
class CalculatorUI {

    // get numbers in correct format
    static formatNumber(num) {
        const stringNum = num.toString();
        const integerDigits = +(stringNum.split('.')[0]);
        const decimalDigits = stringNum.split('.')[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
          integerDisplay = '';
        } else {
          integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
        }
        if (decimalDigits != null) {
          return `${integerDisplay}.${decimalDigits}`;
        } else {
          return integerDisplay;
        }
    }

    // updat display
    static updateDisplay(prevOperand = '', curOperand = '', operation = '') {
        curOperandDisplay.innerText = this.formatNumber(curOperand);
        if(operation !== '') {
            prevOperandDisplay.innerText = `${this.formatNumber(prevOperand)} ${operation}`;
        } else {
            prevOperandDisplay.innerText = '';
        }
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

btnEquals.addEventListener('click', btn => {
    calculator.compute();
});

btnClear.addEventListener('click', btn => {
    calculator.clear();
});

btnDel.addEventListener('click', btn => {
    calculator.delete();
});