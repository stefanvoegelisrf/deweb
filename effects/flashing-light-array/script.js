class LightSettings {
    id;
    constructor(delay = 0, iterationCount = 0, state = "paused", duration = 1) {
        this.delay = delay;
        this.iterationCount = iterationCount;
        this.state = state;
        this.duration = duration;
    }
}
let lightState = [
    [new LightSettings(), new LightSettings(), new LightSettings(), new LightSettings(), new LightSettings(), new LightSettings(), new LightSettings(), new LightSettings(), new LightSettings(), new LightSettings()],
    [new LightSettings(), new LightSettings(), new LightSettings(), new LightSettings(), new LightSettings(), new LightSettings(), new LightSettings(), new LightSettings(), new LightSettings(), new LightSettings()],
    [new LightSettings(), new LightSettings(), new LightSettings(), new LightSettings(), new LightSettings(), new LightSettings(), new LightSettings(), new LightSettings(), new LightSettings(), new LightSettings()],
    [new LightSettings(), new LightSettings(), new LightSettings(), new LightSettings(), new LightSettings(), new LightSettings(), new LightSettings(), new LightSettings(), new LightSettings(), new LightSettings()],
    [new LightSettings(), new LightSettings(), new LightSettings(), new LightSettings(), new LightSettings(), new LightSettings(), new LightSettings(), new LightSettings(), new LightSettings(), new LightSettings()],
    [new LightSettings(), new LightSettings(), new LightSettings(), new LightSettings(), new LightSettings(), new LightSettings(), new LightSettings(), new LightSettings(), new LightSettings(), new LightSettings()],
    [new LightSettings(), new LightSettings(), new LightSettings(), new LightSettings(), new LightSettings(), new LightSettings(), new LightSettings(), new LightSettings(), new LightSettings(), new LightSettings()],
    [new LightSettings(), new LightSettings(), new LightSettings(), new LightSettings(), new LightSettings(), new LightSettings(), new LightSettings(), new LightSettings(), new LightSettings(), new LightSettings()],
    [new LightSettings(), new LightSettings(), new LightSettings(), new LightSettings(), new LightSettings(), new LightSettings(), new LightSettings(), new LightSettings(), new LightSettings(), new LightSettings()],
    [new LightSettings(), new LightSettings(), new LightSettings(), new LightSettings(), new LightSettings(), new LightSettings(), new LightSettings(), new LightSettings(), new LightSettings(), new LightSettings()]
];

window.onload = function () {
    const lightContainer = document.getElementById("light-container");
    let lightRowIndex = 0;
    for (let lightRow of lightState) {
        let lightColumnIndex = 0;
        for (let lightColumn of lightRow) {
            const flashingLightContainer = document.createElement("div");
            lightColumn.id = `flashing-light-${lightRowIndex}-${lightColumnIndex}`;
            flashingLightContainer.id = lightColumn.id;
            flashingLightContainer.classList.add("flashing-light-container");
            const flashingLight = document.createElement("div");
            flashingLight.classList.add("flashing-light", "absolute-center");
            flashingLightContainer.appendChild(flashingLight);
            lightContainer.appendChild(flashingLightContainer);
            lightColumnIndex++;
        }
        lightRowIndex++;
    }
    applyLightState();
    setTimeout(() => {
        evenRows("infinite", .2);
    }, 2000);
}

function applyLightState() {
    console.log("Applying light state");
    for (let lightRow of lightState) {
        for (let lightColumn of lightRow) {
            const flashingLightContainer = document.getElementById(lightColumn.id);
            const flashingLight = flashingLightContainer.querySelector(".flashing-light");
            flashingLight.style.animationIterationCount = `${lightColumn.iterationCount}`;
            flashingLight.style.animationDelay = `${lightColumn.delay}s`
            flashingLight.style.animationPlayState = lightColumn.state;
            flashingLight.style.animationDuration = `${lightColumn.duration}s`;
        }
    }
}

function evenRows(iterationCount, duration) {
    for (let lightRowIndex = 0; lightRowIndex < lightState.length; lightRowIndex++) {
        for (let lightColumnIndex = 0; lightColumnIndex < lightState[lightRowIndex].length; lightColumnIndex++) {
            if (lightRowIndex % 2 == 0) {
                lightState[lightRowIndex][lightColumnIndex].iterationCount = iterationCount;
                lightState[lightRowIndex][lightColumnIndex].duration = duration;
                lightState[lightRowIndex][lightColumnIndex].state = "running";
            }
        }
    }
    applyLightState();
}