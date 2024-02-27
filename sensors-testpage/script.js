addEventListener("load", (event) => {
    let deviceMotionAvailable = document.getElementById("device-motion-available");
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
        // Handle iOS 13+ devices.
        DeviceMotionEvent.requestPermission()
            .then((state) => {
                if (state === 'granted') {
                    window.addEventListener('devicemotion', handleMotion);
                } else {
                    deviceMotionAvailable.innerHTML = "Request to access the orientation was rejected";
                }
            })
            .catch(console.error);
    } else {
        // Handle regular non iOS 13+ devices.
        deviceMotionAvailable.innerHTML = "DeviceMotion is available";
        window.addEventListener('devicemotion', handleMotion);
    }

    window.addEventListener('deviceorientation', handleOrientation);
});

function handleMotion(event) {
    let accelerationSpan = document.getElementById("acceleration");
    console.log(event);
    accelerationSpan.innerHTML = `x: ${event.acceleration.x} y: ${event.acceleration.y} z: ${event.acceleration.z}`;
}

function handleOrientation(event){
    let orientationSpan = document.getElementById("orientation");
    orientationSpan.innerHTML = `alpha: ${event.alpha} beta: ${event.beta} gamma: ${event.gamma}`;
}