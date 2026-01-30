document.addEventListener('DOMContentLoaded', () => {
    const recommendBtn = document.getElementById('recommend-btn');
    const menuDisplay = document.getElementById('menu-display');
    const themeSwitch = document.getElementById('checkbox');

    // Theme switcher logic
    if (themeSwitch) {
        themeSwitch.addEventListener('change', () => {
            if (themeSwitch.checked) {
                document.body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark-mode');
            } else {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light-mode');
            }
        });

        // Apply saved theme on page load
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'dark-mode') {
            document.body.classList.add('dark-mode');
            themeSwitch.checked = true;
        }
    }

    const dinnerMenus = [
        '김치찌개',
        '된장찌개',
        '비빔밥',
        '불고기',
        '제육볶음',
        '삼겹살 구이',
        '치킨',
        '피자',
        '파스타',
        '떡볶이',
        '순대국',
        '족발 또는 보쌈',
        '카레라이스',
        '돈까스',
        '짜장면'
    ];

    recommendBtn.addEventListener('click', () => {
        menuDisplay.classList.remove('reveal');

        // 추천 애니메이션 효과를 위해 잠시 대기
        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * dinnerMenus.length);
            const recommendedMenu = dinnerMenus[randomIndex];
            menuDisplay.innerHTML = `<p class="menu-item">'${recommendedMenu}' 어떠세요?</p>`;
            menuDisplay.classList.add('reveal');
        }, 100);
    });
});
