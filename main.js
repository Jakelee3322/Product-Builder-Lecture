const generateBtn = document.querySelector('.generate-btn');
const numbersDisplay = document.querySelector('.numbers-display');
const themeSwitchBtn = document.querySelector('.theme-switch-btn');

generateBtn.addEventListener('click', () => {
    generateLottoNumbers();
});

themeSwitchBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    if (document.body.classList.contains('light-mode')) {
        localStorage.setItem('theme', 'light-mode');
    } else {
        localStorage.setItem('theme', 'dark-mode');
    }
});

function generateLottoNumbers() {
    numbersDisplay.innerHTML = '';
    const numbers = new Set();
    while (numbers.size < 6) {
        const randomNum = Math.floor(Math.random() * 45) + 1;
        numbers.add(randomNum);
    }

    const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

    sortedNumbers.forEach((number, index) => {
        const numberElement = document.createElement('div');
        numberElement.classList.add('number');
        numberElement.textContent = number;
        numberElement.style.animationDelay = `${index * 0.1}s`;
        numbersDisplay.appendChild(numberElement);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light-mode') {
        document.body.classList.add('light-mode');
    }
});
