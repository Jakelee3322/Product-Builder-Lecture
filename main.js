const URL = "https://teachablemachine.withgoogle.com/models/PZwcYH36d/";

let model, webcam, labelContainer, maxPredictions;

// Load the image model and setup the webcam
async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // load the model and metadata
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Convenience function to setup a webcam
    const flip = true; // whether to flip the webcam
    webcam = new tmImage.Webcam(400, 400, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    window.requestAnimationFrame(loop);

    // append elements to the DOM
    document.getElementById("webcam-container").appendChild(webcam.canvas);
    
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

    labelContainer = document.getElementById("label-container");
    labelContainer.appendChild(dogContainer);
    labelContainer.appendChild(catContainer);

    // Hide the start button
    document.getElementById('start-button').style.display = 'none';

}

async function loop() {
    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
}

// run the webcam image through the image model
async function predict() {
    // predict can take in an image, video or canvas html element
    const prediction = await model.predict(webcam.canvas);

    const dogPrediction = prediction.find(p => p.className === "강아지상");
    const catPrediction = prediction.find(p => p.className === "고양이상");

    if (dogPrediction && catPrediction) {
        const dogBar = document.getElementById('dog-bar');
        const catBar = document.getElementById('cat-bar');

        const dogPercentage = (dogPrediction.probability * 100).toFixed(0);
        const catPercentage = (catPrediction.probability * 100).toFixed(0);

        dogBar.style.width = dogPercentage + '%';
        dogBar.innerHTML = `🐶 강아지상 ${dogPercentage}%`;

        catBar.style.width = catPercentage + '%';
        catBar.innerHTML = `🐱 고양이상 ${catPercentage}%`;
    }
}