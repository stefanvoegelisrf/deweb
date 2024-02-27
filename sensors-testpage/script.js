addEventListener("load", (event) => {
    let deviceMotionAvailable = document.getElementById("device-motion-available");
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
        // Handle iOS 13+ devices.
        DeviceMotionEvent.requestPermission()
            .then((state) => {
                if (state === 'granted') {
                    window.addEventListener('devicemotion', handleOrientation);
                } else {
                    deviceMotionAvailable.innerHTML = "Request to access the orientation was rejected";
                }
            })
            .catch(console.error);
    } else {
        // Handle regular non iOS 13+ devices.
        deviceMotionAvailable.innerHTML = "DeviceMotion is available";
        window.addEventListener('devicemotion', handleOrientation);
    }
});



addEventListener("devicemotion", (event) => {
    let accelerationSpan = document.getElementById("acceleration");
    accelerationSpan.innerHTML = `x: ${event.acceleration.x} y: ${event.acceleration.y} z: ${event.acceleration.z}`;
});