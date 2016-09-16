
var display = document.getElementById("display");


var calc = {

    numbers : {
        'ZERO' : '0',
        'ONE' : '1',
        'TWO' : '2',
        'THREE' : '3',
        'FOUR' : '4',
        'FIVE' : '5',
        'SIX' : '6',
        'SEVEN' : '7',
        'EIGHT' : '8',
        'NINE' : '9',
    },

    operators : {

        'AC' : 'ac',
        'CE' : 'ce',
        'POSNEG' : '±',
        'DIVIDE' : '/',
        'MULTIPLY' : 'x',
        'MINUS' : '-',
        'PLUS' : '+',
        'DECIMAL' : '.',
        'EQUALS' : '='

    }

}



calc.xreg = '0';
calc.yreg = undefined;
calc.flag = undefined;
calc.lastOperation;


// Add click events to elements

var calcButtons = document.getElementsByTagName('td')

for (var i = 0; i < calcButtons.length; i++) {

    calcButtons[i].addEventListener("click", function(){

        buttonClick(this.id);
    })
}



// Register button click into calculator method

function buttonClick(element) {

    var calcMethod = calc.numbers[element] ||
                      calc.operators[element] ;

    handleInput(calcMethod);
}


// /\./.test(calculator.xreg

// handles input

function handleInput(value) {

    if (/[01234567890.±]|ce/.test(value)) {

        xreg(value);

    } else if (/[/+x-]/.test(value)) {

        flagRegister(value);

    } else if (value === '='){

        calculate();
        calc.lastOperation = '=';

    } else {

        clear();
    }

}

// handle xreg

function xreg(value) {

    switch(value) {

        case '.' :

            calc.xreg += (/\./.test(calc.xreg)) ? '' : '.';
            break;

        case '0' :

            calc.xreg += (calc.xreg !== '0') ? '0' : '';
            break;

        case '±' :

            if (calc.yreg !== undefined) {

                calc.xreg = String(calc.yreg);
                calc.yreg = calc.flag = undefined;
            }

            calc.xreg = (calc.xreg[0] != '-') ? '-' + (+calc.xreg || '') : calc.xreg.slice(1);
            break;

        case 'ce' :

            calc.xreg = '0';
            break;

        default :

            calc.xreg = (calc.xreg === '0') ? value : calc.xreg + value;

            break;
    }


    display.innerHTML = calc.xreg;

}



// handle flag


function flagRegister(operator) {

    calc.flag = operator;

    if (calc.yreg === undefined) {

        calc.yreg = calc.xreg;
        calc.xreg = '0';
        calc.lastOperation = 'operator';

    } else if (calc.lastOperation === "=") {

        calc.xreg = '0';
        calc.lastOperation = 'operator';

    } else {

        calculate();

    }


}

// clear

function clear(){

    calc.flag = calc.yreg = undefined;

    calc.xreg = '0';

    display.innerHTML = calc.xreg;

}



// calculate

function calculate() {

    if (calc.yreg === undefined) return;

    var result = eval(calc.yreg + calc.flag + calc.xreg);

    display.innerHTML = calc.yreg = result;

    console.log(result);
}
