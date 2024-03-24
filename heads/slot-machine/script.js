let isSlotMachineRunning = false;
let spins = 0;
let wins = 0;
let losses = 0;
let slotPositions = [null, null, null];
let slotTargetPositions = [null, null, null];
let heads = {
    "Capleb": "Capleb.svg",
    "Drihok": "Drihok.svg",
    "Eflubo": "Eflubo.svg",
    "Fytum": "Fytum.svg",
    "Gabuf": "Gabuf.svg",
    "Medeox": "Medeox.svg",
    "Ocraci": "Ocraci.svg",
    "Pocron": "Pocron.svg",
    "Uthave": "Uthave.svg",
    "Wawear": "Wawear.svg",
    "Capleb": "Capleb.svg",
}
let won = false;

let radius = 0;
let theta = 0;

window.onload = function () {
    let container = document.createElement("div");
    container.classList.add("slot-container");
    let wheel = document.createElement("div");
    wheel.classList.add("wheel");
    wheel.classList.add("no-transition");
    container.appendChild(wheel);
    for (let head in heads) {
        let card = document.createElement("div");
        card.classList.add("card");
        card.classList.add("no-transition");
        const img = document.createElement("img");
        img.src = `../images/${heads[head]}`;
        img.id = head;
        card.appendChild(img);
        wheel.appendChild(card);
    }

    let slot1 = container.cloneNode(true);
    slot1.id = "slot-1";
    let slot2 = container.cloneNode(true);
    slot2.id = "slot-2";
    let slot3 = container.cloneNode(true);
    slot3.id = "slot-3";

    const slotsContainer = document.getElementById("slots-container");
    slotsContainer.appendChild(slot1);
    slotsContainer.appendChild(slot2);
    slotsContainer.appendChild(slot3);


    document.getElementById("open-attributions").addEventListener("click", () => {
        showDialog("attributions-dialog");
    });
    document.getElementById("close-attributions").addEventListener("click", () => {
        closeDialog("attributions-dialog");
    });
    document.getElementById("close-win-dialog").addEventListener("click", () => {
        closeDialog("win-dialog");
    });
    document.getElementById("close-lose-dialog").addEventListener("click", () => {
        closeDialog("lose-dialog");
    });
    document.getElementById("start-spin").addEventListener("click", startSlotMachine);
    slotPositions = getRandomSlotPositions();
    changeAndRotateSlots();
    setTimeout(() => {
        removeNoTransition();
    }, 1000);
}

window.onresize = changeAndRotateSlots;

function changeAndRotateSlots() {
    change("slot-1");
    change("slot-2");
    change("slot-3");
    rotate("slot-1", slotPositions[0]);
    rotate("slot-2", slotPositions[1]);
    rotate("slot-3", slotPositions[2]);
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
    return Math.max(1, Math.floor(Math.random() * (numberOfHeads + 1)));
}
const loseImages = [
    "crying-face.svg",
    "disappointed-face.svg",
    "downcast-face-with-sweat.svg",
    "expressionless-face.svg",
    "face-with-rolling-eyes.svg",
    "face-with-steam-from-nose.svg",
    "frowning-face-with-open-mouth.svg",
    "loudly-crying-face.svg",
    "pensive-face.svg",
    "persevering-face.svg",
    "pile-of-poo.svg",
    "pouting-face.svg",
    "sad-but-relieved-face.svg",
    "see-no-evil-monkey.svg",
    "weary-face.svg",
    "worried-face.svg",
];

function replaceLoseImage() {
    const image = document.querySelectorAll(".lose-icon");
    const randomIndex = Math.floor(Math.random() * loseImages.length);
    image.forEach((img) => {
        img.src = `../images/icons/${loseImages[randomIndex]}`;
    });
}

const winImages = [
    "bottle-with-popping-cork.svg",
    "call-me-hand.svg",
    "confetti-ball.svg",
    "fireworks.svg",
    "folded-hands.svg",
    "four-leaf-clover.svg",
    "grinning-face-with-smiling-eyes.svg",
    "hugging-face.svg",
    "hundred-points.svg",
    "money-bag.svg",
    "money-mouth-face.svg",
    "sparkles.svg",
];

function replaceWinImage() {
    const image = document.querySelectorAll(".win-icon");
    const randomIndex = Math.floor(Math.random() * winImages.length);
    image.forEach((img) => {
        img.src = `../images/icons/${winImages[randomIndex]}`;
    });
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
    if (probability(0.25)) {
        winningSlot = getRandomSlotPosition(Object.keys(heads).length);
    }
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
        displayWonDialog();
    }
    else {
        displayLostDialog();
    }
    const startSpin = document.getElementById("start-spin");
    startSpin.disabled = false;
}

function setWonHead() {
    const winImageHead = document.getElementById("win-image-head");
    winImageHead.src = `../images/${heads[Object.keys(heads)[slotTargetPositions[0]]]}`;
    const winHeadName = document.getElementById("win-head-name");
    winHeadName.innerHTML = Object.keys(heads)[slotTargetPositions[0]];
}

function spinToTargetPosition(slot1TargetPosition, slot2TargetPosition, slot3TargetPosition) {
    isSlotMachineRunning = true;
    slotPositions=[slot1TargetPosition, slot2TargetPosition, slot3TargetPosition];
    changeAndRotateSlots();
    isSlotMachineRunning = false;
}

function displayWonDialog() {
    showDialog("win-dialog");
    replaceWinImage();
    if (wins >= 999) wins = 0;
    wins++;
    updateCount("win-counter", wins);
}

function displayLostDialog() {
    showDialog("lose-dialog");
    replaceLoseImage();
    if (losses >= 999) losses = 0;
    losses++;
    updateCount("lose-counter", losses);

}

function updateCount(name, value) {
    const counter = document.getElementById(name);
    // Pad the value with zeros
    const paddedValue = value.toString().padStart(3, "0");
    counter.querySelector(".counter-number").innerHTML = paddedValue;
}

function rotate(slotName, slotPosition) {
    const slot = document.getElementById(slotName);
    const wheel = slot.querySelector(".wheel");
    wheel.style.transform = `translateZ(${-radius}px) rotateX(${-theta * slotPosition}deg)`;

    const cards = slot.querySelectorAll(".card");
    cards.forEach(card => card.classList.remove("current"));
}

function change(slotName) {
    const slot = document.getElementById(slotName);
    const wheel = slot.querySelector(".wheel");
    let numberOfHeads = Object.keys(heads).length;
    theta = 360 / numberOfHeads;
    radius = Math.round(wheel.offsetHeight / 8) * numberOfHeads;

    const wheelCard = slot.querySelectorAll(".wheel .card");
    wheelCard.forEach((card, key) => {
        card.style.transform = `rotateX(${theta * key}deg) translateZ(${radius}px) scale(0.8)`;
    });
}

function removeNoTransition() {
    const allElementsWithNoTransition = document.querySelectorAll(".no-transition");
    allElementsWithNoTransition.forEach(element => element.classList.remove("no-transition"));
}