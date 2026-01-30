document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const lottoNumbersContainer = document.getElementById('lotto-numbers');
    const themeSwitch = document.getElementById('checkbox');

    // 테마 전환 로직
    themeSwitch.addEventListener('change', () => {
        document.body.classList.toggle('light-mode');
        // 사용자의 테마 선택을 localStorage에 저장
        if (document.body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light-mode');
        } else {
            localStorage.setItem('theme', 'dark-mode');
        }
    });

    // 페이지 로드 시 저장된 테마 적용
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'light-mode') {
        document.body.classList.add('light-mode');
        themeSwitch.checked = true;
    }

    generateBtn.addEventListener('click', () => {
        lottoNumbersContainer.innerHTML = ''; // 기존 번호 삭제
        const lottoNumbers = generateLottoNumbers();
        displayLottoNumbers(lottoNumbers);
    });

    function generateLottoNumbers() {
        const numbers = new Set();
        while (numbers.size < 6) {
            const randomNumber = Math.floor(Math.random() * 45) + 1;
            numbers.add(randomNumber);
        }
        return Array.from(numbers).sort((a, b) => a - b);
    }

    function displayLottoNumbers(numbers) {
        const colors = ['#ff6b6b', '#f9ca24', '#78e08f', '#1e90ff', '#ffaf40', '#7d5fff'];
        numbers.forEach((number, index) => {
            const numberElement = document.createElement('div');
            numberElement.classList.add('lotto-number');
            numberElement.textContent = number;
            numberElement.style.backgroundColor = colors[index % colors.length];
            numberElement.style.animationDelay = `${index * 0.1}s`;
            lottoNumbersContainer.appendChild(numberElement);
        });
    }
});
