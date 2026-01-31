document.addEventListener('DOMContentLoaded', () => {
    // Dinner recommendation elements
    const recommendBtn = document.getElementById('recommend-btn');
    const menuDisplay = document.getElementById('menu-display');
    
    // Theme switcher elements
    const themeSwitch = document.getElementById('checkbox');
    
    // Animal test elements
    const animalTestBtn = document.getElementById('animal-test-btn-corner'); // Updated ID
    const animalTestSection = document.querySelector('.animal-test-section'); // Select the section
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
        { name: '김치찌개', description: '한국인의 소울푸드, 얼큰하고 개운한 맛이 일품입니다.', image: 'https://via.placeholder.com/300x200.png?text=Kimchi+Jjigae' },
        { name: '된장찌개', description: '구수한 된장과 다양한 재료가 어우러진 든든한 한 끼 식사입니다.', image: 'https://via.placeholder.com/300x200.png?text=Doenjang+Jjigae' },
        { name: '비빔밥', description: '신선한 채소와 고추장이 어우러진 건강하고 맛있는 한 그릇입니다.', image: 'https://via.placeholder.com/300x200.png?text=Bibimbap' },
        { name: '불고기', description: '달콤한 양념에 재운 소고기를 구워 먹는 모두가 좋아하는 메뉴입니다.', image: 'https://via.placeholder.com/300x200.png?text=Bulgogi' },
        { name: '제육볶음', description: '매콤달콤한 양념의 돼지고기 볶음, 밥도둑이 따로 없습니다.', image: 'https://via.placeholder.com/300x200.png?text=Jeyuk+Bokkeum' },
        { name: '삼겹살 구이', description: '한국식 바베큐의 대표주자, 지글지글 굽는 소리까지 맛있습니다.', image: 'https://via.placeholder.com/300x200.png?text=Samgyeopsal' },
        { name: '치킨', description: '바삭한 튀김옷과 촉촉한 속살, 남녀노소 모두의 사랑을 받는 야식의 왕입니다.', image: 'https://via.placeholder.com/300x200.png?text=Chicken' },
        { name: '피자', description: '다양한 토핑과 쭉 늘어나는 치즈의 조화, 파티에 빠질 수 없는 메뉴입니다.', image: 'https://via.placeholder.com/300x200.png?text=Pizza' },
        { name: '파스타', description: '토마토, 크림, 오일 등 다양한 소스로 즐기는 이탈리아의 맛입니다.', image: 'https://via.placeholder.com/300x200.png?text=Pasta' },
        { name: '떡볶이', description: '매콤달콤한 떡과 어묵의 조화, 길거리 간식의 최강자입니다.', image: 'https://via.placeholder.com/300x200.png?text=Tteokbokki' },
        { name: '순대국', description: '진한 국물과 푸짐한 건더기, 든든하게 속을 채워주는 국밥입니다.', image: 'https://via.placeholder.com/300x200.png?text=Sundaeguk' },
        { name: '족발 또는 보쌈', description: '야들야들한 식감과 풍부한 맛, 술안주로도 식사로도 좋습니다.', image: 'https://via.placeholder.com/300x200.png?text=Jokbal+Bossam' },
        { name: '카레라이스', description: '향긋한 카레와 부드러운 재료들이 어우러진 인도의 맛입니다.', image: 'https://via.placeholder.com/300x200.png?text=Curry+Rice' },
        { name: '돈까스', description: '바삭한 튀김옷과 두툼한 고기, 남녀노소 누구나 좋아하는 메뉴입니다.', image: 'https://via.placeholder.com/300x200.png?text=Donkkaseu' },
        { name: '짜장면', description: '달콤한 춘장 소스와 쫄깃한 면발, 한국식 중화요리의 대표주자입니다.', image: 'https://via.placeholder.com/300x200.png?text=Jajangmyeon' },
        { name: '감자탕', description: '진한 국물과 부드러운 등뼈, 얼큰하게 속을 풀어주는 메뉴입니다.', image: 'https://via.placeholder.com/300x200.png?text=Gamjatang' },
        { name: '해물찜', description: '신선한 해물이 듬뿍 들어간 매콤한 찜 요리입니다.', image: 'https://via.placeholder.com/300x200.png?text=Haemul-jjim' },
        { name: '아구찜', description: '아삭한 콩나물과 쫄깃한 아구가 어우러진 매콤한 찜 요리입니다.', image: 'https://via.placeholder.com/300x200.png?text=Agu-jjim' },
        { name: '초밥', description: '신선한 생선과 새콤달콤한 밥의 조화, 일본의 대표적인 요리입니다.', image: 'https://via.placeholder.com/300x200.png?text=Sushi' },
        { name: '라멘', description: '진한 국물과 쫄깃한 면발, 일본의 대표적인 면 요리입니다.', image: 'https://via.placeholder.com/300x200.png?text=Ramen' },
        { name: '마라탕', description: '얼얼하고 매운 맛이 매력적인 중국의 탕 요리입니다.', image: 'https://via.placeholder.com/300x200.png?text=Maratang' },
        { name: '양꼬치', description: '향신료를 뿌려 구운 양고기 꼬치, 칭따오 맥주와 찰떡궁합입니다.', image: 'https://via.placeholder.com/300x200.png?text=Yang-kkochi' },
        { name: '꿔바로우', description: '쫀득한 튀김옷과 새콤달콤한 소스가 어우러진 중국식 탕수육입니다.', image: 'https://via.placeholder.com/300x200.png?text=Guo+bao+rou' },
        { name: '햄버거', description: '두툼한 패티와 신선한 채소, 든든한 한 끼 식사로 충분합니다.', image: 'https://via.placeholder.com/300x200.png?text=Hamburger' },
        { name: '스테이크', description: '육즙 가득한 소고기를 구워 즐기는 최고의 요리입니다.', image: 'https://via.placeholder.com/300x200.png?text=Steak' },
        { name: '샐러드', description: '신선한 채소와 다양한 토핑, 건강하고 가벼운 한 끼 식사입니다.', image: 'https://via.placeholder.com/300x200.png?text=Salad' },
        { name: '샌드위치', description: '다양한 재료를 빵 사이에 넣어 즐기는 간편한 식사입니다.', image: 'https://via.placeholder.com/300x200.png?text=Sandwich' },
        { name: '쌀국수', description: '진한 육수와 부드러운 쌀면, 베트남의 대표적인 요리입니다.', image: 'https://via.placeholder.com/300x200.png?text=Pho' },
        { name: '분짜', description: '새콤달콤한 소스에 숯불에 구운 돼지고기와 쌀면을 적셔 먹는 베트남 요리입니다.', image: 'https://via.placeholder.com/300x200.png?text=Bun+cha' },
        { name: '팟타이', description: '새콤달콤한 소스와 쫄깃한 쌀면, 태국의 대표적인 볶음 쌀국수입니다.', image: 'https://via.placeholder.com/300x200.png?text=Pad+thai' }
    ];

    if(recommendBtn) {
        recommendBtn.addEventListener('click', () => {
            menuDisplay.classList.remove('reveal');
            setTimeout(() => {
                const randomIndex = Math.floor(Math.random() * dinnerMenus.length);
                const recommendedMenu = dinnerMenus[randomIndex];
                menuDisplay.innerHTML = `
                    <div class="menu-item">
                        <img src="${recommendedMenu.image}" alt="${recommendedMenu.name}">
                        <h3>'${recommendedMenu.name}' 어떠세요?</h3>
                        <p>${recommendedMenu.description}</p>
                    </div>
                `;
                menuDisplay.classList.add('reveal');
            }, 100);
        });
    }

    // --- Teachable Machine Animal Test Logic ---
    const URL = "https://teachablemachine.withgoogle.com/models/PZwcYH36d/";
    let model, maxPredictions;
    let isAnimalTestSectionVisible = false; // Track visibility state

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

    // Toggle animal test section visibility
    if (animalTestBtn && animalTestSection) {
        animalTestBtn.addEventListener('click', () => {
            if (isAnimalTestSectionVisible) {
                animalTestSection.classList.add('hidden');
                animalTestBtn.textContent = '동물상 테스트';
                isAnimalTestSectionVisible = false;
                // Optional: Clear displayed image and labels when hiding
                imagePreviewContainer.innerHTML = '<span>이미지 미리보기</span>';
                labelContainer.innerHTML = '';
            } else {
                animalTestSection.classList.remove('hidden');
                animalTestBtn.textContent = '테스트 닫기';
                isAnimalTestSectionVisible = true;
            }
        });
    }

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