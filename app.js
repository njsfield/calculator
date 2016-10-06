function Calc(display) {

    this.display = document.getElementById(display);
    this.xreg = '0';
    this.yreg = null;
    this.flag = null;
    this.lastOperation = null;

    var that = this;



    // handles input

    this.handleInput = function(value) {

        if (/[01234567890.±]|ce/.test(value)) {

            this.updateXreg(value);

        } else if (/[/+x-]/.test(value)) {

            this.flagRegister(value);

        } else if (value === '='){

            this.calculate();
            this.lastOperation = '=';

        } else {

            this.clear();
        }

    }


     // handle xreg

    this.updateXreg = function (value) {

        if (this.lastOperation === '=') {

            this.clear();
        }

        switch(value) {

            case '.' :

                this.xreg += (/\./.test(this.xreg)) ? '' : '.';
                break;

            case '0' :

                this.xreg += (this.xreg !== '0') ? '0' : '';
                break;

            case '±' :

                this.xreg = (this.xreg[0] !== '-') ? '-' + (+this.xreg || '') : (this.xreg.slice(1) || '0');
                break;

            case 'ce' :

                this.xreg = '0';
                break;

            default :

                this.xreg = (this.xreg === '0') ? value : this.xreg + value;
                break;
        }


        this.display.innerHTML = this.xreg;

    }


    // handle flag


    this.flagRegister = function(operator) {


        if (this.yreg === null) {

            this.yreg = this.xreg;
            this.lastOperation = operator;

        } else if (this.lastOperation === "=") {

            this.lastOperation = operator;

        } else {

            this.calculate();

        }
            this.flag = operator;
            this.xreg = '0';

    }



    // clear

    this.clear = function(){

        this.flag = this.yreg = this.lastOperation = null;

        this.xreg = '0';

        this.display.innerHTML = this.xreg;

    }



    // calculate

    this.calculate = function() {

        if (this.yreg === null) return;

        if (this.flag === "x") this.flag = "*";

        var evalFunction = new Function("x", "y", "return y " + this.flag + " x;")

        var result = evalFunction(+this.xreg, +this.yreg);

        if (/\d*.\d{7,}/.test(String(result))) result = Number(+result.toFixed(7));

        result = String(result).replace(/(\d*\.\d*)(0+)$/, "$1");

        this.display.innerHTML = this.yreg = result;
    }




    // Add click events to elements

    this.calcButtons = document.getElementsByTagName('td');


    Array.prototype.forEach.call(this.calcButtons, function(button){

        button.addEventListener("click", function(event){

            event.target.style.backgroundColor = "grey";

            setTimeout(function(){

               event.target.style.backgroundColor = "black";

            },100);

        that.handleInput(event.target.innerHTML.toLowerCase());

        });

    });


}


var myCalc = new Calc("display");



