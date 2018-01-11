import React from 'react';
import math from 'mathjs';
class Calculator extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      expression: '',
      lastButtonCode: null
    };
  }

  isOperatorCharacter(buttonCode){
    return ['x', '÷', '+', '-'].indexOf(buttonCode) !== -1;
  }

  formatDisplay(expression, lastButtonCode, buttonCode) {
    if(lastButtonCode === '='){
      // If the last button code was '=' lets clear it out
      expression = '';
    }
    const lastCharacter = expression.slice(-1);
    // Flag is used to check if last character in the expression and incoming button code are both operators
    const validButtonCode = buttonCode !== '=' && !(this.isOperatorCharacter(lastCharacter) && this.isOperatorCharacter(buttonCode));
    if(buttonCode === 'del'){
      // Button code is equal to delete so lets remove the previous character
      expression = expression.length > 0 ? expression.slice(0, -1) : '';
    }else if(validButtonCode){
      // Incoming button is valid so lets just append it
      expression = expression + buttonCode;
    }

    return expression;
  }

  calculate(expression){
    let total = '';
    if(expression === '') return total;
    try{
      // Replace the multiplication and division symbol with the mathjs operator(*, /)
      expression = expression.replace(/x/, "*");
      expression = expression.replace(/÷/, "*");
      total = math.eval(expression);
    } catch(e){
      // Invalid expression
      // Do nothing for now
    }
    return total;
  }

  onClick(buttonCode){
    let expression = this.formatDisplay(this.state.expression, this.state.lastButtonCode, buttonCode);
    if(buttonCode === '='){
      // A number or delete was selected so calculate
      expression = this.calculate(expression).toString();
    }
    this.setState({
        expression,
        lastButtonCode: buttonCode
      });
  }

  render(){
    return (
      <div className="calculator-container d-flex flex-column">
        <div className="display-container">
          <input readOnly value={this.state.expression} className="w-100 text-right p-3" />
        </div>
        <div className="container-fluid button-container d-flex flex-column">
          <div className="row">
            <div className="col-10 d-flex flex-column">
              <div className="row">
                <button className="btn btn-dark col" onClick={this.onClick.bind(this, "7")}>7</button>
                <button className="btn btn-dark col" onClick={this.onClick.bind(this, "8")}>8</button>
                <button className="btn btn-dark col" onClick={this.onClick.bind(this, "9")}>9</button>
              </div>
              <div className="row">
                <button className="btn btn-dark col" onClick={this.onClick.bind(this, "4")}>4</button>
                <button className="btn btn-dark col" onClick={this.onClick.bind(this, "5")}>5</button>
                <button className="btn btn-dark col" onClick={this.onClick.bind(this, "6")}>6</button>
              </div>
              <div className="row">
                <button className="btn btn-dark col" onClick={this.onClick.bind(this, "1")}>1</button>
                <button className="btn btn-dark col" onClick={this.onClick.bind(this, "2")}>2</button>
                <button className="btn btn-dark col" onClick={this.onClick.bind(this, "3")}>3</button>
              </div>
              <div className="row">
                <button className="btn btn-dark col" onClick={this.onClick.bind(this, ".")}>.</button>
                <button className="btn btn-dark col" onClick={this.onClick.bind(this, "0")}>0</button>
                <button className="btn btn-dark col" onClick={this.onClick.bind(this, "=")}>=</button>
              </div>
            </div>
            <div className="col-2 d-flex flex-column right-panel">
              <div className="row"> <button className="btn btn-secondary col" onClick={this.onClick.bind(this, "del")}>DEL</button></div>
              <div className="row"> <button className="btn btn-secondary col" onClick={this.onClick.bind(this, "÷")}>÷</button></div>
              <div className="row"> <button className="btn btn-secondary col" onClick={this.onClick.bind(this, "x")}>x</button></div>
              <div className="row"> <button className="btn btn-secondary col" onClick={this.onClick.bind(this, "-")}>-</button></div>
              <div className="row"> <button className="btn btn-secondary col" onClick={this.onClick.bind(this, "+")}>+</button></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Calculator;