const lenis = new Lenis({
    wheelMultiplier: 2
});

lenis.on('scroll', (e) => {
    // console.log(e)
    // console.log(e.animatedScroll);

    document.documentElement.style.setProperty('--scroll-pixels', e.animatedScroll);

    const height = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (e.animatedScroll / height) * 100;
    // Set the percentage of scroll as a css variable to the html element
    document.documentElement.style.setProperty('--scroll-percent', scrolled);
    let rotation = 0;
    if (e.direction === 1) {
        rotation = map(Math.min(window.innerHeight * 0.5, e.animatedScroll), 0, window.innerHeight * 0.5, 0, 180);
    }
    document.documentElement.style.setProperty("--skate-rotation", `-${rotation}deg`);

    // Map scrolled from 0 to 100 to 255 and 0
    const color1 = map(scrolled, 0, 100, 255, 100);
    const color2 = map(scrolled, 0, 100, 0, 200);
    const color3 = map(scrolled, 0, 100, 255, 200);
    document.documentElement.style.setProperty('--background-color', `rgb(${color1}, ${color2}, ${color3})`);

    // Set transform to 50% if scrolled is between 50 and 60
    // Map scrolled from 0 to -70
    let transformX = map(Math.min(50, Math.max(40, scrolled)), 40, 50, 0, -70);
    if (e.direction === -1) {
        transformX *= -1;
    }
    document.documentElement.style.setProperty('--skate-transform-x', `${transformX}%`);
    const skateScale = map(Math.min(window.innerHeight * 2, Math.max(window.innerHeight, e.animatedScroll)), window.innerHeight, window.innerHeight * 2, 1, 0.5);
    document.documentElement.style.setProperty('--skate-scale', skateScale);
});

const colors = ["cyan", "magenta", "yellow"]

function createRandomStone(maxX, maxY) {
    const stone = document.createElement('div');
    stone.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    stone.style.left = `${Math.random() * maxX}px`;
    stone.style.top = `${Math.random() * maxY}px`;
    const size = Math.random() * 2;
    stone.style.width = `${size}rem`;
    stone.style.height = `${size}rem`;
    const borderRadius = Math.max(size / 2, Math.random() * 1);
    stone.style.borderRadius = `${borderRadius}rem`;
    stone.style.transform = `rotate(${Math.random() * 360}deg) translate(-50%, -50%)`;
    stone.style.mixBlendMode = 'lighten';
    stone.style.position = 'absolute';
    return stone;
}

// Map function
function map(value, start1, stop1, start2, stop2) {
    return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
}

function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}

requestAnimationFrame(raf);

function showAttributions() {
    const attributions = document.getElementById('attributions');
    attributions.classList.contains('show-attributions') ? attributions.classList.remove('show-attributions') : attributions.classList.toggle('show-attributions');
    const attributionsIcon = document.getElementById('attributions-icon');
    attributionsIcon.classList.contains('rotate-attributions-icon') ? attributionsIcon.classList.remove('rotate-attributions-icon') : attributionsIcon.classList.toggle('rotate-attributions-icon');
}

window.onload = function () {
    document.getElementById('attributions-title').addEventListener('click', showAttributions);
    const stoneSections = document.querySelectorAll('.section-xl');
    for (let section of stoneSections) {
        const sectionBoundingRect = section.getBoundingClientRect();
        const amountOfStones = Math.floor(Math.random() * 500);
        const randomStones = new Array(amountOfStones).fill(null).map(() => createRandomStone(sectionBoundingRect.width, sectionBoundingRect.height));
        for (let stone of randomStones) {
            section.appendChild(stone);
        }
    }
}