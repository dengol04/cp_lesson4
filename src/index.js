import { MiniMaple } from './miniMaple.js';

document.addEventListener('DOMContentLoaded', setup);

function setup() {
    const diffButton = document.getElementById('diffButton');
    if (diffButton) {
        diffButton.onclick = calculateDiff;
    }
}

function calculateDiff() {
    let polyInput = document.getElementById('polynomialInput').value;
    const varInput = document.getElementById('variableInput').value.trim();
    const resultDiv = document.getElementById('result');

    polyInput = polyInput.replace(/\s+/g, '');

    if (!polyInput || !varInput) {
        resultDiv.textContent = 'Пожалуйста, введите многочлен и переменную.';
        return;
    }

    try {
        const result = MiniMaple.diff(polyInput, varInput);
        resultDiv.textContent = result;
    } catch (error) {
        resultDiv.textContent = 'Ошибка вычисления (проверьте консоль F12)';
        console.error('Ошибка выполнения:', error);
    }
}