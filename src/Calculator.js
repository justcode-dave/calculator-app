import React, { useState, useEffect } from 'react';
import './Calculator.css';

const Calculator = () => {
  const [input, setInput] = useState('');

  const handleButtonClick = (value) => {
       if (['sin', 'cos', 'tan', 'sqrt', 'log', 'ln', '^'].includes(value)) {
         switch (value) {
           case 'sin':
             setInput(input + 'Math.sin(');
             break;
           case 'cos':
             setInput(input + 'Math.cos(');
             break;
           case 'tan':
             setInput(input + 'Math.tan(');
             break;
           case 'sqrt':
             setInput(input + 'Math.sqrt(');
             break;
           case 'log':
             setInput(input + 'Math.log10(');
             break;
           case 'ln':
             setInput(input + 'Math.log(');
             break;
           case '^':
             setInput(input + '**');
             break;
           default:
             break;
         }
       } else {
         setInput(input + value);
       }
     };
     

  const handleClear = () => {
    setInput('');
  };

  const handleEqual = () => {
    try {
      setInput(eval(input).toString());
    } catch {
      setInput('Error');
    }
  };



  const handleKeyPress = (event) => {
       const { key } = event;
       if (key >= '0' && key <= '9') {
         handleButtonClick(key);
       } else if (['+', '-', '*', '/', '(', ')', '.', '^'].includes(key)) {
         handleButtonClick(key);
       } else if (key === 'Enter') {
         handleEqual();
       } else if (key === 'Backspace') {
         setInput(input.slice(0, -1));
       } else if (key === 'Escape') {
         handleClear();
       }
     };
   
     useEffect(() => {
       document.addEventListener('keydown', handleKeyPress);
       return () => {
         document.removeEventListener('keydown', handleKeyPress);
       };
     }, [input]);


  return (
    <div className="calculator">
      <div className="display">{input}</div>
      <div className="keypad">
        {['7', '8', '9', '/', 'sin', 'cos', 'tan'].map((item) => (
          <button key={item} onClick={() => handleButtonClick(item)}>{item}</button>
        ))}
        {['4', '5', '6', '*', '(', ')', 'sqrt'].map((item) => (
          <button key={item} onClick={() => handleButtonClick(item)}>{item}</button>
        ))}
        {['1', '2', '3', '-', 'log', 'ln', '^'].map((item) => (
          <button key={item} onClick={() => handleButtonClick(item)}>{item}</button>
        ))}
        {['0', '.', '=', '+', 'C'].map((item) => (
          <button
            key={item}
            onClick={() => (item === '=' ? handleEqual() : item === 'C' ? handleClear() : handleButtonClick(item))}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
