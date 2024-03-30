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
    selectRowsFromBeginning(even, iterationCount, duration, animationName, delay = 0, delayBasedOnIndex = false, delayMultiplier = 1) {
        let rest = even ? 0 : 1;
        for (let lightRowIndex = 0; lightRowIndex < this.state.length; lightRowIndex++) {
            for (let lightColumnIndex = 0; lightColumnIndex < this.state[lightRowIndex].length; lightColumnIndex++) {
                if ((lightRowIndex + 1) % 2 == rest) {
                    if (delayBasedOnIndex) {
                        delay = (delay + lightRowIndex + 1 + lightColumnIndex + 1) * delayMultiplier;
                    }
                    this.state[lightRowIndex][lightColumnIndex].trigger(iterationCount, duration, delay, animationName);
                }
            }
        }
    }

    selectRowsFromEnd(even, iterationCount, duration, animationName, delay = 0, delayBasedOnIndex = false, delayMultiplier = 1) {
        let rest = even ? 0 : 1;
        for (let lightRowIndex = this.state.length - 1; lightRowIndex >= 0; lightRowIndex--) {
            for (let lightColumnIndex = this.state[lightRowIndex].length - 1; lightColumnIndex >= 0; lightColumnIndex--) {
                if ((lightRowIndex + 1) % 2 == rest) {
                    if (delayBasedOnIndex) {
                        let mappedRowIndex = this.map(1, this.state.length, this.state.length, 1, lightRowIndex + 1);
                        let mappedColumnIndex = this.map(1, this.state[lightRowIndex].length, this.state[lightRowIndex].length, 1, lightColumnIndex + 1);
                        delay = (delay + mappedRowIndex + mappedColumnIndex) * delayMultiplier;
                    }
                    this.state[lightRowIndex][lightColumnIndex].trigger(iterationCount, duration, delay, animationName);
                }
            }
        }
    }
    selectFromTop(iterationCount, duration, animationName, delay = 0, delayBasedOnIndex = false, delayMultiplier = 1) {
        for (let lightRowIndex = 0; lightRowIndex < this.state.length; lightRowIndex++) {
            for (let lightColumnIndex = 0; lightColumnIndex < this.state[lightRowIndex].length; lightColumnIndex++) {
                if (delayBasedOnIndex) {
                    delay = (delay + lightRowIndex + 1) * delayMultiplier;
                }
                this.state[lightRowIndex][lightColumnIndex].trigger(iterationCount, duration, delay, animationName);
            }
        }
    }

    selectFromBottom(iterationCount, duration, animationName, delay = 0, delayBasedOnIndex = false, delayMultiplier = 1) {
        for (let lightRowIndex = this.state.length - 1; lightRowIndex >= 0; lightRowIndex--) {
            for (let lightColumnIndex = 0; lightColumnIndex < this.state[lightRowIndex].length; lightColumnIndex++) {
                if (delayBasedOnIndex) {
                    let mappedRowIndex = this.map(1, this.state.length, this.state.length, 1, lightRowIndex + 1);
                    delay = (delay + mappedRowIndex) * delayMultiplier;
                }
                this.state[lightRowIndex][lightColumnIndex].trigger(iterationCount, duration, delay, animationName);
            }
        }
    }

    alternating(even, iterationCount, duration, animationName, delay = 0, delayBasedOnIndex = false) {
        let rest = even ? 0 : 1;
        for (let lightRowIndex = 0; lightRowIndex < this.state.length; lightRowIndex++) {
            for (let lightColumnIndex = 0; lightColumnIndex < this.state[lightRowIndex].length; lightColumnIndex++) {
                if (delayBasedOnIndex) {
                    delay = (delay + lightRowIndex + 1 + lightColumnIndex + 1) * delayMultiplier;
                }
                if ((lightColumnIndex + 1) % 2 == rest) {
                    this.state[lightRowIndex][lightColumnIndex].trigger(iterationCount, duration, delay, animationName);
                }
            }
        }
    }

    map(previousStart, previousEnd, newStart, newEnd, value) {
        return newStart + (value - previousStart) * (newEnd - newStart) / (previousEnd - previousStart);
    }
}
let lightArray;

window.onload = function () {
    lightArray = new LightArray("container", 10, 10);

    setInterval(() => {
        lightArray.alternating(false, "5", .1, "flashing-light,light-cyan");
        lightArray.alternating(true, "5", .1, "flashing-light,light-magenta");
        setTimeout(() => {
            topLeftToBottomRight();
            setTimeout(() => {
                bottomRightToTopLeft();
                setTimeout(() => {
                    lightArray.selectFromTop("3", .1, "flashing-light,light-cyan", .1, true, .05);
                    lightArray.selectFromBottom("F", .1, "flashing-light,light-magenta", .1, true, .05);
                }, 1000)
            }, 1000);
        }, 1000)
    }, 5000);
    setTimeout(() => {
        lightArray.selectFromTop("3", .1, "flashing-light,light-cyan", .1, true, .05);
        lightArray.selectFromBottom("3", .1, "flashing-light,light-magenta", .1, true, .05);
        setTimeout(() => {
            lightArray.selectFromTop("3", .1, "flashing-light,light-cyan", .1, true, .05);
            lightArray.selectFromBottom("3", .1, "flashing-light,light-magenta", .1, true, .05);
            setTimeout(() => {
                lightArray.selectFromTop("3", .1, "flashing-light,light-cyan", .1, true, .05);
                lightArray.selectFromBottom("3", .1, "flashing-light,light-magenta", .1, true, .05);
                setTimeout(() => {
                    lightArray.selectFromTop("3", .1, "flashing-light,light-cyan", .1, true, .05);
                    lightArray.selectFromBottom("3", .1, "flashing-light,light-magenta", .1, true, .05);
                    setTimeout(() => {
                        lightArray.selectFromTop("3", .1, "flashing-light,light-cyan", .1, true, .05);
                        lightArray.selectFromBottom("3", .1, "flashing-light,light-magenta", .1, true, .05);
                        setTimeout(() => {
                            lightArray.selectFromTop("3", .1, "flashing-light,light-cyan", .1, true, .05);
                            lightArray.selectFromBottom("3", .1, "flashing-light,light-magenta", .1, true, .05);
                        }, 500)
                    }, 500)
                }, 1000)
            }, 500)
        }, 500)
    }, 500)
}

function topLeftToBottomRight() {
    lightArray.selectRowsFromBeginning(true, "2", .1, "flashing-light,light-magenta", .1, true, .05,);
    lightArray.selectRowsFromBeginning(false, "2", .1, "flashing-light,light-cyan", .1, true, .05);
}

function bottomRightToTopLeft() {
    lightArray.selectRowsFromEnd(true, "2", .1, "flashing-light,light-magenta", .1, true, .05);
    lightArray.selectRowsFromEnd(false, "2", .1, "flashing-light ,light-cyan", .1, true, .05);
}