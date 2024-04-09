let activeColorCombo = "color-combo-1";
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
    activeColorCombo = combo;
    let colorPickerCircleActive = document.getElementById("color-picker-circle-active");
    colorPickerCircleActive.classList.remove(colorPickerCircleActive.classList[1]);
    colorPickerCircleActive.classList.add(combo);

    let alternatingCircleBoxes = document.getElementsByClassName("alternating-circles-box");
    for (let circleBox of alternatingCircleBoxes) {
        circleBox.classList.remove("rgb");
        circleBox.classList.remove("cmy");
        circleBox.classList.remove("ppy");
        if (combo === "color-combo-1") {
            circleBox.classList.add("cmy");
        }
        else if (combo === "color-combo-2") {
            circleBox.classList.add("rgb");
        }
        else if (combo === "color-combo-3") {
            circleBox.classList.add("ppy");
        }
    }
    let gradientCircles = document.getElementsByClassName('gradient-circle');
    for (let gradientCircle of gradientCircles) {
        gradientCircle.classList.remove("gradient-circle-cmy");
        gradientCircle.classList.remove("gradient-circle-rgb");
        gradientCircle.classList.remove("gradient-circle-ppy");
        if (combo === "color-combo-1") {
            gradientCircle.classList.add("gradient-circle-cmy");
        }
        else if (combo === "color-combo-2") {
            gradientCircle.classList.add("gradient-circle-rgb");
        }
        else if (combo === "color-combo-3") {
            gradientCircle.classList.add("gradient-circle-ppy");
        }
    }
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
        let pendulumContainer = document.getElementById("pendulum-container");
        pendulumContainer.addEventListener("mousemove", handlePendulumMouseMove);
        addUpdateInterval();
    }

    setTimeout(function () {
        addCircleInterval = setInterval(addInitialCirclesInterval, 200);
    }, 500);
    let addButton = document.getElementById("add-button");
    addButton.addEventListener("click", addCircleToContainer);
    let removeButton = document.getElementById("remove-button");
    removeButton.addEventListener("click", removeCircleFromContainer);

    let gradientCircles = document.getElementsByClassName('gradient-circle');
    let gradientCirclesArray = Array.from(gradientCircles);
    gradientCirclesArray = gradientCirclesArray.reverse();
    for (let gradientCirle of gradientCircles) {
        gradientCircleCollection.push(new GradientCircle(gradientCirle));
    }
    setInterval(updateGradientCircles, 10)
    let radialSlider = document.getElementById('radial-slider');
    radialSlider.addEventListener('mousedown', function (event) {
        isDraggingRadialSlider = true;
    });
    radialSlider.addEventListener('touchstart', function (event) {
        isDraggingRadialSlider = true;
    });
    document.addEventListener('mouseup', function (event) {
        isDraggingRadialSlider = false;
    });
    document.addEventListener('mouseup', function (event) {
        isDraggingRadialSlider = false;
    });
    radialSlider.addEventListener('mousemove', onDragSlider);
    radialSlider.addEventListener('touchmove', onDragSlider);
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
    window.requestAnimationFrame(() => {
        updateCircleBoxes(event.gamma);
    });
}

function handlePendulumMouseMove(event) {
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
    let pendulumContainer = document.getElementById("pendulum-container");
    pendulumContainer.removeEventListener("touchmove", handleTouch);
    pendulumContainer.removeEventListener("touchstart", handleTouch);
    onDeviceOrientationModeClick();

}

function switchToTouchMode() {
    switchMode("touch");
    window.removeEventListener('deviceorientation', handleOrientation);
    let pendulumContainer = document.getElementById("pendulum-container");
    pendulumContainer.addEventListener("touchmove", handleTouch);
    pendulumContainer.addEventListener("touchstart", handleTouch);
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
    let pendulumContainer = document.getElementById("pendulum-container");
    let pendulumContainerBoundingRect = pendulumContainer.getBoundingClientRect();
    let width = pendulumContainerBoundingRect.width;
    x = x - pendulumContainerBoundingRect.left
    console.log(width)
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

let currentBgColor = "circle-bg-color-1";
let circleCount = 0;
let maxCircleCount = 3;
let addCircleInterval;
window.onload = function () {

}

function addCircleToContainer() {
    let alternatingCirclesContainer = document.getElementById("alternating-circles-container");
    let firstCircle = document.createElement("div");
    firstCircle.classList.add("alternating-circles-box", getColorModeFromActiveColorCombo(), currentBgColor);
    alternatingCirclesContainer.appendChild(firstCircle);
    nextBgColor();
}

function getColorModeFromActiveColorCombo() {
    if (activeColorCombo === "color-combo-1") {
        return "cmy";
    }
    else if (activeColorCombo === "color-combo-2") {
        return "rgb";
    }
    else if (activeColorCombo === "color-combo-3") {
        return "ppy";
    }
}

function removeCircleFromContainer() {
    let alternatingCirclesContainer = document.getElementById("alternating-circles-container");
    if (alternatingCirclesContainer.childElementCount > 0) {
        alternatingCirclesContainer.removeChild(alternatingCirclesContainer.lastChild);
    }
}

function addInitialCirclesInterval() {
    addCircleToContainer();
    circleCount++;
    if (circleCount >= maxCircleCount) {
        clearInterval(addCircleInterval);
    }
}

function nextBgColor() {
    if (currentBgColor === "circle-bg-color-1") {
        currentBgColor = "circle-bg-color-2";
    } else if (currentBgColor === "circle-bg-color-2") {
        currentBgColor = "circle-bg-color-3";
    }
    else if (currentBgColor === "circle-bg-color-3") {
        currentBgColor = "circle-bg-color-1";
    }
}


let previousGradientRotation = 0;
let previousGradientRotationTotal = 0;
let gradientCircleCollection = [];
let isDraggingRadialSlider = false;

function onDragSlider(event) {
    if (isDraggingRadialSlider) {
        let angle,
            centerX,
            centerY,
            radialSlider,
            deltaX,
            deltaY,
            positionX,
            positionY,
            touch,
            boundingRect;
        radialSlider = document.getElementById('radial-slider');
        touch = void 0;
        if (event.touches) {
            touch = event.touches[0];
        }
        boundingRect = radialSlider.getBoundingClientRect();
        centerX = (boundingRect.width * 0.5);
        centerY = (boundingRect.height * 0.5);
        positionX = (event.offsetX || (touch && touch.offsetX));
        positionY = (event.offsetY || (touch && touch.offsetY));
        if (positionX === undefined || positionY === undefined) {
            return;
        }
        console.log(`position: ${positionX}, ${positionY}, center: ${centerX}, ${centerY}`)
        deltaY = centerY - positionY;
        deltaX = centerX - positionX;
        // Calculate Angle between circle center and mouse position
        angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
        angle -= 90;
        if (angle < 0) {
            angle = 360 + angle; // Always show angle positive
        }
        angle = Math.round(angle);
        onRotationChanged(angle);
        let radialSliderHandle = document.getElementById("radial-slider-handle");
        radialSliderHandle.style.rotate = `${angle}deg`;
    }
}

function onRotationChanged(rotation) {
    let differenceToPrevious = rotation - previousGradientRotation;
    if (differenceToPrevious > 300) {
        differenceToPrevious = 360 - differenceToPrevious;
    }
    else if (differenceToPrevious < -300) {
        differenceToPrevious = 360 + differenceToPrevious;
    }
    previousGradientRotation = rotation;
    previousGradientRotationTotal += differenceToPrevious;
}

function updateGradientCircles() {
    for (let i = 0; i < gradientCircleCollection.length; i++) {
        gradientCircleCollection[i].rotation = lerp(gradientCircleCollection[i].rotation, previousGradientRotationTotal, (i + 1) * 0.01);
        gradientCircleCollection[i].update();
    }
}

function lerp(start, end, amt) {
    return (1 - amt) * start + amt * end;
}

class GradientCircle {
    element;
    rotation = 0;
    constructor(element) {
        this.element = element;
    }
    update() {
        this.element.style.rotate = `${this.rotation}deg`;
    }
}