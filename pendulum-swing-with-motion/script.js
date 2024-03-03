let circleBoxRed, circleBoxGreen, circleBoxBlue;
let previousRotateValue = 0;

class CircleBox {
    rotate = 0;
    element;
    constructor(element) {
        this.element = element;
    }
    update = function () {
        this.element.style.rotate = `${this.rotate}deg`;
    }
}

let updateInterval;

addEventListener("load", (event) => {

    circleBoxRed = new CircleBox(document.getElementById("circle-box-red"));
    circleBoxGreen = new CircleBox(document.getElementById("circle-box-green"));
    circleBoxBlue = new CircleBox(document.getElementById("circle-box-blue"));
    // check if is mobile device
    if (isMobileDevice()) {
        let deviceOrientationButton = document.getElementById("device-orientation-button");
        deviceOrientationButton.addEventListener("click", onDeviceOrientationButtonClick);
    }
    else {
        addEventListener("mousemove", handleMouseMove);
        updateInterval = setInterval(() => {
            updateCircleBoxes(previousRotateValue, 0.2);
        }, 10);
    }
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
    console.log(`alpha: ${event.alpha}, beta: ${event.beta}, gamma: ${event.gamma}`);
    window.requestAnimationFrame(() => {
        updateCircleBoxes(event.gamma);
    });
}

function handleMouseMove(event) {
    // Map x position to degrees, left side of screen is between -90 and 0, right side is between 0 and 90
    let x = event.clientX;
    let width = window.innerWidth;
    let rotateValue = (x / width) * 180 - 90;
    previousRotateValue = rotateValue;
    updateCircleBoxes(rotateValue, 0.2);
}

function updateCircleBoxes(newRotateValue, lerpFactor = 1) {
    circleBoxRed.rotate = newRotateValue;
    circleBoxGreen.rotate = lerp(circleBoxGreen.rotate, newRotateValue, 0.2 * lerpFactor);
    circleBoxBlue.rotate = lerp(circleBoxBlue.rotate, newRotateValue, 0.4 * lerpFactor);
    circleBoxRed.update();
    circleBoxGreen.update();
    circleBoxBlue.update();
}

function lerp(start, end, amt) {
    return (1 - amt) * start + amt * end;
}