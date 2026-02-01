document.addEventListener('DOMContentLoaded', () => {
    // Dinner recommendation elements
    const recommendBtn = document.getElementById('recommend-btn');
    const menuDisplay = document.getElementById('menu-display');

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

    // --- Contact Form Logic ---
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const form = e.target;
            const data = new FormData(form);
            
            try {
                formStatus.textContent = '전송 중...';
                formStatus.style.color = 'blue';

                const response = await fetch(form.action, {
                    method: form.method,
                    body: data,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    formStatus.textContent = '메시지가 성공적으로 전송되었습니다. 감사합니다!';
                    formStatus.style.color = 'green';
                    form.reset();
                } else {
                    const responseData = await response.json();
                    if (Object.hasOwn(responseData, 'errors')) {
                        formStatus.textContent = responseData["errors"].map(error => error["message"]).join(", ");
                    } else {
                        formStatus.textContent = '메시지 전송에 실패했습니다. 다시 시도해주세요.';
                    }
                    formStatus.style.color = 'red';
                }
            } catch (error) {
                formStatus.textContent = '메시지 전송 중 오류가 발생했습니다.';
                formStatus.style.color = 'red';
            }
        });
    }

    // --- Learn Page Logic ---
    const learnInput = document.getElementById('learn-input');
    const learnSubmit = document.getElementById('learn-submit');
    const learnResults = document.getElementById('learn-results');

    const knowledgeBase = {
        "상식": {
            "경제": {
                "인플레이션": "물가가 지속적으로 상승하는 현상으로, 돈의 가치가 하락하는 것을 의미합니다.",
                "디플레이션": "물가가 지속적으로 하락하는 현상으로, 경제 침체의 신호일 수 있습니다.",
                "금리": "돈을 빌릴 때 지불하는 이자율로, 중앙은행이 조절하여 경기를 조절합니다."
            },
            "사회": {
                "사회적 거리두기": "감염병 확산을 막기 위해 사람 간의 물리적 거리를 유지하는 방역 수칙입니다.",
                "고령화 사회": "전체 인구 중 65세 이상 인구 비율이 7% 이상인 사회를 말합니다."
            }
        },
        "역사": {
            "한국사": {
                "고조선": "기원전 2333년에 단군왕검이 세운 한국 최초의 국가입니다.",
                "조선": "1392년 이성계가 건국하여 약 500년간 이어진 왕조입니다.",
                "세종대왕": "조선의 4대 왕으로, 한글(훈민정음)을 창제했습니다."
            },
            "세계사": {
                "로마 제국": "고대 지중해 세계를 지배했던 강력한 제국으로, 법률, 건축 등 많은 유산을 남겼습니다.",
                "제2차 세계대전": "1939년부터 1945년까지 연합국과 추축국 사이에 벌어진 인류 역사상 가장 큰 규모의 전쟁입니다.",
                "르네상스": "14~16세기 유럽에서 일어난 문예 부흥 운동으로, 고대 그리스와 로마 문화를 재발견했습니다."
            }
        },
        "과학": {
            "물리학": {
                "상대성 이론": "알베르트 아인슈타인이 발표한 이론으로, 시간과 공간이 관찰자에 따라 상대적이라는 개념입니다.",
                "양자역학": "원자나 전자 같은 아주 작은 입자들의 세계를 설명하는 물리학의 한 분야입니다."
            },
            "생명과학": {
                "DNA": "생물의 유전 정보를 담고 있는 핵심적인 분자로, 이중 나선 구조를 하고 있습니다.",
                "광합성": "식물이 태양의 빛 에너지를 이용하여 이산화탄소와 물로부터 포도당과 산소를 만드는 과정입니다."
            },
            "우주": {
                "빅뱅": "약 138억 년 전, 모든 우주가 한 점에서 폭발적으로 팽창하기 시작했다는 이론입니다.",
                "블랙홀": "중력이 매우 강하여 빛조차 빠져나올 수 없는 천체입니다."
            }
        },
        "종교": {
            "기독교": {
                "예수": "기독교의 중심 인물로, 신의 아들이자 인류의 구원자로 믿어집니다.",
                "성경": "기독교의 경전으로, 구약과 신약으로 구성되어 있습니다."
            },
            "불교": {
                "석가모니": "불교의 창시자로, '깨달은 자'라는 뜻의 '붓다'로 불립니다.",
                "윤회": "생명이 죽은 뒤에도 업에 따라 다른 모습으로 다시 태어난다는 불교의 핵심 사상입니다."
            },
            "이슬람교": {
                "무함마드": "이슬람교의 창시자이자 마지막 예언자입니다.",
                "쿠란": "이슬람교의 경전으로, 알라가 무함마드에게 내린 계시를 기록한 책입니다."
            }
        },
        "기타": "찾으시는 주제가 목록에 없나요? 더 구체적인 키워드로 검색해보세요."
    };

    function displayKnowledge(data) {
        if (typeof data === 'string') {
            return `<p>${data}</p>`;
        }
        
        let html = '<ul>';
        for (const key in data) {
            html += `<li><strong>${key}</strong>`;
            if (typeof data[key] === 'object' && data[key] !== null) {
                html += displayKnowledge(data[key]);
            } else {
                html += `: ${data[key]}`;
            }
            html += '</li>';
        }
        html += '</ul>';
        return html;
    }

    function searchKnowledge() {
        const query = learnInput.value.trim();
        if (!query) {
            learnResults.innerHTML = '<p>검색어를 입력해주세요.</p>';
            return;
        }

        let result = null;
        const keys = Object.keys(knowledgeBase);
        const foundKey = keys.find(key => query.includes(key));

        if (foundKey) {
            result = knowledgeBase[foundKey];
            // Allow searching sub-categories
            const subQuery = query.replace(foundKey, '').trim();
            if (subQuery) {
                let subResult = result;
                const subKeys = subQuery.split(' ');
                for (const subKey of subKeys) {
                    if (subResult[subKey]) {
                        subResult = subResult[subKey];
                    }
                }
                result = subResult;
            }
        }

        if (result) {
            learnResults.innerHTML = displayKnowledge(result);
        } else {
            learnResults.innerHTML = '<p>해당 주제에 대한 정보를 찾을 수 없습니다.</p>';
        }
    }

    if (learnSubmit) {
        learnSubmit.addEventListener('click', searchKnowledge);
    }
    
    if (learnInput) {
        learnInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchKnowledge();
            }
        });
    }

    // --- Theme Toggle Logic ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    const applyTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            themeToggle.textContent = '☀️';
        } else {
            body.classList.remove('dark-mode');
            themeToggle.textContent = '🌙';
        }
    };

    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDarkMode = body.classList.contains('dark-mode');
            const newTheme = isDarkMode ? 'light' : 'dark';
            localStorage.setItem('theme', newTheme);
            applyTheme(newTheme);
        });
    }
});