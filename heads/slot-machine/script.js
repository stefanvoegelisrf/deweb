let isSlotMachineRunning = false;
let spins = 0;
let wins = 0;
let losses = 0;
let slotPositions = [null, null, null];

window.onload = function () {
    const slotTemplate = document.getElementById('slot-template');
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
    const headImageHeight = document.querySelector(".head-image").clientHeight;
    console.log(headImageHeight);
    slotPositions = getRandomSlotPositions();
    console.log(`${slotPositions[0]}, ${slotPositions[1]}, ${slotPositions[2]}`);
    const slot1 = document.getElementById("slot-1");
    const slot2 = document.getElementById("slot-2");
    const slot3 = document.getElementById("slot-3");
    const headImagesSlot1 = slot1.querySelectorAll(".head-image");
    for (let headImage of headImagesSlot1) {
        headImage.style.transform = `translateY(-${headImageHeight * slotPositions[0]}px)`;
    }
    const headImagesSlot2 = slot2.querySelectorAll(".head-image");
    for (let headImage of headImagesSlot2) {
        headImage.style.transform = `translateY(-${headImageHeight * slotPositions[1]}px)`;
    }
    const headImagesSlot3 = slot3.querySelectorAll(".head-image");
    for (let headImage of headImagesSlot3) {
        headImage.style.transform = `translateY(-${headImageHeight * slotPositions[2]}px)`;
    }
}

function getRandomSlotPositions() {
    const numberOfHeads = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--number-of-heads"));
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
    let won = false;
    // Spin at least 5 seconds
    // Second slot spins 6 seconds
    // Third slot spins 7 seconds
    if (won) {
        displayWonDialog();
    }
    else {
        displayLostDialog();
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