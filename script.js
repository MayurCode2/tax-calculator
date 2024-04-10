document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("taxForm");
  const modal = document.getElementById("modal");
  const resultText = document.getElementById("result");

  form.addEventListener("submit", function(event) {
    event.preventDefault();
    const income = parseFloat(document.getElementById("income").value);
    const extraIncome = parseFloat(document.getElementById("extraIncome").value) || 0;
    const deductions = parseFloat(document.getElementById("deductions").value) || 0;
    const age = document.getElementById("age").value;
    let tax = 0;

    if (isNaN(income)) {
      showError(document.getElementById("income"), "Invalid input");
      return;
    }

    if (!age) {
      showError(document.getElementById("age"), "Select age range");
      return;
    }

    const totalIncome = income + extraIncome - deductions;
    let taxRate = 0;
    if (totalIncome > 800000) {
      if (age === "<40") {
        taxRate = 0.3;
      } else if (age === "40-60" && parseInt(age) >= 40 && parseInt(age) < 60) {
        taxRate = 0.4;
      } else if (age === '>=60') {
        taxRate = 0.1;
      }
      tax = taxRate * (totalIncome - 800000);
    }

    const overallIncome = totalIncome - tax;
    resultText.innerHTML = `
      <p>Overall Income: ${overallIncome.toFixed(2)}</p>
      <p>Tax Amount: ${tax.toFixed(2)}</p>
    `;
    modal.style.display = "block";
  });

  function showError(input, message) {
    const errorIcon = input.nextElementSibling;
    errorIcon.dataset.tooltip = message;
    errorIcon.style.display = "inline-block"; // Show error icon
    input.classList.add("error");
  }

  function clearError(input) {
    const errorIcon = input.nextElementSibling;
    errorIcon.dataset.tooltip = "";
    errorIcon.style.display = "none"; // Hide error icon
    input.classList.remove("error");
  }

  const inputs = document.querySelectorAll("input[type='number'], select");
  inputs.forEach(input => {
    input.addEventListener("input", function() {
      clearError(input);
    });
    input.addEventListener("blur", function() {
      if (isNaN(parseFloat(input.value))) {
        showError(input, "Invalid input");
      }
    });
  });

  modal.querySelector(".close").addEventListener("click", function() {
    modal.style.display = "none";
  });
});
