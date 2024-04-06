window.onload = function () {
    randomizeImages();
    setInterval(randomizeImages, 2000);
}

function randomizeImages() {
    const images = document.querySelectorAll('img');
    for (let i = 0; i < images.length; i++) {
        setRandomFilter(images[i]);
        setRandomImageHeight(images[i]);
    }
}


function setRandomFilter(element) {
    const hueRotate = Math.floor(Math.random() * 360);
    element.style.filter = `invert() sepia(20) saturate(10) hue-rotate(${hueRotate}deg)`;
}

function setRandomImageHeight(element) {
    let multiplier = 100 / 4;
    if (window.innerHeight > window.innerWidth) {
        multiplier = 100 / 8;
    }
    const height = Math.min(Math.random() + 0.2, 1) * multiplier;
    element.style.height = `${height}vmin`;
}