addEventListener("load", (event) => {
    console.log("Page loaded");
    window.addEventListener('deviceorientation', handleOrientation);
});

function handleOrientation(event) {
    let circleBoxRed = document.getElementById("circle-box-red");
    let circleBoxGreen = document.getElementById("circle-box-green");
    let circleBoxBlue = document.getElementById("circle-box-blue");
    let beta = event.beta - 90;
    circleBoxRed.style.rotate = `${event.alpha}deg`;
    circleBoxGreen.style.rotate = `${beta}deg`;
    circleBoxBlue.style.rotate = `${event.gamma}deg`;
    console.log(`alpha: ${event.alpha}, beta: ${event.beta}, gamma: ${event.gamma}`);
}