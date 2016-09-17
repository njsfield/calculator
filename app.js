var display = document.getElementById("display");


var calc = {

    xreg : '0',
    yreg : null,
    flag : null,
    lastOperation : null

}


// Add click events to elements

var calcButtons = document.getElementsByTagName('td')

for (var i = 0; i < calcButtons.length; i++) {

    calcButtons[i].addEventListener("click", function(){

        var that = this;

        handleInput(that.innerHTML.toLowerCase());

        that.classList.add("highlighted");

        setTimeout(function(){
           that.classList.remove("highlighted");
        },100);

    })
}



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

            if (calc.lastOperation === '=') {

                calc.xreg = String(calc.yreg);
                calc.yreg = calc.flag = null;
            }



            calc.xreg += (/\./.test(calc.xreg)) ? '' : '.';
            break;

        case '0' :

            calc.xreg += (calc.xreg !== '0') ? '0' : '';
            break;

        case '±' :

            if (calc.lastOperation === '=') {

                calc.xreg = calc.yreg;
                calc.yreg = null;
                calc.lastOperation = null;
            }

            calc.xreg = (calc.xreg[0] != '-') ? '-' + (+calc.xreg || '') : (calc.xreg.slice(1) || '0');
            break;

        case 'ce' :

            calc.xreg = '0';
            break;

        default :

           if (calc.lastOperation === '=') {

                clear();
            }

            calc.xreg = (calc.xreg === '0') ? value : calc.xreg + value;

            break;
    }


    display.innerHTML = calc.xreg;

}



// handle flag


function flagRegister(operator) {


    if (calc.yreg === null) {

        calc.yreg = calc.xreg;
        calc.lastOperation = operator;

    } else if (calc.lastOperation === "=") {

        calc.lastOperation = operator;

    } else {

        calculate();

    }
        calc.flag = operator;
        calc.xreg = '0';

}

// clear

function clear(){

    calc.flag = calc.yreg = calc.lastOperation = null;

    calc.xreg = '0';

    display.innerHTML = calc.xreg;

}



// calculate

function calculate() {

    if (calc.yreg === null) return;

    if (calc.flag === "x") calc.flag = "*";

    var result = eval(calc.yreg + " " + calc.flag + " " + calc.xreg);

    if (/\d*.\d{7,}/.test(String(result))) result = Number(result.toFixed(7));

    result = String(result).replace(/(\d*\.\d*)(0+)$/, "$1");

    display.innerHTML = calc.yreg = result;
}
