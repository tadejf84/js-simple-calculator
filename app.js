/**
 * Calculator Class
 * 
 */
class Calculator {

    /**
     * @constructor
     * 
     */
    constructor() {

        // DOM Elements
        this.btnsNum = document.querySelectorAll('.calculator__btn--num');
        this.btnDecimalSeparator = document.querySelector('.calculator__btn--decimal-separator');
        this.btnsOperation = document.querySelectorAll('.calculator__btn--operation');
        this.btnEquals = document.querySelector('.calculator__btn--equals');
        this.btnDel = document.querySelector('.calculator__btn--del');
        this.btnClear = document.querySelector('.calculator__btn--clear');
        this.prevOperandDisplay = document.querySelector('.prev-operand');
        this.curOperandDisplay = document.querySelector('.cur-operand');

        // Clear Display on Init
        this.clear();

        // Add Event Listeners on Init
        this.addEventListenersToButtons();
    }

    /**
     * Clear display
     * 
     */
    clear() {
        this.curOperand = '';
        this.prevOperand = '';
        this.operation = '';
        CalculatorUI.updateDisplay(this.prevOperandDisplay, this.curOperandDisplay);
    }

    /**
     * Delete last input
     * 
     */
    delete() {
        this.curOperand = this.curOperand.toString().slice(0, -1);
        CalculatorUI.updateDisplay(this.prevOperandDisplay, this.curOperandDisplay, this.prevOperand, this.curOperand, this.operation);
    }

    /**
     * Append number/separator to current operand
     * 
     * @param {string} num 
     */
    appendNumber(num) {
        if(num === '.' && this.curOperand.includes('.')) return; // Only one decimal point allowed
        this.curOperand = this.curOperand + num.toString();
        CalculatorUI.updateDisplay(this.prevOperandDisplay, this.curOperandDisplay, this.prevOperand, this.curOperand, this.operation);
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
        CalculatorUI.updateDisplay(this.prevOperandDisplay, this.curOperandDisplay, this.prevOperand, this.curOperand, this.operation);
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
        CalculatorUI.updateDisplay(this.prevOperandDisplay, this.curOperandDisplay, this.prevOperand, this.curOperand, this.operation);
    }

    /**
     * Add Event Listeners
     * 
     */
    addEventListenersToButtons() {

        this.btnsNum.forEach( btn => {
            btn.addEventListener('click', () => {
                this.appendNumber(btn.innerText);
            });
        });

        this.btnDecimalSeparator.addEventListener('click', () => {
            this.appendNumber(this.btnDecimalSeparator.innerText);
        });   
        
        this.btnsOperation.forEach( btn => {
            btn.addEventListener('click', () => {
                this.operationSelect(btn.innerText);
            });
        });

        this.btnEquals.addEventListener('click', btn => {
            this.compute();
        });
        
        this.btnClear.addEventListener('click', btn => {
            this.clear();
        });
        
        this.btnDel.addEventListener('click', btn => {
            this.delete();
        });
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
        let integerDisplay = '';

        if ( !isNaN(integerDigits) ) 
        {
          integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
        }

        if (decimalDigits != null) 
        {
          return `${integerDisplay}.${decimalDigits}`;
        } 
        else 
        {
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
    static updateDisplay(prevOperandDisplay, curOperandDisplay, prevOperand = '', curOperand = '', operation = '') {
        curOperandDisplay.innerText = this.formatNumber(curOperand);

        if(operation !== '') 
        {
            prevOperandDisplay.innerText = `${this.formatNumber(prevOperand)} ${operation}`;
        } 
        else 
        {
            prevOperandDisplay.innerText = '';
        }
    }
}

// Instantiate calculator
const calculator = new Calculator();