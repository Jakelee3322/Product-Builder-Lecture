const URL = "https://teachablemachine.withgoogle.com/models/PZwcYH36d/";

let model, labelContainer, maxPredictions;

async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    const imageUpload = document.getElementById("image-upload");
    imageUpload.addEventListener("change", (e) => readImage(e));

    labelContainer = document.getElementById("label-container");
}

function readImage(event) {
    if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const image = document.getElementById("uploaded-image");
            image.src = e.target.result;
            image.style.display = 'block';
            // Wait for the image to be loaded before predicting
            image.onload = () => predict(image);
        }
        reader.readAsDataURL(event.target.files[0]);
    }
}


async function predict(image) {
    const prediction = await model.predict(image, false);
    
    // Clear previous results
    labelContainer.innerHTML = ''; 

    // Create containers for the result bars
    const dogContainer = document.createElement('div');
    dogContainer.classList.add('result-bar-container');
    const dogBar = document.createElement('div');
    dogBar.id = 'dog-bar';
    dogBar.classList.add('result-bar');
    dogContainer.appendChild(dogBar);

    const catContainer = document.createElement('div');
    catContainer.classList.add('result-bar-container');
    const catBar = document.createElement('div');
    catBar.id = 'cat-bar';
    catBar.classList.add('result-bar');
    catContainer.appendChild(catBar);

    labelContainer.appendChild(dogContainer);
    labelContainer.appendChild(catContainer);

    const dogPrediction = prediction.find(p => p.className === "강아지상");
    const catPrediction = prediction.find(p => p.className === "고양이상");

    if (dogPrediction && catPrediction) {
        const dogPercentage = (dogPrediction.probability * 100).toFixed(0);
        const catPercentage = (catPrediction.probability * 100).toFixed(0);

        dogBar.style.width = dogPercentage + '%';
        dogBar.innerHTML = `🐶 강아지상 ${dogPercentage}%`;

        catBar.style.width = catPercentage + '%';
        catBar.innerHTML = `🐱 고양이상 ${catPercentage}%`;
    }
}

init();
