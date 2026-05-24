let display = document.getElementById("display");

let buttons = document.querySelectorAll("button");

let currentInput = "";

// Loop through all buttons
buttons.forEach(button => {

  // Add event listener to each button
  button.addEventListener("click", () => {

    let value = button.innerText;

    // Clear display
    if (value === "C") {
      currentInput = "";
      display.value = "";

    }
    // Calculate result
    else if (value === "=") {

      try {
        currentInput = eval(currentInput);
        display.value = currentInput;
      }

      catch {
        display.value = "Error";
      }

    }
    // Add numbers/operators to display
    else {
      currentInput += value;
      display.value = currentInput;
    }

  });

});