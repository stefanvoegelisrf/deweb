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
        const container = document.getElementById(containerId);
        container.style.display = "grid";
        container.style.gridTemplateColumns = `repeat(${arrayColumns}, 1fr)`;
        container.style.gridTemplateRows = `repeat(${arrayRows}, 1fr)`;
        for (let lightRowIndex = 0; lightRowIndex < arrayRows; lightRowIndex++) {
            this.state[lightRowIndex] = [];
            for (let lightColumnIndex = 0; lightColumnIndex < arrayColumns; lightColumnIndex++) {
                const lightContainer = document.createElement("div");
                lightContainer.id = `light-${lightRowIndex}-${lightColumnIndex}`;
                lightContainer.classList.add("light-container");
                const light = document.createElement("div");
                light.classList.add("light", "absolute-center");
                lightContainer.appendChild(light);
                container.appendChild(lightContainer);
                this.state[lightRowIndex].push(new LightSettings(light));
                light.addEventListener("animationend", this.state[lightRowIndex][lightColumnIndex].reset.bind(this.state[lightRowIndex][lightColumnIndex]));
            }
        }
    }
    selectRowsFromBeginning(even, iterationCount, duration, animationName, delay = 0, delayBasedOnIndex = false, delayMultiplier = 1,) {
        let rest = even ? 0 : 1;
        for (let lightRowIndex = 0; lightRowIndex < this.state.length; lightRowIndex++) {
            for (let lightColumnIndex = 0; lightColumnIndex < this.state[lightRowIndex].length; lightColumnIndex++) {
                if ((lightRowIndex + 1) % 2 == rest) {
                    if (delayBasedOnIndex) {
                        delay = (delay + lightRowIndex + lightColumnIndex + 1) * delayMultiplier;
                    }
                    this.state[lightRowIndex][lightColumnIndex].trigger(iterationCount, duration, delay, animationName);
                }
            }
        }
    }
    alternating(even, iterationCount, duration, animationName, delay = 0, delayBasedOnIndex = false) {
        let rest = even ? 0 : 1;
        for (let lightRowIndex = 0; lightRowIndex < this.state.length; lightRowIndex++) {
            for (let lightColumnIndex = 0; lightColumnIndex < this.state[lightRowIndex].length; lightColumnIndex++) {
                if (delayBasedOnIndex) {
                    delay = (delay + lightRowIndex + lightColumnIndex + 1) * delayMultiplier;
                }
                if ((lightColumnIndex + 1) % 2 == rest) {
                    this.state[lightRowIndex][lightColumnIndex].trigger(iterationCount, duration, delay, animationName);
                }
            }
        }
    }
}
let lightArray;

window.onload = function () {
    lightArray = new LightArray("container", 10, 10);
    console.log(lightArray);

    setInterval(() => {
        lightArray.alternating(false, 5, .1, "flashing-light-cyan");
        lightArray.alternating(true, 5, .1, "flashing-light-magenta");
        setTimeout(() => {
            topLeftToBottomRight();
            setTimeout(() => {
                topLeftToBottomRight();
            }, 1000);
        }, 1000);
    }, 5000);
}

function topLeftToBottomRight() {
    lightArray.selectRowsFromBeginning(true, "1", .1, "flashing-light-magenta", .1, true, .05,);
    lightArray.selectRowsFromBeginning(false, "1", .1, "flashing-light-cyan", .1, true, .05);
}