let currentBgColor = "circle-bg-color-1";
let circleCount = 0;
let maxCircleCount = 18;
let addCircleInterval;
window.onload = function () {
    setTimeout(function () {
        addCircleInterval = setInterval(addInitialCirclesInterval, 200);
    }, 500);
    let addButton = document.getElementById("add-button");
    addButton.addEventListener("click", addCircleToContainer);
    let removeButton = document.getElementById("remove-button");
    removeButton.addEventListener("click", removeCircleFromContainer);
}

function addCircleToContainer() {
    let alternatingCirclesContainer = document.getElementById("alternating-circles-container");
    let firstCircle = document.createElement("div");
    firstCircle.classList.add("alternating-circles-box", "rgb", currentBgColor);
    alternatingCirclesContainer.appendChild(firstCircle);
    nextBgColor();
}

function removeCircleFromContainer() {
    let alternatingCirclesContainer = document.getElementById("alternating-circles-container");
    if (alternatingCirclesContainer.childElementCount > 0) {
        alternatingCirclesContainer.removeChild(alternatingCirclesContainer.lastChild);
    }
}

function addInitialCirclesInterval() {
    addCircleToContainer();
    circleCount++;
    if (circleCount >= maxCircleCount) {
        clearInterval(addCircleInterval);
    }
}

function nextBgColor() {
    if (currentBgColor === "circle-bg-color-1") {
        currentBgColor = "circle-bg-color-2";
    } else if (currentBgColor === "circle-bg-color-2") {
        currentBgColor = "circle-bg-color-3";
    }
    else if (currentBgColor === "circle-bg-color-3") {
        currentBgColor = "circle-bg-color-1";
    }
}
