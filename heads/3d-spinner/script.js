let current = 0;
let radius = 0;
let theta = 0;

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


function rotate() {
    const wheel = document.querySelector(".wheel");
    wheel.style.transform = `translateZ(${-radius}px) rotateX(${-theta * current}deg)`;

    const cards = document.querySelectorAll(".card");
    cards.forEach(card => card.classList.remove("current"));
}

function setup() {
    let container = document.createElement("div");
    container.classList.add("slot-container");
    let wheel = document.createElement("div");
    wheel.classList.add("wheel");
    container.appendChild(wheel);
    for (let head in heads) {
        let card = document.getElementById("template").cloneNode(true);
        const img = document.createElement("img");
        img.src = `../images/${heads[head]}`;
        img.id = head;
        card.appendChild(img);
        wheel.appendChild(card);
    }

    document.body.appendChild(container);

    document.getElementById("prev").addEventListener("click", function () {
        current--;
        rotate();
    });

    document.getElementById("next").addEventListener("click", function () {
        current++;
        rotate();
    });
    change();

    rotate();
}

function change() {
    const wheel = document.querySelector(".wheel");
    width = wheel.offsetWidth;
    let numberOfHeads = Object.keys(heads).length;
    theta = 360 / numberOfHeads;
    radius = Math.round(width / 8) * numberOfHeads; // 100 is an arbitary minimum width

    const wheelCard = document.querySelectorAll(".wheel .card");
    wheelCard.forEach((card, key) => {
        card.style.transform = `rotateX(${theta * key}deg) translateZ(${radius}px) scale(0.8)`;
    });
}

function id(idx, count) {
    idx %= count;
    return (idx < 0 ? idx + count : idx).toString().padStart(2, "0");
}

window.onload = setup;

window.onresize = () => {
    change();
    rotate();
};