import React from 'react';
import './calculatorComponent.css';
import NewLineText from './newLine';
class Calculator extends React.Component {
    constructor(props) {
        super()
        //this is the state variable initialized with 3 keys for expression i.e. operand 
        //history is a set of jsx objects for storing records
        //the last arth used as short of arthematic will store the operator for various purposes  
        this.state = {
            operand: "",
            history: "",
            arth: ""
        };
    }
    //this is the main evaluation function called everytime a button is pressed 
    operand = (op) => {
        if (op === 'C') {//condition 1 if C is clicked then all data should be removed
            this.setState({ operand: "", history: "", arth: "" })
        }
        else if (op === 'CE') {//condition 2 if CE is pressed then one operand should be removed
            this.setState({ operand: this.state.operand.substr(0, this.state.operand.length - 1) })
        }
        else if (op === '+' || op === '-' || op === '*' || op === '/' || op === '%') {//this is the condition of arthematic operators
            const check = this.state.operand[this.state.operand.length - 1]//check if 2 operators are entered one after other
            if (check === '+' || check === '-' || check === '*' || check === '/' || check === '%') {//if yes
                this.setState({ operand: this.state.operand.split(this.state.arth)[0] + op })//override the last operator
                //here the state variable arth comes in handy as we know we will always have only 2 operand with an 
                //operator then will will split on the operator if any less 
            }
            else {//else 
                this.operator(op)//update the expression
            }
            this.setState({ arth: op })//here we set the arth state variable to be used in the above condition
        }
        else if (op === '=') {//condition 3 if the input is an '=' symbol 
            this.equals()//then call the equal methods
        }
        else {//if none of the abouve works the it will be a part/or [of] the operands 
            this.setState({ operand: this.state.operand + op })//update the expression
        }
    }

    operator = (op) => {
        try {//try catch to handel any kind of errors
            const result = eval(this.state.operand)//using the js function for evaluating the tsring of expression
            this.setState({ operand: "" + result + op })//updating the state of expression
            if (this.state.operand.length > 2)//add to histry of the expression if evaluated  
                this.setState({ history: this.state.history + this.state.operand + " = " + result + "\n" })
        } catch (err) {//if error then print math error 
            this.setState({ operand: 'Math Error' })
        }

    }

    equals = () => {//if equals methods then evalute the expression
        var result = eval(this.state.operand)
        this.setState({ history: this.state.history + this.state.operand + " = " + result + "\n" })
        this.setState({ operand: "" + result })//update the expression 
    }

    testApi = async () => {
        const res = await fetch('http://127.0.0.1:5000/extension', {

        })
    }

    render() {
        //in this function i have declared all the required html by using the function defined above 
        //and another component for history
        return (
            <div>
                <center>
                    <h1>Assignment-01</h1>
                    <h2>Calculator</h2>
                    <p>{this.state.operand}</p>
                    <div className='border'>
                        <button onClick={this.operand.bind(this, 1)}>1</button>
                        <button onClick={this.operand.bind(this, 2)}>2</button>
                        <button onClick={this.operand.bind(this, 3)}>3</button>
                        <button onClick={this.operand.bind(this, '+')}>+</button>
                        <button onClick={this.operand.bind(this, '-')}>-</button>
                        <br />
                        <button onClick={this.operand.bind(this, 4)}>4</button>
                        <button onClick={this.operand.bind(this, 5)}>5</button>
                        <button onClick={this.operand.bind(this, 6)}>6</button>
                        <button onClick={this.operand.bind(this, '*')}>*</button>
                        <button onClick={this.operand.bind(this, '/')}>/</button>
                        <br />
                        <button onClick={this.operand.bind(this, 7)}>7</button>
                        <button onClick={this.operand.bind(this, 8)}>8</button>
                        <button onClick={this.operand.bind(this, 9)}>9</button>
                        <button onClick={this.operand.bind(this, '%')}>%</button>
                        <button onClick={this.operand.bind(this, '=')}>=</button>
                        <br />
                        <button onClick={this.operand.bind(this, 0)}>0</button>
                        <button onClick={this.operand.bind(this, 'C')}>C</button>
                        <button onClick={this.operand.bind(this, 'CE')}>CE</button>
                        <button onClick={this.operand.bind(this, '.')}>.</button>
                        <br />
                    </div>
                    <br></br>
                    <div className='border'>
                        <h3>History</h3>
                        <NewLineText text={this.state.history} />
                    </div>
                </center>
                <br />
                <div>
                    <form method='POST' enctype='http://127.0.0.1:5000/extension'>
                        <input type='file' name='file'/>
                        <button type='submit'/>
                    </form>
                </div>

            </div>
        );
    }

}

export default Calculator;