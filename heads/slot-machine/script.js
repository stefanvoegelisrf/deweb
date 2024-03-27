let heads = {
    "Akaul": "Akaul.svg",
    "Anumu": "Anumu.svg",
    "Bepec": "Bepec.svg",
    "Bopit": "Bopit.svg",
    "Capleb": "Capleb.svg",
    "Drihok": "Drihok.svg",
    "Eflubo": "Eflubo.svg",
    "Fytum": "Fytum.svg",
    "Gabuf": "Gabuf.svg",
    "Goiwiz": "Goiwiz.svg",
    "Krebar": "Krebar.svg",
    "Medeox": "Medeox.svg",
    "Mijous": "Mijous.svg",
    "Nedut": "Nedut.svg",
    "Ocraci": "Ocraci.svg",
    "Pocron": "Pocron.svg",
    "Rifrul": "Rifrul.svg",
    "Skidid": "Skidid.svg",
    "Tithiun": "Tithiun.svg",
    "Uthave": "Uthave.svg",
    "Vahax": "Vahax.svg",
    "Veehiad": "Veehiad.svg",
    "Wawear": "Wawear.svg",
    "Yeumoot": "Yeumoot.svg"
}

let isSlotMachineRunning = false;
let spins = 0;
let wins = 0;
let losses = 0;
let slotPositions = [null, null, null];
let won = false;
let numberOfHeads = Object.keys(heads).length;
let theta = 360 / numberOfHeads;

window.onload = function () {
    let container = createSlotWheel();
    const slotsContainer = document.getElementById("slots-container");
    for (let i = 1; i <= 3; i++) {
        let slot = container.cloneNode(true);
        slot.id = `slot-${i}`;
        slotsContainer.appendChild(slot);
    }

    document.getElementById("open-about").addEventListener("click", () => {
        showDialog("about-dialog");
    });
    document.getElementById("close-about").addEventListener("click", () => {
        closeDialog("about-dialog");
    });
    document.getElementById("close-win-dialog").addEventListener("click", () => {
        closeDialog("win-dialog");
    });
    document.getElementById("close-lose-dialog").addEventListener("click", () => {
        closeDialog("lose-dialog");
    });
    document.getElementById("start-spin").addEventListener("click", startSlotMachine);
    document.getElementById("spin-again").addEventListener("click", () => {
        closeDialog("lose-dialog");
        startSlotMachine();
    });
    slotPositions = getRandomSlotPositions();
    changeSlots();
    let slot1RotationX = -theta * slotPositions[0];
    let slot2RotationX = -theta * slotPositions[1];
    let slot3RotationX = -theta * slotPositions[2];
    rotate("slot-1", slot1RotationX);
    rotate("slot-2", slot2RotationX);
    rotate("slot-3", slot3RotationX);
}

function createSlotWheel() {
    let container = document.createElement("div");
    container.classList.add("slot-container");
    let wheel = document.createElement("div");
    wheel.classList.add("wheel");
    container.appendChild(wheel);
    for (let head in heads) {
        let card = document.createElement("div");
        card.classList.add("card");
        const img = document.createElement("img");
        img.src = `../images/${heads[head]}`;
        img.id = head;
        card.appendChild(img);
        wheel.appendChild(card);
    }
    return container;
}

window.onresize = changeSlots;

function changeSlots() {
    change("slot-1");
    change("slot-2");
    change("slot-3");
}

function rotateSlots() {
    let slot1RotationX = -theta * slotPositions[0];
    let slot2RotationX = -theta * slotPositions[1];
    let slot3RotationX = -theta * slotPositions[2];
    rotate("slot-1", slot1RotationX);
    rotate("slot-2", slot2RotationX);
    rotate("slot-3", slot3RotationX);
}

function getRandomSlotPositions() {
    const numberOfHeads = Object.keys(heads).length;
    let position1, position2, position3;
    position1 = getRandomSlotPosition(numberOfHeads);

    while (position1 == position2 || position2 == null) {
        position2 = getRandomSlotPosition(numberOfHeads);
    }
    while (position3 == position1 || position3 == position2 || position3 == null) {
        position3 = getRandomSlotPosition(numberOfHeads);
    }
    return [position1, position2, position3];
}

function probability(n) {
    return !!n && Math.random() <= n;
};

function getRandomSlotPosition(numberOfHeads) {
    return Math.floor(Math.random() * (numberOfHeads));
}

function showDialog(name) {
    const dialog = document.getElementById(name);
    dialog.showModal();
}

function closeDialog(name) {
    const dialog = document.getElementById(name);
    dialog.close();
}

function startSlotMachine() {
    if (isSlotMachineRunning) return;
    if (spins >= 999) spins = 0;
    spins++;
    updateCount("spin-counter", spins);
    won = false;
    let randomSlotPositions = getRandomSlotPositions();
    let winningSlot = null;
    if (probability(1)) {
        winningSlot = getRandomSlotPosition(Object.keys(heads).length);
    }
    let slotTargetPositions = [];
    if (winningSlot != null) {
        won = true;
        slotTargetPositions = [winningSlot, winningSlot, winningSlot];
    }
    else {
        slotTargetPositions = randomSlotPositions;
    }
    spinToTargetPosition(slotTargetPositions[0], slotTargetPositions[1], slotTargetPositions[2])
}

function displayResult() {
    if (won) {
        setWonHead();
        setBlinkingAdvertisement();
        setTimeout(() => {
            displayWonDialog();
        }, 2000);
    }
    else {
        displayLostDialog();
    }
    const startSpin = document.getElementById("start-spin");
    startSpin.disabled = false;
}

function setBlinkingAdvertisement() {
    const ads = document.getElementsByClassName("advertisement");
    for (let ad of ads) {
        ad.classList.add("blink-advertisement");
    }
    setTimeout(() => {
        for (let ad of ads) {
            ad.classList.remove("blink-advertisement");
        }
    }, 2000);
}

function setWonHead() {
    // const winImageHead = document.getElementById("win-image-head");
    // winImageHead.src = `../images/${heads[Object.keys(heads)[slotPositions[0]]]}`;
    // const winHeadName = document.getElementById("win-head-name");
    let winHeadName = Object.keys(heads)[slotPositions[0]];

    let canvas = document.getElementById("head-canvas");
    let context = canvas.getContext("2d");

    let height = parseInt(canvas.getAttribute("height"));
    let width = parseInt(canvas.getAttribute("width"));

    context.fillStyle = "#FFFFFF";
    context.fillRect(0, 0, width, height);
    let spacing = 64;
    let headImageHeight = 900;
    let headImageY = spacing * 2;
    const mainImage = new Image();
    mainImage.onload = function () {
        context.drawImage(mainImage, 90, headImageY, 900, headImageHeight);
    };

    context.fillStyle = "#000000";
    context.font = `${fontHeight}px Unbounded`;
    context.textAlign = "center";
    let fontHeight = 128;
    let centerOfCanvas = width / 2;
    let titleY = headImageY + headImageHeight + spacing + fontHeight;
    context.fillText(winHeadName, centerOfCanvas, titleY);

    var watermark = new Image();
    watermark.onload = function () {
        context.drawImage(watermark, 240, titleY + spacing, 600, 400);
    };
    watermark.src = "../images/Watermark_1200x800.svg";
    mainImage.src = `../images/${heads[Object.keys(heads)[slotPositions[0]]]}`;
}

function spinToTargetPosition(slot1TargetPosition, slot2TargetPosition, slot3TargetPosition) {
    isSlotMachineRunning = true;
    changeSlots();
    slotPositions = [slot1TargetPosition, slot2TargetPosition, slot3TargetPosition];
    let targetSlot1RotationX = -theta * slotPositions[0] - spins * 360;
    let targetSlot2RotationX = -theta * slotPositions[1] - spins * 720;
    let targetSlot3RotationX = -theta * slotPositions[2] - spins * 1080;
    rotate("slot-1", targetSlot1RotationX);
    rotate("slot-2", targetSlot2RotationX);
    rotate("slot-3", targetSlot3RotationX);
    setTimeout(() => {
        displayResult();
        isSlotMachineRunning = false;
    }, 5000);
}

function displayWonDialog() {
    showDialog("win-dialog");
    if (wins >= 999) wins = 0;
    wins++;
    updateCount("win-counter", wins);
}

function displayLostDialog() {
    showDialog("lose-dialog");
    if (losses >= 999) losses = 0;
    losses++;
    updateCount("lose-counter", losses);
}

function updateCount(name, value) {
    const counter = document.getElementById(name);
    const paddedValue = value.toString().padStart(3, "0");
    const counterNumber = counter.querySelector(".counter-number")

    const counterNumberLeft = counterNumber.querySelector(".counter-number-left");
    const counterNumberMiddle = counterNumber.querySelector(".counter-number-middle");
    const counterNumberRight = counterNumber.querySelector(".counter-number-right");

    const counterNumberLeftValue = parseInt(counterNumberLeft.textContent);
    const counterNumberMiddleValue = parseInt(counterNumberMiddle.textContent);
    const counterNumberRightValue = parseInt(counterNumberRight.textContent);

    const newCounterNumberLeftValue = parseInt(paddedValue[0]);
    const newCounterNumberMiddleValue = parseInt(paddedValue[1]);
    const newCounterNumberRightValue = parseInt(paddedValue[2]);

    if (counterNumberRightValue != newCounterNumberRightValue) {
        increaseValue(counterNumberRight, newCounterNumberRightValue);
    }

    if (counterNumberMiddleValue != newCounterNumberMiddleValue) {
        setTimeout(() => {
            increaseValue(counterNumberMiddle, newCounterNumberMiddleValue);
        }, 500);
    }

    if (counterNumberLeftValue != newCounterNumberLeftValue) {
        setTimeout(() => {
            increaseValue(counterNumberLeft, newCounterNumberLeftValue);
        }, 1000);
    }
}

function increaseValue(element, newValue) {
    const increaseValue = document.createElement("span");
    increaseValue.classList.add("increase-value");
    increaseValue.innerHTML = newValue;
    element.appendChild(increaseValue);
    element.classList.add("move-number-up-from-current-position");
    setTimeout(() => {
        element.classList.remove("move-number-up-from-current-position");
        element.innerHTML = newValue;
        increaseValue.remove();
    }, 500);
}

function rotate(slotName, rotationX) {
    const slot = document.getElementById(slotName);
    const wheel = slot.querySelector(".wheel");
    wheel.style.rotate = `x ${rotationX}deg`
    const cards = slot.querySelectorAll(".card");
    cards.forEach(card => card.classList.remove("current"));
}

function change(slotName) {
    const slot = document.getElementById(slotName);
    const wheelCard = slot.querySelectorAll(".wheel .card");
    // If is portrait, translatez 91rem, else translatez 61rem
    let translateZ = window.innerWidth < window.innerHeight ? "91rem" : "61rem";
    wheelCard.forEach((card, key) => {
        card.style.transform = `rotateX(${theta * key}deg) translateZ(${translateZ}) scale(0.8)`;
    });
}

function share() {

}

function download() {

}