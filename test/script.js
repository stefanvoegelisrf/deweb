addEventListener("load", (event) => {
    let deviceOrientationButton = document.getElementById("device-orientation-button");
    deviceOrientationButton.addEventListener("click", onDeviceOrientationButtonClick);
});

function onDeviceOrientationButtonClick() {
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        // Handle iOS 13+ devices.
        DeviceOrientationEvent.requestPermission()
            .then((state) => {
                if (state === 'granted') {
                    window.addEventListener('deviceorientation', handleOrientation);
                } else {
                    console.error('Request to access the orientation was rejected');
                }
            })
            .catch(console.error);
    } else {
        // Handle regular non iOS 13+ devices.
        window.addEventListener('deviceorientation', handleOrientation);
    }
}

function handleOrientation(event) {
    let circleBoxRed = document.getElementById("circle-box-red");
    let circleBoxGreen = document.getElementById("circle-box-green");
    let circleBoxBlue = document.getElementById("circle-box-blue");
    let beta = event.beta - 90;
    // circleBoxRed.style.rotate = `${event.alpha}deg`;
    // circleBoxGreen.style.rotate = `${beta}deg`;
    circleBoxRed.style.rotate = `${event.gamma}deg`;
    circleBoxGreen.style.rotate = `${event.gamma}deg`;
    circleBoxBlue.style.rotate = `${event.gamma}deg`;
    console.log(`alpha: ${event.alpha}, beta: ${event.beta}, gamma: ${event.gamma}`);
}