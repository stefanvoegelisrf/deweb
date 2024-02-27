addEventListener("load", (event) => {
    let deviceMotionButton = document.getElementById("device-motion-button");
    deviceMotionButton.addEventListener("click", onDeviceMotionButtonClick);
    let deviceOrientationButton = document.getElementById("device-orientation-button");
    deviceOrientationButton.addEventListener("click", onDeviceOrientationButtonClick);
});

function onDeviceMotionButtonClick() {
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
        // Handle iOS 13+ devices.
        DeviceMotionEvent.requestPermission()
            .then((state) => {
                if (state === 'granted') {
                    window.addEventListener('devicemotion', handleMotion);
                } else {
                    console.error('Request to access the motion was rejected');
                }
            })
            .catch(console.error);
    } else {
        // Handle regular non iOS 13+ devices.
        window.addEventListener('devicemotion', handleMotion);
    }
}

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

function handleMotion(event) {
    let x = document.getElementById("x");
    let xg = document.getElementById("xg");
    let y = document.getElementById("y");
    let yg = document.getElementById("yg");
    let z = document.getElementById("z");
    let zg = document.getElementById("zg");
    if (event.acceleration === null || event.accelerationIncludingGravity === null) {
        x.innerHTML = "N/A";
        xg.innerHTML = "N/A";
        y.innerHTML = "N/A";
        yg.innerHTML = "N/A";
        z.innerHTML = "N/A";
        zg.innerHTML = "N/A";
        return;
    }
    let decimalPlacesValue = getDecimalPlaces();

    if (event.acceleration.x === null) {
        x.innerHTML = "N/A";
    }
    else {
        x.innerHTML = event.acceleration.x.toFixed(decimalPlacesValue);
    }
    if (event.accelerationIncludingGravity.x === null) {
        xg.innerHTML = "N/A";
    }
    else {
        xg.innerHTML = event.accelerationIncludingGravity.x.toFixed(decimalPlacesValue);
    }
    if (event.acceleration.y === null) {
        y.innerHTML = "N/A";
    }
    else {
        y.innerHTML = event.acceleration.y.toFixed(decimalPlacesValue);
    }
    if (event.accelerationIncludingGravity.y === null) {
        yg.innerHTML = "N/A";
    }
    else {
        yg.innerHTML = event.accelerationIncludingGravity.y.toFixed(decimalPlacesValue);
    }
    if (event.acceleration.z === null) {
        z.innerHTML = "N/A";
    }
    else {
        z.innerHTML = event.acceleration.z.toFixed(decimalPlacesValue);
    }
    if (event.accelerationIncludingGravity.z === null) {
        zg.innerHTML = "N/A";
    }
    else {
        zg.innerHTML = event.accelerationIncludingGravity.z.toFixed(decimalPlacesValue);
    }
}

function getDecimalPlaces() {
    let decimalPlacesElement = document.getElementById("decimal-places");
    return parseInt(decimalPlacesElement.value);
}


function handleOrientation(event) {
    let alpha = document.getElementById("alpha");
    let alphaNormalized = document.getElementById("alpha-normalized");
    let beta = document.getElementById("beta");
    let betaNormalized = document.getElementById("beta-normalized");
    let gamma = document.getElementById("gamma");
    let gammaNormalized = document.getElementById("gamma-normalized");
    if (event.alpha === null || event.beta === null || event.gamma === null) {
        alpha.innerHTML = "N/A";
        alphaNormalized.innerHTML = "N/A";
        beta.innerHTML = "N/A";
        betaNormalized.innerHTML = "N/A";
        gamma.innerHTML = "N/A";
        gammaNormalized.innerHTML = "N/A";
        return;
    }
    let decimalPlacesValue = getDecimalPlaces();
    alpha.innerHTML = event.alpha.toFixed(decimalPlacesValue);
    alphaNormalized.innerHTML = normalizeAngleToZeroOne(event.alpha).toFixed(decimalPlacesValue);
    beta.innerHTML = event.beta.toFixed(decimalPlacesValue);
    betaNormalized.innerHTML = normalizeAngleToZeroOne(event.beta).toFixed(decimalPlacesValue);
    gamma.innerHTML = event.gamma.toFixed(decimalPlacesValue);
    gammaNormalized.innerHTML = normalizeAngleToZeroOne(event.gamma).toFixed(decimalPlacesValue);
}

function normalizeAngleToZeroOne(angle) {
    // Reduce the angle to be between -360 and 360
    angle = angle % 360;
    // Force it to be the positive remainder, so that -360 <= angle < 360
    angle = (angle + 360) % 360;
    // Normalize to the range [0, 1]
    const normalizedValue = (angle + 360) % 360 / 360;
    return normalizedValue;
}