// DOM caching
const btnsNum = document.querySelectorAll('.calculator__btn--num');
const btnDecimalSeparator = document.querySelector('.calculator__btn--decimal-separator');
const btnsOperation = document.querySelectorAll('.calculator__btn--operation');
const btnEquals = document.querySelector('.calculator__btn--equals');
const btnDel = document.querySelector('.calculator__btn--del');
const btnClear = document.querySelector('.calculator__btn--clear');
const prevOperandDisplay = document.querySelector('.prev-operand');
const curOperandDisplay = document.querySelector('.cur-operand');

/**
 * Calculator Class
 * 
 */
class Calculator {

    /**
     * @constructor
     * 
     * @param {HTMLElement} prevOperandDisplay 
     * @param {HTMLElement} curOperandDisplay 
     */
    constructor(prevOperandDisplay, curOperandDisplay) {
        this.prevOperandDisplay = prevOperandDisplay;
        this.curOperandDisplay = curOperandDisplay;
        this.clear();
    }

    /**
     * Clear display
     * 
     */
    clear() {
        this.curOperand = '';
        this.prevOperand = '';
        this.operation = '';
        CalculatorUI.updateDisplay();
    }

    /**
     * Delete last input
     * 
     */
    delete() {
        this.curOperand = this.curOperand.toString().slice(0, -1);
        CalculatorUI.updateDisplay(this.prevOperand, this.curOperand, this.operation);
    }

    /**
     * Append number/separator to current operand
     * 
     * @param {string} num 
     */
    appendNumber(num) {
        if(num === '.' && this.curOperand.includes('.')) return; // Only one decimal point allowed
        this.curOperand = this.curOperand + num.toString();
        CalculatorUI.updateDisplay(this.prevOperand, this.curOperand, this.operation);
    }

    /**
     * Select operation
     * 
     * @param {string} operation 
     */
    operationSelect(operation) {
        if (this.curOperand === '') return;
        if (this.prevOperand !== '') this.compute();
        this.operation = operation;
        this.prevOperand = this.curOperand;
        this.curOperand = '';
        CalculatorUI.updateDisplay(this.prevOperand, this.curOperand, this.operation);
    }

    /**
     * Compute result
     * 
     */
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


/**
 * CalculatorUI Class for handling UI
 * 
 */
class CalculatorUI {

    /**
     * Get number in correct format
     * 
     * @param {string} num 
     */
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

    /**
     * Update display
     * 
     * @param {string} prevOperand 
     * @param {string} curOperand 
     * @param {string} operation 
     */
    static updateDisplay(prevOperand = '', curOperand = '', operation = '') {
        curOperandDisplay.innerText = this.formatNumber(curOperand);
        if(operation !== '') {
            prevOperandDisplay.innerText = `${this.formatNumber(prevOperand)} ${operation}`;
        } else {
            prevOperandDisplay.innerText = '';
        }
    }
}

// Instantiate calculator
const calculator = new Calculator(prevOperandDisplay, curOperandDisplay);

// Attach event listeners to calculator buttons
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