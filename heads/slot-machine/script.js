let spinning = [false, false, false]; // Spinning state for each slot
let isSlotMachineRunning = false;

window.onload = function () {
    const slotTemplate = document.getElementById('slot-template');
    const slot1 = document.getElementById('slot-1');
    const slot2 = document.getElementById('slot-2');
    const slot3 = document.getElementById('slot-3');
    slot1.appendChild(slotTemplate.content.cloneNode(true));
    slot2.appendChild(slotTemplate.content.cloneNode(true));
    slot3.appendChild(slotTemplate.content.cloneNode(true));
    document.getElementById("open-attributions").addEventListener("click", () => {
        const dialog = document.getElementById("attributions-dialog");
        dialog.showModal();
    });
    document.getElementById("close-attributions").addEventListener("click", () => {
        const dialog = document.getElementById("attributions-dialog");
        dialog.close();
    });
}

const slots = document.querySelectorAll('.slot');

function startSpin(slotIndex) {
    if (!spinning[slotIndex]) {
        slots[slotIndex].classList.add('spin');
        spinning[slotIndex] = true;
    }
}

function stopSpin(slotIndex) {
    if (spinning[slotIndex]) {
        slots[slotIndex].addEventListener('animationiteration', () => {
            slots[slotIndex].classList.remove('spin');
            spinning[slotIndex] = false;
        }, { once: true });
    }
}