class LightSettings {
    id;
    element;
    constructor(element) {
        this.element = element;
    }
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
    constructor(containerId, arrayRows = 10, arrayColumns = 10) {
        this.state = [];
        const lightContainer = document.getElementById(containerId);
        lightContainer.style.display = "grid";
        lightContainer.style.gridTemplateColumns = `repeat(${arrayColumns}, 1fr)`;
        lightContainer.style.gridTemplateRows = `repeat(${arrayRows}, 1fr)`;
        for (let lightRowIndex = 0; lightRowIndex < arrayRows; lightRowIndex++) {
            this.state[lightRowIndex] = [];
            for (let lightColumnIndex = 0; lightColumnIndex < arrayColumns; lightColumnIndex++) {
                const flashingLightContainer = document.createElement("div");
                flashingLightContainer.id = `flashing-light-${lightRowIndex}-${lightColumnIndex}`;
                flashingLightContainer.classList.add("flashing-light-container");
                const flashingLight = document.createElement("div");
                flashingLight.classList.add("light", "absolute-center");
                flashingLightContainer.appendChild(flashingLight);
                lightContainer.appendChild(flashingLightContainer);
                this.state[lightRowIndex].push(new LightSettings(flashingLight));
                flashingLight.addEventListener("animationend", this.state[lightRowIndex][lightColumnIndex].reset.bind(this.state[lightRowIndex][lightColumnIndex]));
            }
        }
    }
}
let lightArray;

window.onload = function () {
    lightArray = new LightArray("light-container", 10, 10);
    console.log(lightArray);

    setTimeout(() => {
        alternating(5, .1, "flashing-light");
        setTimeout(() => {
            topLeftToBottomRight();
            setTimeout(() => {
                topLeftToBottomRight();
            }, 1000);
        }, 1000);
    }, 1000);
}

function topLeftToBottomRight() {
    selectRows(true, "1", .1, "flashing-light", .1, true, .05,);
    selectRows(false, "1", .1, "flashing-light", .1, true, .05);
}

function selectRows(even, iterationCount, duration, animationName, delay = 0, delayBasedOnIndex = false, delayMultiplier = 1,) {
    for (let lightRowIndex = 0; lightRowIndex < lightArray.state.length; lightRowIndex++) {
        for (let lightColumnIndex = 0; lightColumnIndex < lightArray.state[lightRowIndex].length; lightColumnIndex++) {
            if ((even && lightRowIndex % 2 == 0) || (!even && lightRowIndex % 2 == 1)) {
                if (delayBasedOnIndex) {
                    delay = (delay + lightRowIndex + lightColumnIndex + 1) * delayMultiplier;
                }
                lightArray.state[lightRowIndex][lightColumnIndex].trigger(iterationCount, duration, delay, animationName);
            }
        }
    }
}

function alternating(iterationCount, duration, animationName, delay = 0, delayBasedOnIndex = false) {
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