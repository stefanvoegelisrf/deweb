addEventListener("devicemotion", (event) => {
    let accelerationSpan = document.getElementById("acceleration");
    accelerationSpan.innerHTML = `x: ${event.acceleration.x} y: ${event.acceleration.y} z: ${event.acceleration.z}`;
});