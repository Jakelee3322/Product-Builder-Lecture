document.addEventListener('DOMContentLoaded', () => {
    // Dinner recommendation elements
    const recommendBtn = document.getElementById('recommend-btn');
    const menuDisplay = document.getElementById('menu-display');
    
    // Theme switcher elements
    const themeSwitch = document.getElementById('checkbox');
    
    // Animal test elements
    const animalTestBtn = document.getElementById('animal-test-btn-corner'); // Updated ID
    const imageUploadInput = document.getElementById('image-upload-input');
    const imagePreviewContainer = document.getElementById('image-preview-container');
    const labelContainer = document.getElementById('label-container');

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
    let model, maxPredictions;

    // Load the model once
    async function loadModel() {
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();
        
        // Prepare label container
        labelContainer.innerHTML = ''; // Clear previous labels
        for (let i = 0; i < maxPredictions; i++) {
            labelContainer.appendChild(document.createElement("div"));
        }
    }
    loadModel(); // Load model on page load

    if (imageUploadInput) {
        imageUploadInput.addEventListener('change', async (event) => {
            if (event.target.files && event.target.files[0]) {
                const imageFile = event.target.files[0];
                const reader = new FileReader();
                
                reader.onload = async (e) => {
                    // Create an image element and display it
                    imagePreviewContainer.innerHTML = ''; // Clear previous content
                    const image = document.createElement('img');
                    image.src = e.target.result;
                    image.style.maxWidth = '100%';
                    image.style.maxHeight = '100%';
                    imagePreviewContainer.appendChild(image);
                    
                    // Wait for the image to load before predicting
                    image.onload = async () => {
                        await predict(image);
                    }
                };
                
                reader.readAsDataURL(imageFile);
            }
        });
    }

    async function predict(imageElement) {
        const prediction = await model.predict(imageElement);
        for (let i = 0; i < maxPredictions; i++) {
            const classPrediction =
                prediction[i].className + ": " + prediction[i].probability.toFixed(2);
            if(labelContainer.childNodes[i]) {
                labelContainer.childNodes[i].innerHTML = classPrediction;
            }
        }
    }
});
