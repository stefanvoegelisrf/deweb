let isSlotMachineRunning = false;
let spins = 0;
let wins = 0;
let losses = 0;
let slotPositions = [null, null, null];
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
}

window.addEventListener("resize", setSlotPositions);

window.onload = function () {
    const slotTemplate = document.createElement('template');
    for (let head in heads) {
        let headElement = document.createElement('img');
        headElement.src = `../images/${heads[head]}`;
        headElement.classList.add("head-image");
        slotTemplate.content.appendChild(headElement);
    }
    // Append the first head to the end of the slotTemplate again
    let headElement = document.createElement('img');
    headElement.src = `../images/${heads[Object.keys(heads)[0]]}`;
    headElement.classList.add("head-image");
    slotTemplate.content.appendChild(headElement);

    const slot1 = document.getElementById('slot-1');
    const slot2 = document.getElementById('slot-2');
    const slot3 = document.getElementById('slot-3');
    slot1.appendChild(slotTemplate.content.cloneNode(true));
    slot2.appendChild(slotTemplate.content.cloneNode(true));
    slot3.appendChild(slotTemplate.content.cloneNode(true));
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
    setRandomSlotStartingPosition();
}

function setRandomSlotStartingPosition() {
    slotPositions = getRandomSlotPositions();
    setSlotPositions();
}

function setSlotPositions() {
    setSlotPosition("slot-1", slotPositions[0]);
    setSlotPosition("slot-2", slotPositions[1]);
    setSlotPosition("slot-3", slotPositions[2]);
}


function setSlotPosition(slotId, slotPosition) {
    const headImageHeight = document.querySelector(".head-image").clientHeight;
    const slot = document.getElementById(slotId);
    const headImagesSlot = slot.querySelectorAll(".head-image");
    for (let headImage of headImagesSlot) {
        headImage.style.transform = `translateY(-${headImageHeight * slotPosition}px)`;
    }
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
    console.log(`Slot positions: ${position1}, ${position2}, ${position3}`);
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

let slotSpinPixels = [null, null, null];
let slotCurrentPixels = [null, null, null];
let slotTargetPositions = [null, null, null];
let won = false;

function startSlotMachine() {
    if (isSlotMachineRunning) return;
    if (spins >= 999) spins = 0;
    spins++;
    updateCount("spin-counter", spins);
    won = false;
    let randomSlotPositions = getRandomSlotPositions();
    let winningSlot = null;
    if (probability(0.25) && spins > 5) {
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
        displayWonDialog();
    }
    else {
        displayLostDialog();
    }
}

function spinToTargetPosition(slot1TargetPosition, slot2TargetPosition, slot3TargetPosition) {
    isSlotMachineRunning = true;
    let slot1CurrentPosition = slotPositions[0];
    const headImageHeight = document.querySelector(".head-image").clientHeight;
    slotSpinPixels[0] = headImageHeight * slot1TargetPosition + headImageHeight * Object.keys(heads).length * 2;
    slotCurrentPixels[0] = headImageHeight * slot1CurrentPosition;
    slotSpinPixels[1] = headImageHeight * slot2TargetPosition + headImageHeight * Object.keys(heads).length * 3;
    slotCurrentPixels[1] = headImageHeight * slotPositions[1];
    slotSpinPixels[2] = headImageHeight * slot3TargetPosition + headImageHeight * Object.keys(heads).length * 4;
    slotCurrentPixels[2] = headImageHeight * slotPositions[2];
    requestAnimationFrame(updateSpin);
}

function updateSpin() {
    const headImageHeight = document.querySelector(".head-image").clientHeight;
    const slot1 = document.getElementById("slot-1");
    const slot2 = document.getElementById("slot-2");
    const slot3 = document.getElementById("slot-3");
    const headImagesSlot1 = slot1.querySelectorAll(".head-image");
    const headImagesSlot2 = slot2.querySelectorAll(".head-image");
    const headImagesSlot3 = slot3.querySelectorAll(".head-image");
    let speed = 100;
    slotSpinPixels[0] -= speed;
    slotSpinPixels[1] -= speed;
    slotSpinPixels[2] -= speed;
    slotCurrentPixels[0] += speed;
    slotCurrentPixels[1] += speed;
    slotCurrentPixels[2] += speed;
    if (slotCurrentPixels[0] >= headImageHeight * Object.keys(heads).length) {
        slotCurrentPixels[0] = 0;
    }
    if (slotCurrentPixels[1] >= headImageHeight * Object.keys(heads).length) {
        slotCurrentPixels[1] = 0;
    }
    if (slotCurrentPixels[2] >= headImageHeight * Object.keys(heads).length) {
        slotCurrentPixels[2] = 0;
    }

    for (let headImage of headImagesSlot1) {
        headImage.style.transform = `translateY(-${slotCurrentPixels[0]}px)`;
    }
    for (let headImage of headImagesSlot2) {
        headImage.style.transform = `translateY(-${slotCurrentPixels[1]}px)`;
    }

    for (let headImage of headImagesSlot3) {
        headImage.style.transform = `translateY(-${slotCurrentPixels[2]}px)`;
    }

    if (slotSpinPixels[0] <= 0) {
        slotPositions[0] = slotTargetPositions[0];
        setSlotPosition("slot-1", slotPositions[0]);
    }
    if (slotSpinPixels[1] <= 0) {
        slotPositions[1] = slotTargetPositions[1];
        setSlotPosition("slot-2", slotPositions[1]);
    }
    if (slotSpinPixels[2] <= 0) {
        slotPositions[2] = slotTargetPositions[2];
        setSlotPosition("slot-3", slotPositions[2]);
    }

    if (slotSpinPixels[0] > 0 || slotSpinPixels[1] > 0 || slotSpinPixels[2] > 0) {
        requestAnimationFrame(updateSpin);
    }
    else {
        isSlotMachineRunning = false;
        displayResult();
    }
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