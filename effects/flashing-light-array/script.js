class LightSettings {
    id;
    element;
    trigger(iterationCount, duration, delay = 0, animationName = "flashing-light") {
        setTimeout(() => {
            this.element.style.animationIterationCount = `${iterationCount}`;
            this.element.style.animationDuration = `${duration}s`;
            this.element.style.animationName = animationName;
        }, delay * 1000);
    }
    reset() {
        this.element.style.removeProperty("animation-iteration-count");
        this.element.style.removeProperty("animation-duration");
        this.element.style.removeProperty("animation-name");
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
    constructor(containerId = "light-container") {
        const lightContainer = document.getElementById(containerId);
        let lightRowIndex = 0;
        for (let lightRow of this.state) {
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
    }
}
let lightArray;

window.onload = function () {
    lightArray = new LightArray();

    setTimeout(() => {
        alternating(5, .1);
        setTimeout(() => {
            topLeftToBottomRight();
            setTimeout(() => {
                topLeftToBottomRight();
            }, 1000);
        }, 1000);
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
                if (delayBasedOnIndex) {
                    delay = (delay + lightRowIndex + lightColumnIndex + 1) * delayMultiplier;
                }
                lightArray.state[lightRowIndex][lightColumnIndex].trigger(iterationCount, duration, delay, animationName);
            }
        }
    }
}

function alternating(iterationCount, duration, delay = 0, delayBasedOnIndex = false, animationName = "flashing-light") {
    for (let lightRowIndex = 0; lightRowIndex < lightArray.state.length; lightRowIndex++) {
        for (let lightColumnIndex = 0; lightColumnIndex < lightArray.state[lightRowIndex].length; lightColumnIndex++) {
            if (delayBasedOnIndex) {
                lightArray.state[lightRowIndex][lightColumnIndex].delay = (delay + lightRowIndex + lightColumnIndex + 1) * delayMultiplier;
            }
            if (lightRowIndex % 2 == 0) {
                if (lightColumnIndex % 2 == 0) {
                    lightArray.state[lightRowIndex][lightColumnIndex].trigger(iterationCount, duration, delay, animationName);
                }
            }
            else {
                if (lightColumnIndex % 2 == 1) {
                    lightArray.state[lightRowIndex][lightColumnIndex].trigger(iterationCount, duration, delay, animationName);
                }
            }
        }
    }
}