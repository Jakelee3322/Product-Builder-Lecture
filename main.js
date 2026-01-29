const URL = "https://teachablemachine.withgoogle.com/models/PZwcYH36d/";

let model, labelContainer, maxPredictions;

async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    const imageUpload = document.getElementById("image-upload");
    const customUploadButton = document.getElementById("custom-upload-button");

    customUploadButton.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent the default label behavior
        imageUpload.click(); // Programmatically click the hidden file input
    });

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
    
    // For debugging: log the prediction array to the console
    console.log(prediction);

    // Clear previous results
    labelContainer.innerHTML = ''; 

    // Create containers for the result bars
    const firstPredictionContainer = document.createElement('div');
    firstPredictionContainer.classList.add('result-bar-container');
    const firstPredictionBar = document.createElement('div');
    firstPredictionBar.id = 'first-bar';
    firstPredictionBar.classList.add('result-bar');
    firstPredictionContainer.appendChild(firstPredictionBar);

    const secondPredictionContainer = document.createElement('div');
    secondPredictionContainer.classList.add('result-bar-container');
    const secondPredictionBar = document.createElement('div');
    secondPredictionBar.id = 'second-bar';
    secondPredictionBar.classList.add('result-bar');
    secondPredictionContainer.appendChild(secondPredictionBar);

    labelContainer.appendChild(firstPredictionContainer);
    labelContainer.appendChild(secondPredictionContainer);

    // Assuming the model returns predictions in a consistent order
    const firstPrediction = prediction[0];
    const secondPrediction = prediction[1];

    if (firstPrediction && secondPrediction) {
        const firstPercentage = (firstPrediction.probability * 100).toFixed(0);
        const secondPercentage = (secondPrediction.probability * 100).toFixed(0);

        firstPredictionBar.style.width = firstPercentage + '%';
        // Use the actual class name from the model
        firstPredictionBar.innerHTML = ` ${firstPrediction.className} ${firstPercentage}%`;

        secondPredictionBar.style.width = secondPercentage + '%';
        // Use the actual class name from the model
        secondPredictionBar.innerHTML = ` ${secondPrediction.className} ${secondPercentage}%`;

        // Add emojis based on class name
        if (firstPrediction.className.includes("강아지")) {
            firstPredictionBar.innerHTML = '🐶' + firstPredictionBar.innerHTML;
            secondPredictionBar.innerHTML = '🐱' + secondPredictionBar.innerHTML;
             firstPredictionBar.style.backgroundColor = '#4fc3f7';
             secondPredictionBar.style.backgroundColor = '#ffb74d';
        } else {
            firstPredictionBar.innerHTML = '🐱' + firstPredictionBar.innerHTML;
            secondPredictionBar.innerHTML = '🐶' + secondPredictionBar.innerHTML;
            firstPredictionBar.style.backgroundColor = '#ffb74d';
            secondPredictionBar.style.backgroundColor = '#4fc3f7';
        }
    }
}

init();
