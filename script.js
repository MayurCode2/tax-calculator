document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('taxForm');
  const modal = document.getElementById('modal');
  const resultText = document.getElementById('result');

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    const income = parseFloat(document.getElementById('income').value);
    const extraIncome = parseFloat(
      document.getElementById('extraIncome').value
    );
    const deductions = parseFloat(document.getElementById('deductions').value);
    const age = document.getElementById('age').value;
    let tax = 0;

    if (isNaN(income) || isNaN(extraIncome) || isNaN(deductions)) {
      showError(document.getElementById('income'), 'Invalid input');
      showError(document.getElementById('extraIncome'), 'Invalid input');
      showError(document.getElementById('deductions'), 'Invalid input');
      showError(document.getElementById('age'), 'Select age range');
      return;
    }

    if (!age) {
      showError(document.getElementById('age'), 'Select age range');
      return;
    }

    const totalIncome = income + extraIncome - deductions;
    let taxRate = 0;
    if (totalIncome > 800000) {
      if (age === '<40') {
        taxRate = 0.3;
      } else if (age === '≥40 &lt;60') {
        taxRate = 0.4;
      } else if (age === '≥60') {
        taxRate = 0.1;
      }
      tax = taxRate * (totalIncome - 800000);
    }

    const overallIncome = totalIncome + tax;
    resultText.innerHTML = `
      <p>Overall Income: ${overallIncome.toFixed(2)} Lakhs</p>
      <p>Tax Amount: ${tax.toFixed(2)} Lakhs</p>
    `;
    modal.style.display = 'block';
  });

  function showError(input, message) {
    const errorIcon = input.nextElementSibling;
    errorIcon.dataset.tooltip = message;
    input.classList.add('error');
  }

  function clearError(input) {
    const errorIcon = input.nextElementSibling;
    errorIcon.dataset.tooltip = '';
    input.classList.remove('error');
  }

  modal.querySelector('.close').addEventListener('click', function () {
    modal.style.display = 'none';
  });
});
