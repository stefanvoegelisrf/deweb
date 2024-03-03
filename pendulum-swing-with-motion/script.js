let circleBoxRed, circleBoxGreen, circleBoxBlue;
let previousRotateValue = 0;
let currentMode = "touch";

class CircleBox {
    rotate = 0;
    element;
    constructor(element) {
        this.element = element;
    }
    update = function () {
        this.element.style.transform = `rotate(${this.rotate}deg)`;
    }
}

let updateInterval;

addEventListener("load", (event) => {
    circleBoxRed = new CircleBox(document.getElementById("circle-box-red"));
    circleBoxGreen = new CircleBox(document.getElementById("circle-box-green"));
    circleBoxBlue = new CircleBox(document.getElementById("circle-box-blue"));
    if (isMobileDevice()) {
        console.log("Setting up for mobile device");
        let modeContainer = document.getElementById("mode-container");
        modeContainer.classList.remove("hidden");
        let modeSelectContainer = document.getElementById("mode-select-container");
        modeSelectContainer.addEventListener("click", handleSwitchClick);
        let touchModeIcon = document.getElementById("touch-mode-icon");
        touchModeIcon.addEventListener("click", switchToTouchMode);
        let orientationModeIcon = document.getElementById("orientation-mode-icon");
        orientationModeIcon.addEventListener("click", switchToOrientationMode);
        switchToTouchMode();
    }
    else {
        console.log("Setting up for desktop");
        addEventListener("mousemove", handleMouseMove);
        addUpdateInterval();
    }
});

function addUpdateInterval() {
    updateInterval = setInterval(() => {
        updateCircleBoxes(previousRotateValue, 0.2);
    }, 10);
}

function removeUpdateInterval() {
    clearInterval(updateInterval);
}

function onDeviceOrientationModeClick() {
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        // Handle iOS 13+ devices.
        DeviceOrientationEvent.requestPermission()
            .then((state) => {
                if (state === 'granted') {
                    window.addEventListener('deviceorientation', handleOrientation);
                } else {
                    switchToTouchMode();
                }
            })
            .catch(console.error);
    } else {
        // Handle regular non iOS 13+ devices.
        window.addEventListener('deviceorientation', handleOrientation);
    }
}

function handleOrientation(event) {
    console.log("Handling orientation");
    window.requestAnimationFrame(() => {
        updateCircleBoxes(event.gamma);
    });
}

function handleMouseMove(event) {
    handleXChange(event.clientX);
}

function handleTouch(event) {
    handleXChange(event.touches[0].clientX);
}

function handleSwitchClick() {
    let changeToMode = currentMode === "touch" ? "orientation" : "touch";
    if (changeToMode === "touch") {
        switchToTouchMode();
    }
    else {
        switchToOrientationMode();
    }
}

function switchToOrientationMode() {
    switchMode("orientation");
    removeUpdateInterval();
    window.removeEventListener("touchmove", handleTouch);
    window.removeEventListener("touchstart", handleTouch);
    onDeviceOrientationModeClick();

}

function switchToTouchMode() {
    switchMode("touch");
    window.removeEventListener('deviceorientation', handleOrientation);
    window.addEventListener("touchmove", handleTouch);
    window.addEventListener("touchstart", handleTouch);
    addUpdateInterval();
}

function switchMode(mode) {
    currentMode = mode;
    let modeSelectContainer = document.getElementById("mode-select-container");
    if (mode === "orientation") {
        modeSelectContainer.classList.add("orientation-active");
        modeSelectContainer.classList.remove("touch-active");
    }
    else {
        modeSelectContainer.classList.add("touch-active");
        modeSelectContainer.classList.remove("orientation-active");
    }
}

function handleXChange(x) {
    let width = window.innerWidth;
    let rotateValue = (x / width) * 180 - 90;
    previousRotateValue = rotateValue;
    updateCircleBoxes(rotateValue, 0.2);
}

function updateCircleBoxes(newRotateValue, lerpFactor = 1) {
    circleBoxRed.rotate = lerp(circleBoxRed.rotate, newRotateValue, 0.1 * lerpFactor);
    circleBoxGreen.rotate = lerp(circleBoxGreen.rotate, newRotateValue, 0.2 * lerpFactor);
    circleBoxBlue.rotate = lerp(circleBoxBlue.rotate, newRotateValue, 0.4 * lerpFactor);
    circleBoxRed.update();
    circleBoxGreen.update();
    circleBoxBlue.update();
}

function lerp(start, end, amt) {
    return (1 - amt) * start + amt * end;
}