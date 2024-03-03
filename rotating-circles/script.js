function changeToCMY() {
    changeClassesOfCircles("bg-magenta", "bg-cyan", "bg-yellow");
    changeActiveColorCombo("color-combo-1");
}

function changeToRGB() {
    changeClassesOfCircles("bg-blue", "bg-red", "bg-green");
    changeActiveColorCombo("color-combo-2");
}

function changeToPPY() {
    changeClassesOfCircles("bg-bright-pink", "bg-maximum-red-purple", "bg-vivid-yellow");
    changeActiveColorCombo("color-combo-3");
}

function changeActiveColorCombo(combo) {
    let colorPickerCircleActive = document.getElementById("color-picker-circle-active");
    colorPickerCircleActive.classList.remove(colorPickerCircleActive.classList[1]);
    colorPickerCircleActive.classList.add(combo);
}

function changeClassesOfCircles(circle1Class, circle2Class, circle3Class) {
    let circle1 = document.getElementById("circle1");
    let circle2 = document.getElementById("circle2");
    let circle3 = document.getElementById("circle3");
    let pendulumCircleBoxRed = document.getElementById("pendulum-circle-box-red").querySelector(".pendulum-circle");
    let pendulumCircleBoxGreen = document.getElementById("pendulum-circle-box-green").querySelector(".pendulum-circle");
    let pendulumCircleBoxBlue = document.getElementById("pendulum-circle-box-blue").querySelector(".pendulum-circle");
    pendulumCircleBoxRed.classList.remove(pendulumCircleBoxRed.classList[1]);
    pendulumCircleBoxRed.classList.add(circle1Class);
    pendulumCircleBoxGreen.classList.remove(pendulumCircleBoxGreen.classList[1]);
    pendulumCircleBoxGreen.classList.add(circle2Class);
    pendulumCircleBoxBlue.classList.remove(pendulumCircleBoxBlue.classList[1]);
    pendulumCircleBoxBlue.classList.add(circle3Class);
    circle1.classList.remove(circle1.classList[1]);
    circle1.classList.add(circle1Class);
    circle2.classList.remove(circle2.classList[1]);
    circle2.classList.add(circle2Class);
    circle3.classList.remove(circle3.classList[1]);
    circle3.classList.add(circle3Class);
}

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
    circleBoxRed = new CircleBox(document.getElementById("pendulum-circle-box-red"));
    circleBoxGreen = new CircleBox(document.getElementById("pendulum-circle-box-green"));
    circleBoxBlue = new CircleBox(document.getElementById("pendulum-circle-box-blue"));
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