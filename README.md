## Synopsis

A JavaScript calculator

## Goal

- To create a virtual calculator, where users can add, subtract, multiply and divide two numbers

- To additionally provide inverse number operator (positive/negative)

- To implement a clear button to reset calculator

- To implement a CE button which resets the display value to zero, but saves recent operation and result for further use.

- To allow users to chain mathematical operations together continuously.

- Repeated operations will result in continious operations on the resulted number.


## Notes

- To implement the UI design, I created a table element, with a 'display' element acting as the table header (occupying the full width of the calculator body), and button elements which each utulized 25% of space per row (except the addition operator, which spans two rows)

- To link the button operators and numbers, each td element is assigned an event listener on click, and it's inner html (value) is then handled via a function to process the type of value (number/operator)

- The calculator mimmics the classic xreg/yreg calculator pattern, whereby the xreg value handles the displayed number, and the yreg value stores the previously saved number. The current operators value is stored as the flag value. The equals operator handles the calculate function, which takes the xreg value and applies the operation (depending on the flag set) to the yreg value. All three values are stored in the calc object

- A clear function is implemented, to simply reset the xreg value to 0, and clear the yreg and flag values.

- To deal with number precision (and limitations), CSS is applied to the display so that overflow numbers are hidden, and the calculate function checks to see if decimal numbers are greater than 7 digits, the toFixed method is used to truncate values, and an additional method is used to trim unnecesary zero's at the end of long decimal numbers.

## Contributors

Feel free to submit feedback, pull and & customise! 


## View on Codepen

[Check it out](http://codepen.io/njsfield/pen/vXKkpN)
