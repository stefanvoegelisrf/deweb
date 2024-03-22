let spinning = [false, false, false]; // Spinning state for each slot
let isSlotMachineRunning = false;
let spins = 0;
let wins = 0;
let losses = 0;

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
    document.getElementById("start-spin").addEventListener("click", startSlotMachine);
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
}

function updateCount(name, value) {
    const counter = document.getElementById(name);
    // Pad the value with zeros
    const paddedValue = value.toString().padStart(3, "0");
    counter.querySelector(".counter-number").innerHTML = paddedValue;
}