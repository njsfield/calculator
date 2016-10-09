
// Goal- Implement ES6 solutions

class Calc {

    constructor() {

        this.xreg = '0';
        this.yreg = null;
        this.flag = null;
        this.lastOperation = null;
        
    };


    // handles input

    handleInput(value) {

        if (/[01234567890.±]|ce/.test(value)) {

            this.updateXreg(value);

        } else if (/[/+x-]/.test(value)) {

            this.flagRegister(value);
            this.flag = value;
            this.xreg = '0';

        } else if (value === '='){

            this.calculate();
            this.lastOperation = '=';

        } else {

            this.clear();
        }

    };


     // handle xreg

    updateXreg(value) {

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

    };


    // handle flag


    flagRegister(operator) {


        if (this.yreg === null) {

            this.yreg = this.xreg;
            this.lastOperation = operator;

        } else if (this.lastOperation === "=") {

            this.lastOperation = operator;

        } else {

            this.calculate();

        }


    };



    // clear

    clear(){

        this.flag = this.yreg = this.lastOperation = null;

        this.xreg = '0';

        this.display.innerHTML = this.xreg;

    };



    // calculate

    calculate() {

        if (this.yreg === null) return;

        if (this.flag === "x") this.flag = "*";

        let evalFunction = new Function("x", "y", "return y " + this.flag + " x;")

        let result = evalFunction(+this.xreg, +this.yreg);

        if (/\d*.\d{7,}/.test(String(result))) result = Number(+result.toFixed(7));

        result = String(result).replace(/(\d*\.\d*)(0+)$/, "$1");

        this.display.innerHTML = this.yreg = result;
    };






    //// DOM Calculator creation

    build(output) {
        
        this.output = document.getElementById(output);
    
        // Initially create table

        this.table = document.createElement("table");


        // Set the display output

        this.display = document.createElement("th");


            //give it style attributes and initial '0' value

            this.display.innerHTML = "0";
            this.display.setAttribute("colspan", "4");
            this.display.setAttribute("id", "display");

        this.table.appendChild(this.display);



        // Holds buttons in the order they should appear in DOM Element

        let buttons = [
            ['AC','CE','±','/'],
            ['7','8','9','x'],
            ['4','5','6','-'],
            ['1','2','3','+'],
            ['0','.','=']
        ]




        // Append 5 tr elements, with td elements matching buttons array

        for (let i = 0; i < 5; i++) {

            let that = this; // to use 'this' in deep scope

            let tr = document.createElement("tr");

            this.table.appendChild(tr);


            for (let j = 0; j < buttons[i].length; j++) {

                let td = document.createElement("td");

                td.innerHTML = buttons[i][j];

                if (buttons[i][j] == '+') td.setAttribute("rowspan", "2");

                // event listener to fire handleInput function with correct value when pressed

                td.addEventListener("click", function(event){

                    that.handleInput(event.target.innerHTML);

                });

                tr.appendChild(td);

            };



        };

        //display calculator

        this.output.appendChild(this.table);
        
    }


};



let myCalc = new Calc();
myCalc.build("calc");
