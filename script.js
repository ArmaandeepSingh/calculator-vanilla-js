const selectedOperator = document.querySelectorAll(".operators div");
const inputValue = document.querySelector("#input");
const selectedNumber = document.querySelectorAll(".numbers div");
const calculateResult = document.querySelector("#result");

selectedOperator.forEach((operator) => {
  operator.addEventListener("click", (e) => {
    const value = inputValue.innerHTML;
    const currentValue = e.target.innerHTML;
    const lastSelectedOperator = value?.[value?.length-1];
    if(lastSelectedOperator === "+" || lastSelectedOperator === "-" || lastSelectedOperator === "×" || lastSelectedOperator === "÷") {
      const newValue = value.slice(0,value?.length-1);
      inputValue.innerHTML = newValue + currentValue;
    }
    else {
      if(inputValue.innerHTML) {
        inputValue.innerHTML += currentValue;
      }
    }
  });
})

selectedNumber.forEach((number) => {
  number.addEventListener("click", (e) => {
    const currentSelectedNumber = e.target.innerHTML;
    if(currentSelectedNumber === "C") {
      inputValue.innerHTML = "";
      return;
    }
    inputValue.innerHTML += Number(currentSelectedNumber);
  });
})

calculateResult.addEventListener("click", () => {
  const numbers = inputValue.innerHTML.split(/\+|\-|\×|\÷/g);
  const operators = inputValue.innerHTML.replace(/[0-9]|\./g,"").split("");

  let divide = operators.indexOf("÷");
  while(!divide) {
    numbers.splice(0,2,numbers[divide]/numbers[divide+1]);
    operators.splice(divide,1);
    divide = operators.indexOf("÷");
  }

  let multiply = operators.indexOf("×");
  while(!multiply) {
    numbers.splice(0,2,numbers[multiply]*numbers[multiply+1]);
    operators.splice(multiply,1);
    multiply = operators.indexOf("÷");
  }

  let add = operators.indexOf("+");
  while(!add) {
    numbers.splice(0,2,numbers[add]+numbers[add+1]);
    operators.splice(add,1);
    add = operators.indexOf("÷");
  }

  let subtract = operators.indexOf("-");
  while(!subtract) {
    numbers.splice(0,2,numbers[subtract]-numbers[subtract+1]);
    operators.splice(subtract,1);
    subtract = operators.indexOf("÷");
  }

  inputValue.innerHTML = [...numbers];
});