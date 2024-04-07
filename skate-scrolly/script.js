const lenis = new Lenis({
    wheelMultiplier: 2,
    touchMultiplier: 0.5
});

lenis.on('scroll', (e) => {
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (e.animatedScroll / height) * 100;
    setSkateRotation(e.animatedScroll, e.direction);
    setBackgroundColor(scrolled);
    setSkateTransform(scrolled, e.animatedScroll, e.direction);
    setSkateScale(e.animatedScroll, scrolled);
    setFaceLook(scrolled);
});

function setFaceLook(scrollPercent) {
    const startTransition = 45;
    const endTransition = 49;
    const scrollRange = Math.min(Math.max(startTransition, scrollPercent), endTransition);
    const scale = map(scrollRange, startTransition, endTransition, 1, 2);
    const rotation = map(scrollRange, startTransition, endTransition, -60, -20);
    const skewX = map(scrollRange, startTransition, endTransition, 0, 30);
    const skewY = map(scrollRange, startTransition, endTransition, 0, 100);
    const mouthTranslateX = map(scrollRange, startTransition, endTransition, -300, -200);
    const mouthScale = map(scrollRange, startTransition, endTransition, 0.5, 3);
    document.documentElement.style.setProperty("--eyes-scale", scale);
    document.documentElement.style.setProperty("--eyes-rotation", `${rotation}deg`);
    document.documentElement.style.setProperty("--eyes-skew-x", `${skewX}deg`);
    document.documentElement.style.setProperty("--eyes-skew-y", `${skewY}deg`);
    document.documentElement.style.setProperty("--mouth-translate-x", `${mouthTranslateX}%`);
    document.documentElement.style.setProperty("--mouth-scale", `${mouthScale}`);
}

function setSkateRotation(scrollPixels, direction) {
    let rotation = 0;
    if (direction === 1) {
        rotation = map(Math.min(window.innerHeight * 0.5, scrollPixels), 0, window.innerHeight * 0.5, 0, 180);
    }
    document.documentElement.style.setProperty("--skate-rotation", `-${rotation}deg`);
}

function setBackgroundColor(scrollPercent) {
    const color1 = map(scrollPercent, 0, 100, 255, 100);
    const color2 = map(scrollPercent, 0, 100, 0, 200);
    const color3 = map(scrollPercent, 0, 100, 255, 200);
    document.documentElement.style.setProperty('--background-color', `rgb(${color1}, ${color2}, ${color3})`);
}

function setSkateTransform(scrollPercentage, scrollPixels, direction) {
    let transformX = 0;
    let transformY = 0;
    let skateOpacity = 1;

    if (scrollPercentage <= 5) {
        // Stay in the middle until 5% is reached
        transformX = 0;
    } else if (scrollPercentage > 5 && scrollPercentage <= 90) {
        // Go left and right afterwards until 40%
        transformX = 75 * Math.sin((scrollPercentage - 5) / 85 * 6 * Math.PI);
    } else if (scrollPercentage > 90) {
        // Go back to the middle at 90%
        transformX = 0;
        skateOpacity = map(scrollPercentage, 99, 99.5, 1, 0);
    }
    if (scrollPercentage > 97) {
        transformY = map(scrollPercentage, 97, 100, 0, 150);
    }
    console.log(scrollPercentage, transformX);
    if (direction === -1) {
        transformX *= -1;
    }
    else {
        transformY *= -1;
    }
    document.documentElement.style.setProperty('--skate-transform-x', `${transformX}%`);
    document.documentElement.style.setProperty('--skate-transform-y', `${transformY}%`);
    document.documentElement.style.setProperty('--skate-opacity', skateOpacity);

}

function setSkateScale(scrollPixels, scrollPercentage) {
    let skateScale = map(Math.min(window.innerHeight * 2, Math.max(window.innerHeight, scrollPixels)), window.innerHeight, window.innerHeight * 2, 1, 0.5);
    if (scrollPercentage > 97) {
        skateScale = map(scrollPercentage, 97, 100, 0.5, 0.2);
    }
    document.documentElement.style.setProperty('--skate-scale', skateScale);
}

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
    // for (let section of stoneSections) {
    //     const sectionBoundingRect = section.getBoundingClientRect();
    //     const amountOfStones = Math.floor(Math.random() * 500);
    //     const randomStones = new Array(amountOfStones).fill(null).map(() => createRandomStone(sectionBoundingRect.width, sectionBoundingRect.height));
    //     for (let stone of randomStones) {
    //         section.appendChild(stone);
    //     }
    // }

    const contentSections = document.querySelectorAll('.content-section');
    // for (let section of contentSections) {
    //     const sectionBoundingRect = section.getBoundingClientRect();
    //     const amountOfStones = Math.floor(Math.random() * 50);
    //     const randomStones = new Array(amountOfStones).fill(null).map(() => createRandomStone(sectionBoundingRect.width, sectionBoundingRect.height));
    //     for (let stone of randomStones) {
    //         section.appendChild(stone);
    //     }
    // }
    const sectionPavement1 = document.getElementById('section-pavement-1');
    createPavement(sectionPavement1);
}

function createPavement(containerElement) {
    const amountOfStones = 9 * 5 * 5;
    for (let i = 0; i < amountOfStones; i++) {
        const stone = document.createElement('div');
        stone.classList.add('stone');
        containerElement.appendChild(stone);
    }
}