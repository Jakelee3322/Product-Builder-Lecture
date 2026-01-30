document.addEventListener('DOMContentLoaded', () => {
    // Dinner recommendation elements
    const recommendBtn = document.getElementById('recommend-btn');
    const menuDisplay = document.getElementById('menu-display');
    
    // Theme switcher elements
    const themeSwitch = document.getElementById('checkbox');
    
    // Animal test elements
    const animalTestBtn = document.getElementById('animal-test-btn');
    const animalTestSection = document.getElementById('animal-test-section');

    // --- Theme Switcher Logic ---
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

        const currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'dark-mode') {
            document.body.classList.add('dark-mode');
            themeSwitch.checked = true;
        }
    }

    // --- Dinner Recommendation Logic ---
    const dinnerMenus = [
        '김치찌개', '된장찌개', '비빔밥', '불고기', '제육볶음', 
        '삼겹살 구이', '치킨', '피자', '파스타', '떡볶이', '순대국', 
        '족발 또는 보쌈', '카레라이스', '돈까스', '짜장면'
    ];

    if(recommendBtn) {
        recommendBtn.addEventListener('click', () => {
            menuDisplay.classList.remove('reveal');
            setTimeout(() => {
                const randomIndex = Math.floor(Math.random() * dinnerMenus.length);
                const recommendedMenu = dinnerMenus[randomIndex];
                menuDisplay.innerHTML = `<p class="menu-item">'${recommendedMenu}' 어떠세요?</p>`;
                menuDisplay.classList.add('reveal');
            }, 100);
        });
    }

    // --- Teachable Machine Animal Test Logic ---
    const URL = "https://teachablemachine.withgoogle.com/models/PZwcYH36d/";
    let model, webcam, labelContainer, maxPredictions;
    let isTestRunning = false;

    if(animalTestBtn) {
        animalTestBtn.addEventListener('click', () => {
            if (!isTestRunning) {
                animalTestSection.classList.remove('hidden');
                initAnimalTest();
                isTestRunning = true;
                animalTestBtn.textContent = "테스트 종료하기";
            } else {
                // This is a simple hide, a better implementation would stop the webcam etc.
                animalTestSection.classList.add('hidden');
                isTestRunning = false;
                animalTestBtn.textContent = "동물상 테스트 하러가기";
                // A more robust solution would properly stop and clean up the webcam and model
            }
        });
    }

    async function initAnimalTest() {
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";
        
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        const flip = true;
        webcam = new tmImage.Webcam(200, 200, flip);
        await webcam.setup();
        await webcam.play();
        window.requestAnimationFrame(loop);

        const webcamContainer = document.getElementById("webcam-container");
        webcamContainer.innerHTML = ''; // Clear previous canvas if any
        webcamContainer.appendChild(webcam.canvas);
        
        labelContainer = document.getElementById("label-container");
        labelContainer.innerHTML = ''; // Clear previous labels
        for (let i = 0; i < maxPredictions; i++) {
            labelContainer.appendChild(document.createElement("div"));
        }
    }

    async function loop() {
        if (!isTestRunning) return;
        webcam.update();
        await predict();
        window.requestAnimationFrame(loop);
    }

    async function predict() {
        const prediction = await model.predict(webcam.canvas);
        for (let i = 0; i < maxPredictions; i++) {
            const classPrediction =
                prediction[i].className + ": " + prediction[i].probability.toFixed(2);
            if(labelContainer.childNodes[i]) {
                labelContainer.childNodes[i].innerHTML = classPrediction;
            }
        }
    }
});