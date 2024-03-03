let circleBoxRed, circleBoxGreen, circleBoxBlue;

class CircleBox {
    rotate = 0;
    element;
    constructor(element) {
        this.element = element;
    }
    update = function () {
        this.element.style.rotate = `${this.rotate}deg`;
        console.log(this.rotate);
    }
}

addEventListener("load", (event) => {
    let deviceOrientationButton = document.getElementById("device-orientation-button");
    deviceOrientationButton.addEventListener("click", onDeviceOrientationButtonClick);
    circleBoxRed = new CircleBox(document.getElementById("circle-box-red"));
    circleBoxGreen = new CircleBox(document.getElementById("circle-box-green"));
    circleBoxBlue = new CircleBox(document.getElementById("circle-box-blue"));
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
    circleBoxRed.rotate = lerp(circleBoxRed.rotate, event.gamma, 0.1);
    circleBoxGreen.rotate = lerp(circleBoxGreen.rotate, event.gamma, 0.2);
    circleBoxBlue.rotate = lerp(circleBoxBlue.rotate, event.gamma, 0.3);
    window.requestAnimationFrame(updateCircleBoxes);
}

function updateCircleBoxes(){
    circleBoxRed.update();
    circleBoxGreen.update();
    circleBoxBlue.update();
}


function lerp(start, end, amt) {
    return (1 - amt) * start + amt * end;
}