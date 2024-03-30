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
    reset() {
        const durationItShouldHaveTakenInSeconds = this.delay + this.duration;
        setTimeout(() => {
            this.element.style.removeProperty("animation-iteration-count");
            this.element.style.removeProperty("animation-delay");
            this.element.style.removeProperty("animation-duration");
            this.element.style.removeProperty("animation-play-state");
            this.element.style.removeProperty("animation-name");
        }, durationItShouldHaveTakenInSeconds * 1000);
    }
}

class LightArray {
    state = [
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
    applyLightState() {
        for (let lightRow of this.state) {
            for (let lightColumn of lightRow) {
                lightColumn.apply();
            }
        }
    }
}
let lightArray = new LightArray();

window.onload = function () {
    const lightContainer = document.getElementById("light-container");
    let lightRowIndex = 0;
    for (let lightRow of lightArray.state) {
        let lightColumnIndex = 0;
        for (let lightColumn of lightRow) {
            const flashingLightContainer = document.createElement("div");
            lightColumn.id = `flashing-light-${lightRowIndex}-${lightColumnIndex}`;
            flashingLightContainer.id = lightColumn.id;
            flashingLightContainer.classList.add("flashing-light-container");
            const flashingLight = document.createElement("div");
            flashingLight.classList.add("light", "absolute-center");
            flashingLight.addEventListener("animationend", function (event) {
                lightColumn.reset();
            });
            flashingLightContainer.appendChild(flashingLight);
            lightContainer.appendChild(flashingLightContainer);
            lightColumn.element = flashingLight;
            lightColumnIndex++;
        }
        lightRowIndex++;
    }

    setTimeout(() => {
        alternating(5, .1);
        setTimeout(() => {
            topLeftToBottomRight();
            setTimeout(() => {
                topLeftToBottomRight();
            }, 2000);
        }, 2000);
    }, 1000);
}

function topLeftToBottomRight() {
    selectRows(true, "1", .1, .1, true, .05);
    selectRows(false, "1", .1, .1, true, .05);
}

function selectRows(even, iterationCount, duration, delay = 0, delayBasedOnIndex = false, delayMultiplier = 1, animationName = "flashing-light") {
    for (let lightRowIndex = 0; lightRowIndex < lightArray.state.length; lightRowIndex++) {
        for (let lightColumnIndex = 0; lightColumnIndex < lightArray.state[lightRowIndex].length; lightColumnIndex++) {
            if ((even && lightRowIndex % 2 == 0) || !even && lightRowIndex % 2 == 1) {
                lightArray.state[lightRowIndex][lightColumnIndex].iterationCount = iterationCount;
                lightArray.state[lightRowIndex][lightColumnIndex].duration = duration;
                lightArray.state[lightRowIndex][lightColumnIndex].state = "running";
                if (delay > 0) {
                    if (delayBasedOnIndex) {
                        lightArray.state[lightRowIndex][lightColumnIndex].delay = (delay + lightRowIndex + lightColumnIndex + 1) * delayMultiplier;
                    }
                    else {
                        lightArray.state[lightRowIndex][lightColumnIndex].delay = delay;
                    }
                }
            }
        }
    }
    lightArray.applyLightState();
}

function alternating(iterationCount, duration, delay = 0, delayBasedOnIndex = false, animationName = "flashing-light") {
    for (let lightRowIndex = 0; lightRowIndex < lightArray.state.length; lightRowIndex++) {
        for (let lightColumnIndex = 0; lightColumnIndex < lightArray.state[lightRowIndex].length; lightColumnIndex++) {
            lightArray.state[lightRowIndex][lightColumnIndex].iterationCount = iterationCount;
            lightArray.state[lightRowIndex][lightColumnIndex].duration = duration;
            lightArray.state[lightRowIndex][lightColumnIndex].animationName = animationName;
            lightArray.state[lightRowIndex][lightColumnIndex].state = "running";
            if (delay > 0) {
                if (delayBasedOnIndex) {
                    lightArray.state[lightRowIndex][lightColumnIndex].delay = (delay + lightRowIndex + lightColumnIndex + 1) * delayMultiplier;
                }
                else {
                    lightArray.state[lightRowIndex][lightColumnIndex].delay = delay;
                }
            }

            if (lightRowIndex % 2 == 0) {
                if (lightColumnIndex % 2 == 1) {
                    lightArray.state[lightRowIndex][lightColumnIndex].iterationCount = 0;
                }
            }
            else {
                if (lightColumnIndex % 2 == 0) {
                    lightArray.state[lightRowIndex][lightColumnIndex].iterationCount = 0;
                }

            }
        }
    }
    lightArray.applyLightState();
}