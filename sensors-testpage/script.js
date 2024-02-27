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
    x.innerHTML = event.acceleration.x;
    xg.innerHTML = event.accelerationIncludingGravity.x;
    y.innerHTML = event.acceleration.y;
    yg.innerHTML = event.accelerationIncludingGravity.y;
    z.innerHTML = event.acceleration.z;
    zg.innerHTML = event.accelerationIncludingGravity.z;
}

function handleOrientation(event) {
    let alpha= document.getElementById("alpha");
    let alphaNormalized = document.getElementById("alpha-normalized");
    let beta = document.getElementById("beta");
    let betaNormalized= document.getElementById("beta-normalized");
    let gamma = document.getElementById("gamma");
    let gammaNormalized = document.getElementById("gamma-normalized");
    alpha.innerHTML = event.alpha;
    alphaNormalized.innerHTML = normalizeAngleToZeroOne(event.alpha);
    beta.innerHTML = event.beta;
    betaNormalized.innerHTML = normalizeAngleToZeroOne(event.beta);
    gamma.innerHTML = event.gamma;
    gammaNormalized.innerHTML = normalizeAngleToZeroOne(event.gamma);
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