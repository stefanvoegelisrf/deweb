let angle = 10; // degrees
let showing = 6; // cards
let speed = 1; // seconds

let current = 0;
let radius = 0;
let theta = 0;
let timer = null;


function rotate() {
    const wheel = document.querySelector(".wheel");
    wheel.style.transform = `translateZ(${-radius}px) rotateX(${-theta * current}deg)`;

    const cards = document.querySelectorAll(".card");
    cards.forEach(card => card.classList.remove("current"));

    clearTimeout(timer);
    timer = setTimeout(function () {
        document.getElementById(`card_${id(current)}`).classList.add("current");
    }, 0.9 * (speed * 1000)); // a tad before the animation ends
}

function setup() {
    for (let i = 0; i < showing; i++) {
        let name = id(i, showing);
        let card = document.getElementById("template").cloneNode(true);
        card.id = `card_${name}`;
        card.innerText = name;
        document.querySelector(".wheel").appendChild(card);
    }

    document.getElementById("prev").addEventListener("click", function () {
        current--;
        rotate();
    });

    document.getElementById("next").addEventListener("click", function () {
        current++;
        rotate();
    });

    const wheel = document.querySelector(".wheel");
    width = wheel.offsetWidth;
    theta = 360 / showing;
    radius = Math.max(100, Math.round(width / 2)); // 100 is an arbitary minimum width

    const wheelCard = document.querySelectorAll(".wheel .card");
    wheelCard.forEach((card, key) => {
        card.style.transform = `rotateX(${theta * key}deg) translateZ(${radius}px) translateX(-50%) scale(0.5)`;
    });

    rotate();
}

function id(idx, count = showing) {
    idx %= count;
    return (idx < 0 ? idx + count : idx).toString().padStart(2, "0");
}

window.onload = setup;