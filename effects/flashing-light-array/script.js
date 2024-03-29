class LightSettings {
    id;
    element;
        constructor(animationName = "flashing-light", delay = 0, iterationCount = 0, state = "paused", duration = 1) {
        this.delay = delay;
        this.iterationCount = iterationCount;
        this.state = state;
        this.duration = duration;
        this.animationName = animationName;
    }
    apply() {
        this.element.style.animationIterationCount = `${this.iterationCount}`;
        this.element.style.animationDelay = `${this.delay}s`
        this.element.style.animationDuration = `${this.duration}s`;
        this.element.style.animationPlayState = this.state;
        this.element.style.animationName = this.animationName;
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
            flashingLight.classList.add("light", "absolute-center");
            flashingLight.addEventListener("animationend", function (event) {
                resetAnimation(event, flashingLight);
            });
            flashingLightContainer.appendChild(flashingLight);
            lightContainer.appendChild(flashingLightContainer);
            lightColumn.element = flashingLight;
            lightColumnIndex++;
        }
        lightRowIndex++;
    }
    setTimeout(() => {
        alternating(1, .1);
        // topLeftToBottomRight();
        // setTimeout(() => {
        //     topLeftToBottomRight();
        // }, 2000);
    }, 2000);
}
function resetAnimation(event, element) {
    if (!element.style.animationDelay || !element.style.animationDuration)
        return;
    const animationDelay = parseFloat(element.style.animationDelay.slice(0, element.style.animationDelay.length - 1));
    const animationDuration = parseFloat(element.style.animationDuration.slice(0, element.style.animationDuration.length - 1));
    const durationItShouldHaveTakenInSeconds = animationDelay + animationDuration;
    setTimeout(() => {
        element.style.removeProperty("animation-iteration-count");
        element.style.removeProperty("animation-delay");
        element.style.removeProperty("animation-duration");
        element.style.removeProperty("animation-play-state");
        element.style.removeProperty("animation-name");
    }, durationItShouldHaveTakenInSeconds * 1000);
}

function topLeftToBottomRight() {
    selectRows(true, "1", .1, .1, true, .05);
    selectRows(false, "1", .1, .1, true, .05);
}

function applyLightState() {
    for (let lightRow of lightState) {
        for (let lightColumn of lightRow) {
            lightColumn.apply();
        }
    }
}


function selectRows(even, iterationCount, duration, delay = 0, delayBasedOnIndex = false, delayMultiplier = 1, animationName = "flashing-light") {
    for (let lightRowIndex = 0; lightRowIndex < lightState.length; lightRowIndex++) {
        for (let lightColumnIndex = 0; lightColumnIndex < lightState[lightRowIndex].length; lightColumnIndex++) {
            if ((even && lightRowIndex % 2 == 0) || !even && lightRowIndex % 2 == 1) {
                lightState[lightRowIndex][lightColumnIndex].iterationCount = iterationCount;
                lightState[lightRowIndex][lightColumnIndex].duration = duration;
                lightState[lightRowIndex][lightColumnIndex].state = "running";
                if (delay > 0) {
                    if (delayBasedOnIndex) {
                        lightState[lightRowIndex][lightColumnIndex].delay = (delay + lightRowIndex + lightColumnIndex + 1) * delayMultiplier;
                    }
                    else {
                        lightState[lightRowIndex][lightColumnIndex].delay = delay;
                    }
                }
            }
        }
    }
    applyLightState();
}

function alternating(iterationCount, duration, delay = 0, delayBasedOnIndex = false, animationName = "flashing-light") {
    for (let lightRowIndex = 0; lightRowIndex < lightState.length; lightRowIndex++) {
        for (let lightColumnIndex = 0; lightColumnIndex < lightState[lightRowIndex].length; lightColumnIndex++) {
            lightState[lightRowIndex][lightColumnIndex].iterationCount = iterationCount;
            lightState[lightRowIndex][lightColumnIndex].duration = duration;
            lightState[lightRowIndex][lightColumnIndex].animationName = animationName;
            lightState[lightRowIndex][lightColumnIndex].state = "running";

            if (lightRowIndex % 2 == 0) {
                if (lightColumnIndex % 2 == 1) {
                    lightState[lightRowIndex][lightColumnIndex].iterationCount = 0;
                }
            }
            else {
                if (lightColumnIndex % 2 == 0) {
                    lightState[lightRowIndex][lightColumnIndex].iterationCount = 0;
                }

            }
        }
    }
    applyLightState();
}