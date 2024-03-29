window.onload = function () {
    const lightContainer = document.getElementById("light-container");
    for (let i = 0; i < 100; i++) {
        const flashingLightContainer = document.createElement("div");
        flashingLightContainer.classList.add("flashing-light-container");
        const flashingLight = document.createElement("div");
        flashingLight.classList.add("flashing-light", "absolute-center");
        flashingLight.style.animationDelay=`.0${i}s`;
        flashingLightContainer.appendChild(flashingLight);
        lightContainer.appendChild(flashingLightContainer);
    }
}