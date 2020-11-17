// Глобальные переменные

let numbers = document.querySelectorAll('.number');
let operations = document.querySelectorAll('.operator');
let decimal = document.getElementById('decimal');
let clear = document.querySelectorAll('.clear-btn');
let result = document.getElementById('result');
let display = document.getElementById('display');
let MemoryCurrentNumber = 0;
let MemoryNewNumber = false;
let MemoryPendingOperation = '';

// Циклы

for ( let number of numbers) {
    number.addEventListener('click', function (e) {
        numberPress(e.target.textContent);
    });
}

for ( let operation of operations) {
    operation.addEventListener('click', function (e) {
        operationPress(e.target.textContent);
    });
}

decimal.addEventListener('click', decimalPress);

for ( let clearBtn of clear) {
    clearBtn.addEventListener('click', clearBtnPress);
}

// Функции

function numberPress(number) {
    if (MemoryNewNumber) {
        display.value = number;
        MemoryNewNumber = false;
    } else {
    if (display.value === '0') {
        display.value = number;
    } else {
        display.value += number;
    }
    }
}

function operationPress(op) {
    let localOperationMemory = display.value;
    if (MemoryNewNumber && MemoryPendingOperation !== '=' && MemoryPendingOperation !== 'sqrt' && MemoryPendingOperation !== 'pow') {
        if (op === '-') {
            display.value = '-';
            MemoryNewNumber = false;
        } else {
        display.value = MemoryCurrentNumber;
        }
    } else {
        MemoryNewNumber = true;
        if (MemoryPendingOperation === '+') {
            MemoryCurrentNumber += +localOperationMemory;
        } else if (MemoryPendingOperation === '-') {
            MemoryCurrentNumber -= +localOperationMemory;
        } else if (MemoryPendingOperation === '/') {
            MemoryCurrentNumber /= +localOperationMemory;
        } else if (MemoryPendingOperation === '*') {
            MemoryCurrentNumber *= +localOperationMemory;
        } else if (op === 'sqrt') {
               if (localOperationMemory >= 0) {
                   MemoryCurrentNumber = Math.sqrt(+localOperationMemory);
               } else {
                    MemoryCurrentNumber = 'error';
               }
        } else if (MemoryPendingOperation === 'pow') {
                MemoryCurrentNumber = Math.pow(+MemoryCurrentNumber, +localOperationMemory);    
        } else {
            MemoryCurrentNumber = +localOperationMemory;
            }
        display.value = MemoryCurrentNumber;
        MemoryPendingOperation = op;
    }
}

function decimalPress(e) {
    let localDecimalMemory = display.value;

    if (MemoryNewNumber) {
        localDecimalMemory = '0.';
        MemoryNewNumber = false;
    } else if (localDecimalMemory.indexOf('.') === -1) {
        localDecimalMemory += '.';
    }
    display.value = localDecimalMemory;
}
    
function clearBtnPress(e) {
    if  (e.target.textContent === 'ce') {
        display.value = '0';
        MemoryNewNumber = true;
    } else if (e.target.textContent === 'c') {
        display.value = '0';
        MemoryNewNumber = false;
        MemoryCurrentNumber = 0;
        MemoryPendingOperation = '';
    }
}