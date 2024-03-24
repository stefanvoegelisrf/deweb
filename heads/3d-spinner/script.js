// --- default values

var angle = 10; // degrees
var showing = 12; // cards
var max = 16; // cards
var speed = 1; // seconds

// --- global variables

var current = 0;
var radius = 0;
var theta = 0;
var timer = null;

// --- generates the card id

function id(idx, count = showing) {
    idx %= count;
    return (idx < 0 ? idx + count : idx).toString().padStart(2, "0");
}

// --- rotate the card wheel

function rotate() {
    const wheel = document.querySelector(".wheel");
    wheel.style.transform = `translateZ(${-radius}px) rotateX(${-angle}deg) rotateY(${-theta * current}deg)`;

    document.getElementById("curr").value = current;
    const cards = document.querySelectorAll(".card");
    cards.forEach(card => card.classList.remove("current"));

    clearTimeout(timer);
    timer = setTimeout(function () {
        document.getElementById(`card_${id(current)}`).classList.add("current");
    }, 0.9 * (speed * 1000)); // a tad before the animation ends

    info();
}



// --- show the info

function info() {
    document.getElementById("_angle").innerHTML = `${angle} deg`;
    document.getElementById("_showing").innerHTML = `${showing} of ${max}`;
    document.getElementById("_current").innerHTML = `card ${id(current)}`;
    document.getElementById("_speed").innerHTML = `${speed} secs`;
}

// --- process a change

function change() {
    const wheel= document.querySelector(".wheel");
    width = wheel.offsetWidth;
    theta = showing ? 360 / showing : 1;
    radius = Math.max(100, Math.round(width / 2 / Math.tan(Math.PI / showing))); // 100 is an arbitary minimum width

    const wheelCard = document.querySelectorAll(".wheel .card");
    wheelCard.forEach((card, key, parent) => {
        console.log(`${key} ${showing} ${radius} ${theta} ${speed} ${key<showing}`);
        if (key < showing) {
            card.style.opacity= 1;
            card.style.transform = `rotateY(${theta * key}deg) translateZ(${radius}px)`;
        }
        else {
            card.style.opacity = 0;
            card.style.transform = "none";
        }
        card.style.transitionDuration = `${speed}s`;
    });

    wheel.style.transitionDuration = `${speed}s`;

    let add = document.getElementById("add");
    let del = document.getElementById("del");
    if (showing == max) {
        add.classList.add("disabled");
    }
    else {
        add.classList.remove("disabled");
    }

    if (showing == 0) {
        del.classList.add("disabled");
    }
    else {
        del.classList.remove("disabled");
    }

    rotate();
}

// --- initial setup

function setup() {
    for (let i = 0; i < max; i++) {
        let name = id(i, max);
        let card = document.getElementById("template").cloneNode(true);
        card.style.opacity = 0;
        card.id = `card_${name}`;
        card.innerText = name;
        document.querySelector(".wheel").appendChild(card);
    }

    document.getElementById("angle").value = angle;
    document.getElementById("speed").value = speed;

    // --- handlers

    document.getElementById("prev").addEventListener("click", function () {
        current--;
        rotate();
    });

    document.getElementById("next").addEventListener("click", function () {
        current++;
        rotate();
    });

    document.getElementById("curr").addEventListener("change", function () {
        current = Math.min(showing - 1, Math.max(0, parseInt(this.value)));
        rotate();
    });

    document.getElementById("angle").addEventListener("change", function () {
        angle = this.value;
        rotate();
    });

    document.getElementById("speed").addEventListener("change", function () {
        speed = this.value;
        change();
    });

    document.getElementById("add").addEventListener("click", function () {
        showing = Math.min(showing + 1, max);
        change();
    });

    document.getElementById("del").addEventListener("click", function () {
        showing = Math.max(showing - 1, 0);
        change();
    });

    change();
}

window.onload = setup;